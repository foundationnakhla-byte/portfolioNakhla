// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { defaultLocale, getDirection, type Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import CookieBanner from "@/components/CookieBanner"; 

export const metadata: Metadata = {
  title: "Nakhla Foundation | مؤسسة نخلة",
  description:
    "Towards a safe and bright future for our children | نحو مستقبل آمن ومشرق لأطفالنا",
      icons: {
    icon: "/faviconico.png",
  },
};

// ملاحظة: لا تضع <html> هون — بتضل في app/layout.tsx
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
    <body className="min-h-screen flex flex-col" data-dir={direction}>
      {/* شريط موافقة الكوكيز */}
      <CookieBanner />

      {/* مرّر locale/الترجمات للـ children إذا لزمك عبر Providers/Context */}
      {children}
    </body>
  );
}
