"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppIcon from "./AppIcon";

export default function LoginForm() {
  const router = useRouter();
  const [captcha, setCaptcha] = useState<{ token: string; image: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    const r = await fetch("/api/captcha", { cache: "no-store" });
    setCaptcha(await r.json());
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setLoading(true);
    const fd = new FormData(e.currentTarget);
    const r = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: fd.get("username"), password: fd.get("password"), captcha: fd.get("captcha"), captchaToken: captcha?.token }) });
    const data = await r.json();
    if (!r.ok) { setError(data.message || "ورود انجام نشد."); setLoading(false); refresh(); return; }
    router.push(data.redirect); router.refresh();
  }

  return <form className="login-form" onSubmit={submit}>
    <div className="field-group"><label htmlFor="username">نام کاربری یا شماره همراه</label><input id="username" name="username" dir="ltr" autoComplete="username" placeholder="نام کاربری" required /></div>
    <div className="field-group"><label htmlFor="password">کلمه عبور</label><div className="input-with-action"><input id="password" name="password" dir="ltr" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" required /><button type="button" className="input-icon-btn" onClick={() => setShowPassword((v) => !v)} aria-label="نمایش کلمه عبور"><AppIcon name="eye" size={19}/></button></div></div>
    <div className="field-group"><label htmlFor="captcha">کد امنیتی</label><div className="captcha-row"><input id="captcha" name="captcha" dir="ltr" autoComplete="off" placeholder="کد تصویر" required maxLength={5}/><div className="captcha-image">{captcha ? <img src={captcha.image} alt="کد امنیتی" /> : <span>...</span>}</div><button type="button" className="captcha-refresh" onClick={refresh} aria-label="تازه‌سازی کد"><AppIcon name="refresh" size={20}/></button></div></div>
    {error && <div className="form-error">{error}</div>}
    <div className="login-options"><label className="check-label"><input type="checkbox" name="remember"/> <span>مرا به خاطر بسپار</span></label><span className="muted-link">بازیابی کلمه عبور</span></div>
    <button className="primary-button login-button" disabled={loading}>{loading ? "در حال ورود..." : "ورود به سامانه"}</button>
    <div className="demo-note"><b>حساب‌های نمایشی:</b> admin / marketer / customer &nbsp; — &nbsp; رمز: 123456</div>
  </form>;
}
