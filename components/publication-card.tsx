import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"
import type { Publication } from "@/lib/publications-data"
import type { Locale } from "@/lib/i18n"

interface PublicationCardProps {
  publication: Publication
  locale: Locale
  translations: any
}

export function PublicationCard({ publication, locale, translations }: PublicationCardProps) {
  const t = translations.library

  const title = locale === "ar" ? publication.titleAr : locale === "fr" ? publication.titleFr : publication.title
  const description =
    locale === "ar" ? publication.descriptionAr : locale === "fr" ? publication.descriptionFr : publication.description

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "kanoun":
        return "bg-blue-100 text-blue-700"
      case "ana-wa-anta":
        return "bg-purple-100 text-purple-700"
      case "booklet":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

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

  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card hover:shadow-lg transition-all">
      <Link href={`/${locale}/library/${publication.id}`}>
        <div className="aspect-[3/4] relative overflow-hidden bg-muted">
          <Image
            src={publication.coverImage || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(publication.category)}`}>
            {getCategoryLabel(publication.category)}
          </span>
          {publication.issue && (
            <span className="text-xs text-muted-foreground">
              {t.issue} {publication.issue}
            </span>
          )}
        </div>
        <Link href={`/${locale}/library/${publication.id}`}>
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
            <Link href={`/${locale}/library/${publication.id}`}>
              <Eye className="h-4 w-4" />
              {t.view}
            </Link>
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <a href={publication.pdfUrl} download>
              <Download className="h-4 w-4" />
              {t.download}
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
