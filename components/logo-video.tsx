"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export function LogoVideo() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative mx-auto mb-md h-[180px] w-[180px] sm:h-[220px] sm:w-[220px] md:h-[280px] md:w-[280px]">
      <div
        aria-hidden="true"
        className="absolute inset-[-16px] rounded-full bg-[radial-gradient(circle,rgb(184_146_74_/_0.35),transparent_70%)] blur-md"
      />
      <div aria-hidden="true" className="absolute inset-0 rounded-full ring-1 ring-oro/40" />

      {mounted && !reduce ? (
        <video
          className="h-full w-full rounded-full object-cover mix-blend-multiply"
          poster="/img/logo-luna-rosa-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/img/logo-luna-rosa.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/img/logo-luna-rosa-poster.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full rounded-full object-cover mix-blend-multiply"
        />
      )}
    </div>
  );
}
