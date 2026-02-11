/**
 * Next.js instrumentation – runs once when the Node server starts.
 * Used to install FS security patch so no code (including dependencies)
 * can write files outside allowed directories or with suspicious names.
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { installFsSecurityPatch } = await import("@/lib/fs-security-patch");
    installFsSecurityPatch();
  }
}
