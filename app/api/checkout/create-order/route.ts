import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/data/products";
import { ORDERS, OrderItem, ShippingAddress } from "@/lib/data/orders";

interface ClientCartItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

interface CreateOrderRequest {
  items: ClientCartItem[];
  customer: ShippingAddress;
  couponCode?: string;
}

export async function POST(req: Request) {
  try {
    const body: CreateOrderRequest = await req.json();
    const { items, customer, couponCode } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart cannot be empty" },
        { status: 400 }
      );
    }

    if (!customer?.fullName || !customer?.email || !customer?.phone || !customer?.streetAddress || !customer?.city || !customer?.pincode) {
      return NextResponse.json(
        { error: "Complete shipping address is required" },
        { status: 400 }
      );
    }

    // SERVER-SIDE PRICE RECALCULATION
    // Strictly verify each item against the authentic master product catalog
    let serverSubtotal = 0;
    const verifiedItems: OrderItem[] = [];

    for (const clientItem of items) {
      const product = PRODUCTS.find(
        (p) => p.id === clientItem.productId || p.slug === clientItem.productId
      );

      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${clientItem.productId}` },
          { status: 400 }
        );
      }

      // Match variant or fallback to first variant
      const variant =
        product.variants.find((v) => v.id === clientItem.variantId) ||
        product.variants[0];

      const qty = Math.max(1, Math.floor(clientItem.quantity || 1));
      const lineSubtotal = variant.price * qty;
      serverSubtotal += lineSubtotal;

      verifiedItems.push({
        productId: product.id,
        productName: product.name,
        variantWeight: variant.weight,
        unitPrice: variant.price,
        quantity: qty,
        subtotal: lineSubtotal,
        image: product.images.primary,
      });
    }

    // Server-side discount calculation
    let discount = 0;
    let validCoupon: string | undefined = undefined;

    if (couponCode) {
      const code = couponCode.trim().toUpperCase();
      if (code === "HERITAGE15") {
        discount = Math.round(serverSubtotal * 0.15);
        validCoupon = "HERITAGE15";
      } else if (code === "WELCOME10") {
        discount = Math.round(serverSubtotal * 0.10);
        validCoupon = "WELCOME10";
      }
    }

    // Shipping calculation: Free over ₹499, else ₹60
    const netAfterDiscount = Math.max(0, serverSubtotal - discount);
    const shippingFee = netAfterDiscount >= 499 ? 0 : 60;
    const grandTotal = netAfterDiscount + shippingFee;
    const amountInPaise = Math.round(grandTotal * 100);

    const orderNumber = `FLV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_flavouron_demo";
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    let razorpayOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // If live credentials are provided, call Razorpay REST endpoint
    if (razorpayKeySecret && !razorpayKeySecret.includes("your_") && razorpayKeyId !== "rzp_test_flavouron_demo") {
      try {
        const authHeader = `Basic ${Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64")}`;
        const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify({
            amount: amountInPaise,
            currency: "INR",
            receipt: orderNumber,
            notes: {
              customer_name: customer.fullName,
              customer_email: customer.email,
            },
          }),
        });

        if (rzpResponse.ok) {
          const rzpData = await rzpResponse.json();
          razorpayOrderId = rzpData.id;
        }
      } catch {
        // Fallback to internal order id
      }
    }

    // Record pending order
    ORDERS.push({
      id: `ord_${Date.now()}`,
      orderNumber,
      razorpayOrderId,
      customer,
      items: verifiedItems,
      subtotal: serverSubtotal,
      discount,
      couponCode: validCoupon,
      shippingFee,
      grandTotal,
      currency: "INR",
      paymentStatus: "pending",
      fulfillmentStatus: "unfulfilled",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      orderNumber,
      razorpayOrderId,
      amount: amountInPaise,
      grandTotal,
      subtotal: serverSubtotal,
      discount,
      shippingFee,
      currency: "INR",
      keyId: razorpayKeyId,
      items: verifiedItems,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || "Order calculation failed" },
      { status: 500 }
    );
  }
}
