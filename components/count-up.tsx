"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  end: number;              // الرقم النهائي
  start?: number;           // البداية (افتراضي 0)
  duration?: number;        // مدة الحركة بالمللي ثانية (افتراضي 1500)
  locale?: string;          // لتنسيق الرقم حسب اللغة (مثلاً "ar" أو "fr" أو "en")
  className?: string;
  suffix?: string;          // مثل "+"
};

export default function CountUp({
  end,
  start = 0,
  duration = 1500,
  locale = "ar",
  className,
  suffix = "",
}: Props) {
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting;
        if (visible && !startedRef.current) {
          startedRef.current = true;
          animate();
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animate = () => {
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const curr = Math.floor(start + (end - start) * easeOutCubic(progress));
      setValue(curr);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const formatter = new Intl.NumberFormat(locale);

  return (
    <span ref={ref} className={className}>
      {formatter.format(value)}
      {suffix}
    </span>
  );
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
