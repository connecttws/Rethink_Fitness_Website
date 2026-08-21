import { NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";
import { revalidatePath } from "next/cache";
import { isAdminSession } from "@/lib/auth/session";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

const UPLOAD_DIR = join(process.cwd(), "public", "visual-editor", "images");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function setByPath(obj: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === undefined || current[key] === null) current[key] = {};
    current = current[key] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const jsonPath = formData.get("jsonPath") ? String(formData.get("jsonPath")) : null;

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Image file is required." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Compress image: medium compression (webp, quality 80) and max width 1920px
    const compressedBuffer = await sharp(buffer)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const originalNameWithoutExt = file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, '-');
    const filename = `${Date.now()}-${originalNameWithoutExt}.webp`;
    let secure_url = "";

    // Upload to Cloudinary if configured, else fallback to local file system
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      secure_url = await new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'visual-editor', public_id: filename },
          (error: any, result: any) => {
            if (error || !result) return reject(error || new Error("Cloudinary upload failed"));
            resolve(result.secure_url);
          }
        );
        uploadStream.end(compressedBuffer);
      });
    } else {
      const filePath = join(UPLOAD_DIR, filename);
      writeFileSync(filePath, compressedBuffer);
      secure_url = `/visual-editor/images/${filename}`;
    }

    if (jsonPath) {
      const pages = await prisma.page.findMany({ where: { is_home_page: true } });
      if (pages.length === 0) throw new Error("Home page row not found.");
      
      const page = pages[0];
      const content = (page.content as Record<string, unknown>) || {};
      
      setByPath(content, jsonPath, secure_url);

      await prisma.page.update({
        where: { id: page.id },
        data: { content: content as any }
      });

      // Invalidate the cache since JSON changed
      revalidatePath("/", "layout");
    }

    return NextResponse.json({
      message: "Image uploaded.",
      url: secure_url,
      publicId: filename,
    });
  } catch (error) {
    console.error("Upload Image Error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to upload image." },
      { status: 400 },
    );
  }
}
