// app/[locale]/news/[id]/page.tsx

import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { supabaseServer } from "@/lib/supabase/supabaseServer"
import { pickI18n } from "@/lib/i18nJson"
import Image from "next/image"
import Link from "next/link"

type MediaKind = "none" | "image" | "youtube" | "facebook"

type NewsItem = {
  id: number
  status: string | null
  published_at: string | null
  geo_name: string | null
  cover_url: string | null
  title_i18n: any
  excerpt_i18n: any | null
  content_i18n: any | null
  body_i18n: any | null
  media_kind: MediaKind | string | null
  media_url: string | null
  youtube_url: string | null
  facebook_url: string | null
}

function extractYouTubeId(url: string) {
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "") || null
    const v = u.searchParams.get("v")
    if (v) return v
    const parts = u.pathname.split("/")
    const embedIndex = parts.findIndex((p) => p === "embed")
    if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1]
    return null
  } catch {
    return null
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: { locale: Locale; id: string } | Promise<{ locale: Locale; id: string }>
}) {
  // ✅ بدون React.use — حلّ آمن لكلا الحالتين
  const resolved =
    typeof (params as any)?.then === "function"
      ? await (params as Promise<{ locale: Locale; id: string }>)
      : (params as { locale: Locale; id: string })

  const { locale, id } = resolved

  const translations = getTranslations(locale)

  const newsId = Number(id)
  if (!Number.isFinite(newsId)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{translations.common?.error || "Not found"}</p>
      </div>
    )
  }

  const sb = await supabaseServer()
  const { data, error } = await sb
    .from("news")
    .select(
      [
        "id",
        "status",
        "published_at",
        "geo_name",
        "cover_url",
        "title_i18n",
        "excerpt_i18n",
        "content_i18n",
        "body_i18n",
        "media_kind",
        "media_url",
        "youtube_url",
        "facebook_url",
      ].join(",")
    )
    .eq("id", newsId)
    .single()

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{translations.common?.error || "Not found"}</p>
      </div>
    )
  }

  const item = data as unknown as NewsItem

  const title = pickI18n(item.title_i18n, locale) || ""
  const excerpt = item.excerpt_i18n ? pickI18n(item.excerpt_i18n, locale) : ""
  const body = pickI18n(item.content_i18n || item.body_i18n, locale) || ""

  const date = item.published_at
    ? new Date(item.published_at).toLocaleDateString(
        locale === "ar" ? "ar-EG" : locale === "fr" ? "fr-FR" : "en-GB"
      )
    : ""

  const mediaKind = (item.media_kind || "none") as MediaKind
  const mediaUrl = item.media_url || item.youtube_url || item.facebook_url || ""

  const renderMedia = () => {
    if (!mediaUrl) return null

    if (mediaKind === "image") {
      return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border mb-6">
          <Image src={mediaUrl} alt={title} fill className="object-cover" />
        </div>
      )
    }

    if (mediaKind === "youtube") {
      const vid = extractYouTubeId(mediaUrl)
      if (!vid) {
        return (
          <div className="rounded-2xl border p-4 bg-gray-50 mb-6">
            <p className="text-sm text-gray-700">رابط يوتيوب غير صالح للمعاينة.</p>
            <a className="text-blue-600 underline break-all" href={mediaUrl} target="_blank" rel="noreferrer">
              {mediaUrl}
            </a>
          </div>
        )
      }
      return (
        <div className="aspect-video w-full overflow-hidden rounded-2xl border mb-6">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${vid}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }

    if (mediaKind === "facebook") {
      // (بدون SDK) منعرض الرابط كبداية
      return (
        <div className="rounded-2xl border p-4 bg-gray-50 mb-6">
          <p className="text-sm text-gray-700 mb-2">رابط فيسبوك:</p>
          <a className="text-blue-600 underline break-all" href={mediaUrl} target="_blank" rel="noreferrer">
            {mediaUrl}
          </a>
        </div>
      )
    }

    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Link href={`/${locale}/news`} className="underline text-sm text-gray-600">
          {translations.newsPage?.back || "← Back"}
        </Link>

        <h1 className="text-4xl font-bold mt-4 mb-3">{title}</h1>

        <div className="text-sm text-gray-500 mb-6 flex justify-between">
          <span>{date}</span>
          <span>{item.geo_name || ""}</span>
        </div>

        {/* Cover */}
        {item.cover_url ? (
          <div className="relative h-72 mb-6 rounded-2xl overflow-hidden">
            <Image src={item.cover_url} alt={title} fill className="object-cover" />
          </div>
        ) : null}

        {/* Media */}
        {renderMedia()}

        {/* Excerpt */}
        {excerpt ? <p className="text-gray-600 text-lg leading-relaxed mb-6">{excerpt}</p> : null}

        {/* Body */}
        <article className="whitespace-pre-line leading-relaxed text-gray-800">{body}</article>
      </div>
    </div>
  )
}