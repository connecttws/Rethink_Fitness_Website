import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
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
    const { path, value, slug } = await request.json();
    if (!path || typeof path !== "string") {
      return NextResponse.json({ message: "path is required" }, { status: 400 });
    }

    // Determine target page
    let targetSlug = slug || "/";
    if (path.startsWith("navbar") || path.startsWith("footer")) {
      targetSlug = "/"; // Global components are stored on the home page record
    }

    const page = await prisma.page.findFirst({ 
      where: targetSlug === "/" ? { is_home_page: true } : { slug: targetSlug } 
    });
    
    if (!page) {
      throw new Error(`Page for slug ${targetSlug} not found in database.`);
    }
    
    const content = (page.content as Record<string, unknown>) || {};
    
    // Apply patch
    setByPath(content, path, value);

    // Save back to Prisma
    await prisma.page.update({
      where: { id: page.id },
      data: { content: content as any }
    });

    // @ts-expect-error - Next.js canary typings for revalidateTag require 2 args, but the runtime accepts 1.
    revalidateTag("visual-content");
    revalidatePath(targetSlug === "/" ? "/" : targetSlug, "page");
    if (targetSlug === "/") {
      revalidatePath("/", "layout"); // Revalidate layout if global components changed
    }

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
