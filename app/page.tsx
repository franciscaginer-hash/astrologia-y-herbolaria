import Link from "next/link";
import { Newsletter } from "@/components/newsletter";
import { LogoVideo } from "@/components/logo-video";
import { ScrollReveal } from "@/components/scroll-reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { PillarsCarousel } from "@/components/pillars-carousel";
import { TarotCarousel } from "@/components/tarot-carousel";
import { LandscapeScene } from "@/components/landscape-scene";
import { buildWhatsappLink } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <LandscapeScene />
        <div className="contenedor relative z-10 py-xl pb-lg text-center">
          <LogoVideo />

          <MagneticButton
            href={buildWhatsappLink("Hola, me gustaría agendar una hora.")}
            variant="primario"
            external
            className="mb-md"
          >
            Agenda tu hora
          </MagneticButton>

          <p className="mb-sm font-titulos text-[1.4rem] text-ciruela-suave">El umbral</p>
          <h1 className="text-[2.25rem] md:text-[3.25rem]">Astrología y Herbolaria</h1>
          <p className="mx-auto mb-lg max-w-[60ch] text-[1.05rem]">
            Un espacio de acompañamiento simbólico en Santiago, Chile: astrología, tarot y saberes heredados de
            herbolaria, para habitar el cruce entre lo cotidiano y lo ritual con rigor y calidez.
          </p>

          <TarotCarousel />
        </div>
      </section>

      {/* ============ QUÉ ES ============ */}
      <section id="que-es" className="scroll-mt-lg bg-rosa-palido py-lg">
        <ScrollReveal className="contenedor">
          <h2>¿Qué es Astrología y Herbolaria?</h2>
          <p className="max-w-[65ch]">
            Un espacio donde la astrología, el tarot y la herbolaria se trabajan como lenguajes simbólicos y
            saberes heredados, para pensar el propio proceso.
          </p>
        </ScrollReveal>
        <div className="mt-md">
          <PillarsCarousel />
        </div>
        <div className="contenedor text-center">
          <Link
            href="/sobre-mi"
            className="inline-block rounded-borde border border-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-ciruela no-underline transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
          >
            Conocer más sobre esta práctica
          </Link>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="scroll-mt-lg bg-rosa-palido py-lg" id="newsletter">
        <ScrollReveal className="contenedor">
          <Newsletter />
        </ScrollReveal>
      </section>
    </>
  );
}
