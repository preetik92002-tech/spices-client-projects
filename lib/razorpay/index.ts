import crypto from "crypto";

export interface RazorpayOrderOptions {
  amount: number; // in paise
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayPaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/**
 * Verify Razorpay payment signature cryptographically
 */
export function verifyRazorpayPayment(
  verification: RazorpayPaymentVerification,
  keySecret: string
): boolean {
  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${verification.razorpay_order_id}|${verification.razorpay_payment_id}`)
    .digest("hex");

  return generatedSignature === verification.razorpay_signature;
}
