"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsappLink } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/blog", label: "Blog" },
] as const;

export function Header() {
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cierra el menú al navegar a otra ruta.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAbierto(false);
  }, [pathname]);

  useEffect(() => {
    if (!abierto) return;
    function alClickFuera(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    }
    function alEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierto(false);
    }
    document.addEventListener("mousedown", alClickFuera);
    document.addEventListener("keydown", alEscape);
    return () => {
      document.removeEventListener("mousedown", alClickFuera);
      document.removeEventListener("keydown", alEscape);
    };
  }, [abierto]);

  const itemVariants = {
    cerrado: { opacity: 0, y: reduce ? 0 : -8 },
    abierto: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: reduce ? 0 : i * 0.05, duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <header className="sticky top-0 z-20 border-b border-borde-ciruela-sutil bg-champan/90 shadow-[0_1px_0_0_rgb(184_146_74_/_0.15),0_8px_24px_-16px_rgb(62_45_92_/_0.25)] backdrop-blur-sm">
      <div className="contenedor relative flex items-center justify-between py-sm">
        <Link
          href="/"
          className="font-titulos text-[1.3rem] font-medium leading-[1.1] text-ciruela no-underline"
        >
          Astrología y Herbolaria
          <span className="block font-cuerpo text-[0.65rem] tracking-[0.12em] text-ciruela-suave uppercase">
            por Francisca Giner Mellado
          </span>
        </Link>

        <button
          type="button"
          className="flex items-center gap-2 rounded-borde border border-ciruela px-[1rem] py-[0.6rem] font-cuerpo text-[0.9rem] text-ciruela transition-colors hover:border-oro hover:text-oro"
          aria-expanded={abierto}
          aria-controls="navegacion-principal"
          onClick={() => setAbierto((valor) => !valor)}
        >
          {abierto ? "Cerrar" : "Menú"}
          {abierto ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
        </button>

        <AnimatePresence>
          {abierto && (
            <motion.div
              ref={panelRef}
              id="navegacion-principal"
              aria-label="Navegación principal"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-full z-30 mt-2 flex w-56 flex-col gap-xs rounded-borde border border-oro/25 bg-champan/95 p-sm shadow-[0_16px_40px_-12px_rgb(62_45_92_/_0.35)] backdrop-blur-md"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.href} custom={i} variants={itemVariants} initial="cerrado" animate="abierto">
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-borde px-[0.9rem] py-[0.6rem] text-[0.95rem] tracking-[0.02em] text-ciruela no-underline transition-colors hover:bg-oro/10 hover:text-oro",
                      pathname === link.href && "bg-oro/10 text-oro",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div custom={NAV_LINKS.length} variants={itemVariants} initial="cerrado" animate="abierto">
                <a
                  href={buildWhatsappLink("Hola, me gustaría agendar una hora.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-xs block rounded-borde border border-transparent bg-ciruela px-[0.9rem] py-[0.7rem] text-center font-cuerpo text-[0.95rem] font-semibold text-champan no-underline transition-colors hover:border-oro"
                >
                  Agendar hora
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
