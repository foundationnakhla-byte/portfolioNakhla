"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { VolunteerForm } from "@/components/volunteer-form";
import { Button } from "@/components/ui/button";
import { Users, Heart, Award, GraduationCap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function VolunteerPage() {
  // خذ الـ locale من البارامز ثم وفر قيمة افتراضية
  const params = useParams<{ locale: string }>();
  const locale = (params?.locale ?? "ar") as Locale;

  const translations = getTranslations(locale);
  const t = translations.volunteer;

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false); // ← مفقودة سابقًا

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
    );
  }

  if (showForm) {
    return (
      <div className="flex flex-col py-16">
        <div className="container despmar">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">{t.applicationForm}</h1>
            </div>
            <div className="rounded-2xl border bg-card p-6 md:p-8">
              <VolunteerForm
                locale={locale} // ← مرر كـ Locale
                translations={translations}
                onSuccess={() => setSubmitted(true)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container despmar">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground text-balance">{t.subtitle}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.description}</p>
            <Button size="lg" onClick={() => setShowForm(true)}>
              {t.applyNow}
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="container despmar">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.whyVolunteer}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">{t.benefits.impact}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.benefits.impactDesc}</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">{t.benefits.skills}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.benefits.skillsDesc}</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">{t.benefits.community}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.benefits.communityDesc}</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">{t.benefits.certificate}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.benefits.certificateDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container despmar">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{t.opportunities}</h2>
            <Button size="lg" onClick={() => setShowForm(true)}>
              {t.applyNow}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
