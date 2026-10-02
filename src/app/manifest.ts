import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "سامانه بازاریابی و سفارش‌گیری",
    short_name: "بازاریابی",
    description: "PWA بازاریابی، سفارش‌گیری و فروش",
    start_url: "/login",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#dfeaf5",
    theme_color: "#173f68",
    lang: "fa",
    dir: "rtl",
    categories: ["business", "shopping", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
    ],
  };
}
