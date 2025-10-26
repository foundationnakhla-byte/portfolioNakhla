import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { type Locale, locales, defaultLocale, getDirection } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

// ... تعريفات الخطوط وما إلى ذلك ...

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Nakhla Foundation | مؤسسة نخلة",
  description: "Towards a safe and bright future for our children | نحو مستقبل آمن ومشرف لأطفالنا",
};

// ✅ لاحظ: params أصبح Promise ونقوم بعمل await
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;           // <-- هذا هو التعديل المهم
  const direction = getDirection(locale);
  const translations = getTranslations(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      className="antialiased"
    >
      <body className="min-h-screen flex flex-col">
        <SiteHeader locale={locale} translations={translations} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale} translations={translations} />
      </body>
    </html>
  );
}
