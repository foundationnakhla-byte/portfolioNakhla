// lib/i18nJson.ts

export type Locale = "ar" | "en" | "fr"

export function pickI18n(obj: any, locale: Locale) {
  if (!obj) return ""
  return obj?.[locale] || obj?.ar || obj?.en || obj?.fr || ""
}
