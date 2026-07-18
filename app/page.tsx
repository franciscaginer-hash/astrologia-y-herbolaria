import Link from "next/link";
import { Newsletter } from "@/components/newsletter";
import { SectionPanel } from "@/components/section-panel";
import { LogoVideo } from "@/components/logo-video";
import { buildWhatsappLink } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="contenedor py-xl pb-lg text-center">
        <LogoVideo />
        <p className="mb-sm font-titulos text-[1.4rem] text-ciruela-suave">El umbral</p>
        <h1 className="text-[2.25rem] md:text-[3.25rem]">Astrología y Herbolaria</h1>
        <p className="mx-auto mb-md max-w-[60ch] text-[1.05rem]">
          Un espacio de acompañamiento simbólico en Santiago, Chile: astrología, tarot y saberes heredados de
          herbolaria, para habitar el cruce entre lo cotidiano y lo ritual con rigor y calidez.
        </p>
        <div className="flex flex-col items-center gap-sm min-[480px]:flex-row min-[480px]:justify-center">
          <a
            href={buildWhatsappLink("Hola, me gustaría agendar una hora.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-borde border border-transparent bg-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-champan no-underline transition-colors hover:border-oro focus-visible:border-oro"
          >
            Agendar hora
          </a>
          <Link
            href="/servicios"
            className="inline-block rounded-borde border border-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-ciruela no-underline transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
          >
            Ver servicios
          </Link>
        </div>
      </section>

      {/* ============ QUÉ ES ============ */}
      <section className="bg-rosa-palido py-lg">
        <div className="contenedor">
          <h2>¿Qué es Astrología y Herbolaria?</h2>
          <p className="max-w-[65ch]">
            Es un espacio donde la astrología y el tarot se trabajan como lenguajes simbólicos —mapas de imágenes
            y arquetipos para el autoconocimiento— y donde la herbolaria y el trabajo ritual se abordan como
            saberes heredados, con el mismo cuidado con que se estudia una tradición histórica. No son sistemas
            para anticipar el futuro: son gestos para pensar el propio proceso, con la agencia y la decisión
            siempre en quien consulta.
          </p>
          <Link
            href="/sobre-mi"
            className="inline-block rounded-borde border border-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-ciruela no-underline transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
          >
            Conocer más sobre esta práctica
          </Link>
        </div>
      </section>

      {/* ============ PANEL DE SECCIONES ============ */}
      <section className="bg-champan py-lg">
        <div className="contenedor">
          <h2>Explora el sitio</h2>
          <SectionPanel />
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="bg-rosa-palido py-lg" id="newsletter">
        <div className="contenedor">
          <Newsletter />
        </div>
      </section>
    </>
  );
}
