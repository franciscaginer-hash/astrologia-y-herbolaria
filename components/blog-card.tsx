import Link from "next/link";

type BlogCardProps = {
  href: string;
  imagen: string;
  imagenAlt: string;
  fecha: string;
  titulo: string;
  extracto: string;
  prioridad?: boolean;
};

export function BlogCard({ href, imagen, imagenAlt, fecha, titulo, extracto, prioridad = false }: BlogCardProps) {
  return (
    <Link href={href} className="block text-ciruela no-underline">
      <img
        src={imagen}
        alt={imagenAlt}
        width={400}
        height={300}
        loading={prioridad ? "eager" : "lazy"}
        fetchPriority={prioridad ? "high" : "auto"}
        className="mb-xs aspect-[4/3] w-full rounded-borde bg-rosa-palido object-cover"
      />
      <p className="text-[0.9rem] text-ciruela-suave">{fecha}</p>
      <h3 className="line-clamp-2">{titulo}</h3>
      <p className="line-clamp-2">{extracto}</p>
    </Link>
  );
}
