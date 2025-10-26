import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseServer";

const schema = z.object({
  locale: z.enum(["ar","fr","en"]).default("ar"),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  subject: z.enum([
    "general","volunteer","partnership","publications",
    "centers","shelters","safeguarding","other"
  ]),
  message: z.string().min(5)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";
    const ua = req.headers.get("user-agent") || "";

    const admin = supabaseAdmin();
    const { error } = await admin.from("contact_messages").insert({
      locale: data.locale,
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      subject: data.subject,
      message: data.message,
      ip,
      user_agent: ua,
      payload: body
    });

    if (error) {
      console.error("[contact] insert error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "invalid" }, { status: 400 });
  }
}
