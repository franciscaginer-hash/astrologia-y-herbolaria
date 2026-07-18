import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { NotaCuidado } from "@/components/nota-cuidado";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { formatCLP } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Catálogo de sesiones de astrología, tarot y práctica ritual. Acompañamiento simbólico en Santiago, Chile, presencial y online.",
};

export default function Servicios() {
  return (
    <>
      <PageHero
        title="Servicios"
        subtitle="Cada sesión es un espacio de conversación e interpretación. Elige el formato que corresponda a tu proceso; si tienes dudas sobre cuál es el adecuado, puedes escribirme antes de reservar."
      />

      <section className="contenedor pb-lg">
        <h2>Para quién es este espacio</h2>
        <p className="max-w-[65ch]">
          Este acompañamiento suele resonar en mujeres entre 25 y 45 años que atraviesan una búsqueda de sentido:
          curiosidad por lo espiritual sin querer entregarle certezas absolutas, procesos de desarrollo personal,
          o momentos donde conviene mirar de cerca una relación de pareja. No es necesario tener experiencia
          previa con la astrología o el tarot para comenzar.
        </p>
      </section>

      <section className="bg-rosa-palido py-lg" id="linea-a">
        <div className="contenedor">
          <svg
            className="mb-xs block h-8 w-8 stroke-oro stroke-1"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path d="M16 2 L18 14 L30 16 L18 18 L16 30 L14 18 L2 16 L14 14 Z" />
          </svg>
          <h2>Línea A · Acompañamiento simbólico</h2>
          <p className="max-w-[65ch]">
            Sesiones de astrología y tarot entendidas como lenguajes de autoconocimiento: un espacio para leer
            imágenes y arquetipos junto a tu propia historia, no para anticipar hechos futuros.
          </p>

          <div className="grid grid-cols-1 gap-md min-[900px]:grid-cols-3">
            <ServiceCard
              etiqueta="Si es tu primera vez, empieza aquí"
              titulo="Carta natal con entrevista previa"
              descripcion="Lectura completa de carta natal, precedida de una entrevista para situar tu momento y tus preguntas."
              paraQuien="Para quien quiere una primera aproximación profunda a su carta."
              precio={formatCLP(75000)}
              ctaLabel="Agendar por WhatsApp"
              ctaMensaje="Hola, me gustaría agendar una Carta natal con entrevista previa."
            />
            <ServiceCard
              titulo="Sesión de astrología · 60 min"
              descripcion="Conversación en torno a tu carta natal o a un tránsito específico que quieras revisar."
              paraQuien="Para quien ya conoce su carta y quiere profundizar en un tema."
              precio={formatCLP(50000)}
              ctaLabel="Agendar por WhatsApp"
              ctaMensaje="Hola, me gustaría agendar una Sesión de astrología de 60 minutos."
            />
            <ServiceCard
              titulo="Revolución solar"
              descripcion="Lectura del ciclo anual que comienza en tu cumpleaños, como marco para pensar el año que se abre."
              paraQuien="Para quien quiere situar el año que comienza."
              precio={formatCLP(50000)}
              ctaLabel="Agendar por WhatsApp"
              ctaMensaje="Hola, me gustaría agendar una sesión de Revolución solar."
            />
            <ServiceCard
              titulo="Sesión mensual de acompañamiento"
              descripcion="Encuentro breve y periódico para sostener un proceso en el tiempo, revisando tránsitos y preguntas del mes."
              paraQuien="Para quien ya inició un proceso y quiere continuidad."
              precio={formatCLP(35000)}
              ctaLabel="Agendar por WhatsApp"
              ctaMensaje="Hola, me gustaría agendar una Sesión mensual de acompañamiento."
            />
            <ServiceCard
              titulo="Sesión de astrología · 30 min"
              descripcion="Conversación breve y acotada a una pregunta puntual sobre tu carta o tu momento actual."
              paraQuien="Para una consulta específica, sin extenderse."
              precio={formatCLP(30000)}
              ctaLabel="Agendar por WhatsApp"
              ctaMensaje="Hola, me gustaría agendar una Sesión de astrología de 30 minutos."
            />
            <ServiceCard
              titulo="Sesión de tarot · 60 min"
              descripcion="Lectura extendida de tarot como imagen y espejo para pensar una situación o etapa en curso."
              paraQuien="Para quien quiere explorar un tema con detención."
              precio={formatCLP(35000)}
              ctaLabel="Agendar por WhatsApp"
              ctaMensaje="Hola, me gustaría agendar una Sesión de tarot de 60 minutos."
            />
            <ServiceCard
              titulo="Sesión de tarot · 30 min"
              descripcion="Una lectura breve, acotada a una pregunta concreta."
              paraQuien="Para una consulta puntual."
              precio={formatCLP(20000)}
              ctaLabel="Agendar por WhatsApp"
              ctaMensaje="Hola, me gustaría agendar una Sesión de tarot de 30 minutos."
            />
          </div>

          <h3 className="mt-lg">Formatos extendidos</h3>
          <p className="max-w-[65ch]">
            Para procesos que necesitan más que una sesión suelta: informes escritos, mentorías de varias
            semanas, talleres grupales y formación propia.
          </p>
          <div className="mt-md grid grid-cols-1 gap-md min-[900px]:grid-cols-3">
            <ServiceCard
              titulo="Sesión individual 1 a 1"
              descripcion="Conversación de 60 a 90 minutos centrada en astrología, tarot o ambas herramientas integradas, partiendo siempre de lo que trae la persona antes de leer cualquier símbolo."
              paraQuien="Para una primera lectura del propio proceso, sin promesas de pronóstico."
              precio="Precio por definir"
              ctaLabel="Consultar por WhatsApp"
              ctaMensaje="Hola, me gustaría consultar por la Sesión individual 1 a 1."
            />
            <ServiceCard
              titulo="Sesión premium con informe escrito"
              descripcion="Mismo formato de 90 minutos, con un documento personalizado que sistematiza lo trabajado, redactado en lenguaje accesible y sin jerga técnica."
              paraQuien="Para quien atraviesa una decisión importante y quiere un registro al que volver después de la conversación."
              precio="Precio por definir"
              ctaLabel="Consultar por WhatsApp"
              ctaMensaje="Hola, me gustaría consultar por la Sesión premium con informe escrito."
            />
            <ServiceCard
              titulo="Mentoría premium · 4 sesiones"
              descripcion="Proceso de aproximadamente un mes con una progresión pensada de antemano —diagnóstico simbólico, profundización, cierre de integración— combinando astrología, tarot y herbolaria según lo que vaya apareciendo."
              paraQuien="Para preguntas que no se resuelven en un solo encuentro y necesitan sostenerse en el tiempo."
              precio="Precio por definir"
              ctaLabel="Consultar por WhatsApp"
              ctaMensaje="Hola, me gustaría consultar por la Mentoría premium de 4 sesiones."
            />
            <ServiceCard
              titulo="Mentoría premium · 8 sesiones"
              descripcion="Versión extendida de dos a tres meses para tránsitos de mayor envergadura —duelos, reconfiguraciones de identidad—, que incorpora trabajo con plantas y rituales elementales como acompañamiento del ciclo."
              paraQuien="Para procesos donde la pregunta inicial cambia varias veces antes de estabilizarse."
              precio="Precio por definir"
              ctaLabel="Consultar por WhatsApp"
              ctaMensaje="Hola, me gustaría consultar por la Mentoría premium de 8 sesiones."
            />
            <ServiceCard
              titulo="Taller grupal temático"
              descripcion="Encuentro de 2 a 3 horas para 4 a 8 personas en torno a un tema específico —un arquetipo, un tránsito colectivo, un eje de herbolaria estacional— con acuerdos explícitos de confidencialidad."
              paraQuien="Para trabajar lo simbólico en grupo, con espacio real para hablar sin disolverse en el anonimato."
              precio="Precio por definir"
              ctaLabel="Consultar por WhatsApp"
              ctaMensaje="Hola, me gustaría consultar por el Taller grupal temático."
            />
            <ServiceCard
              titulo="Clase individual de formación"
              descripcion="Clase de 60 a 90 minutos en astrología, tarot, herbolaria o historia de estas tradiciones: en vez de recibir una lectura, aprendes a leer, entendiendo primero de dónde viene cada símbolo."
              paraQuien="Para quien busca una introducción seria o quiere profundizar su propia formación."
              precio="Precio por definir"
              ctaLabel="Consultar por WhatsApp"
              ctaMensaje="Hola, me gustaría consultar por una Clase individual de formación."
            />
            <ServiceCard
              titulo="Programa de acompañamiento mensual"
              descripcion="Dos sesiones al mes más recursos y seguimiento entre encuentros, con un ritmo que se ajusta según la etapa del proceso y sin duración mínima fija."
              paraQuien="Para sostener un vínculo en el tiempo, trabajando con los ciclos reales de la propia vida."
              precio="Precio por definir"
              ctaLabel="Consultar por WhatsApp"
              ctaMensaje="Hola, me gustaría consultar por el Programa de acompañamiento mensual."
            />
          </div>
        </div>
      </section>

      <section className="bg-champan py-lg" id="linea-b">
        <div className="contenedor">
          <svg
            className="mb-xs block h-8 w-8 stroke-oro stroke-1"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path d="M16 29 V9 M16 15 C 9 15 7 10 7 5 M16 20 C 23 20 25 15 25 10" />
          </svg>
          <h2>Línea B · Práctica ritual</h2>
          <p className="max-w-[65ch]">
            Un trabajo de saber heredado: gestos, diagnóstico y elementos que provienen de una tradición de
            práctica ritual, abordados con el mismo rigor con que se estudia una tradición histórica.
          </p>
          <NotaCuidado>
            Esta línea no ofrece trabajos de magia avanzados ni prácticas de riesgo, y no reemplaza atención
            clínica o psicológica. Si estás atravesando una crisis, busca apoyo profesional.
          </NotaCuidado>

          <div className="mt-md grid grid-cols-1 gap-md sm:grid-cols-2">
            <ServiceCard
              titulo="Diagnóstico, limpiezas, amuletos y rituales"
              descripcion="Una lectura del gesto ritual apropiado para tu situación, y su elaboración según lo que corresponda: limpieza, amuleto o ritual acotado."
              paraQuien="Para quien busca un gesto simbólico para acompañar un proceso o un umbral concreto."
              precio={`${formatCLP(40000)} – ${formatCLP(120000)}`}
              ctaLabel="Consultar por WhatsApp"
              ctaMensaje="Hola, me gustaría consultar por Diagnóstico, limpiezas, amuletos y rituales."
            />
            <ServiceCard
              titulo="Preparaciones artesanales"
              descripcion="Elaboraciones de herbolaria hechas a mano, preparadas según el saber heredado de esta tradición."
              paraQuien="Para quien quiere incorporar un gesto cotidiano a su proceso."
              precio="Precio por definir"
              ctaLabel="Consultar por WhatsApp"
              ctaMensaje="Hola, me gustaría consultar por las Preparaciones artesanales."
            />
          </div>
        </div>
      </section>

      <section className="bg-rosa-palido py-lg">
        <div className="contenedor">
          <CtaWhatsapp />
        </div>
      </section>
    </>
  );
}
