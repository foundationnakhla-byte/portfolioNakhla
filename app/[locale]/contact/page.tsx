"use client"

import type React from "react"

import { useState } from "react"
import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params
  const translations = getTranslations(locale)
  const t = translations.contact
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale,
        ...formData,
      }),
    });

    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
    setSubmitted(true);
  } catch (err) {
    console.error(err);
    alert(
      locale === "ar"
        ? "تعذّر إرسال الرسالة."
        : locale === "fr"
        ? "Échec de l’envoi du message."
        : "Failed to send the message."
    );
  } finally {
    setIsSubmitting(false);
  }
};


  if (submitted) {
    return (
      <div className="flex flex-col min-h-[60vh] items-center justify-center">
        <div className="container despmar">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{t.success.title}</h1>
            <p className="text-xl text-muted-foreground">{t.success.message}</p>
            <Button size="lg" asChild>
              <Link href={`/${locale}`}>{t.success.backHome}</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container despmar">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground text-balance">{t.subtitle}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.description}</p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container despmar" >
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">{t.info.title}</h2>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.info.address}</h3>
                    <p className="text-muted-foreground">
                      {locale === "ar" ? "سوريا - ديرالزور" : locale === "fr" ? " Syrie, Dier EZ-zor" : "Syrie, Dier EZ-zor"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.info.phone}</h3>
                    <p className="text-muted-foreground">+33759889586</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.info.email}</h3>
                    <p className="text-muted-foreground">info@nakhla-found.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.info.hours}</h3>
                    <p className="text-muted-foreground">{t.info.hoursValue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">{t.form.title}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.form.name} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.form.email} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.form.phone}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t.form.subject} *</Label>
                  <select
                    id="subject"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    required
                  >
                    <option value="">
                      {locale === "ar" ? "اختر الموضوع" : locale === "fr" ? "Sélectionner" : "Select"}
                    </option>
                    <option value="general">{t.subjects.general}</option>
                    <option value="volunteer">{t.subjects.volunteer}</option>
                    <option value="partnership">{t.subjects.partnership}</option>
                    <option value="publications">{t.subjects.publications}</option>
                    <option value="centers">{t.subjects.centers}</option>
                    <option value="shelters">{t.subjects.shelters}</option>
                    <option value="safeguarding">{t.subjects.safeguarding}</option>
                    <option value="other">{t.subjects.other}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t.form.message} *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t.form.submitting : t.form.submit}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
