import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminSession } from "@/lib/auth/session";
import prisma from "@/lib/prisma";
import { loadVisualContent } from "@/lib/visual-data/loadContent";

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  const pages = await prisma.page.findMany({ where: { is_home_page: true } });
  const dbData = pages.length > 0 ? (pages[0].content as any) : null;
  const localData = await loadVisualContent();
  const content = (dbData && Object.keys(dbData).length > 0) ? dbData : localData;

  return NextResponse.json(content);
}

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { path, value } = await request.json();
    if (!path || typeof path !== "string") {
      return NextResponse.json({ message: "path is required" }, { status: 400 });
    }

    const pages = await prisma.page.findMany({ where: { is_home_page: true } });
    if (pages.length === 0) {
      throw new Error("Home page row not found in database.");
    }
    
    const page = pages[0];
    const content = (page.content as Record<string, unknown>) || {};
    
    // Apply patch
    setByPath(content, path, value);

    // Save back to Prisma
    await prisma.page.update({
      where: { id: page.id },
      data: { content: content as any }
    });

    revalidatePath("/", "layout");

    return NextResponse.json({ message: "Saved.", path, value });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Save failed" },
      { status: 500 },
    );
  }
}

/** Set a value in a nested object by dot-path e.g. "hero.highlights.0.value" */
function setByPath(obj: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === undefined || current[key] === null) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}
