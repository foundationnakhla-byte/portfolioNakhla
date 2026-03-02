// app/[locale]/admin/news/new/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { supabaseBrowser } from "@/lib/supabase/supabaseBrowser"

type NewsStatus = "draft" | "published"
type UploadState = "idle" | "uploading" | "success" | "error"

export default function AdminNewsNewPage({
  params,
}: {
  params: Promise<{ locale: Locale }> | { locale: Locale }
}) {
  // Next 15: params ممكن تكون Promise
  const { locale } = React.use(params as any) as { locale: Locale }

  const translations = getTranslations(locale)
  const t = translations.admin
  const common = translations.common

  const router = useRouter()

  // ✅ Auth guard state
  const [checking, setChecking] = useState(true)

  // ✅ form state (لازم قبل أي return شرطي)
  const [status, setStatus] = useState<NewsStatus>("draft")

  const [titleAr, setTitleAr] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [titleTr, setTitleTr] = useState("")

  const [contentAr, setContentAr] = useState("")
  const [contentEn, setContentEn] = useState("")
  const [contentTr, setContentTr] = useState("")

  // روابط اختيارية (إذا عندك رابط جاهز)
  const [coverUrlInput, setCoverUrlInput] = useState("") // رابط غلاف اختياري
  const [mediaUrlInput, setMediaUrlInput] = useState("") // رابط ملف/صورة اختياري
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [facebookUrl, setFacebookUrl] = useState("")

  // الروابط الناتجة من رفع الملفات (بتتعبّى تلقائياً)
  const [coverUrlUploaded, setCoverUrlUploaded] = useState("")
  const [mediaUrlUploaded, setMediaUrlUploaded] = useState("")

  const [coverUploadState, setCoverUploadState] = useState<UploadState>("idle")
  const [mediaUploadState, setMediaUploadState] = useState<UploadState>("idle")

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ✅ استخدم نفس bucket اللي نجح معك بالـ volunteer ليتفادى 400
  // إذا بدك Bucket جديد للأخبار: أنشئه من Supabase Storage وغيّر الاسم هون
  const BUCKET = "volunteer_docs"

  const genId = () =>
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`

  // ✅ Auth + allowlist check
  useEffect(() => {
    let mounted = true

    const goLogin = () => {
      const next = encodeURIComponent(`/${locale}/admin/news/new`)
      window.location.href = `/${locale}/admin/login?next=${next}`
    }

    const check = async () => {
      // 1) session
      const { data: sess, error: sessErr } = await supabaseBrowser.auth.getSession()
      const user = sess.session?.user

      if (sessErr || !user?.email) {
        if (mounted) setChecking(false)
        return goLogin()
      }

      // 2) allowlist
      const { data: allowed, error: allowErr } = await supabaseBrowser
        .from("admin_allowlist")
        .select("email")
        .eq("email", user.email)
        .maybeSingle()

      if (allowErr || !allowed) {
        await supabaseBrowser.auth.signOut()
        if (mounted) setChecking(false)
        return goLogin()
      }

      if (mounted) setChecking(false)
    }

    check()

    return () => {
      mounted = false
    }
  }, [locale])

  async function uploadViaSignedUrl(opts: {
    file: File
    kind: "cover" | "media"
    onState: (s: UploadState) => void
    onUrl: (url: string) => void
  }) {
    const { file, kind, onState, onUrl } = opts

    try {
      onState("uploading")

      const ext = (file.name.split(".").pop() || "bin").toLowerCase()
      const id = genId()

      // مسار التخزين
      const path = `news/${id}_${kind}.${ext}`

      // 1) اطلب signed upload url
      const res = await fetch("/api/storage/signed-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bucket: BUCKET,
          path,
          contentType: file.type || "application/octet-stream",
        }),
      })

      if (!res.ok) {
        const j = await res.json().catch(() => ({} as any))
        console.error("Signed URL error", j?.error || res.statusText)
        throw new Error(j?.error || "Signed upload URL failed")
      }

      const { uploadUrl, publicUrl } = (await res.json()) as {
        uploadUrl: string
        publicUrl: string
      }

      // 2) ارفع الملف
      const put = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file,
      })

      if (!put.ok) {
        const txt = await put.text().catch(() => "")
        console.error("Upload error (PUT)", txt)
        throw new Error("Upload failed")
      }

      onUrl(publicUrl)
      onState("success")
    } catch (e: any) {
      onState("error")
      setError(e?.message || (locale === "ar" ? "فشل الرفع" : "Upload failed"))
    }
  }

  const UploadStatus = ({ s }: { s: UploadState }) => {
    if (s === "uploading")
      return (
        <span className="text-xs text-gray-500">
          {locale === "ar"
            ? "جاري الرفع..."
            : locale === "fr"
              ? "Téléversement..."
              : "Uploading..."}
        </span>
      )
    if (s === "success")
      return (
        <span className="text-xs text-green-600">
          {locale === "ar"
            ? "تم الرفع بنجاح ✓"
            : locale === "fr"
              ? "Téléversé ✓"
              : "Uploaded ✓"}
        </span>
      )
    if (s === "error")
      return (
        <span className="text-xs text-red-600">
          {locale === "ar"
            ? "فشل الرفع ✗"
            : locale === "fr"
              ? "Échec ✗"
              : "Failed ✗"}
        </span>
      )
    return null
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!titleAr.trim() && !titleEn.trim() && !titleTr.trim()) {
      setError(
        locale === "ar"
          ? "الرجاء إدخال عنوان واحد على الأقل."
          : "Please enter at least one title."
      )
      return
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

    // خُذ الغلاف: إذا في رفع استخدمه، وإلا إذا في رابط استخدمه
    const cover_url = coverUrlUploaded || coverUrlInput.trim() || null
    const media_url = mediaUrlUploaded || mediaUrlInput.trim() || null

    const youtube_url = youtubeUrl.trim() || null
    const facebook_url = facebookUrl.trim() || null

    // إذا نشرت الخبر الآن، حط published_at
    const published_at = status === "published" ? new Date().toISOString() : null

    const { data, error: insertError } = await supabaseBrowser
      .from("news")
      .insert({
        title_i18n,
        content_i18n,
        status,
        cover_url,
        media_url,
        youtube_url,
        facebook_url,
        published_at,
      })
      .select("id")
      .single()

    setSaving(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    router.push(`/${locale}/admin/news/${data.id}`)
    router.refresh()
  }

  // ✅ بعد ما عرّفنا كل الهوكات، فينا نعمل return شرطي بأمان
  if (checking) {
    return (
      <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">{common.loading || "Loading..."}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{t.new || "خبر جديد"}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {t.newsCreateHint || "أدخل بيانات الخبر ثم احفظ."}
            </p>
          </div>

          <Link href={`/${locale}/admin/news`} className="px-4 py-2 border rounded">
            {common.back || "رجوع"}
          </Link>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="grid gap-6">
          {/* الحالة */}
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

          {/* العنوان */}
          <div className="grid gap-3">
            <h2 className="text-lg font-semibold">{t.title || "العنوان"}</h2>

            <div className="grid gap-2">
              <label className="text-sm text-gray-600">العربية</label>
              <input
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                className="border rounded-xl px-3 py-2"
                placeholder="عنوان الخبر بالعربية"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-gray-600">English</label>
              <input
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="border rounded-xl px-3 py-2"
                placeholder="News title in English"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-gray-600">Türkçe</label>
              <input
                value={titleTr}
                onChange={(e) => setTitleTr(e.target.value)}
                className="border rounded-xl px-3 py-2"
                placeholder="Haber başlığı (Türkçe)"
              />
            </div>
          </div>

          {/* المحتوى */}
          <div className="grid gap-3">
            <h2 className="text-lg font-semibold">{t.content || "المحتوى"}</h2>

            <div className="grid gap-2">
              <label className="text-sm text-gray-600">العربية</label>
              <textarea
                value={contentAr}
                onChange={(e) => setContentAr(e.target.value)}
                className="border rounded-xl px-3 py-2 min-h-[140px]"
                placeholder="محتوى الخبر بالعربية"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-gray-600">English</label>
              <textarea
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                className="border rounded-xl px-3 py-2 min-h-[140px]"
                placeholder="News content in English"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-gray-600">Türkçe</label>
              <textarea
                value={contentTr}
                onChange={(e) => setContentTr(e.target.value)}
                className="border rounded-xl px-3 py-2 min-h-[140px]"
                placeholder="Haber içeriği (Türkçe)"
              />
            </div>
          </div>

          {/* الوسائط */}
          <div className="grid gap-4 border rounded-2xl p-4">
            <h2 className="text-lg font-semibold">
              {locale === "ar" ? "الوسائط" : locale === "fr" ? "Médias" : "Media"}
            </h2>

            {/* غلاف: رفع */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                {locale === "ar"
                  ? "صورة الغلاف من الجهاز"
                  : locale === "fr"
                    ? "Image de couverture (fichier)"
                    : "Cover image (file)"}
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  className="border rounded-xl px-3 py-2 flex-1"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (!f) return
                    uploadViaSignedUrl({
                      file: f,
                      kind: "cover",
                      onState: setCoverUploadState,
                      onUrl: (url) => setCoverUrlUploaded(url),
                    })
                  }}
                />
                <UploadStatus s={coverUploadState} />
              </div>

              {coverUrlUploaded && (
                <div className="text-xs text-gray-500 break-all">{coverUrlUploaded}</div>
              )}
            </div>

            {/* غلاف: رابط */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                {locale === "ar"
                  ? "رابط صورة الغلاف (اختياري)"
                  : locale === "fr"
                    ? "URL couverture (optionnel)"
                    : "Cover URL (optional)"}
              </label>
              <input
                value={coverUrlInput}
                onChange={(e) => setCoverUrlInput(e.target.value)}
                className="border rounded-xl px-3 py-2"
                placeholder="https://..."
              />
              <p className="text-xs text-gray-500">
                {locale === "ar"
                  ? "إذا رفعت صورة من الجهاز، هذا الحقل ليس ضرورياً."
                  : "If you upload a file, this field is optional."}
              </p>
            </div>

            <hr />

            {/* media: رفع */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                {locale === "ar"
                  ? "صورة/ملف الخبر من الجهاز"
                  : locale === "fr"
                    ? "Média (fichier)"
                    : "News media (file)"}
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*,video/*,.pdf"
                  className="border rounded-xl px-3 py-2 flex-1"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (!f) return
                    uploadViaSignedUrl({
                      file: f,
                      kind: "media",
                      onState: setMediaUploadState,
                      onUrl: (url) => setMediaUrlUploaded(url),
                    })
                  }}
                />
                <UploadStatus s={mediaUploadState} />
              </div>

              {mediaUrlUploaded && (
                <div className="text-xs text-gray-500 break-all">{mediaUrlUploaded}</div>
              )}
            </div>

            {/* media: رابط */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                {locale === "ar"
                  ? "رابط صورة/ملف إضافي (اختياري)"
                  : locale === "fr"
                    ? "URL média (optionnel)"
                    : "Media URL (optional)"}
              </label>
              <input
                value={mediaUrlInput}
                onChange={(e) => setMediaUrlInput(e.target.value)}
                className="border rounded-xl px-3 py-2"
                placeholder="https://..."
              />
            </div>

            <hr />

            {/* روابط فيديو */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  {locale === "ar" ? "رابط YouTube (اختياري)" : "YouTube URL (optional)"}
                </label>
                <input
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="border rounded-xl px-3 py-2"
                  placeholder="https://www.youtube.com/..."
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  {locale === "ar" ? "رابط Facebook (اختياري)" : "Facebook URL (optional)"}
                </label>
                <input
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  className="border rounded-xl px-3 py-2"
                  placeholder="https://www.facebook.com/..."
                />
              </div>
            </div>

            <p className="text-xs text-gray-500">
              {locale === "ar"
                ? "كل الحقول هنا اختيارية، لكن إذا حطّيت رابط لازم يكون صحيح."
                : "All fields here are optional, but URLs must be valid."}
            </p>
          </div>

          {/* أزرار */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-60"
            >
              {saving ? common.saving || "جاري الحفظ..." : common.save || "حفظ"}
            </button>

            <Link href={`/${locale}/admin/news`} className="px-4 py-2 border rounded">
              {common.cancel || "إلغاء"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}