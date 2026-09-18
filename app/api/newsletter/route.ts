import { NextResponse } from "next/server";

// In-memory or Supabase persistent newsletter list
export const SUBSCRIBERS: { email: string; createdAt: string }[] = [];

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required" },
        { status: 400 }
      );
    }

    const normalized = email.trim().toLowerCase();
    const exists = SUBSCRIBERS.some((s) => s.email === normalized);

    if (!exists) {
      SUBSCRIBERS.push({
        email: normalized,
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to Flavouron dispatches.",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    count: SUBSCRIBERS.length,
    subscribers: SUBSCRIBERS,
  });
}
