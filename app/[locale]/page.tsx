import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { getLatestNews } from "@/lib/news-data"
import { pickI18n } from "@/lib/i18nJson"

import Image from "next/image"
import Link from "next/link"
 
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, BookOpen, Building2, Home ,FileText} from "lucide-react"
import HeroBackground from "@/components/hero-background"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  const translations = getTranslations(locale)
  const news = await getLatestNews(locale)

  // 🔑 ترجمات الـ Hero
  const t = translations.home ?? translations.hero ?? translations

  const isRTL = locale === "ar"

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <HeroBackground
          images={[
            "/images/hero/Slide1.jpg",
            "/images/hero/Slide2.png",
            "/images/hero/Slide3.png",
            "/images/hero/Slide4.png",
          ]}
          interval={6000}
        />

        <div className="relative z-10">
          <div className="container despmar">
            <div className="mx-auto max-w-3xl text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                {t.title}
              </h1>

              <p className="text-xl md:text-2xl basses text-balance">
                {t.subtitle}
              </p>

              <p className="text-lg basses leading-relaxed max-w-2xl mx-auto">
                {t.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button className="buttonss" size="lg" asChild>
                  <Link href={`/${locale}/publications`}>
                    {t.cta}
                    {isRTL ? (
                      <ArrowLeft className="h-5 w-5" />
                    ) : (
                      <ArrowRight className="h-5 w-5" />
                    )}
                  </Link>
                </Button>

                <Button className="buttonss" size="lg" variant="outline" asChild>
                  <Link href={`/${locale}/volunteer`}>
                    {t.volunteer}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Overview */}
      <section className="py-20 md:py-32">
        <div className="container despmar">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === "ar"
                ? "مشاريعنا"
                : locale === "fr"
                ? "Nos Projets"
                : "Our Projects"}
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
            <Link
              href={`/${locale}/publications`}
              className="group relative responnns overflow-hidden rounded-2xl border bg-card p-8 hover:shadow-lg transition-all"
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

            <Link
              href={`/${locale}/centers`}
              className="group relative responnns overflow-hidden rounded-2xl border bg-card p-8 hover:shadow-lg transition-all"
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

            <Link
              href={`/${locale}/shelters`}
              className="group relative responnns overflow-hidden rounded-2xl border bg-card p-8 hover:shadow-lg transition-all"
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
                      <Link
              href={`/${locale}/legal`}
              className="group relative responnns overflow-hidden rounded-2xl border bg-card p-8 hover:shadow-lg transition-all"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
<FileText className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {locale === "ar" ? "  الكبينة القانونية" : locale === "fr" ? "Cabinet Juridique  " : "Legal Cabinet"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "ar"
                  ? "جلسات توعية بالقانون وبمسار العدالة الانتقالية، وورشات دعم قانوني مباشر للمستفيدين وذوي الضحايا والناجين والناجيات، إضافة إلى مساعدة العائدين إلى دير الزور في قضاياهم الإدارية"
                  : locale === "fr"
                  ? "Cabinet juridique proposant des sessions de sensibilisation au droit et au processus de justice transitionnelle, des ateliers d’appui juridique direct aux bénéficiaires, aux familles des victimes, aux survivants et survivantes, ainsi qu’un accompagnement des personnes retournant à Deir ez-Zor dans leurs démarches administratives"
                  : "Legal support unit providing awareness sessions on law and transitional justice, direct legal support workshops for beneficiaries, victims’ families, survivors, and assistance for people returning to Deir ez-Zor in their administrative matters"}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container despmar">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              {translations.newsPage.title}
            </h2>
            <p className="text-muted-foreground mt-2">
              {translations.newsPage.subtitle}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {news.map((n: any) => {
              const title = pickI18n(n.title_i18n, locale)
              const excerpt = pickI18n(n.excerpt_i18n, locale)
              const date = n.published_at
                ? new Date(n.published_at).toLocaleDateString(
                    locale === "ar" ? "ar-EG" : locale === "fr" ? "fr-FR" : "en-GB"
                  )
                : ""

              return (
                <Link
                  key={n.id}
                  href={`/${locale}/news/${n.id}`}
                  className="rounded-2xl border bg-card overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative h-44">
                    <Image
                      src={n.cover_url || "/default-cover.png"}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
                    {excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {excerpt}
                      </p>
                    )}
                    <div className="text-xs text-muted-foreground flex justify-between">
                      <span>{date}</span>
                      <span>{n.geo_name || ""}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link className="underline text-primary" href={`/${locale}/news`}>
              {translations.newsPage.back}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}