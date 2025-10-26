import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseServer";

const schema = z.object({
  locale: z.enum(["ar", "fr", "en"]).default("ar"),
  full_name: z.string().min(2),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),
  dob: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  education: z.string(),
  occupation: z.string(),
  previous_experience: z.string().nullable().optional(),
  skills: z.string().nullable().optional(),
  languages: z.string().nullable().optional(),
  areas_of_interest: z.array(z.string()),
  availability: z.string(),
  hours_per_week: z.number().nullable().optional(),
  start_date: z.string().nullable().optional(),
  motivation: z.string(),
  cv_url: z.string().url(),
  id_copy_url: z.string().url(),
  criminal_record_url: z.string().url(),
  consent: z.boolean().optional()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // اقرأ الـ IP من رؤوس الطلب مباشرة
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";

    const ua = req.headers.get("user-agent") || "";

    const admin = supabaseAdmin();
    const { error } = await admin.from("volunteer_applications").insert({
      locale: data.locale,
      full_name: data.full_name,
      email: data.email ?? null,
      phone: data.phone ?? null,
      dob: data.dob ?? null,
      address: data.address ?? null,
      city: data.city ?? null,
      country: data.country ?? null,
      education: data.education,
      occupation: data.occupation,
      previous_experience: data.previous_experience ?? null,
      skills: data.skills ?? null,
      languages: data.languages ?? null,
      areas_of_interest: data.areas_of_interest,
      availability: data.availability,
      hours_per_week: data.hours_per_week ?? null,
      start_date: data.start_date ?? null,
      motivation: data.motivation,
      cv_url: data.cv_url,
      id_copy_url: data.id_copy_url,
      criminal_record_url: data.criminal_record_url,
      consent: !!data.consent,
      payload: body,       // احتفاظ اختياري بكامل الحمولة
      ip,
      user_agent: ua
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "invalid" }, { status: 400 });
  }
}
