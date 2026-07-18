export const siteConfig = {
  whatsapp: "56976229115",
  instagram: "https://www.instagram.com/astrologiayherbolaria",
  email: "franciscaginer@gmail.com",
  // Sin dominio propio todavía — actualiza esto cuando se conecte uno (ver README § 4.d).
  url: "https://astrologia-herbolaria.vercel.app",
} as const;

export function buildWhatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
