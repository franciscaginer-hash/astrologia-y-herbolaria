"use client";

import { useEffect, useRef } from "react";

export function LogoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefiereMenosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefiereMenosMovimiento) {
      videoRef.current?.play().catch(() => {});
    }
  }, []);

  return (
    <div className="mx-auto mb-sm h-[280px] w-[280px] overflow-hidden rounded-full">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        aria-hidden="true"
        className="h-full w-full scale-[1.3] object-cover"
      >
        <source src="/img/logo-luna-rosa.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
