import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { NotaCuidado } from "@/components/nota-cuidado";
import { CtaWhatsapp } from "@/components/cta-whatsapp";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Francisca Giner Mellado: profesora de historia con formación en estudios culturales, autora de un acompañamiento simbólico que parte del rigor histórico-académico.",
};

export default function SobreMi() {
  return (
    <>
      <PageHero title="Sobre mí" subtitle="Qué es Astrología y Herbolaria, y desde dónde se construye esta práctica." />

      <section className="bg-rosa-palido py-lg">
        <div className="contenedor mx-auto max-w-[68ch]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/placeholder-retrato.svg"
            alt="Umbral con luna creciente, motivo simbólico de la práctica — imagen de referencia, pendiente de reemplazo por fotografía real"
            width={400}
            height={500}
            fetchPriority="high"
            className="mb-md rounded-borde"
          />

          <h2>Quién soy</h2>
          <p>
            Soy Francisca Giner Mellado, profesora de historia con estudios de postgrado en estudios culturales
            y formación en ciencias sociales e investigación cualitativa. Esa trayectoria es el punto de partida
            de este trabajo: llegué a la astrología y al tarot no como sistemas de predicción, sino como
            lenguajes simbólicos que se pueden estudiar con el mismo rigor con que se estudia cualquier otra
            tradición histórica.
          </p>
          <p>
            De manera paralela, sostengo una práctica ritual y de herbolaria heredada de un saber que se
            transmite de generación en generación, y que abordo con ese mismo cuidado documental: como una
            tradición que merece ser comprendida en su contexto, no reducida a fórmula ni a espectáculo.
          </p>

          <h2>Por qué el rigor histórico-académico</h2>
          <p>
            Buena parte de lo que circula hoy sobre astrología, tarot y ritual apela a certezas absolutas o a un
            lenguaje que promete resultados. Este espacio parte de otro lugar: entiende estas prácticas como
            sistemas de imágenes y arquetipos —mapas simbólicos para pensar la propia historia—, no como
            herramientas para anticipar lo que va a ocurrir. El trabajo consiste en leer correspondencias, no en
            prometer desenlaces.
          </p>

          <h2>Visión y misión</h2>
          <p>
            La visión de esta práctica es sostener un espacio donde lo simbólico se pueda habitar con seriedad y
            calidez a la vez: sin la frialdad de lo puramente académico, pero también sin la vaguedad de lo
            genéricamente espiritual. La misión, sesión a sesión, es acompañar procesos de autoconocimiento
            dejando siempre la agencia y la decisión en quien consulta.
          </p>

          <h2>Límites de esta práctica</h2>
          <p>Para que sepas con claridad qué puedes y qué no puedes esperar de este espacio:</p>
          <ul className="mb-sm list-disc pl-[1.25em]">
            <li>No reemplazo la atención de psicólogos ni de otros profesionales de la salud mental.</li>
            <li>No practico chamanismo ni ofrezco trabajos rituales de riesgo o de magia avanzada.</li>
            <li>No trabajo con niños, niñas ni adolescentes.</li>
          </ul>
          <NotaCuidado>Si estás atravesando una crisis, busca apoyo profesional.</NotaCuidado>
        </div>
      </section>

      <section className="bg-champan py-lg">
        <div className="contenedor">
          <CtaWhatsapp />
        </div>
      </section>
    </>
  );
}
