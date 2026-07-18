import type { Metadata } from "next";
import { ArticleHeader } from "@/components/article-header";
import { NotaCuidado } from "@/components/nota-cuidado";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { formatFecha } from "@/lib/utils";

export const metadata: Metadata = {
  title: "El tarot como umbral, no como respuesta",
  description: "Qué significa usar el tarot como imagen para pensar, en vez de usarlo para obtener una respuesta cerrada.",
};

export default function ArticuloTarotComoUmbral() {
  return (
    <>
      <section className="bg-rosa-palido py-lg">
        <div className="contenedor mx-auto max-w-[68ch]">
          <ArticleHeader fecha={formatFecha(new Date(2026, 5, 5))} titulo="El tarot como umbral, no como respuesta" />

          <p>
            Una de las preguntas más frecuentes en una primera sesión de tarot es si las cartas &ldquo;tienen
            razón&rdquo;. Es una pregunta comprensible, pero está construida sobre una expectativa que conviene
            desarmar antes de empezar: la de que el tarot entrega una respuesta cerrada y externa a quien
            consulta.
          </p>

          <h2>Una imagen, no un veredicto</h2>
          <p>
            Cada carta de tarot es, ante todo, una imagen: una composición de símbolos —figuras, elementos,
            arquetipos— que se puede leer de muchas maneras según el contexto de quien consulta. En este
            espacio, el tarot se trabaja como ese tipo de lenguaje simbólico: una superficie donde proyectar
            una pregunta, no un sistema que dicte un curso de acción.
          </p>

          <h2>El umbral como figura</h2>
          <p>
            Muchas veces las personas llegan a una lectura de tarot en un momento de umbral: el cierre de una
            etapa, el inicio de otra, una decisión que todavía no toma forma clara. El tarot puede ayudar a
            nombrar ese umbral —a darle imagen y palabra a algo que hasta entonces era solo intuición—, pero no
            lo resuelve por quien consulta. La lectura ofrece un vocabulario; la decisión de qué hacer con él
            sigue siendo enteramente tuya.
          </p>

          <h2>Cómo se sostiene esto en la práctica</h2>
          <p>
            En una sesión, esto se traduce en un ejercicio de conversación: se abre una tirada, se describen
            las imágenes que aparecen, y se construye junto a quien consulta una lectura que tenga sentido para
            su historia particular. No hay una interpretación única ni predeterminada. Hay, en cambio, un
            proceso de correspondencia entre la imagen y la propia experiencia.
          </p>

          <NotaCuidado>
            Este artículo tiene un carácter general y educativo. No reemplaza una sesión personalizada ni
            constituye orientación clínica o psicológica. Si estás atravesando una crisis, busca apoyo
            profesional.
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
