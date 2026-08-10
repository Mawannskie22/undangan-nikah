import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  let action = "";
  try {
    const form = await req.formData();
    action = String(form.get("action") ?? "");
  } catch {
    action = "";
  }

  if (action === "get_comments" || action === "insert_comment") {
    return new Response("<p></p>", {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (
    action === "edit_comment_cui" ||
    action === "delete_comment_cui" ||
    action === "comment_rating" ||
    action === "get_comment_text_cui"
  ) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
