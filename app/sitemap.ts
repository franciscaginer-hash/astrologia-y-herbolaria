import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = [
    "",
    "/servicios",
    "/sobre-mi",
    "/blog",
    "/blog/cartografias-del-umbral",
    "/blog/astrologia-psicologica",
    "/blog/herbolaria-ancestral",
    "/blog/tarot-como-umbral",
    "/privacidad",
  ];

  return rutas.map((ruta) => ({
    url: `${siteConfig.url}${ruta}`,
    lastModified: new Date(),
  }));
}
