"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function LegalClinicContactForm({ locale }: { locale: "ar" | "fr" | "en" }) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle")
  const [errorMsg, setErrorMsg] = useState<string>("")

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("idle")
    setErrorMsg("")
    setSending(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          name,
          email,
          phone: phone || null,
          subject: subject || "general",
          message,
        }),
      })

      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.ok) throw new Error(json?.error || "Failed")

      setStatus("ok")
      setName("")
      setPhone("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (err: any) {
      setStatus("err")
      setErrorMsg(err?.message || "Error")
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm font-medium">
          {locale === "ar" ? "الاسم الكامل" : locale === "fr" ? "Nom complet" : "Full name"}
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-11 rounded-xl border bg-white px-3"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">
            {locale === "ar" ? "رقم الهاتف" : locale === "fr" ? "Téléphone" : "Phone"}
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 rounded-xl border bg-white px-3"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">
            {locale === "ar" ? "البريد الإلكتروني" : locale === "fr" ? "Email" : "Email"}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 rounded-xl border bg-white px-3"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">
          {locale === "ar" ? "الموضوع" : locale === "fr" ? "Sujet" : "Subject"}
        </label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="h-11 rounded-xl border bg-white px-3"
        >
          <option value="">
            {locale === "ar" ? "اختر" : locale === "fr" ? "Sélectionner" : "Select"}
          </option>
          <option value="centers">{locale === "ar" ? "استشارة قانونية" : locale === "fr" ? "Conseil juridique" : "Legal advice"}</option>
          <option value="general">{locale === "ar" ? "عام" : locale === "fr" ? "Général" : "General"}</option>
          <option value="other">{locale === "ar" ? "غير ذلك" : locale === "fr" ? "Autre" : "Other"}</option>
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">
          {locale === "ar" ? "رسالتك" : locale === "fr" ? "Message" : "Message"}
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="min-h-[120px] rounded-xl border bg-white px-3 py-2"
        />
      </div>

      {status === "ok" && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {locale === "ar" ? "تم إرسال الرسالة بنجاح ✅" : locale === "fr" ? "Message envoyé ✅" : "Sent ✅"}
        </div>
      )}

      {status === "err" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {locale === "ar" ? "فشل الإرسال:" : locale === "fr" ? "Échec:" : "Failed:"} {errorMsg}
        </div>
      )}

      <Button
        type="submit"
        disabled={sending}
        className="rounded-2xl bg-[#E11D74] hover:bg-[#c31662] w-full h-11"
      >
        {sending
          ? locale === "ar"
            ? "جاري الإرسال..."
            : locale === "fr"
            ? "Envoi..."
            : "Sending..."
          : locale === "ar"
          ? "إرسال الرسالة"
          : locale === "fr"
          ? "Envoyer"
          : "Send"}
      </Button>
    </form>
  )
}