import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Home, Mouse as House, Heart, GraduationCap, Brain, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SheltersPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params
  const translations = getTranslations(locale)
  const t = translations.shelters
  const isRTL = locale === "ar"

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-accent/5 to-background py-16 md:py-24">
        <div className="container despmar">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent-foreground">
              <Home className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground text-balance">{t.subtitle}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.description}</p>
          </div>
        </div>
      </section>

      {/* Care Services */}
      <section className="py-16 md:py-24">
        <div className="container despmar">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.care.title}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4 p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <House className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t.care.housing}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.care.housingDesc}</p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-700">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t.care.health}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.care.healthDesc}</p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-700">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t.care.education}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.care.educationDesc}</p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{t.care.psychological}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.care.psychologicalDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safeguarding */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container despmar">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{t.safeguarding}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.safeguardingDesc}</p>
            <Button size="lg" variant="outline" asChild>
              <Link href={`/${locale}/safeguarding`}>
                {t.learnMore}
                {isRTL ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
