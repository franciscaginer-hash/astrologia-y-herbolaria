"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { calcularFaseLunar, type FaseLunar } from "@/lib/moon-phase";

export function LogoVideo() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [fase, setFase] = useState<FaseLunar | null>(null);

  useEffect(() => {
    // Mounted-gate deliberado: el video/máscara solo debe montarse en cliente,
    // y la fase lunar depende de la hora local del visitante (no del servidor).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setFase(calcularFaseLunar());
    const intervalo = setInterval(() => setFase(calcularFaseLunar()), 60 * 60_000);
    return () => clearInterval(intervalo);
  }, []);

  // Ancho de la sombra que cubre la porción no iluminada del disco (0 a 1).
  const sombraAncho = fase ? (1 - fase.iluminacion) * 100 : 0;
  const sombraLado = fase?.creciente ? "left" : "right";
  const sombraRadio = fase?.creciente
    ? "0 999px 999px 0 / 0 999px 999px 0"
    : "999px 0 0 999px / 999px 0 0 999px";

  return (
    <div className="relative mx-auto mb-md h-[180px] w-[180px] sm:h-[220px] sm:w-[220px] md:h-[280px] md:w-[280px]">
      <div
        aria-hidden="true"
        className="absolute inset-[-16px] rounded-full bg-[radial-gradient(circle,rgb(184_146_74_/_0.35),transparent_70%)] blur-md"
      />
      <div aria-hidden="true" className="absolute inset-0 rounded-full ring-1 ring-oro/40" />

      {/* el arte rota lentamente; la sombra de fase lunar (abajo) no rota con él */}
      <motion.div
        className="h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 180, repeat: Infinity, ease: "linear" }}
      >
        {mounted && !reduce ? (
          <video
            className="h-full w-full rounded-full object-cover mix-blend-multiply"
            style={{
              maskImage: "radial-gradient(circle, black 72%, transparent 97%)",
              WebkitMaskImage: "radial-gradient(circle, black 72%, transparent 97%)",
            }}
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
            style={{
              maskImage: "radial-gradient(circle, black 72%, transparent 97%)",
              WebkitMaskImage: "radial-gradient(circle, black 72%, transparent 97%)",
            }}
          />
        )}
      </motion.div>

      {/* sombra de la fase lunar del día, sobre el disco, sin rotar */}
      {mounted && fase && (
        <div className="absolute inset-0 overflow-hidden rounded-full" aria-hidden="true">
          <div
            className="absolute inset-y-0"
            style={{
              [sombraLado]: 0,
              width: `${sombraAncho}%`,
              borderRadius: sombraRadio,
              background: "rgb(62 45 92 / 0.78)",
              transition: "width 1s ease",
            }}
          />
        </div>
      )}
    </div>
  );
}
