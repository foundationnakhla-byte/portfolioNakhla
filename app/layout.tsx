// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { changa } from "./fonts"; // 👈 استدعاء الخط

import { defaultLocale, getDirection, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Nakhla Foundation | مؤسسة نخلة",
  description:
    "Towards a safe and bright future for our children | نحو مستقبل آمن ومشرق لأطفالنا",
  icons: {
    icon: "/faviconico.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // اللغة الافتراضية فقط، لأن هذا الجذر
  const locale: Locale = defaultLocale;
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction}>
      <body className={`${changa.className} flex flex-col min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
