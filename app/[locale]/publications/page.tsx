import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import {  ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import HeroBackground from "@/components/hero-background";

export default function PublicationsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params
  const translations = getTranslations(locale)
  const t = translations.publications
  const isRTL = locale === "ar"

  return (
    <div className="flex flex-col">
      {/* Hero */}
  <section className="  relative overflow-hidden py-20 md:py-32">
        {/* الخلفية المتحركة */}
        <HeroBackground
          images={[
            // "/images/hero/Slide1.jpg",
            // "/images/hero/Slide2.png",
            "/images/hero/Slide5.jpg",
          ]}
          interval={5000}
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
                {/* <Button size="lg" variant="outline" asChild>
                  <Link href={`/${locale}/volunteer`}></Link>
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container despmar">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground text-balance">{t.subtitle}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.description}</p>
          </div>
        </div>
      </section> */}

      {/* Publications Grid */}
<section className="py-16 md:py-24">
  <div className="container despmar">
    <div className="grid gap-12 lg:gap-16">
      {/* 8 Kanoun */}
      <div className="grid gap-8 lg:grid-cols-2 items-center md:max-w-[50%] mx-auto">
        <div className="order-2 lg:order-1">
          <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
            <Image src="/children-magazine-cover-colorful.jpg" alt={t.kanoun.title} fill className="object-cover" />
          </div>
        </div>
        <div className="order-1 lg:order-2 space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            {t.kanoun.subtitle}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">{t.kanoun.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.kanoun.description}</p>
          <Button asChild>
            <Link href="https://mgz-kanoon.org/">
              {locale === "ar" ? "تصفح الإصدارات" : locale === "fr" ? "Parcourir les éditions" : "Browse Issues"}
              {isRTL ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </Link>
          </Button>
        </div>
      </div>

      {/* Ana wa Anta */}
      <div className="grid gap-8 lg:grid-cols-2 items-center md:max-w-[50%] mx-auto">
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
            {t.anaWaAnta.subtitle}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">{t.anaWaAnta.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.anaWaAnta.description}</p>
          <Button asChild>
            <Link href="https://mgz-kanoon.org/speditions">
              {locale === "ar" ? "تصفح الإصدارات" : locale === "fr" ? "Parcourir les éditions" : "Browse Issues"}
              {isRTL ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </Link>
          </Button>
        </div>

        {/* <Link href={`/${locale}/library?category=ana-wa-anta`}></Link> */}

        <div>
          <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-purple-50">
            <Image src="/teen-magazine-cover-modern.jpg" alt={t.anaWaAnta.title} fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Nakhla Booklet */}
      <div className="grid gap-8 lg:grid-cols-2 items-center md:max-w-[50%] mx-auto">
        <div className="order-2 lg:order-1">
          <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-100 to-green-50">
            <Image src="/parenting-guide-booklet-cover.jpg" alt={t.booklet.title} fill className="object-cover" />
          </div>
        </div>
        <div className="order-1 lg:order-2 space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            {t.booklet.subtitle}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">{t.booklet.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.booklet.description}</p>
          <Button asChild>
            <Link href="https://mgz-kanoon.org/speditions">
              {locale === "ar" ? "تصفح الإصدارات" : locale === "fr" ? "Parcourir les éditions" : "Browse Issues"}
              {isRTL ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container despmar">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{t.cta}</h2>
            <Button size="lg" asChild>
              <Link href={`/${locale}/library`}>
                {locale === "ar" ? "المكتبة الرقمية" : locale === "fr" ? "Bibliothèque numérique" : "Digital Library"}
                {isRTL ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
