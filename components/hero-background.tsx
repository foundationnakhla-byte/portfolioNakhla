'use client';

import {useEffect, useMemo, useState} from 'react';
import Image from 'next/image';

type Props = {
  images: string[];
  interval?: number; // ms
  className?: string;
  priorityFirst?: boolean;
};

export default function HeroBackground({
  images,
  interval = 6000,
  className = '',
  priorityFirst = true
}: Props) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeImages.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % safeImages.length), interval);
    return () => clearInterval(id);
  }, [safeImages.length, interval]);

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      {/* طبقة الصور المتعاقبة مع تلاشي */}
      {safeImages.map((src, i) => {
        const isActive = i === index;
        return (
          <div
            key={src + i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                        ${isActive ? 'opacity-30' : 'opacity-0'}`}
            aria-hidden={!isActive}
          >
            {/* استخدم Image مع fill للحفاظ على الأداء */}
            <Image
              src={src}
              alt=""
              fill
              priority={priorityFirst && i === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* تدرّج غامق خفيف لتحسين تباين النص */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/50 to-background/60" />
          </div>
        );
      })}
    </div>
  );
}
