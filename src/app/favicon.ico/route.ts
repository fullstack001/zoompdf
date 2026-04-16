import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    // Read the logo-based favicon directly from the public folder
    const filePath = join(process.cwd(), "public", "favicon.svg");
    const svg = await readFile(filePath, "utf8");

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    // If anything goes wrong, fail gracefully without breaking the app
    return new Response(null, { status: 204 });
  }
}

