import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseServer";

const schema = z.object({
  bucket: z.string(),
  path: z.string(),            // مثال: volunteers/123_cv.pdf
  contentType: z.string().optional().default("application/octet-stream"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bucket, path, contentType } = schema.parse(body);

    const admin = supabaseAdmin();

    // أنشئ Signed Upload URL
    const { data, error } = await admin.storage.from(bucket).createSignedUploadUrl(path);
    if (error || !data?.signedUrl) {
      return NextResponse.json(
        { ok: false, error: error?.message || "Failed to create signed upload URL" },
        { status: 400 }
      );
    }

    // رابط العرض (إن كان البكت Public سيعمل مباشرة)
    const { data: pub } = admin.storage.from(bucket).getPublicUrl(path);

    return NextResponse.json({
      ok: true,
      uploadUrl: data.signedUrl,
      publicUrl: pub.publicUrl,
      path,
      contentType,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "invalid" }, { status: 400 });
  }
}
