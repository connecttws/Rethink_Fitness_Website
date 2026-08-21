import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(
    { message: "Database saves are disabled. Use JSON saves only." },
    { status: 400 },
  );
}
