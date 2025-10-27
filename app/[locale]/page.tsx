import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, BookOpen, Building2, Home } from "lucide-react"
import Link from "next/link"
import HeroBackground from "@/components/hero-background";

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = await params
  const translations = getTranslations(locale)
  const t = translations.hero
  const isRTL = locale === "ar"

  return (
    <div className="flex flex-col ">
      {/* Hero Section */}
  <section className="  relative overflow-hidden py-20 md:py-32">
        {/* الخلفية المتحركة */}
        <HeroBackground
          images={[
            "/images/hero/Slide1.jpg",
            "/images/hero/Slide2.png",
            "/images/hero/Slide3.png",
            "/images/hero/Slide4.png",
          ]}
          interval={6000}
        />

        {/* محتوى الـHero */}
        <div className="relative z-10"> {/* مهم: لوضع المحتوى فوق الخلفية */}
          <div className="container despmar">
            <div className="mx-auto max-w-3xl text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">{t.title}</h1>
              <p className="text-xl md:text-2xl text-muted-foreground text-balance">{t.subtitle}</p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">{t.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild>
                  <Link href={`/${locale}/publications`}>
                    {t.cta}
                    {isRTL ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/${locale}/volunteer`}>{t.volunteer}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Overview */}
      <section className=" py-20 md:py-32">
        <div className="container despmar">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === "ar" ? "مشاريعنا" : locale === "fr" ? "Nos Projets" : "Our Projects"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === "ar"
                ? "نعمل على ثلاثة محاور رئيسية لدعم الأطفال والأسر"
                : locale === "fr"
                  ? "Nous travaillons sur trois axes principaux pour soutenir les enfants et les familles"
                  : "We work on three main pillars to support children and families"}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Publications */}
            <Link
              href={`/${locale}/publications`}
              className="group relative overflow-hidden rounded-2xl border bg-card p-8 hover:shadow-lg transition-all"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {locale === "ar" ? "المطبوعات" : locale === "fr" ? "Publications" : "Publications"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "ar"
                  ? "مجلات ومواد تعليمية للأطفال والمراهقين والأمهات الجدد"
                  : locale === "fr"
                    ? "Magazines et matériel éducatif pour enfants, adolescents et nouvelles mères"
                    : "Magazines and educational materials for children, teens, and new mothers"}
              </p>
            </Link>

            {/* Centers */}
            <Link
              href={`/${locale}/centers`}
              className="group relative overflow-hidden rounded-2xl border bg-card p-8 hover:shadow-lg transition-all"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {locale === "ar" ? "المراكز التعليمية" : locale === "fr" ? "Centres Éducatifs" : "Educational Centers"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "ar"
                  ? "مراكز دعم تعليمي ونفسي للأطفال والأسر المحتاجة"
                  : locale === "fr"
                    ? "Centres de soutien éducatif et psychologique pour enfants et familles"
                    : "Educational and psychological support centers for children and families"}
              </p>
            </Link>

            {/* Shelters */}
            <Link
              href={`/${locale}/shelters`}
              className="group relative overflow-hidden rounded-2xl border bg-card p-8 hover:shadow-lg transition-all"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {locale === "ar" ? "دور الرعاية" : locale === "fr" ? "Foyers d'Accueil" : "Safe Shelters"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "ar"
                  ? "بيئة آمنة ورعاية شاملة للأطفال المحتاجين للحماية"
                  : locale === "fr"
                    ? "Environnement sûr et soins complets pour les enfants nécessitant une protection"
                    : "Safe environment and comprehensive care for children in need of protection"}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="  py-20 bg-primary/5">
        <div className="container despmar">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              {locale === "ar"
                ? "كن جزءاً من التغيير"
                : locale === "fr"
                  ? "Faites partie du changement"
                  : "Be Part of the Change"}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {locale === "ar"
                ? "انضم إلينا كمتطوع أو شريك لنصنع معاً مستقبلاً أفضل لأطفالنا"
                : locale === "fr"
                  ? "Rejoignez-nous en tant que bénévole ou partenaire pour créer ensemble un meilleur avenir pour nos enfants"
                  : "Join us as a volunteer or partner to create a better future for our children together"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href={`/${locale}/volunteer`}>
                  {locale === "ar" ? "تطوع معنا" : locale === "fr" ? "Devenez bénévole" : "Volunteer"}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`/${locale}/partnerships`}>
                  {locale === "ar" ? "الشراكات" : locale === "fr" ? "Partenariats" : "Partnerships"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
