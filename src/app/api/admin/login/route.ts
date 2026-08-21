import { NextResponse } from "next/server";
import { setAdminSession, validateAdminCredentials } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const isValid = validateAdminCredentials({
      password: String(body.password || ""),
    });

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid admin credentials." },
        { status: 401 },
      );
    }

    await setAdminSession();
    return NextResponse.json({ message: "Logged in." });
  } catch {
    return NextResponse.json(
      { message: "Invalid login request." },
      { status: 400 },
    );
  }
}
