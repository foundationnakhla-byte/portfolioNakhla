"use client"

import type React from "react"

import { useState } from "react"
import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, Phone,Ban , Mail, User, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function SafeguardingPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params
  const translations = getTranslations(locale)
  const t = translations.safeguarding
  const [showReportForm, setShowReportForm] = useState(false)

  if (showReportForm) {
    return <ReportForm locale={locale} />
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container despmar">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground text-balance">{t.subtitle}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.description}</p>
          </div>
        </div>
      </section>

      {/* Policy */}
      <section className="py-16">
        <div className="container despmar">
          <div className="mx-auto max-w-4xl space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.policy.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t.policy.intro}</p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 rounded-2xl border bg-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-700 mb-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.policy.principles.zero}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t.policy.principles.zeroDesc}</p>
                </div>
                <div className="p-6 rounded-2xl border bg-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700 mb-4">
                    <User className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.policy.principles.best}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t.policy.principles.bestDesc}</p>
                </div>
                <div className="p-6 rounded-2xl border bg-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-700 mb-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.policy.principles.prevention}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t.policy.principles.preventionDesc}</p>
                </div>
                <div className="p-6 rounded-2xl border bg-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700 mb-4">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.policy.principles.response}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t.policy.principles.responseDesc}</p>
                </div>
                              
                  <div className="p-6 rounded-2xl border bg-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700 mb-4">
                    <Ban  className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.policy.principles.reportings}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t.policy.principles.reportingDescs}</p>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protection Measures */}
      <section className="py-16 bg-muted/30">
        <div className="container despmar">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t.measures.title}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-2xl bg-card border">
                <h3 className="text-xl font-bold mb-2">{t.measures.screening}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.measures.screeningDesc}</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border">
                <h3 className="text-xl font-bold mb-2">{t.measures.training}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.measures.trainingDesc}</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border">
                <h3 className="text-xl font-bold mb-2">{t.measures.supervision}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.measures.supervisionDesc}</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border">
                <h3 className="text-xl font-bold mb-2">{t.measures.reporting}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.measures.reportingDesc}</p>
              </div>


       




            </div>
          </div>
        </div>
      </section>

      {/* Code of Conduct */}
      <section className="py-16">
        <div className="container despmar">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.codeOfConduct.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t.codeOfConduct.intro}</p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <span className="text-lg leading-relaxed">{t.codeOfConduct.respect}</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <span className="text-lg leading-relaxed">{t.codeOfConduct.boundaries}</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <span className="text-lg leading-relaxed">{t.codeOfConduct.privacy}</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <span className="text-lg leading-relaxed">{t.codeOfConduct.safety}</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <span className="text-lg leading-relaxed">{t.codeOfConduct.reporting_duty}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Reporting Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container despmar">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{t.reporting.title}</h2>
              <p className="text-xl text-muted-foreground text-balance">{t.reporting.subtitle}</p>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.reporting.description}</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">{t.reporting.channels.title}</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 rounded-2xl border bg-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{t.reporting.channels.online}</h4>
                  <p className="text-muted-foreground mb-4">{t.reporting.channels.onlineDesc}</p>
                  <Button onClick={() => setShowReportForm(true)} className="w-full">
                    {t.reportForm.title}
                  </Button>
                </div>
                <div className="p-6 rounded-2xl border bg-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-700 mb-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{t.reporting.channels.phone}</h4>
                  <p className="text-muted-foreground mb-2">{t.reporting.channels.phoneDesc}</p>
                  <p className="text-lg font-semibold">+33759889586</p>
                </div>
                <div className="p-6 rounded-2xl border bg-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700 mb-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{t.reporting.channels.email}</h4>
                  <p className="text-muted-foreground mb-2">{t.reporting.channels.emailDesc}</p>
                  <p className="text-lg font-semibold">legal@nakhla-found.com</p>
                </div>
                <div className="p-6 rounded-2xl border bg-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-700 mb-4">
                    <User className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{t.reporting.channels.person}</h4>
                  <p className="text-muted-foreground">{t.reporting.channels.personDesc}</p>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl bg-muted/50">
              <p className="text-lg">{t.reporting.anonymous}</p>
              <p className="text-lg font-semibold text-red-600">{t.reporting.urgent}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ReportForm({ locale }: { locale: Locale }) {
  const translations = getTranslations(locale)
  const t = translations.safeguarding
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)

  const [formData, setFormData] = useState({
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    relationship: "",
    childName: "",
    childAge: "",
    location: "",
    date: "",
    description: "",
    witnesses: "",
    reported: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("[v0] Safeguarding report submitted:", { ...formData, isAnonymous })

    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col min-h-[60vh] items-center justify-center py-16">
        <div className="container despmar">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{t.success.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{t.success.message}</p>
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-700 font-semibold">{t.success.emergency}</p>
            </div>
            <Button size="lg" asChild>
              <Link href={`/${locale}`}>{t.success.backHome}</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col py-16">
      <div className="container despmar">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{t.reportForm.title}</h1>
            </div>
            <p className="text-lg text-muted-foreground">{t.reportForm.confidential}</p>
            <div className="flex items-center gap-2 p-4 rounded-lg bg-muted/50">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="anonymous" className="text-sm font-medium cursor-pointer">
                {t.reportForm.anonymous_option}
              </label>
            </div>
            {isAnonymous && <p className="text-sm text-muted-foreground">{t.reportForm.anonymous_note}</p>}
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-6 md:p-8 space-y-8">
            {!isAnonymous && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">{t.reportForm.reporter.title}</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="reporterName" className="text-sm font-medium">
                      {t.reportForm.reporter.name}
                    </label>
                    <input
                      id="reporterName"
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.reporterName}
                      onChange={(e) => handleInputChange("reporterName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="reporterEmail" className="text-sm font-medium">
                      {t.reportForm.reporter.email}
                    </label>
                    <input
                      id="reporterEmail"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.reporterEmail}
                      onChange={(e) => handleInputChange("reporterEmail", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="reporterPhone" className="text-sm font-medium">
                      {t.reportForm.reporter.phone}
                    </label>
                    <input
                      id="reporterPhone"
                      type="tel"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.reporterPhone}
                      onChange={(e) => handleInputChange("reporterPhone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="relationship" className="text-sm font-medium">
                      {t.reportForm.reporter.relationship}
                    </label>
                    <select
                      id="relationship"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.relationship}
                      onChange={(e) => handleInputChange("relationship", e.target.value)}
                    >
                      <option value="">{locale === "ar" ? "اختر" : locale === "fr" ? "Sélectionner" : "Select"}</option>
                      <option value="staff">{t.relationships.staff}</option>
                      <option value="volunteer">{t.relationships.volunteer}</option>
                      <option value="parent">{t.relationships.parent}</option>
                      <option value="relative">{t.relationships.relative}</option>
                      <option value="teacher">{t.relationships.teacher}</option>
                      <option value="other">{t.relationships.other}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t.reportForm.concern.title}</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="childName" className="text-sm font-medium">
                    {t.reportForm.concern.childName}
                  </label>
                  <input
                    id="childName"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.childName}
                    onChange={(e) => handleInputChange("childName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="childAge" className="text-sm font-medium">
                    {t.reportForm.concern.childAge}
                  </label>
                  <input
                    id="childAge"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.childAge}
                    onChange={(e) => handleInputChange("childAge", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    {t.reportForm.concern.location}
                  </label>
                  <input
                    id="location"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    {t.reportForm.concern.date}
                  </label>
                  <input
                    id="date"
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  {t.reportForm.concern.description} *
                </label>
                <textarea
                  id="description"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="witnesses" className="text-sm font-medium">
                  {t.reportForm.concern.witnesses}
                </label>
                <textarea
                  id="witnesses"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.witnesses}
                  onChange={(e) => handleInputChange("witnesses", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="reported" className="text-sm font-medium">
                  {t.reportForm.concern.reported}
                </label>
                <textarea
                  id="reported"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.reported}
                  onChange={(e) => handleInputChange("reported", e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => window.history.back()} className="flex-1">
                {locale === "ar" ? "إلغاء" : locale === "fr" ? "Annuler" : "Cancel"}
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? t.reportForm.submitting : t.reportForm.submit}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
