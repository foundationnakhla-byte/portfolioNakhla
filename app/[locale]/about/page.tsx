import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { Shield, Heart, Award, Users } from "lucide-react"
import CountUp from "@/components/count-up"          // ← إضافة هذا السطر

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params
  const translations = getTranslations(locale)
  const t = translations.about

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container despmar ">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground">{t.subtitle}</p>
          </div>

                    <div className="mx-auto max-w-3xl text-center space-y-4">
            <h1 className="text-4xl md:text-3xl font-bold py-10 text-balance">{t.mis.titles}</h1>
            <p className="text-xl text-muted-foreground">{t.mis.descriptions}</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container despmar">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">{t.mission.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.mission.description}</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">{t.vision.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.vision.description}</p>
            </div>
          </div>
        </div>
      </section>
{/* Goals */}
<section className="py-16 md:py-24 bg-primary/5">
  <div className="container despmar">
    <div className="mx-auto max-w-4xl text-center space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold">{t.goals.title}</h2>
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
        {t.goals.description}
      </p>
    </div>
  </div>
</section>
      {/* Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container despmar">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.values.title}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">{t.values.safety}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.values.safetyDesc}</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">{t.values.respect}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.values.respectDesc}</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">{t.values.excellence}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.values.excellenceDesc}</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">{t.values.collaboration}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.values.collaborationDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
<section className="py-16 md:py-24">
        <div className="container despmar">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.impact.title}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-2">
              <CountUp
                end={5000}
                duration={1600}
                locale={locale}
                suffix="+"
                className="text-4xl md:text-5xl font-bold text-primary"
              />
              <div className="text-lg text-muted-foreground">{t.impact.children}</div>
            </div>
            <div className="text-center space-y-2">
              <CountUp
                end={1200}
                duration={1500}
                locale={locale}
                suffix="+"
                className="text-4xl md:text-5xl font-bold text-primary"
              />
              <div className="text-lg text-muted-foreground">{t.impact.families}</div>
            </div>
            <div className="text-center space-y-2">
              <CountUp
                end={150}
                duration={1400}
                locale={locale}
                suffix="+"
                className="text-4xl md:text-5xl font-bold text-primary"
              />
              <div className="text-lg text-muted-foreground">{t.impact.publications}</div>
            </div>
            <div className="text-center space-y-2">
              <CountUp
                end={80}
                duration={1300}
                locale={locale}
                suffix="+"
                className="text-4xl md:text-5xl font-bold text-primary"
              />
              <div className="text-lg text-muted-foreground">{t.impact.volunteers}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
