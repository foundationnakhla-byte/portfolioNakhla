import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { getPublicationById } from "@/lib/publications-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Download, Eye } from "lucide-react"

export default function PublicationDetailPage({ params }: { params: { locale: Locale; id: string } }) {
  const { locale, id } = params
  const translations = getTranslations(locale)
  const t = translations.library
  const isRTL = locale === "ar"

  const publication = getPublicationById(id)

  if (!publication) {
    notFound()
  }

  const title = locale === "ar" ? publication.titleAr : locale === "fr" ? publication.titleFr : publication.title
  const description =
    locale === "ar" ? publication.descriptionAr : locale === "fr" ? publication.descriptionFr : publication.description

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "kanoun":
        return t.kanoun
      case "ana-wa-anta":
        return t.anaWaAnta
      case "booklet":
        return t.booklet
      default:
        return category
    }
  }

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case "ar":
        return t.arabic
      case "fr":
        return t.french
      case "both":
        return t.both
      default:
        return lang
    }
  }

  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <section className="py-6 border-b">
        <div className="container despmar">
          <Button variant="ghost" asChild>
            <Link href={`/${locale}/library`}>
              {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              {t.backToLibrary}
            </Link>
          </Button>
        </div>
      </section>

      {/* Publication Detail */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Cover Image */}
            <div>
              <div className="aspect-[3/4] relative rounded-2xl overflow-hidden border shadow-lg">
                <Image src={publication.coverImage || "/placeholder.svg"} alt={title} fill className="object-cover" />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {getCategoryLabel(publication.category)}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">{description}</p>
              </div>

              {/* Metadata */}
              <div className="space-y-3 py-6 border-y">
                {publication.issue && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.issue}:</span>
                    <span className="font-medium">{publication.issue}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.year}:</span>
                  <span className="font-medium">{publication.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.language}:</span>
                  <span className="font-medium">{getLanguageLabel(publication.language)}</span>
                </div>
              </div>

              {/* Topics */}
              {publication.topics.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">{t.topics}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {publication.topics.map((topic) => (
                      <span key={topic} className="px-3 py-1 rounded-full bg-muted text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" className="flex-1" asChild>
                  <a href={publication.pdfUrl} download>
                    <Download className="h-5 w-5" />
                    {t.download}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href={publication.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="h-5 w-5" />
                    {t.readOnline}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
