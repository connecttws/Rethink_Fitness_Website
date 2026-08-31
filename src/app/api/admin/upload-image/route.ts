import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { isAdminSession } from "@/lib/auth/session";

// The user specified to use Cloudinary and put the env name here
// We expect process.env.CLOUDINARY_URL to be set.
// e.g., CLOUDINARY_URL=cloudinary://my_key:my_secret@my_cloud_name

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    if (!process.env.CLOUDINARY_URL) {
      return NextResponse.json({ 
        message: "CLOUDINARY_URL environment variable is not set. Please configure Cloudinary." 
      }, { status: 500 });
    }

    // Convert file to base64 buffer for Cloudinary SDK
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload to Cloudinary using a promise wrapper
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "rethink_fitness" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const secureUrl = (result as any).secure_url;

    return NextResponse.json({ 
      message: "Image uploaded successfully", 
      url: secureUrl 
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Image upload failed" },
      { status: 500 }
    );
  }
}
