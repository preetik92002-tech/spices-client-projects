import { NextResponse } from "next/server";
import { verifyRazorpayPayment } from "@/lib/razorpay";
import { ORDERS } from "@/lib/data/orders";

interface VerifyPaymentRequest {
  orderNumber: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature?: string;
  isTestMode?: boolean;
}

export async function POST(req: Request) {
  try {
    const body: VerifyPaymentRequest = await req.json();
    const {
      orderNumber,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      isTestMode,
    } = body;

    if (!orderNumber || !razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { error: "Missing required payment verification fields" },
        { status: 400 }
      );
    }

    const order = ORDERS.find(
      (o) => o.orderNumber === orderNumber || o.razorpayOrderId === razorpay_order_id
    );

    if (!order) {
      return NextResponse.json(
        { error: "Order record not found" },
        { status: 404 }
      );
    }

    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    // Cryptographic verification if live secret configured
    if (
      razorpayKeySecret &&
      !razorpayKeySecret.includes("your_") &&
      razorpay_signature &&
      !isTestMode
    ) {
      const isValid = verifyRazorpayPayment(
        {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
        razorpayKeySecret
      );

      if (!isValid) {
        order.paymentStatus = "failed";
        return NextResponse.json(
          { error: "Cryptographic signature verification failed" },
          { status: 400 }
        );
      }
    }

    // Mark as paid & update fulfillment
    order.paymentStatus = "paid";
    order.fulfillmentStatus = "processing";
    order.razorpayPaymentId = razorpay_payment_id;
    order.updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and recorded",
      orderNumber: order.orderNumber,
      customer: order.customer,
      grandTotal: order.grandTotal,
      currency: order.currency,
      items: order.items,
      paymentId: razorpay_payment_id,
      paymentStatus: order.paymentStatus,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || "Payment verification error" },
      { status: 500 }
    );
  }
}
