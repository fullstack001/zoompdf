/**
 * File Protection Middleware
 * This module monitors and prevents unauthorized file creation
 */

import { writeFile, unlink } from "fs/promises";
import { join, resolve } from "path";
import { existsSync } from "fs";

// Whitelist of allowed directories for file creation
const ALLOWED_DIRECTORIES = [
  resolve(process.cwd(), "public", "uploads"),
  resolve(process.cwd(), ".next"),
  resolve(process.cwd(), "node_modules"),
];

// Suspicious filename patterns
const SUSPICIOUS_PATTERNS = [
  /^[a-zA-Z0-9]{10,}$/, // Random alphanumeric (10+ chars, no extension)
  /^[a-f0-9]{32,}$/i, // Hex strings
];

/**
 * Check if a file path is in an allowed directory
 */
export function isAllowedPath(filePath: string): boolean {
  const resolvedPath = resolve(filePath);
  return ALLOWED_DIRECTORIES.some((allowed) =>
    resolvedPath.startsWith(allowed)
  );
}

/**
 * Check if a filename looks suspicious
 */
export function isSuspiciousFilename(fileName: string): boolean {
  // Skip if it has a known extension
  const hasExtension = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|jpg|jpeg|png|json|js|ts|tsx|css|html|svg|md|yml|yaml|lock|config|mjs|d\.ts)$/i.test(fileName);

  if (hasExtension) {
    return false;
  }

  // Check against suspicious patterns
  return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(fileName));
}

/**
 * Protected writeFile wrapper
 */
export async function protectedWriteFile(
  filePath: string,
  data: Buffer | string
): Promise<void> {
  const fileName = filePath.split(/[/\\]/).pop() || "";
  const resolvedPath = resolve(filePath);

  // Check if path is allowed
  if (!isAllowedPath(resolvedPath)) {
    throw new Error(
      `File creation blocked: Path "${resolvedPath}" is not in an allowed directory`
    );
  }

  // Check if filename is suspicious
  if (isSuspiciousFilename(fileName)) {
    throw new Error(
      `File creation blocked: Filename "${fileName}" matches suspicious pattern`
    );
  }

  // Proceed with write
  await writeFile(filePath, data);
}
