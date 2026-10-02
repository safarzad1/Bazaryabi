import { NextRequest, NextResponse } from "next/server";
import { createDecipheriv, createHash, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

function key() { return createHash("sha256").update(process.env.CAPTCHA_SECRET || process.env.JWT_SECRET || "bazaryabi-local-captcha-secret-change-me").digest(); }
function safeEq(a: string, b: string) { const aa=Buffer.from(a.toUpperCase()); const bb=Buffer.from(b.toUpperCase()); return aa.length===bb.length && timingSafeEqual(aa,bb); }
function decodeCaptcha(token: string) {
  const raw = Buffer.from(token, "base64url");
  if (raw.length < 29) throw new Error("bad token");
  const iv = raw.subarray(0, 12), tag = raw.subarray(12, 28), encrypted = raw.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", key(), iv); decipher.setAuthTag(tag);
  return JSON.parse(Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8")) as { code: string; expires: number };
}

const demoUsers = [
  { username: "admin", password: "123456", role: "admin", name: "مدیر سامانه" },
  { username: "marketer", password: "123456", role: "marketer", name: "بازاریاب نمونه" },
  { username: "customer", password: "123456", role: "customer", name: "مشتری نمونه" },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.captchaToken || !body?.captcha) return NextResponse.json({ message: "کد امنیتی را وارد کنید." }, { status: 400 });
    const cap = decodeCaptcha(String(body.captchaToken));
    if (Date.now() > cap.expires || !safeEq(String(body.captcha).trim(), cap.code)) return NextResponse.json({ message: "کد امنیتی صحیح نیست یا منقضی شده است." }, { status: 400 });
    const user = demoUsers.find((u) => u.username === String(body.username).trim() && u.password === String(body.password));
    if (!user) return NextResponse.json({ message: "نام کاربری یا کلمه عبور صحیح نیست." }, { status: 401 });
    const res = NextResponse.json({ role: user.role, name: user.name, redirect: user.role === "admin" ? "/admin/dashboard" : user.role === "marketer" ? "/marketer/dashboard" : "/customer/home" });
    res.cookies.set("bazaryabi_role", user.role, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 8 * 60 * 60, path: "/" });
    return res;
  } catch {
    return NextResponse.json({ message: "در پردازش ورود خطایی رخ داد. کد امنیتی را تازه‌سازی کنید." }, { status: 400 });
  }
}
