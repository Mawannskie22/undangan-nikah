import { NextRequest } from "next/server";

const SVG_AVATAR_COLORS = [
  "#3D7DBC",
  "#bc6f3d",
  "#3dbc8f",
  "#b03dbc",
  "#3d9dbc",
  "#bc3d5f",
  "#7d3dbc",
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function initialsAvatar(nama: string): string {
  const letter = (nama.trim().charAt(0) || "?").toUpperCase();
  let hash = 0;
  for (let i = 0; i < nama.length; i++) hash = (hash * 31 + nama.charCodeAt(i)) >>> 0;
  const color = SVG_AVATAR_COLORS[hash % SVG_AVATAR_COLORS.length];
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'>` +
    `<rect width='56' height='56' fill='${color}'/>` +
    `<text x='50%' y='50%' dy='0.35em' font-size='24' fill='white' text-anchor='middle' font-family='Arial,sans-serif' font-weight='bold'>${letter}</text>` +
    `</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function renderComment(data: {
  nama: string;
  ucapan: string;
  created_at?: string;
}): string {
  const time = data.created_at
    ? new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(data.created_at))
    : "";
  return (
    `<li class="saic-item-comment animated fadeIn">` +
    `<div class="saic-comment-avatar"><img src="${initialsAvatar(data.nama)}" alt="" /></div>` +
    `<div class="saic-comment-content">` +
    `<div class="saic-comment-info"><span class="saic-commenter-name">${escapeHtml(data.nama)}</span></div>` +
    `<div class="saic-comment-text"><p>${escapeHtml(data.ucapan)}</p></div>` +
    `<span class="saic-comment-time">${escapeHtml(time)}</span>` +
    `</div>` +
    `</li>`
  );
}

function attendanceToLabel(value: string): string {
  switch (value) {
    case "present":
      return "hadir";
    case "notpresent":
      return "tidak";
    case "notsure":
      return "ragu";
    default:
      return value;
  }
}

async function scriptRequest(
  method: "GET" | "POST",
  body?: Record<string, unknown>
): Promise<{ ok: boolean; data: Record<string, unknown>; error?: string }> {
  const scriptUrl = process.env.APPS_SCRIPT_URL;
  if (!scriptUrl) {
    return { ok: false, data: {}, error: "APPS_SCRIPT_URL belum diisi" };
  }

  try {
    const res = await fetch(scriptUrl, {
      method,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: !!data.success, data, error: String(data.error || "") };
  } catch (err) {
    return {
      ok: false,
      data: {},
      error: err instanceof Error ? err.message : "Gagal memanggil Apps Script",
    };
  }
}

export async function POST(req: NextRequest) {
  let action = "";
  const form = new Map<string, string>();
  try {
    const data = await req.formData();
    for (const [key, value] of data.entries()) {
      form.set(key, typeof value === "string" ? value : "");
      if (key === "action") action = String(value);
    }
  } catch {
    action = "";
  }

  // Apps Script belum dikonfigurasi -> kembali ke mock lama biar situs
  // tetap jalan sampai .env.local diisi.
  if (!process.env.APPS_SCRIPT_URL) {
    if (action === "get_comments" || action === "insert_comment") {
      return new Response("<p></p>", {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  if (action === "get_comments") {
    const order = form.get("order") === "ASC" ? true : false;
    const rawGet = parseInt(form.get("get") || "50", 10);
    const limit = Math.min(Number.isFinite(rawGet) ? rawGet : 50, 200);

    const result = await scriptRequest("GET");
    if (result.error) {
      return new Response(`error-Gagal memuat ucapan: ${escapeHtml(result.error)}`, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const messages = Array.isArray(result.data.messages)
      ? (result.data.messages as { nama: string; ucapan: string; created_at?: string }[])
      : [];
    let list = order ? messages.slice().reverse() : messages.slice();
    list = list.slice(0, limit);

    const html = list.map((m) =>
      renderComment({ nama: m.nama, ucapan: m.ucapan, created_at: m.created_at })
    );
    return new Response(html.length ? html.join("") : "<p></p>", {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (action === "insert_comment") {
    const nama = (form.get("author") || "").trim();
    const ucapan = (form.get("comment") || "").trim();
    const attendanceRaw = form.get("attendance") || "";
    const guestRaw = form.get("guest") || "";

    if (!nama || nama.length > 50 || /[<>]/.test(nama)) {
      return new Response("error-Nama harus diisi (maks. 50 karakter).", {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
    if (ucapan.length < 2) {
      return new Response("error-Ucapan minimal 2 karakter.", {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const jumlahTamu =
      attendanceRaw === "present" && guestRaw ? parseInt(guestRaw, 10) || null : null;

    const result = await scriptRequest("POST", {
      nama,
      ucapan,
      kehadiran: attendanceToLabel(attendanceRaw),
      jumlah_tamu: jumlahTamu,
      domain: process.env.INVITE_DOMAIN || "",
    });

    if (result.error) {
      return new Response(`error-${escapeHtml(result.error)}`, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return new Response(
      renderComment({
        nama: String(result.data.nama || nama),
        ucapan: String(result.data.ucapan || ucapan),
        created_at: String(result.data.created_at || ""),
      }),
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Modulasi/edit/rating belum dibangun — tetap balasan sukses palsu.
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}