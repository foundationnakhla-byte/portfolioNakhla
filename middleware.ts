import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ADMIN_PATH = /\/(ar|fr|en)\/admin(\/|$)/

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl

  // فقط مسارات الأدمن
  if (!ADMIN_PATH.test(pathname)) return NextResponse.next()

  // اسم صفحة تسجيل الدخول عندك: /[locale]/admin/login
  // إذا كان المستخدم أصلاً بصفحة اللوجين، خليه
  if (pathname.includes("/admin/login")) return NextResponse.next()

  // فحص وجود Session من كوكي Supabase (الطريقة الأبسط: كوكي access token)
  // ملاحظة: أسماء الكوكي تختلف حسب إعدادات supabase helpers.
  // غالباً ستجد كوكي يبدأ بـ: "sb-" وفيه "auth-token"
  const hasAuthCookie =
    req.cookies.getAll().some((c) => c.name.includes("sb-") && c.name.includes("auth-token")) ||
    req.cookies.getAll().some((c) => c.name.includes("supabase") && c.name.includes("auth"))

  if (!hasAuthCookie) {
    const locale = pathname.split("/")[1] || "ar"
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}/admin/login`
    url.searchParams.set("next", pathname + (searchParams.toString() ? `?${searchParams}` : ""))
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/:path*"],
}