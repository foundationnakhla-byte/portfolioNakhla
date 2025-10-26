// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { defaultLocale, getDirection, type Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Nakhla Foundation | مؤسسة نخلة",
  description: "Towards a safe and bright future for our children | نحو مستقبل آمن ومشرق لأطفالنا",
};

// ✅ اجعل الكومبوننت async وافك params بالـ await
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;                  // ← هنا التعديل
  const direction = getDirection(locale || defaultLocale);
  const translations = getTranslations(locale || defaultLocale);

  return (
    // ملاحظة: لا تضع <html> هنا — يجب أن تكون فقط في app/layout.tsx
    <body className="min-h-screen flex flex-col" data-dir={direction}>
      {/* مرّر locale والترجمات للهيدر/الفوتر لو لزم */}
      {children}
    </body>
  );
}
