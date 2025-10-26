import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Building2, BookOpen, Brain, Palette, Users } from "lucide-react"
import Link from "next/link"

export default function CentersPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params
  const translations = getTranslations(locale)
  const t = translations.centers

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/5 to-background py-16 md:py-24">
        <div className="container despmar">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <Building2 className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground text-balance">{t.subtitle}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.description}</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container despmar">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.services.title}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4 p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t.services.academic}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.services.academicDesc}</p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-700">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t.services.psychological}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.services.psychologicalDesc}</p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t.services.activities}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.services.activitiesDesc}</p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t.services.family}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.services.familyDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container despmar">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.locations}</h2>
          <div className="mx-auto max-w-4xl">
            <div className="aspect-video rounded-2xl overflow-hidden bg-muted border">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                {locale === "ar" ? "خريطة المراكز ستتاح قريباً" : locale === "fr" ? "Carte des centres à bientôt" : "Centers Map .... Soon"}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container despmar">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{t.contact}</h2>
            <Button size="lg" asChild>
              <Link href={`/${locale}/contact`}>
                {locale === "ar" ? "تواصل معنا" : locale === "fr" ? "Contactez-nous" : "Contact Us"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
    </div>
  )
}
