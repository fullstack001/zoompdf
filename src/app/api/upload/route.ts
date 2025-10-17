import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

export async function POST(request: NextRequest) {
  const uploadStartTime = Date.now();

  try {
    console.log("[UPLOAD] ========== New Upload Request ==========");
    console.log("[UPLOAD] Request received at:", new Date().toISOString());

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const fileName = formData.get("fileName") as string;
    const fileId = formData.get("fileId") as string;

    if (!file || !fileName || !fileId) {
      console.error("[UPLOAD ERROR] Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields: file, fileName, or fileId" },
        { status: 400 }
      );
    }

    // Log file information
    const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
    console.log("[UPLOAD] File Details:");
    console.log(`  - Name: ${file.name}`);
    console.log(`  - Sanitized Name: ${fileName}`);
    console.log(`  - File ID: ${fileId}`);
    console.log(`  - Size: ${fileSizeMB} MB (${file.size} bytes)`);
    console.log(`  - Type: ${file.type}`);

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadsDir)) {
      try {
        mkdirSync(uploadsDir, { recursive: true });
        console.log("[UPLOAD] Created uploads directory:", uploadsDir);
      } catch (dirError) {
        console.error(
          "[UPLOAD ERROR] Failed to create uploads directory:",
          dirError
        );
        return NextResponse.json(
          { error: "Failed to create uploads directory" },
          { status: 500 }
        );
      }
    }

    // Convert file to buffer with progress logging
    console.log("[UPLOAD] Reading file data...");
    const readStartTime = Date.now();
    const bytes = await file.arrayBuffer();
    const readTime = Date.now() - readStartTime;
    console.log(`[UPLOAD] File read completed in ${readTime}ms`);

    console.log("[UPLOAD] Converting to buffer...");
    const buffer = Buffer.from(bytes);
    console.log(`[UPLOAD] Buffer created (${buffer.length} bytes)`);

    // Save file to uploads directory
    const filePath = join(uploadsDir, fileName);
    console.log(`[UPLOAD] Writing file to disk: ${filePath}`);

    try {
      const writeStartTime = Date.now();
      await writeFile(filePath, buffer);
      const writeTime = Date.now() - writeStartTime;
      console.log(`[UPLOAD] File write completed in ${writeTime}ms`);
      console.log(
        `[UPLOAD] Write speed: ${(file.size / writeTime / 1024).toFixed(
          2
        )} KB/ms`
      );

      // Verify file was written successfully
      if (!existsSync(filePath)) {
        throw new Error("File was not written to disk");
      }
      console.log("[UPLOAD] File verification: SUCCESS");
    } catch (writeError) {
      console.error("[UPLOAD ERROR] Failed to write file:", writeError);
      return NextResponse.json(
        { error: "Failed to save file to disk" },
        { status: 500 }
      );
    }

    const totalTime = Date.now() - uploadStartTime;
    console.log("[UPLOAD] ========== Upload Complete ==========");
    console.log(
      `[UPLOAD] Total processing time: ${totalTime}ms (${(
        totalTime / 1000
      ).toFixed(2)}s)`
    );
    console.log(
      `[UPLOAD] Average speed: ${(file.size / totalTime / 1024).toFixed(
        2
      )} KB/ms`
    );
    console.log(`[UPLOAD] File saved: ${fileName}`);
    console.log("[UPLOAD] ==========================================");

    return NextResponse.json({
      success: true,
      fileId,
      fileName,
      filePath: `/uploads/${fileName}`,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      processingTime: totalTime,
    });
  } catch (error) {
    const totalTime = Date.now() - uploadStartTime;
    console.error("[UPLOAD ERROR] ========== Upload Failed ==========");
    console.error("[UPLOAD ERROR] Error occurred after:", totalTime, "ms");
    console.error("[UPLOAD ERROR] Details:", error);
    console.error("[UPLOAD ERROR] ===========================================");

    return NextResponse.json(
      { error: "Failed to upload file", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log("[DELETE] ========== File Deletion Request ==========");
    const body = await request.json();
    const { fileName } = body;

    if (!fileName) {
      console.error("[DELETE ERROR] Missing fileName parameter");
      return NextResponse.json(
        { error: "Missing fileName parameter" },
        { status: 400 }
      );
    }

    console.log(`[DELETE] Attempting to delete file: ${fileName}`);

    // Delete file from uploads directory
    const filePath = join(process.cwd(), "public", "uploads", fileName);
    console.log(`[DELETE] File path: ${filePath}`);

    if (existsSync(filePath)) {
      const deleteStartTime = Date.now();
      await unlink(filePath);
      const deleteTime = Date.now() - deleteStartTime;
      console.log(
        `[DELETE] File deleted successfully in ${deleteTime}ms: ${fileName}`
      );
      console.log("[DELETE] ==========================================");
      return NextResponse.json({ success: true });
    } else {
      console.log(`[DELETE] File not found (already deleted): ${fileName}`);
      console.log("[DELETE] ==========================================");
      return NextResponse.json({ success: true }); // File doesn't exist, consider it deleted
    }
  } catch (error) {
    console.error("[DELETE ERROR] ========== Deletion Failed ==========");
    console.error("[DELETE ERROR] Details:", error);
    console.error("[DELETE ERROR] ===========================================");
    return NextResponse.json(
      { error: "Failed to delete file", details: String(error) },
      { status: 500 }
    );
  }
}
