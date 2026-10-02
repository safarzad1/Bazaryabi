"use client";

import { useEffect, useState } from "react";

export default function OnlineStatus() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (online) return null;
  return <div className="offline-banner">اتصال اینترنت قطع است؛ برخی اطلاعات از حافظه آفلاین نمایش داده می‌شود.</div>;
}
