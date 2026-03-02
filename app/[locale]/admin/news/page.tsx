// app/[locale]/admin/news/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { supabaseBrowser } from "@/lib/supabase/supabaseBrowser"
import { pickI18n } from "@/lib/i18nJson"

type NewsRow = {
  id: number
  title_i18n: any
  status?: string | null
  cover_url?: string | null
  media_kind?: string | null
  media_url?: string | null
}

export default function AdminNewsPage({
  params,
}: {
  params: Promise<{ locale: Locale }> | { locale: Locale }
}) {
  const { locale } = React.use(params as any) as { locale: Locale }

  const translations = getTranslations(locale)
  const t = translations.admin
  const common = translations.common

  const [items, setItems] = useState<NewsRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const goLogin = () => {
      // مرّر next حتى يرجع بعد تسجيل الدخول
      const next = encodeURIComponent(`/${locale}/admin/news`)
      window.location.href = `/${locale}/admin/login?next=${next}`
    }

    const load = async () => {
      setLoading(true)

      // 1) لازم يكون في جلسة
      const { data: sess, error: sessErr } = await supabaseBrowser.auth.getSession()
      const user = sess.session?.user

      if (sessErr || !user?.email) {
        if (mounted) setLoading(false)
        return goLogin()
      }

      // 2) لازم يكون ضمن allowlist
      const { data: allowed, error: allowErr } = await supabaseBrowser
        .from("admin_allowlist")
        .select("email")
        .eq("email", user.email)
        .maybeSingle()

      if (allowErr || !allowed) {
        await supabaseBrowser.auth.signOut()
        if (mounted) setLoading(false)
        return goLogin()
      }

      // 3) حمّل الأخبار
      const { data, error } = await supabaseBrowser
        .from("news")
        .select("*")
        .order("id", { ascending: false })

      if (!error && mounted) setItems((data as any[]) || [])
      if (mounted) setLoading(false)
    }

    load()

    return () => {
      mounted = false
    }
  }, [locale])

  const del = async (id: number) => {
    if (!confirm(t.confirmDelete)) return

    const { error } = await supabaseBrowser.from("news").delete().eq("id", id)

    if (!error) setItems((prev) => prev.filter((x) => x.id !== id))
    else alert(t.deleteError)
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t.newsTitle}</h1>

          <Link
            href={`/${locale}/admin/news/new`}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            {t.new}
          </Link>
        </div>

        {loading ? (
          <p className="text-center py-10 text-gray-500">{common.loading}</p>
        ) : (
          <div className="grid gap-4">
            {items.map((n) => (
              <div
                key={n.id}
                className="border rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <div className="font-bold">
                    {pickI18n(n.title_i18n, locale) || t.noTitle}
                  </div>

                  <div className="text-sm text-gray-500 flex gap-2 items-center">
                    <span>{n.status || "-"}</span>

                    {(n.cover_url || n.media_url) && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 border">
                        {n.media_url
                          ? n.media_kind === "facebook"
                            ? "Facebook"
                            : "YouTube"
                          : "Image"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/${locale}/admin/news/${n.id}`}
                    className="px-3 py-1 border rounded"
                  >
                    {common.view}
                  </Link>

                  <button
                    onClick={() => del(n.id)}
                    className="px-3 py-1 border rounded text-red-600"
                  >
                    {t.delete}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}