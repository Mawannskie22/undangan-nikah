import { readFileSync } from "node:fs";
import { join } from "node:path";

const html = readFileSync(
  join(process.cwd(), "public", "clone", "full.html"),
  "utf8",
);

export async function GET() {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
