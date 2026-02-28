"use client"

import { use } from "react"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { supabaseBrowser } from "@/lib/supabase/supabaseBrowser"
import { pickI18n } from "@/lib/i18nJson"

type NewsStatus = "draft" | "published"
type MediaKind = "none" | "image" | "youtube" | "facebook"

type NewsRow = {
  id: number
  status: NewsStatus | string | null
  title_i18n: any
  content_i18n: any

  // new fields in DB
  cover_url?: string | null
  media_kind?: string | null
  media_url?: string | null
  facebook_url?: string | null
  youtube_url?: string | null
  excerpt_i18n?: any
  body_i18n?: any
}

function isValidUrl(v: string) {
  try {
    const u = new URL(v)
    return !!u.protocol && !!u.host
  } catch {
    return false
  }
}

function extractYouTubeId(url: string) {
  try {
    const u = new URL(url)
    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "") || null
    // youtube.com/watch?v=<id>
    const v = u.searchParams.get("v")
    if (v) return v
    // youtube.com/embed/<id>
    const parts = u.pathname.split("/")
    const embedIndex = parts.findIndex((p) => p === "embed")
    if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1]
    return null
  } catch {
    return null
  }
}

export default function AdminNewsIdPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>
}) {
  const { locale, id } = use(params)

  const translations = getTranslations(locale)
  const t = translations.admin
  const common = translations.common

  const router = useRouter()
  const newsId = useMemo(() => Number(id), [id])

  const [item, setItem] = useState<NewsRow | null>(null)
  const [loading, setLoading] = useState(true)

  const [status, setStatus] = useState<NewsStatus>("draft")
  const [titleAr, setTitleAr] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [titleTr, setTitleTr] = useState("")
  const [contentAr, setContentAr] = useState("")
  const [contentEn, setContentEn] = useState("")
  const [contentTr, setContentTr] = useState("")

  // new UI states
  const [coverUrl, setCoverUrl] = useState("")
  const [mediaKind, setMediaKind] = useState<MediaKind>("none")
  const [mediaUrl, setMediaUrl] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [facebookUrl, setFacebookUrl] = useState("")

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setError(null)
      setLoading(true)

      if (!Number.isFinite(newsId)) {
        setError("رقم خبر غير صالح.")
        setLoading(false)
        return
      }

      const { data, error } = await supabaseBrowser
        .from("news")
        .select(
          [
            "id",
            "status",
            "title_i18n",
            "content_i18n",
            "cover_url",
            "media_kind",
            "media_url",
            "youtube_url",
            "facebook_url",
          ].join(",")
        )
        .eq("id", newsId)
        .single()

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      const row = data as NewsRow
      setItem(row)
      setStatus((row.status as NewsStatus) || "draft")

      setTitleAr(pickI18n(row.title_i18n, "ar" as any) || "")
      setTitleEn(pickI18n(row.title_i18n, "en" as any) || "")
      setTitleTr(pickI18n(row.title_i18n, "tr" as any) || "")

      setContentAr(pickI18n(row.content_i18n, "ar" as any) || "")
      setContentEn(pickI18n(row.content_i18n, "en" as any) || "")
      setContentTr(pickI18n(row.content_i18n, "tr" as any) || "")

      setCoverUrl(row.cover_url || "")
      setMediaKind(((row.media_kind as MediaKind) || "none") as MediaKind)
      setMediaUrl(row.media_url || "")
      setYoutubeUrl(row.youtube_url || "")
      setFacebookUrl(row.facebook_url || "")

      setLoading(false)
    }

    load()
  }, [newsId])

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!item) return

    if (!titleAr.trim() && !titleEn.trim() && !titleTr.trim()) {
      setError("الرجاء إدخال عنوان واحد على الأقل.")
      return
    }

    // validate optional URLs if filled
    const urlsToCheck: Array<[string, string]> = [
      ["رابط الغلاف", coverUrl],
      ["رابط الميديا", mediaUrl],
      ["رابط يوتيوب", youtubeUrl],
      ["رابط فيسبوك", facebookUrl],
    ]
    for (const [label, val] of urlsToCheck) {
      if (val.trim() && !isValidUrl(val.trim())) {
        setError(`${label} غير صالح.`)
        return
      }
    }

    setSaving(true)

    const title_i18n = {
      ar: titleAr.trim() || null,
      en: titleEn.trim() || null,
      tr: titleTr.trim() || null,
    }

    const content_i18n = {
      ar: contentAr.trim() || null,
      en: contentEn.trim() || null,
      tr: contentTr.trim() || null,
    }

    const payload = {
      status,
      title_i18n,
      content_i18n,

      cover_url: coverUrl.trim() || null,
      media_kind: mediaKind === "none" ? null : mediaKind,
      media_url: mediaUrl.trim() || null,
      youtube_url: youtubeUrl.trim() || null,
      facebook_url: facebookUrl.trim() || null,
    }

    const { error } = await supabaseBrowser.from("news").update(payload).eq("id", item.id)

    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }

    router.refresh()
  }

  const onDelete = async () => {
    if (!item) return
    if (!confirm(t.confirmDelete || "هل أنت متأكد من الحذف؟")) return

    const { error } = await supabaseBrowser.from("news").delete().eq("id", item.id)
    if (error) {
      alert(t.deleteError || "تعذر الحذف")
      return
    }

    router.push(`/${locale}/admin/news`)
    router.refresh()
  }

  const titlePreview =
    (pickI18n(
      {
        ar: titleAr,
        en: titleEn,
        tr: titleTr,
      },
      locale as any
    ) as string) || ""

  const contentPreview =
    (pickI18n(
      {
        ar: contentAr,
        en: contentEn,
        tr: contentTr,
      },
      locale as any
    ) as string) || ""

  const renderMediaPreview = () => {
    // priority: media_kind + media_url
    if (mediaKind === "image" && mediaUrl) {
      return (
        <div className="rounded-2xl overflow-hidden border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mediaUrl} alt="media" className="w-full h-auto" />
        </div>
      )
    }

    if (mediaKind === "youtube" && (mediaUrl || youtubeUrl)) {
      const u = mediaUrl || youtubeUrl
      const vid = extractYouTubeId(u)
      if (!vid) return <p className="text-sm text-red-600">رابط يوتيوب غير صالح للمعاينة.</p>
      return (
        <div className="aspect-video w-full overflow-hidden rounded-2xl border">
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

    if (mediaKind === "facebook" && (mediaUrl || facebookUrl)) {
      // Facebook embed is more complex (SDK). For now: show link + hint.
      const u = mediaUrl || facebookUrl
      return (
        <div className="rounded-2xl border p-4 bg-gray-50">
          <p className="text-sm text-gray-700 mb-2">
            معاينة فيسبوك داخل الإدمن تحتاج Facebook Embed/SDK. حالياً رح نعرض الرابط:
          </p>
          <a className="text-sm text-blue-600 underline break-all" href={u} target="_blank" rel="noreferrer">
            {u}
          </a>
        </div>
      )
    }

    return <p className="text-sm text-gray-500">لا يوجد ميديا للمعاينة.</p>
  }

  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
          <p className="text-center py-10 text-gray-500">{common.loading || "جاري التحميل..."}</p>
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">{t.newsTitle || "الأخبار"}</h1>
            <Link href={`/${locale}/admin/news`} className="px-4 py-2 border rounded">
              {common.back || "رجوع"}
            </Link>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error || "تعذر تحميل الخبر."}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{t.edit || "تعديل الخبر"}</h1>
            <p className="text-sm text-gray-500 mt-1">{t.newsEditHint || "عدّل بيانات الخبر ثم احفظ."}</p>
          </div>

          <div className="flex gap-2">
            <Link href={`/${locale}/admin/news`} className="px-4 py-2 border rounded">
              {common.back || "رجوع"}
            </Link>

            <button onClick={onDelete} className="px-4 py-2 border rounded text-red-600">
              {t.delete || "حذف"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={onSave} className="grid gap-6">
          {/* Status */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">{t.status || "الحالة"}</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as NewsStatus)}
              className="border rounded-xl px-3 py-2"
            >
              <option value="draft">{t.draft || "مسودة"}</option>
              <option value="published">{t.published || "منشور"}</option>
            </select>
          </div>

          {/* Titles */}
          <div className="grid gap-3">
            <h2 className="text-lg font-semibold">{t.title || "العنوان"}</h2>

            <div className="grid gap-2">
              <label className="text-sm text-gray-600">العربية</label>
              <input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} className="border rounded-xl px-3 py-2" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-gray-600">English</label>
              <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className="border rounded-xl px-3 py-2" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-gray-600">Türkçe</label>
              <input value={titleTr} onChange={(e) => setTitleTr(e.target.value)} className="border rounded-xl px-3 py-2" />
            </div>
          </div>

          {/* Content */}
          <div className="grid gap-3">
            <h2 className="text-lg font-semibold">{t.content || "المحتوى"}</h2>

            <div className="grid gap-2">
              <label className="text-sm text-gray-600">العربية</label>
              <textarea value={contentAr} onChange={(e) => setContentAr(e.target.value)} className="border rounded-xl px-3 py-2 min-h-[140px]" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-gray-600">English</label>
              <textarea value={contentEn} onChange={(e) => setContentEn(e.target.value)} className="border rounded-xl px-3 py-2 min-h-[140px]" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-gray-600">Türkçe</label>
              <textarea value={contentTr} onChange={(e) => setContentTr(e.target.value)} className="border rounded-xl px-3 py-2 min-h-[140px]" />
            </div>
          </div>

          {/* Media fields */}
          <div className="grid gap-3 border-t pt-6">
            <h2 className="text-lg font-semibold">الوسائط (صورة/يوتيوب/فيسبوك)</h2>

            <div className="grid gap-2">
              <label className="text-sm font-medium">رابط صورة الغلاف (اختياري)</label>
              <input
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                className="border rounded-xl px-3 py-2"
                placeholder="https://..."
              />
              {coverUrl?.trim() ? (
                <div className="rounded-2xl overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverUrl} alt="cover" className="w-full h-auto" />
                </div>
              ) : (
                <p className="text-xs text-gray-500">إذا تركته فاضي، الخبر رح يطلع بدون غلاف أو يستخدم الافتراضي بالواجهة.</p>
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">نوع الميديا</label>
              <select
                value={mediaKind}
                onChange={(e) => setMediaKind(e.target.value as MediaKind)}
                className="border rounded-xl px-3 py-2"
              >
                <option value="none">بدون</option>
                <option value="image">صورة</option>
                <option value="youtube">YouTube</option>
                <option value="facebook">Facebook</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">رابط الميديا (اختياري)</label>
              <input
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="border rounded-xl px-3 py-2"
                placeholder="https://..."
              />
              <p className="text-xs text-gray-500">
                إذا اخترت YouTube أو Facebook في نوع الميديا، فيك تحط الرابط هون (أو ضمن حقول يوتيوب/فيسبوك تحت).
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium">رابط YouTube (اختياري)</label>
                <input
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="border rounded-xl px-3 py-2"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">رابط Facebook (اختياري)</label>
                <input
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  className="border rounded-xl px-3 py-2"
                  placeholder="https://www.facebook.com/..."
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">معاينة الميديا</label>
              {renderMediaPreview()}
            </div>
          </div>

          {/* Preview */}
          <div className="grid gap-3 border-t pt-6">
            <h2 className="text-lg font-semibold">معاينة شكل الخبر</h2>
            <div className="rounded-2xl border p-4 bg-gray-50 space-y-2">
              <div className="font-bold text-xl">{titlePreview || "— بدون عنوان —"}</div>
              <div className="text-sm text-gray-500">الحالة: {status}</div>
              <div className="prose prose-sm max-w-none whitespace-pre-line">{contentPreview || "— بدون محتوى —"}</div>
            </div>
          </div>

          {/* Save */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-60"
            >
              {saving ? (common.saving || "جاري الحفظ...") : (common.save || "حفظ")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}