import { NextResponse } from "next/server";
import { createCipheriv, createHash, randomBytes } from "node:crypto";

export const runtime = "nodejs";

function key() {
  return createHash("sha256").update(process.env.CAPTCHA_SECRET || process.env.JWT_SECRET || "bazaryabi-local-captcha-secret-change-me").digest();
}
function esc(v: string) { return v.replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&apos;"}[c] || c)); }

export async function GET() {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 5; i++) code += alphabet[randomBytes(1)[0] % alphabet.length];
  const expires = Date.now() + 2 * 60 * 1000;
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify({ code, expires }), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  const token = Buffer.concat([iv, tag, encrypted]).toString("base64url");

  const chars = code.split("").map((c, i) => `<text x="${25 + i * 28}" y="42" transform="rotate(${[-7,5,-4,7,-2][i]} ${25 + i * 28} 42)" font-size="27" font-family="Arial" font-weight="700" fill="#183f69">${esc(c)}</text>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="178" height="58" viewBox="0 0 178 58"><rect width="178" height="58" rx="12" fill="#eef5fb"/><path d="M10 44L168 15M7 20L170 39M30 5L145 53" stroke="#9cb8d4" stroke-width="1" opacity=".55"/>${chars}<circle cx="22" cy="18" r="2" fill="#8ca9c6"/><circle cx="155" cy="42" r="2" fill="#8ca9c6"/></svg>`;
  return NextResponse.json({ token, image: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}` }, { headers: { "Cache-Control": "no-store" } });
}
