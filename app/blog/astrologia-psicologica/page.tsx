import type { Metadata } from "next";
import { ArticleHeader } from "@/components/article-header";
import { NotaCuidado } from "@/components/nota-cuidado";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { formatFecha } from "@/lib/utils";

export const metadata: Metadata = {
  title: "La carta natal como mapa, no como pronóstico",
  description: "Por qué leer una carta natal se parece más a interpretar un texto que a predecir un futuro.",
};

export default function ArticuloAstrologiaPsicologica() {
  return (
    <>
      <section className="bg-rosa-palido py-lg">
        <div className="contenedor mx-auto max-w-[68ch]">
          <ArticleHeader fecha={formatFecha(new Date(2026, 6, 3))} titulo="La carta natal como mapa, no como pronóstico" />

          <p>
            Cuando alguien pide una carta natal por primera vez, casi siempre lo hace con la misma pregunta de
            fondo: &ldquo;¿qué me vas a decir que va a pasar?&rdquo;. Es una pregunta legítima, pero parte de un
            supuesto que vale la pena revisar antes de empezar cualquier lectura.
          </p>

          <p>
            La astrología, tal como se trabaja en este espacio, no es un sistema para anticipar hechos. Es un
            lenguaje simbólico: un conjunto de imágenes y arquetipos —el Sol, la Luna, los planetas, las
            casas— que funcionan como un vocabulario para nombrar procesos internos. Leer una carta natal se
            parece más a interpretar un poema o un texto histórico que a consultar un oráculo. Se buscan
            correspondencias, no certezas.
          </p>

          <h2>Un mapa de tensiones, no una lista de eventos</h2>
          <p>
            Una carta natal describe un momento: la disposición del cielo en un instante y un lugar específicos.
            De ahí en adelante, lo que se puede leer son tensiones, afinidades y ciclos que se repiten con
            distintas formas a lo largo de una vida. No dice qué trabajo vas a tener ni con quién vas a estar.
            Ofrece, en cambio, una estructura para pensar patrones: qué gestos tienden a repetirse, qué zonas
            de la propia historia conviene mirar con más atención en un momento dado.
          </p>

          <h2>El lugar de quien consulta</h2>
          <p>
            Esta distinción no es un matiz menor. Si la carta natal fuera un pronóstico, la persona que consulta
            quedaría en un lugar pasivo, esperando que algo ocurra. Si en cambio es un mapa simbólico, la
            lectura se vuelve un ejercicio compartido: yo puedo señalar una imagen o una correspondencia, pero
            el sentido que esa imagen adquiere en tu historia —y lo que decidas hacer con ella— es enteramente
            tuyo. La agencia permanece donde debe estar: en quien consulta.
          </p>

          <h2>Por qué esta distinción importa</h2>
          <p>
            Trabajar la astrología como lenguaje y no como predicción tiene una consecuencia práctica: cambia
            el tipo de conversación que se puede tener. En vez de preguntar &ldquo;¿qué me espera?&rdquo;, se
            puede preguntar &ldquo;¿qué patrón estoy repitiendo?&rdquo; o &ldquo;¿qué habría que habitar
            distinto en este ciclo?&rdquo;. Son preguntas que abren proceso, no que lo cierran.
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
