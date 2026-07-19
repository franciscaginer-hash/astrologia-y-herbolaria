"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { calcularMomentoDelDia, type MomentoDelDia } from "@/lib/moon-phase";

const CIELOS: Record<MomentoDelDia, string> = {
  noche: "linear-gradient(180deg, #241a38 0%, #3e2d5c 60%, #5a4478 100%)",
  amanecer: "linear-gradient(180deg, #5a4478 0%, #b8924a 55%, #f6e9e4 100%)",
  dia: "linear-gradient(180deg, #f6e9e4 0%, #f2e6d6 100%)",
  atardecer: "linear-gradient(180deg, #3e2d5c 0%, #b8924a 55%, #f2e6d6 100%)",
};

const ESTRELLAS = [
  { x: 60, y: 40, r: 1.2 },
  { x: 140, y: 70, r: 0.9 },
  { x: 220, y: 30, r: 1.4 },
  { x: 340, y: 55, r: 1 },
  { x: 420, y: 25, r: 1.1 },
  { x: 500, y: 65, r: 0.8 },
  { x: 560, y: 35, r: 1.3 },
];

export function LandscapeScene() {
  const reduce = useReducedMotion();
  const [momento, setMomento] = useState<MomentoDelDia>("dia");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mounted-gate deliberado: el momento del día depende de la hora local
    // del visitante, no puede calcularse en el servidor (export estático).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setMomento(calcularMomentoDelDia());
    const intervalo = setInterval(() => {
      setMomento(calcularMomentoDelDia());
    }, 60_000);
    return () => clearInterval(intervalo);
  }, []);

  const cielo = mounted ? CIELOS[momento] : CIELOS.dia;
  const esNoche = mounted && momento === "noche";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* cielo: transición suave entre momentos del día */}
      <div
        className="absolute inset-0 transition-[background] duration-[3000ms] ease-in-out"
        style={{ background: cielo }}
      />

      <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice">
        {/* estrellas, solo de noche */}
        <g style={{ opacity: esNoche ? 0.8 : 0, transition: "opacity 3000ms ease-in-out" }}>
          {ESTRELLAS.map((estrella, i) => (
            <circle key={i} cx={estrella.x} cy={estrella.y} r={estrella.r} fill="#f2e6d6" />
          ))}
        </g>

        {/* horizonte: lomas suaves */}
        <path
          d="M -20 260 Q 100 220 220 250 T 460 240 T 640 255 L 640 400 L -20 400 Z"
          fill="var(--color-ciruela-suave)"
          opacity="0.18"
        />
        <path
          d="M -20 290 Q 150 260 300 285 T 640 280 L 640 400 L -20 400 Z"
          fill="var(--color-ciruela-suave)"
          opacity="0.28"
        />

        <defs>
          <radialGradient id="umbral-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-rosa-palido)" stopOpacity="0.9" />
            <stop offset="55%" stopColor="var(--color-oro)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-oro)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* sendero: converge hacia el umbral */}
        <path d="M -40 400 L 300 150" stroke="var(--color-ciruela-suave)" strokeWidth="2" fill="none" opacity="0.55" />
        <path d="M 640 400 L 300 150" stroke="var(--color-ciruela-suave)" strokeWidth="2" fill="none" opacity="0.55" />
        {[
          { y: 370, half: 190 },
          { y: 320, half: 130 },
          { y: 265, half: 82 },
          { y: 210, half: 42 },
        ].map(({ y, half }) => (
          <line
            key={y}
            x1={300 - half}
            y1={y}
            x2={300 + half}
            y2={y}
            stroke="var(--color-ciruela-suave)"
            strokeWidth="1.5"
            opacity="0.3"
          />
        ))}

        {/* umbral: arco de luz en el punto de fuga */}
        <circle cx="300" cy="150" r="70" fill="url(#umbral-glow)" />
        <path
          d="M 270 182 L 270 137 A 30 30 0 0 1 330 137 L 330 182"
          stroke="var(--color-oro)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />

        {mounted && !reduce && (
          <motion.circle
            cx="300"
            r="3.5"
            fill="var(--color-oro)"
            animate={{ cy: [390, 155], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeIn",
              times: [0, 0.15, 0.85, 1],
            }}
          />
        )}
      </svg>
    </div>
  );
}
