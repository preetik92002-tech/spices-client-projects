import { NextResponse } from "next/server";

export const INQUIRIES: {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  createdAt: string;
}[] = [];

export async function POST(req: Request) {
  try {
    const { name, email, phone, inquiryType, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const inquiry = {
      id: `inq_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      inquiryType: inquiryType || "General",
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    INQUIRIES.push(inquiry);

    return NextResponse.json({
      success: true,
      message: "Inquiry received successfully",
      inquiryId: inquiry.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    count: INQUIRIES.length,
    inquiries: INQUIRIES,
  });
}
