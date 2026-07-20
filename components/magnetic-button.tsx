"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

const VARIANTES = {
  primario: "border-oro bg-ciruela text-champan hover:bg-[#4a376e]",
  outline: "border-ciruela bg-transparent text-ciruela hover:bg-ciruela hover:text-champan",
} as const;

export function MagneticButton({
  href,
  variant = "outline",
  external = false,
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof VARIANTES;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const clases = cn(
    "inline-block rounded-2xl border-2 px-8 py-4 font-cuerpo text-[0.95rem] font-semibold no-underline transition-colors duration-200",
    VARIANTES[variant],
    className,
  );

  if (external) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className={clases}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionLink
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={clases}
    >
      {children}
    </MotionLink>
  );
}
