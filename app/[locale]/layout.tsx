// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { defaultLocale, getDirection, type Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Nakhla Foundation | مؤسسة نخلة",
  description:
    "Towards a safe and bright future for our children | نحو مستقبل آمن ومشرق لأطفالنا",
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = params?.locale || defaultLocale;
  const direction = getDirection(locale);
  const translations = getTranslations(locale);

  return (
    <div className="flex min-h-screen flex-col" dir={direction}>
      <SiteHeader locale={locale} translations={translations} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} translations={translations} />
    </div>
  );
}
