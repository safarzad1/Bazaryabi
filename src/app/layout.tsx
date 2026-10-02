import type { Metadata, Viewport } from "next";
import "../Styles/globals.css";
import PWARegister from "@/components/PWARegister";
import OnlineStatus from "@/components/pwa/OnlineStatus";
import { ToastProvider } from "@/components/ui";

export const metadata: Metadata = {
  title: { default: "سامانه بازاریابی و سفارش‌گیری", template: "%s | سامانه بازاریابی" },
  description: "PWA بازاریابی، سفارش‌گیری و فروش",
  applicationName: "سامانه بازاریابی",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "بازاریابی" },
};

export const viewport: Viewport = {
  themeColor: "#173f68",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ToastProvider>
          <PWARegister />
          <OnlineStatus />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
