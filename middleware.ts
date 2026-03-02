import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

const LOCALES = ["ar", "fr", "en"] as const

function getLocaleFromPath(pathname: string) {
  const seg = pathname.split("/").filter(Boolean)[0]
  return LOCALES.includes(seg as any) ? seg : "ar"
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // نحمي فقط مسارات الأدمن
  // مثال: /ar/admin/news , /ar/admin/news/new , /ar/admin/news/1 ...
  const isAdminRoute = /^\/(ar|fr|en)\/admin(\/.*)?$/.test(pathname)
  const isLoginRoute = /^\/(ar|fr|en)\/admin\/login$/.test(pathname)

  if (!isAdminRoute || isLoginRoute) return NextResponse.next()

  let res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data } = await supabase.auth.getUser()
  const user = data.user

  // إذا ما في مستخدم → روح على صفحة اللوجين
  if (!user) {
    const locale = getLocaleFromPath(pathname)
    const next = encodeURIComponent(pathname)
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}/admin/login`
    url.search = `?next=${next}`
    return NextResponse.redirect(url)
  }

  return res
}

export const config = {
  matcher: ["/(ar|fr|en)/admin/:path*"],
}