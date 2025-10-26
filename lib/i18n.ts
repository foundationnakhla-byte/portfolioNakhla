export type Locale = "ar" | "fr" | "en"

export const locales: Locale[] = ["ar", "fr", "en"]
export const defaultLocale: Locale = "ar"

export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  fr: "Français",
  en: "English",
}

export const localeDirections: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  fr: "ltr",
  en: "ltr",
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return localeDirections[locale]
}

export function isRTL(locale: Locale): boolean {
  return localeDirections[locale] === "rtl"
}
