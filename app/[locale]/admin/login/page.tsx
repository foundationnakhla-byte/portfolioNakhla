"use client"

import { useState } from "react"
import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { supabaseBrowser } from "@/lib/supabase/supabaseBrowser"

export default function AdminLoginPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params
  const translations = getTranslations(locale)
  const t = translations.admin

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg("")
    setLoading(true)

    const { data, error } = await supabaseBrowser.auth.signInWithPassword({ email, password })

    if (error || !data.user) {
      setLoading(false)
      return setMsg(t.loginError)
    }

    // allowlist check
    const userEmail = data.user.email || ""
    const { data: allowed, error: allowErr } = await supabaseBrowser
      .from("admin_allowlist")
      .select("email")
      .eq("email", userEmail)
      .maybeSingle()

    if (allowErr || !allowed) {
      await supabaseBrowser.auth.signOut()
      setLoading(false)
      return setMsg(t.notAllowed)
    }

    // go to admin news
    window.location.href = `/${locale}/admin/news`
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <form onSubmit={signIn} className="bg-white w-full max-w-md p-6 rounded-2xl shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">{t.loginTitle}</h1>

        <input
          className="w-full border p-3 rounded"
          placeholder={t.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full border p-3 rounded"
          placeholder={t.password}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="w-full bg-purple-600 text-white py-3 rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? t.loading : t.login}
        </button>

        {msg && <p className="text-center text-red-600">{msg}</p>}
      </form>
    </div>
  )
}
