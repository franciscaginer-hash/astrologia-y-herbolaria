import type { Metadata } from "next";
import { ArticleHeader } from "@/components/article-header";
import { NotaCuidado } from "@/components/nota-cuidado";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { formatFecha } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Herbolaria como saber heredado",
  description:
    "Sobre la diferencia entre estudiar una tradición y prometer un efecto: cómo abordamos la herbolaria en esta práctica.",
};

export default function ArticuloHerbolariaAncestral() {
  return (
    <>
      <section className="bg-rosa-palido py-lg">
        <div className="contenedor mx-auto max-w-[68ch]">
          <ArticleHeader fecha={formatFecha(new Date(2026, 5, 20))} titulo="Herbolaria como saber heredado" />

          <p>
            Hay una manera de hablar de las plantas que promete resultados: tal hierba &ldquo;sirve para&rdquo;
            tal cosa, tal preparación &ldquo;elimina&rdquo; tal malestar. Esa manera de hablar no es la que se
            usa en este espacio, y vale la pena explicar por qué.
          </p>

          <h2>Estudiar una tradición, no vender un efecto</h2>
          <p>
            La herbolaria que se trabaja aquí proviene de un saber heredado: prácticas transmitidas de
            generación en generación, ligadas a gestos domésticos y rituales concretos. Abordar ese saber con
            rigor significa tratarlo como se trataría cualquier tradición histórica —con atención a su origen,
            su contexto y su función simbólica— y no como un catálogo de propiedades medicinales comprobadas.
            No se hacen afirmaciones sobre efectos terapéuticos de ninguna planta ni preparación.
          </p>

          <h2>El gesto como parte del proceso</h2>
          <p>
            Buena parte del valor de estas prácticas está en el gesto mismo: el tiempo que toma preparar algo
            con las manos, la atención que exige, el ritmo que impone. Ese gesto puede acompañar un proceso
            personal —marcar un cambio de estación, sostener un hábito, dar forma a una intención—, pero lo
            hace como parte de un ritual, no como una intervención con efectos garantizados.
          </p>

          <h2>Un saber que convive con otros cuidados</h2>
          <p>
            Trabajar con herbolaria ancestral no implica reemplazar ningún otro tipo de cuidado. Si hay una
            condición de salud física o mental de por medio, ese es siempre el lugar de un profesional
            competente; esta práctica ritual se sostiene en paralelo, como gesto simbólico, no como tratamiento.
          </p>

          <NotaCuidado>
            Este artículo tiene un carácter general y educativo. No contiene indicaciones de uso ni afirmaciones
            medicinales sobre ninguna planta o preparación, y no reemplaza atención médica o psicológica. Si
            estás atravesando una crisis, busca apoyo profesional.
          </NotaCuidado>
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
