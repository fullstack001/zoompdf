import { NextRequest, NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { join } from "path";

// This is a monitoring endpoint to detect unauthorized file creation
// It should be called periodically to check for suspicious files

// SECURITY: Only allow from localhost or with secret (for monitoring scripts)
function isAllowedRequest(request: NextRequest): boolean {
  const secret = process.env.FILE_MONITOR_SECRET;
  if (secret && request.headers.get("x-file-monitor-secret") === secret) return true;
  const forwarded = request.headers.get("x-forwarded-for");
  const host = request.headers.get("host") ?? "";
  const ip = forwarded ? forwarded.split(",")[0]?.trim() : "";
  if (ip && ip !== "127.0.0.1" && ip !== "::1") return false;
  return host.startsWith("localhost") || host.startsWith("127.0.0.1") || !forwarded;
}

const SUSPICIOUS_PATTERNS = [
  /^[a-zA-Z0-9]{10,}$/, // Random alphanumeric names
  /^[a-f0-9]{32,}$/i, // Hex strings
];

const ALLOWED_DIRECTORIES = [
  "public/uploads",
  ".next",
  "node_modules",
  "messages",
];

export async function GET(request: NextRequest) {
  if (!isAllowedRequest(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const projectRoot = process.cwd();
    const suspiciousFiles: string[] = [];

    // Check root directory
    const rootFiles = await readdir(projectRoot, { withFileTypes: true });

    for (const file of rootFiles) {
      if (file.isFile()) {
        const fileName = file.name;

        // Skip known files
        if (
          fileName.startsWith(".") ||
          fileName === "package.json" ||
          fileName === "package-lock.json" ||
          fileName === "README.md" ||
          fileName === "tsconfig.json" ||
          fileName === "next.config.js" ||
          fileName === "tailwind.config.ts" ||
          fileName === "postcss.config.mjs" ||
          fileName === "eslint.config.mjs" ||
          fileName.endsWith(".md")
        ) {
          continue;
        }

        // Check for suspicious patterns
        const isSuspicious = SUSPICIOUS_PATTERNS.some((pattern) =>
          pattern.test(fileName)
        );

        if (isSuspicious) {
          suspiciousFiles.push(join(projectRoot, fileName));
        }
      }
    }

    return NextResponse.json({
      suspiciousFiles,
      count: suspiciousFiles.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to scan files", details: String(error) },
      { status: 500 }
    );
  }
}
