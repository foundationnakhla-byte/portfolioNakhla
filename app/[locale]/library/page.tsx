"use client"

import { useState } from "react"
import type { Locale } from "@/lib/i18n"
import { getTranslations } from "@/lib/translations"
import { publications, type PublicationCategory } from "@/lib/publications-data"
import { PublicationCard } from "@/components/publication-card"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export default function LibraryPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params
  const translations = getTranslations(locale)
  const t = translations.library

  const [selectedCategory, setSelectedCategory] = useState<PublicationCategory | "all">("all")

  const filteredPublications =
    selectedCategory === "all" ? publications : publications.filter((pub) => pub.category === selectedCategory)

  const categories = [
    { value: "all" as const, label: t.all },
    { value: "kanoun" as const, label: t.kanoun },
    { value: "ana-wa-anta" as const, label: t.anaWaAnta },
    { value: "booklet" as const, label: t.booklet },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container despmar">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b bg-background sticky top-16 z-40">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">{t.filterBy}:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
            <div className="sm:ms-auto text-sm text-muted-foreground">
              {filteredPublications.length} {t.allPublications.toLowerCase()}
            </div>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-16">
        <div className="container">
          {filteredPublications.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPublications.map((publication) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                  locale={locale}
                  translations={translations}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">{t.noResults}</h3>
              <p className="text-muted-foreground">{t.noResultsDesc}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
