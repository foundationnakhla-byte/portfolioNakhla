"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "nf_consent";
const COOKIE_MAX_AGE_DAYS = 180;

function setCookie(name: string, value: string, days: number) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME);
    if (!consent) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-3xl m-3 rounded-xl border bg-white/95 backdrop-blur p-4 shadow-lg">
        <p className="text-sm leading-6">
          نستخدم الكوكيز لتحسين تجربتك وتحليل أداء الموقع. فيك تقبل أو ترفض.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => {
              setCookie(COOKIE_NAME, "accepted", COOKIE_MAX_AGE_DAYS);
              setVisible(false);
            }}
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium bg-black text-white hover:opacity-90"
          >
            أوافق
          </button>
          <button
            onClick={() => {
              setCookie(COOKIE_NAME, "declined", COOKIE_MAX_AGE_DAYS);
              setVisible(false);
            }}
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium border hover:bg-gray-50"
          >
            رفض
          </button>
          {/* رابط لسياسة الخصوصية (عدّل المسار إذا عندك صفحة جاهزة) */}
          <a
            href="/privacy"
            className="ml-auto text-sm underline hover:opacity-80"
          >
            سياسة الخصوصية
          </a>
        </div>
      </div>
    </div>
  );
}
