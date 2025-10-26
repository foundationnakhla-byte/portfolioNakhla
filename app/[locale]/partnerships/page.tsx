"use client"

import type React from "react"

import { useState } from "react"
import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Handshake, GraduationCap, Landmark, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function PartnershipsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params
  const translations = getTranslations(locale)
  const t = translations.partnerships
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    organizationType: "",
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    partnershipType: "",
    description: "",
    goals: "",
    resources: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const res = await fetch("/api/partnerships", {
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
        ? "تعذّر إرسال طلب الشراكة."
        : locale === "fr"
        ? "Échec de l’envoi de la demande de partenariat."
        : "Failed to submit partnership request."
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
            <h1 className="text-4xl md:text-5xl font-bold">{translations.contact.success.title}</h1>
            <p className="text-xl text-muted-foreground">{translations.contact.success.message}</p>
            <Button size="lg" asChild>
              <Link href={`/${locale}`}>{translations.contact.success.backHome}</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (showForm) {
    return (
      <div className="flex flex-col py-16">
        <div className="container despmar">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">{t.form.title}</h1>
            </div>
            <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-6 md:p-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="organizationType">{t.form.organizationType} *</Label>
                  <select
                    id="organizationType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.organizationType}
                    onChange={(e) => handleInputChange("organizationType", e.target.value)}
                    required
                  >
                    <option value="">
                      {locale === "ar" ? "اختر نوع المؤسسة" : locale === "fr" ? "Sélectionner" : "Select"}
                    </option>
                    <option value="corporate">{t.types_options.corporate}</option>
                    <option value="ngo">{t.types_options.ngo}</option>
                    <option value="academic">{t.types_options.academic}</option>
                    <option value="government">{t.types_options.government}</option>
                    <option value="other">{t.types_options.other}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizationName">{t.form.organizationName} *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange("organizationName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">{t.form.contactPerson} *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    required
                  />
                </div>
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
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.form.phone} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">{t.form.website}</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="partnershipType">{t.form.partnershipType} *</Label>
                <select
                  id="partnershipType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.partnershipType}
                  onChange={(e) => handleInputChange("partnershipType", e.target.value)}
                  required
                >
                  <option value="">
                    {locale === "ar" ? "اختر نوع الشراكة" : locale === "fr" ? "Sélectionner" : "Select"}
                  </option>
                  <option value="financial">{t.partnership_types.financial}</option>
                  <option value="inkind">{t.partnership_types.inkind}</option>
                  <option value="technical">{t.partnership_types.technical}</option>
                  <option value="volunteer">{t.partnership_types.volunteer}</option>
                  <option value="awareness">{t.partnership_types.awareness}</option>
                  <option value="other">{t.partnership_types.other}</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t.form.description} *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">{t.form.goals} *</Label>
                <Textarea
                  id="goals"
                  value={formData.goals}
                  onChange={(e) => handleInputChange("goals", e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resources">{t.form.resources}</Label>
                <Textarea
                  id="resources"
                  value={formData.resources}
                  onChange={(e) => handleInputChange("resources", e.target.value)}
                  rows={3}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t.form.submitting : t.form.submit}
              </Button>
            </form>
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
              <Handshake className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground text-balance">{t.subtitle}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.description}</p>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 md:py-24">
        <div className="container despmar">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.types.title}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4 p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t.types.corporate}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.types.corporateDesc}</p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-700">
                <Handshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t.types.ngo}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.types.ngoDesc}</p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t.types.academic}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.types.academicDesc}</p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                <Landmark className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t.types.government}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.types.governmentDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container despmar">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.benefits.title}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">✓</div>
              <h3 className="font-semibold">{t.benefits.impact}</h3>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">✓</div>
              <h3 className="font-semibold">{t.benefits.visibility}</h3>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">✓</div>
              <h3 className="font-semibold">{t.benefits.csr}</h3>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">✓</div>
              <h3 className="font-semibold">{t.benefits.network}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container despmar">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{t.cta}</h2>
            <Button size="lg" onClick={() => setShowForm(true)}>
              {t.form.submit}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
