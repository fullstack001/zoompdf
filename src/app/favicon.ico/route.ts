export async function GET() {
  // Avoid build-time failures by providing an explicit handler for /favicon.ico.
  // If you want a real icon, place it in `public/favicon.ico` instead.
  return new Response(null, { status: 204 });
}

