// lib/news-data.ts
import { supabaseBrowser } from "@/lib/supabase/supabaseBrowser"
import { supabaseServer } from "@/lib/supabase/supabaseServer"
import type { Locale } from "@/lib/i18n"

/* ========= PUBLIC (client) ========= */
export async function getPublishedNewsClient() {
  return supabaseBrowser
    .from("news")
    .select("id, cover_url, published_at, geo_name, title_i18n, excerpt_i18n")
    .eq("status", "published")
    .order("published_at", { ascending: false })
}

/* ========= SERVER (homepage latest 3) ========= */
export async function getLatestNews(locale: Locale) {
  const sb = await supabaseServer()
  const { data } = await sb
    .from("news")
    .select("id, cover_url, published_at, geo_name, title_i18n, excerpt_i18n")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3)

  return data || []
}

/* ========= SINGLE NEWS (client) ========= */
export async function getNewsByIdClient(id: string | number) {
  return supabaseBrowser.from("news").select("*").eq("id", id).single()
}

/* ========= ADMIN (server) ========= */
export async function getAllNewsAdmin() {
  const sb = await supabaseServer()
  return sb.from("news").select("*").order("created_at", { ascending: false })
}

export async function deleteNews(id: number) {
  const sb = await supabaseServer()
  return sb.from("news").delete().eq("id", id)
}

export async function createNews(payload: any) {
  const sb = await supabaseServer()
  return sb.from("news").insert(payload)
}

export async function updateNews(id: number, payload: any) {
  const sb = await supabaseServer()
  return sb.from("news").update(payload).eq("id", id)
}
