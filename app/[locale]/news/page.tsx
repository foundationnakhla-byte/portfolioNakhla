// app/[locale]/news/page.tsx
import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import Link from "next/link"
import Image from "next/image"
import { pickI18n } from "@/lib/i18nJson"
import { supabaseBrowser } from "@/lib/supabase/supabaseBrowser" // ❌ لا تستخدمها هنا
import { supabaseServer } from "@/lib/supabase/supabaseServer"

export default async function NewsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params
  const translations = getTranslations(locale)

  const sb = await supabaseServer()
  const { data: items } = await sb
    .from("news")
    .select("id, cover_url, published_at, geo_name, title_i18n, excerpt_i18n")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-3">{translations.newsPage.title}</h1>
        <p className="text-center text-gray-600 mb-10">{translations.newsPage.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(items || []).map((n: any) => {
            const title = pickI18n(n.title_i18n, locale)
            const excerpt = pickI18n(n.excerpt_i18n, locale)
            const date = n.published_at
              ? new Date(n.published_at).toLocaleDateString(
                  locale === "ar" ? "ar-EG" : locale === "fr" ? "fr-FR" : "en-GB"
                )
              : ""

            return (
              <Link
                key={n.id}
                href={`/${locale}/news/${n.id}`}
                className="border rounded-2xl overflow-hidden shadow hover:shadow-md transition"
              >
                <div className="relative h-48">
                  <Image src={n.cover_url || "/default-cover.png"} alt={title} fill className="object-cover" />
                </div>
                <div className="p-4 space-y-2">
                  <h2 className="font-bold text-xl line-clamp-2">{title}</h2>
                  {excerpt && <p className="text-gray-600 text-sm line-clamp-3">{excerpt}</p>}
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>{date}</span>
                    <span>{n.geo_name || ""}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
