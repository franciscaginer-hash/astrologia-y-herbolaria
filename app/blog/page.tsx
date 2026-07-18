import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BlogCard } from "@/components/blog-card";
import { formatFecha } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notas sobre astrología psicológica, herbolaria ancestral y tarot como lenguaje simbólico.",
};

export default function Blog() {
  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Notas breves para pensar en voz alta: astrología, herbolaria y tarot leídos como lenguajes simbólicos."
      />

      <section className="bg-rosa-palido py-lg">
        <div className="contenedor">
          <h2>Artículos recientes</h2>
          <div className="grid grid-cols-1 gap-md min-[900px]:grid-cols-3">
            <BlogCard
              href="/blog/cartografias-del-umbral"
              prioridad
              imagen="/img/placeholder-blog-catalogo.svg"
              imagenAlt="Ilustración lineal de una brújula, trazo fino"
              fecha={formatFecha(new Date(2026, 6, 13))}
              titulo="Cartografías del umbral: un recorrido por los servicios de Astrología y Herbolaria"
              extracto="Un recorrido periodístico por los siete formatos de acompañamiento, servicio por servicio."
            />
            <BlogCard
              href="/blog/astrologia-psicologica"
              imagen="/img/placeholder-blog-astrologia.svg"
              imagenAlt="Ilustración lineal de una constelación, con puntos unidos por trazos finos"
              fecha={formatFecha(new Date(2026, 6, 3))}
              titulo="La carta natal como mapa, no como pronóstico"
              extracto="Por qué leer una carta natal se parece más a interpretar un texto que a predecir un futuro."
            />
            <BlogCard
              href="/blog/herbolaria-ancestral"
              imagen="/img/placeholder-blog-herbolaria.svg"
              imagenAlt="Ilustración lineal de una rama con hojas, trazo delgado"
              fecha={formatFecha(new Date(2026, 5, 20))}
              titulo="Herbolaria como saber heredado"
              extracto="Sobre la diferencia entre estudiar una tradición y prometer un efecto: cómo abordamos la herbolaria en esta práctica."
            />
            <BlogCard
              href="/blog/tarot-como-umbral"
              imagen="/img/placeholder-blog-tarot.svg"
              imagenAlt="Ilustración lineal de una carta de tarot estilizada, trazo fino"
              fecha={formatFecha(new Date(2026, 5, 5))}
              titulo="El tarot como umbral, no como respuesta"
              extracto="Qué significa usar el tarot como imagen para pensar, en vez de usarlo para obtener una respuesta cerrada."
            />
          </div>
        </div>
      </section>
    </>
  );
}
