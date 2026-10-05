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

    // Server-side forward to CRM
    try {
      const summaryParts = [
        fitnessGoal ? `Fitness Goal: ${fitnessGoal}` : null,
        preferredOption ? `Preferred Option: ${preferredOption}` : null,
        preferredContactTime ? `Preferred Contact Time: ${preferredContactTime}` : null,
        sourcePage ? `Source: ${sourcePage}` : null,
      ].filter(Boolean);

      await fetch("https://clientcrmsystem.vercel.app/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          landingPageKey: "bcl_pub_booclient-team_rethink-website-91b2f2",
          name,
          phone,
          email: email || undefined,
          message: summaryParts.length > 0 ? summaryParts.join(" | ") : undefined,
          formData: {
            fitnessGoal,
            preferredOption,
            preferredContactTime,
            sourcePage,
          },
          landingPageUrl: "https://rethink-fitness-website.vercel.app",
        }),
      });
    } catch (crmErr) {
      console.warn("[CRM Forward Warning]:", crmErr);
    }

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
