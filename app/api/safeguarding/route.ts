import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "0.0.0.0";
  const ua = req.headers.get("user-agent") || "";
  const body = await req.json();

  const admin = supabaseAdmin();
  const { error } = await admin.from("safeguarding_reports").insert({
    locale: body?.locale ?? "ar",
    is_anonymous: !!body?.isAnonymous,
    reporter: body?.reporter ?? null,
    concern: body?.concern ?? null,
    user_agent: ua,
    ip
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ ok:false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok:true });
}
