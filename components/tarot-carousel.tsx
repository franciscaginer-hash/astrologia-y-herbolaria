"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

type Carta = { href: string; titulo: string; descripcion: string };

const CARTAS: Carta[] = [
  {
    href: "#que-es",
    titulo: "¿Qué es?",
    descripcion: "Astrología y herbolaria como lenguajes simbólicos y saberes heredados.",
  },
  {
    href: "/servicios",
    titulo: "Servicios",
    descripcion: "Sesiones de acompañamiento simbólico y práctica ritual.",
  },
  {
    href: "/sobre-mi",
    titulo: "Sobre mí",
    descripcion: "Quién soy y desde dónde parte esta práctica.",
  },
  {
    href: "#newsletter",
    titulo: "El cielo del mes",
    descripcion: "Una lectura mensual que cruza tu carta natal con la luna llena.",
  },
  {
    href: "/blog",
    titulo: "Blog",
    descripcion: "Notas para pensar en voz alta sobre astrología, herbolaria y tarot.",
  },
];

function CartaTarot({ href, titulo, descripcion }: Carta) {
  return (
    <Link
      href={href}
      className="group relative flex aspect-[2/3.2] h-full flex-col justify-between rounded-borde border border-oro/50 bg-blanco p-md text-left no-underline shadow-[0_12px_28px_-16px_rgb(62_45_92_/_0.35)] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="pointer-events-none absolute inset-[6px] rounded-[3px] border border-oro/25" />
      <div className="relative flex justify-center pt-xs">
        <svg className="h-7 w-7 stroke-oro stroke-1" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="10" />
          <path d="M16 6v4M16 22v4M6 16h4M22 16h4" />
        </svg>
      </div>
      <div className="relative text-center">
        <h3 className="mb-xs text-ciruela">{titulo}</h3>
        <p className="text-[0.85rem] leading-snug">{descripcion}</p>
      </div>
      <p className="relative text-center font-titulos text-[0.8rem] italic text-ciruela-suave opacity-0 transition-opacity group-hover:opacity-100">
        revelar
      </p>
    </Link>
  );
}

export function TarotCarousel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mounted-gate deliberado: Swiper es solo-navegador, no debe montarse en SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-2 gap-md sm:grid-cols-3 md:grid-cols-5">
        {CARTAS.map((carta) => (
          <CartaTarot key={carta.href} {...carta} />
        ))}
      </div>
    );
  }

  return (
    <div
      style={
        {
          "--swiper-pagination-color": "var(--color-oro)",
          "--swiper-pagination-bullet-inactive-color": "var(--color-ciruela)",
          "--swiper-pagination-bullet-inactive-opacity": "0.3",
        } as React.CSSProperties
      }
    >
      <Swiper
        modules={[EffectCoverflow, Pagination]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={1.6}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2.6, spaceBetween: 20 },
          1024: { slidesPerView: 4.2, spaceBetween: 24 },
        }}
        coverflowEffect={{
          rotate: 22,
          slideShadows: false,
          stretch: 0,
          depth: 80,
          modifier: 1.5,
        }}
        pagination={{ clickable: true }}
        className="!py-6 !pb-14"
      >
        {CARTAS.map((carta) => (
          <SwiperSlide key={carta.href} className="!h-auto">
            <CartaTarot {...carta} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
