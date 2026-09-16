import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, email, fitnessGoal, preferredOption, preferredContactTime, sourcePage } = data;

    if (!name || !phone) {
      return NextResponse.json(
        { message: "Name and phone number are required." },
        { status: 400 }
      );
    }

    console.log("[LEAD CAPTURED]", {
      timestamp: new Date().toISOString(),
      sourcePage: sourcePage || "unknown",
      name,
      phone,
      email: email || "N/A",
      fitnessGoal: fitnessGoal || "N/A",
      preferredOption: preferredOption || "N/A",
      preferredContactTime: preferredContactTime || "N/A",
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your details have been received. A Rethink Fitness coach will contact you shortly.",
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { message: "Failed to process lead inquiry. Please try again." },
      { status: 500 }
    );
  }
}
