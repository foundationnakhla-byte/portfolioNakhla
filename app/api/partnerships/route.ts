import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseServer";

const schema = z.object({
  locale: z.enum(["ar", "fr", "en"]).default("ar"),

  organizationType: z.string().min(2),
  organizationName: z.string().min(2),
  contactPerson: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(3),
  website: z.string().url().optional().or(z.literal("").transform(() => undefined)),

  partnershipType: z.enum(["financial","inkind","technical","volunteer","awareness","other"]),
  description: z.string().min(5),
  goals: z.string().min(3),
  resources: z.string().optional(),
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

    // إدخال عبر service role على السيرفر (آمن حتى مع RLS)
    const admin = supabaseAdmin();
    const { error } = await admin.from("partnership_requests").insert({
      locale: data.locale,
      organization_type: data.organizationType,
      organization_name: data.organizationName,
      contact_person: data.contactPerson,
      email: data.email,
      phone: data.phone,
      website: data.website,

      partnership_type: data.partnershipType,
      description: data.description,
      goals: data.goals,
      resources: data.resources,

      ip,
      user_agent: ua,
      payload: body,
    });

    if (error) {
      console.error("[partnerships] insert error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "invalid" }, { status: 400 });
  }
}
