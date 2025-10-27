import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail , X } from "lucide-react"
import type { Locale } from "@/lib/i18n"

interface SiteFooterProps {
  locale: Locale
  translations: any
}

export function SiteFooter({ locale, translations }: SiteFooterProps) {
  const t = translations.footer
  const nav = translations.nav

  return (
    <footer className="border-t bg-muted/30 ">
      <div className="container despmar pxx py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center despmar   gap-2">
        <Link href={`/${locale}`} className="flex pxx sder items-center gap-2">
          <div className="flex h-15 w-15 items-center  justify-center rounded-lg   text-primary-foreground">
<img src="/images/logo.png" className="ronds" alt="" />          </div>
          <span className="text-xl sderh font-bold text-foreground">{locale === "ar" ? "نخلة" : "Nakhla"}</span>
        </Link>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/publications`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {nav.publications}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/volunteer`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {nav.volunteer}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/partnerships`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {nav.partnerships}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t.legal}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/safeguarding`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.safeguarding}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4 ">
            <h3 className="font-semibold sders">{t.followUs}</h3>
            <div className="flex gap-3 sder">
              <a
                href="https://www.facebook.com/nakhla.found"
                className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href=" https://www.instagram.com/nakhla.found"
                className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background hover:bg-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href=" https://www.linkedin.com/company/nakhla-found"
                className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background hover:bg-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="  https://x.com/nakhla_found"
                className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background hover:bg-accent transition-colors"
                aria-label="LinkedIn"
              >
                <X className="h-5 w-5" />
              </a>

              <a
                href="legal@nakhla-found.com"
                className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background hover:bg-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {locale === "ar" ? "مؤسسة نخلة" : "Nakhla Foundation"}. {t.allRightsReserved}.
          </p>
        </div>
      </div>
    </footer>
  )
}
