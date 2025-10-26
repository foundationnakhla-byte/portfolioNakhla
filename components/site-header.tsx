"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Menu, X } from "lucide-react"
import type { Locale } from "@/lib/i18n"

interface SiteHeaderProps {
  locale: Locale
  translations: any
}

export function SiteHeader({ locale, translations }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = translations.nav

  const navItems = [
    { href: `/${locale}`, label: t.home },
    { href: `/${locale}/about`, label: t.about },
    { href: `/${locale}/publications`, label: t.publications },
    { href: `/${locale}/centers`, label: t.centers },
    { href: `/${locale}/shelters`, label: t.shelters },
    { href: `/${locale}/volunteer`, label: t.volunteer },
    { href: `/${locale}/partnerships`, label: t.partnerships },
    { href: `/${locale}/safeguarding`, label: t.safeguarding },
    { href: `/${locale}/news`, label: t.news },
    { href: `/${locale}/contact`, label: t.contact },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container despmar flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex h-15 w-15 items-center  justify-center rounded-lg   text-primary-foreground">
<img src="/images/logo.png" className="ronds" alt="" />          </div>
          <span className="text-xl font-bold text-foreground">{locale === "ar" ? "نخلة" : "Nakhla"}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.slice(0, 6).map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" size="sm">
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLocale={locale} />

          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container flex flex-col py-4 gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
