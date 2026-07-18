import Link from "next/link";

type SeccionPanel = {
  href: string;
  titulo: string;
  descripcion: string;
};

const SECCIONES: SeccionPanel[] = [
  {
    href: "/servicios",
    titulo: "Líneas de trabajo",
    descripcion: "El catálogo completo de sesiones y práctica ritual, con público y valores de cada una.",
  },
  {
    href: "/sobre-mi",
    titulo: "Sobre mí",
    descripcion: "Quién soy, desde dónde parte esta práctica y los límites del acompañamiento.",
  },
  {
    href: "#newsletter",
    titulo: "El cielo del mes",
    descripcion: "Suscríbete al newsletter: una lectura mensual que cruza tu carta natal con la luna llena.",
  },
  {
    href: "/blog",
    titulo: "Blog",
    descripcion: "Notas para pensar en voz alta sobre astrología, herbolaria y tarot.",
  },
];

export function SectionPanel() {
  return (
    <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
      {SECCIONES.map((seccion) => (
        <Link
          key={seccion.href}
          href={seccion.href}
          className="flex flex-col gap-xs rounded-borde border border-borde-ciruela-sutil bg-blanco p-md text-left no-underline transition-colors hover:border-oro focus-visible:border-oro"
        >
          <h3 className="text-ciruela">{seccion.titulo}</h3>
          <p className="text-[0.95rem]">{seccion.descripcion}</p>
        </Link>
      ))}
    </div>
  );
}
