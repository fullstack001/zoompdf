import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink, chmod } from "fs/promises";
import { join, resolve } from "path";
import { existsSync, mkdirSync } from "fs";
import { isAllowedPath, isSuspiciousFilename } from "@/middleware/file-protection";

// SECURITY: Allowed file types (PDF and document types only)
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".jpg",
  ".jpeg",
  ".png",
];

// SECURITY: Maximum file size: 100MB
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes

// SECURITY: Rate limiting (in-memory, resets on server restart)
const uploadAttempts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_UPLOADS_PER_WINDOW = 5; // Max 5 uploads per minute per IP

// SECURITY: Helper function to validate authentication token
async function validateAuthToken(token: string | null): Promise<boolean> {
  if (!token) return false;

  try {
    const response = await fetch("https://api.pdfezy.com/api/auth/validate-token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error("[UPLOAD ERROR] Token validation failed:", error);
    return false;
  }
}

// SECURITY: Helper function to check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempts = uploadAttempts.get(ip);

  if (!attempts || attempts.resetTime < now) {
    uploadAttempts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (attempts.count >= MAX_UPLOADS_PER_WINDOW) {
    return false;
  }

  attempts.count++;
  return true;
}

// SECURITY: Helper function to sanitize filename (prevent path traversal)
function sanitizeFileName(fileName: string): string {
  let sanitized = fileName.replace(/\.\./g, "");
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, "");
  sanitized = sanitized.replace(/^\.+/, "");
  if (sanitized.length > 255) {
    sanitized = sanitized.substring(0, 255);
  }
  return sanitized;
}

// SECURITY: Helper function to validate file extension
function isValidExtension(fileName: string): boolean {
  const ext = fileName.toLowerCase().substring(fileName.lastIndexOf("."));
  return ALLOWED_EXTENSIONS.includes(ext);
}

// SECURITY: Helper function to validate UUID format
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export async function POST(request: NextRequest) {
  const uploadStartTime = Date.now();

  try {
    console.log("[UPLOAD] ========== New Upload Request ==========");
    console.log("[UPLOAD] Request received at:", new Date().toISOString());

    // SECURITY: Get client IP for rate limiting
    const clientIP = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     request.headers.get("x-real-ip") ||
                     "unknown";

    console.log("[UPLOAD] Client IP:", clientIP);

    // SECURITY: Check rate limit
    if (!checkRateLimit(clientIP)) {
      console.error("[UPLOAD ERROR] Rate limit exceeded for IP:", clientIP);
      return NextResponse.json(
        { error: "Too many upload requests. Please try again later." },
        { status: 429 }
      );
    }

    // SECURITY: Check authentication
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || null;

    if (!token || !(await validateAuthToken(token))) {
      console.error("[UPLOAD ERROR] Unauthorized upload attempt from IP:", clientIP);
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

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

    // SECURITY: Validate file size
    if (file.size > MAX_FILE_SIZE) {
      console.error("[UPLOAD ERROR] File too large:", file.size, "bytes");
      return NextResponse.json(
        { error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // SECURITY: Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      console.error("[UPLOAD ERROR] Invalid file type:", file.type);
      return NextResponse.json(
        { error: "File type not allowed. Only PDF and document files are accepted." },
        { status: 400 }
      );
    }

    // SECURITY: Validate and sanitize filename
    const sanitizedFileName = sanitizeFileName(fileName);
    if (!isValidExtension(sanitizedFileName)) {
      console.error("[UPLOAD ERROR] Invalid file extension:", sanitizedFileName);
      return NextResponse.json(
        { error: "File extension not allowed" },
        { status: 400 }
      );
    }

    // SECURITY: Validate fileId format (should be UUID)
    if (!isValidUUID(fileId)) {
      console.error("[UPLOAD ERROR] Invalid fileId format:", fileId);
      return NextResponse.json(
        { error: "Invalid file ID format" },
        { status: 400 }
      );
    }

    // SECURITY: Ensure filename matches fileId pattern
    if (!sanitizedFileName.startsWith(fileId)) {
      console.error("[UPLOAD ERROR] Filename doesn't match fileId:", sanitizedFileName, fileId);
      return NextResponse.json(
        { error: "Invalid filename format" },
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

    // SECURITY: Save file to uploads directory (use sanitized filename)
    const filePath = join(uploadsDir, sanitizedFileName);
    const resolvedFilePath = resolve(filePath);

    // SECURITY: Ensure filePath is within uploads directory (prevent path traversal)
    const resolvedPath = resolve(process.cwd(), "public", "uploads");
    if (!resolvedFilePath.startsWith(resolvedPath)) {
      console.error("[UPLOAD ERROR] Path traversal attempt detected:", resolvedFilePath);
      return NextResponse.json(
        { error: "Invalid file path" },
        { status: 400 }
      );
    }

    // SECURITY: Check if path is allowed using file protection middleware
    if (!isAllowedPath(resolvedFilePath)) {
      console.error("[UPLOAD ERROR] File path not in allowed directory:", resolvedFilePath);
      return NextResponse.json(
        { error: "File path not allowed" },
        { status: 403 }
      );
    }

    // SECURITY: Check if filename is suspicious
    if (isSuspiciousFilename(sanitizedFileName)) {
      console.error("[UPLOAD ERROR] Suspicious filename detected:", sanitizedFileName);
      return NextResponse.json(
        { error: "Suspicious filename pattern detected" },
        { status: 400 }
      );
    }
    console.log(`[UPLOAD] Writing file to disk: ${filePath}`);

    try {
      const writeStartTime = Date.now();
      await writeFile(filePath, buffer);
      // SECURITY: Remove execute bits on Linux so uploaded files can never be executed
      await chmod(filePath, 0o644).catch(() => { /* ignore on Windows */ });
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
    console.log(`[UPLOAD] File saved: ${sanitizedFileName}`);
    console.log("[UPLOAD] ==========================================");

    return NextResponse.json({
      success: true,
      fileId,
      fileName: sanitizedFileName,
      filePath: `/uploads/${sanitizedFileName}`,
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

    // SECURITY: Check authentication
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || null;

    if (!token || !(await validateAuthToken(token))) {
      console.error("[DELETE ERROR] Unauthorized deletion attempt");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { fileName } = body;

    if (!fileName) {
      console.error("[DELETE ERROR] Missing fileName parameter");
      return NextResponse.json(
        { error: "Missing fileName parameter" },
        { status: 400 }
      );
    }

    // SECURITY: Sanitize filename to prevent path traversal
    const sanitizedFileName = sanitizeFileName(fileName);

    console.log(`[DELETE] Attempting to delete file: ${sanitizedFileName}`);

    // SECURITY: Delete file from uploads directory (use sanitized filename)
    const filePath = join(process.cwd(), "public", "uploads", sanitizedFileName);

    // SECURITY: Ensure filePath is within uploads directory
    const resolvedPath = join(process.cwd(), "public", "uploads");
    if (!resolve(filePath).startsWith(resolve(resolvedPath))) {
      console.error("[DELETE ERROR] Path traversal attempt detected:", filePath);
      return NextResponse.json(
        { error: "Invalid file path" },
        { status: 400 }
      );
    }
    console.log(`[DELETE] File path: ${filePath}`);

    if (existsSync(filePath)) {
      const deleteStartTime = Date.now();
      await unlink(filePath);
      const deleteTime = Date.now() - deleteStartTime;
      console.log(
        `[DELETE] File deleted successfully in ${deleteTime}ms: ${sanitizedFileName}`
      );
      console.log("[DELETE] ==========================================");
      return NextResponse.json({ success: true });
    } else {
      console.log(`[DELETE] File not found (already deleted): ${sanitizedFileName}`);
      console.log("[DELETE] ==========================================");
      return NextResponse.json({ success: true });
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
