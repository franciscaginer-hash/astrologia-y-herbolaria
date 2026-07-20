"use client";

import { useEffect, useState } from "react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

type Pilar = { titulo: string; descripcion: string };

const PILARES: Pilar[] = [
  {
    titulo: "Astrología y tarot",
    descripcion: "Lenguajes simbólicos: mapas de imágenes y arquetipos para el autoconocimiento.",
  },
  {
    titulo: "Herbolaria y ritual",
    descripcion: "Saberes heredados, abordados con el mismo cuidado con que se estudia una tradición histórica.",
  },
  {
    titulo: "Un gesto, no una promesa",
    descripcion:
      "No son sistemas para anticipar el futuro: son gestos para pensar el propio proceso, con la agencia y la decisión siempre en quien consulta.",
  },
];

function TarjetaPilar({ titulo, descripcion }: Pilar) {
  return (
    <div className="flex h-full flex-col gap-xs rounded-borde border border-borde-ciruela-sutil bg-blanco p-lg text-left">
      <h3 className="text-ciruela">{titulo}</h3>
      <p className="text-[0.95rem]">{descripcion}</p>
    </div>
  );
}

export function PillarsCarousel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mounted-gate deliberado: Swiper es solo-navegador, no debe montarse en SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 gap-md sm:grid-cols-3">
        {PILARES.map((pilar) => (
          <TarjetaPilar key={pilar.titulo} {...pilar} />
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
        slidesPerView={1.15}
        spaceBetween={24}
        breakpoints={{
          640: { slidesPerView: 2.1 },
          1024: { slidesPerView: 2.6 },
        }}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 100,
          modifier: 2,
        }}
        pagination={{ clickable: true }}
        className="pb-14"
      >
        {PILARES.map((pilar) => (
          <SwiperSlide key={pilar.titulo} className="!h-auto">
            <TarjetaPilar {...pilar} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
