import type { Metadata } from "next";
import { ArticleHeader } from "@/components/article-header";
import { NotaCuidado } from "@/components/nota-cuidado";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { formatFecha } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cartografías del umbral: un recorrido por los servicios de Astrología y Herbolaria",
  description:
    "Un recorrido periodístico por los siete formatos de acompañamiento de Astrología y Herbolaria, servicio por servicio.",
};

export default function ArticuloCartografiasDelUmbral() {
  return (
    <>
      <section className="bg-rosa-palido py-lg">
        <div className="contenedor mx-auto max-w-[68ch]">
          <ArticleHeader
            fecha={formatFecha(new Date(2026, 6, 13))}
            titulo="Cartografías del umbral: un recorrido por los servicios de Astrología y Herbolaria"
          />

          <p className="italic text-ciruela-suave">
            Francisca Giner Mellado es historiadora, con formación de posgrado en estudios culturales y más de
            quince años de trayectoria académica. Desde Santiago, sostiene una práctica que lee la astrología, el
            tarot y la herbolaria como lenguajes simbólicos heredados —no como sistemas de predicción—, con el
            mismo rigor con que se estudia una fuente histórica. Esto es lo que ofrece, servicio por servicio.
          </p>

          <p>
            Hay un gesto que se repite en cada conversación con Francisca Giner Mellado: la precisión con la que
            distingue lo que hace de lo que no hace. No lee el futuro. No promete resultados. No mezcla
            tradiciones distintas para producir un efecto de asombro. Lo que ofrece, dice, es &ldquo;un
            vocabulario más amplio para habitar los propios procesos&rdquo; —una frase que podría sonar a eslogan
            si no viniera respaldada por quince años de trabajo académico en historia y estudios culturales, el
            mismo terreno desde el que hoy interpreta cartas natales, arcanos y plantas.
          </p>

          <p>
            Esa doble pertenencia —la universidad y el consultorio— es la clave de &ldquo;El umbral&rdquo;, el
            espacio de trabajo que ha construido bajo el nombre Astrología y Herbolaria. En un panorama saturado
            de cuentas de astrología predictiva y de fusiones difusas entre new age, chamanismo y autoayuda, su
            propuesta ocupa un lugar poco transitado: el de la astrología psicológica y evolutiva, el tarot
            terapéutico y la fitoterapia entendidos como prácticas interpretativas, situadas históricamente, que
            acompañan sin prometer.
          </p>

          <p>A continuación, un mapa de los siete servicios con los que traduce ese enfoque en encuentros concretos.</p>

          <h2>1. La sesión que abre la puerta: consulta individual 1 a 1</h2>
          <p>
            Es la puerta de entrada más frecuente: entre 60 y 90 minutos, presenciales en Santiago u online,
            centrados en astrología, tarot o en ambas herramientas de forma integrada. Quien llega elige el
            enfoque según lo que trae —una pregunta más estructural, ligada a ciclos vitales, suele orientarse
            hacia la astrología; una inquietud más puntual o urgente, hacia el tarot—, aunque Francisca suele dejar
            esa decisión abierta hasta escuchar el motivo de consulta.
          </p>
          <p>
            &ldquo;No empiezo leyendo un símbolo, empiezo escuchando qué trae a la persona a la sesión&rdquo;,
            explica. Esa escucha inicial funciona como encuadre: ubica el motivo de consulta —búsqueda de
            propósito, un vínculo en tensión, una transición vital— antes de que aparezca cualquier carta o
            tránsito planetario. Lo que distingue esta sesión de una lectura predictiva es precisamente ese orden:
            el símbolo se pone al servicio de la pregunta de quien consulta, no al revés. Nadie sale de la sesión
            con un pronóstico; sale con una lectura de su propio proceso y, casi siempre, con una pregunta más
            precisa que la que trajo.
          </p>
          <p>
            <strong>Ficha técnica:</strong> 60–90 min · presencial (Santiago) u online · astrología, tarot o
            integrada · valor por confirmar.
          </p>

          <h2>2. Cuando la sesión necesita quedar por escrito</h2>
          <p>
            La sesión premium retoma el mismo formato de encuentro —90 minutos— pero le suma algo que la consulta
            estándar no ofrece: un documento personalizado que sistematiza lo trabajado. No es una transcripción
            ni un resumen genérico, sino una pieza redactada expresamente para esa persona, con lenguaje accesible
            y sin la jerga técnica que suele hacer ilegibles los informes astrológicos.
          </p>
          <p>
            ¿Quién elige esta modalidad? Con frecuencia, personas que atraviesan un momento de decisión —un
            cambio de rumbo profesional, el cierre de una etapa de pareja— y quieren un registro al que volver
            semanas o meses después, cuando la conversación oral ya se diluyó. El documento cumple esa función de
            ancla: no reemplaza el proceso, lo prolonga. Y como cualquier material que contiene datos natales y
            detalles personales, se trata con el mismo cuidado de anonimización y resguardo que Francisca aplica
            a todo su archivo de clientes.
          </p>
          <p>
            <strong>Ficha técnica:</strong> 90 min + informe escrito personalizado · presencial u online · valor
            por confirmar.
          </p>

          <h2>3. Un mes para sostener una pregunta: mentoría premium de 4 sesiones</h2>
          <p>
            Hay preguntas que no se resuelven en un encuentro. La mentoría de cuatro sesiones —pensada como un
            proceso de aproximadamente un mes— existe para eso: para sostener un motivo de consulta el tiempo
            suficiente como para que las herramientas simbólicas dialoguen entre sí, en lugar de aplicarse una
            sola vez.
          </p>
          <p>
            La estructura no es rígida: hay una progresión pensada de antemano —una primera sesión de diagnóstico
            simbólico, sesiones intermedias de profundización, un cierre de integración—, pero se ajusta según lo
            que va apareciendo. Astrología, tarot y herbolaria pueden alternarse según lo que la persona necesite
            en cada momento del proceso. Y si en el camino aparece algo que excede el encuadre simbólico —una
            crisis de salud mental, una situación de violencia—, el protocolo es explícito: la sesión se detiene,
            se nombra con claridad que ese contenido requiere atención profesional, y se deriva. Francisca es
            enfática en que ninguna de sus herramientas sustituye la atención clínica.
          </p>
          <p>
            <strong>Ficha técnica:</strong> 4 sesiones · ~1 mes · individual · valor por confirmar.
          </p>

          <h2>4. Cuando el proceso necesita más tiempo: mentoría premium de 8 sesiones</h2>
          <p>
            La versión extendida de la mentoría —ocho sesiones repartidas en dos o tres meses— no es simplemente
            &ldquo;el doble&rdquo; de la anterior. Se reserva para tránsitos vitales de mayor envergadura: duelos,
            reconfiguraciones de identidad, procesos donde la pregunta inicial cambia varias veces antes de
            estabilizarse. El tiempo extendido permite algo que un mes no alcanza a sostener: incorporar el
            trabajo con plantas y rituales elementales como acompañamiento de los ciclos —no como intervención
            mágica con efectos prometidos, sino como práctica que da forma simbólica a una transición que, de
            otro modo, quedaría muda.
          </p>
          <p>
            El cierre de este proceso tiene un carácter distinto al de las sesiones intermedias: es un espacio
            dedicado a integrar lo trabajado, no a abrir un tema nuevo. La pregunta que lo organiza no es
            &ldquo;qué va a pasar&rdquo;, sino &ldquo;qué cambió en la manera de leer lo que me pasa&rdquo;.
          </p>
          <p>
            <strong>Ficha técnica:</strong> 8 sesiones · 2–3 meses · individual · valor por confirmar.
          </p>

          <h2>5. Lo simbólico en grupo: taller temático</h2>
          <p>
            Los talleres reúnen entre cuatro y ocho personas durante dos a tres horas, alrededor de un tema
            específico —un arquetipo, un tránsito astrológico colectivo, un eje de la herbolaria estacional—. El
            límite de participantes no es un detalle logístico: es lo que permite que el trabajo grupal siga
            siendo trabajo simbólico y no una charla informativa unidireccional. En un grupo de ese tamaño hay
            espacio para que cada persona hable, sin que la sesión se disuelva en anonimato.
          </p>
          <p>
            Lo que se pierde, en comparación con una sesión individual, es la profundidad de un proceso hecho a
            medida de una sola historia. Lo que se gana es el efecto de espejo: escuchar cómo el mismo símbolo
            resuena distinto en cada participante amplía la lectura de todos. La intimidad del grupo se resguarda
            con acuerdos explícitos de confidencialidad y con una facilitación que evita que el taller derive en
            terapia grupal improvisada. Cada participante se va con material propio —notas, un ejercicio, una
            pregunta para seguir trabajando— más allá de lo compartido en la sala.
          </p>
          <p>
            <strong>Ficha técnica:</strong> 4–8 personas · 2–3 hrs · presencial u online · valor por confirmar por
            persona.
          </p>

          <h2>6. Aprender la herramienta, no recibir la lectura: clase individual de formación</h2>
          <p>
            Este servicio invierte el lugar de quien consulta: en vez de recibir una lectura sobre su propia
            vida, la persona aprende a leer. Las clases —de 60 a 90 minutos— cubren astrología, tarot, herbolaria
            o historia de estas tradiciones, y se adaptan tanto a quien busca una introducción seria con miras a
            una formación más larga como a quien tiene curiosidad puntual por entender un sistema simbólico.
          </p>
          <p>
            La inclusión de la historia como una cuarta área, junto a las tres herramientas prácticas, no es un
            agregado menor: es la manera en que Francisca evita que estas clases se conviertan en una apropiación
            superficial de saberes ajenos o en la promesa de &ldquo;dominar&rdquo; una disciplina milenaria en una
            sola sesión. Entender de dónde viene un símbolo, qué tradición lo sostiene y qué transformaciones ha
            atravesado es, para ella, condición previa a usarlo con responsabilidad.
          </p>
          <p>
            <strong>Ficha técnica:</strong> 60–90 min · astrología, tarot, herbolaria o historia · individual ·
            valor por confirmar.
          </p>

          <h2>7. El acompañamiento que no termina en una sesión: programa mensual</h2>
          <p>
            El último servicio del catálogo es también el más largo en su horizonte temporal: un programa de
            acompañamiento mensual, tipo retainer, con dos sesiones al mes más recursos y seguimiento entre
            encuentros. La diferencia respecto a las mentorías de duración fija no es solo de plazo, sino de tipo
            de vínculo: un proceso sostenido en el tiempo permite trabajar con los ciclos reales de la vida de
            una persona, no con una ventana acotada de antemano.
          </p>
          <p>
            Los &ldquo;recursos&rdquo; que se entregan entre sesiones —material de lectura, ejercicios
            simbólicos, prácticas breves vinculadas a la herbolaria estacional— llegan con una cadencia definida,
            pensada para sostener el proceso sin saturarlo. El ritmo de las sesiones no es idéntico mes a mes: al
            inicio suele ser más exploratorio, y se ajusta según la etapa. El seguimiento fuera de sesión tiene
            límites explícitos de horario y de tipo de contenido —no reemplaza una sesión, y no está pensado para
            contener emergencias—. El programa no tiene una duración mínima fija; se revisa periódicamente entre
            ambas partes, y el cierre se conversa con la misma intención con que se abrió.
          </p>
          <p>
            <strong>Ficha técnica:</strong> 2 sesiones/mes + recursos + seguimiento · duración abierta, revisión
            periódica · valor por confirmar.
          </p>

          <h2>Un hilo que atraviesa los siete servicios</h2>
          <p>
            Lo que ordena este catálogo no es la duración ni el precio, sino una misma posición teórica sostenida
            en los siete formatos: la astrología y el tarot como lenguajes simbólicos para el autoconocimiento,
            no como sistemas predictivos; la herbolaria y los rituales elementales como saberes ancestrales
            heredados, leídos con pensamiento crítico y no como magia con efectos garantizados. En cada servicio,
            la agencia y la decisión permanecen en quien consulta. Y en cada servicio, cuando el contenido que
            aparece excede el encuadre simbólico —salud mental en crisis, violencia, abuso—, la práctica se
            detiene y deriva a atención profesional, sin ambigüedad.
          </p>
          <p>
            Es, en ese sentido, una oferta que se lee mejor no como un menú de servicios esotéricos, sino como
            distintos formatos de un mismo método: historiadora de formación, terapeuta simbólica de oficio.
          </p>

          <NotaCuidado>
            Este artículo tiene un carácter general y educativo. Ninguno de los servicios descritos reemplaza
            atención clínica o psicológica. Si estás atravesando una crisis, busca apoyo profesional.
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
