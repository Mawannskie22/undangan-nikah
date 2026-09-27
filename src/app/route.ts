import { readFileSync } from "node:fs";
import { join } from "node:path";

const htmlPath = join(process.cwd(), "public", "clone", "full.html");

export const dynamic = "force-static";

export async function GET() {
  const html = readFileSync(htmlPath, "utf8");
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
