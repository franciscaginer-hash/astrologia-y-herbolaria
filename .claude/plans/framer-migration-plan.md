# Migración de "Astrología y Herbolaria" a la plataforma Framer

## Contexto

El sitio actual (`C:\Users\Fran\Code`) es una app Next.js 16 / React 19 / Tailwind v4 desplegada en Vercel — no un proyecto de la plataforma no-code Framer. El `CLAUDE.md` del repo describe una versión anterior (HTML/CSS/JS estático) que ya no existe; el código real vive en `app/`, `components/`, `lib/`.

El usuario quiere una mejora visual de este sitio, inspirada en el sitio de referencia motionsites.ai (prompt "innovation-landing": scroll-reveal por sección, hover magnético, secciones full-bleed con fotografía dramática, layouts de dos columnas texto+imagen, acentos serif itálicos), pero implementada **migrando por completo a la plataforma Framer** — no como librería `framer-motion` dentro del Next.js actual.

Decisiones ya tomadas con el usuario:
- **Migración completa a Framer** (no la librería). Se abandona el hosting/código Next.js una vez validada la migración.
- **Empezar de cero.** No se toca ni se rebasa la rama sin fusionar `claude/astrology-herbalism-web-tools-bd81c8` (tiene componentes de motion y SEO ya construidos, pero se ignora deliberadamente).
- **Dirección de diseño: rediseño más libre.** `DESIGN.md` deja de ser la especificación a conservar y pasa a ser solo referencia de tono/marca (posicionamiento ciruela/champán/tono ceremonial-pero-sobrio). Se construye un **sistema de diseño nuevo** para Framer, con libertad para explorar paleta, tipografía y hasta revisar las 4 reglas nombradas actuales (Oro Escaso, Casa de Dos Cuartos, Rol Único, Sin Sombra) si el nuevo sistema lo justifica — siempre y cuando el resultado final pase una crítica `/impeccable` propia, no la de 2026-07-08. Del sitio de referencia motionsites.ai se siguen tomando los **patrones de movimiento/layout** (scroll-reveal, hover magnético, full-bleed, dos columnas, acentos serif itálicos); su estética oscura/cósmica queda descartada por ser ajena al posicionamiento de marca, no por conflicto con reglas que ahora están abiertas a revisión.

## Hallazgos clave de la exploración

- El newsletter "El cielo del mes" es funcionalidad real, no un placeholder: `components/newsletter-form.tsx` → `POST /api/subscribe` → `api/subscribe.js` → `lib/ephemeris.js` (cálculo natal vía `circular-natal-horoscope-js`) → `lib/mailerlite.js` (API MailerLite). Framer no puede alojar esta lógica (no hay runtime de servidor con secretos), así que se traslada a un workflow **n8n** — el usuario ya tiene una instancia n8n cloud configurada para este mismo proyecto (MCP `n8n_MCP` ya autenticado).
- Contacto centralizado en `lib/site-config.ts` (WhatsApp `56976229115`, Instagram, email) — son los únicos 3 valores de contacto a portar.
- Inventario de páginas a migrar: Home (`app/page.tsx`), Servicios (`app/servicios/page.tsx`, 9 tarjetas en 2 líneas), Sobre mí (`app/sobre-mi/page.tsx`), Privacidad (`app/privacidad/page.tsx`), Blog índice + 3 posts (`app/blog/page.tsx`, `app/blog/{astrologia-psicologica,herbolaria-ancestral,tarot-como-umbral}/page.tsx`).
- Imágenes actuales son placeholders SVG (`public/img/placeholder-*.svg`) — deben reemplazarse por fotografía real de herbolaria/astrología (curada por el usuario), nunca por nebulosas cósmicas de stock.
- Skills de proyecto ya instaladas y relevantes (viven en `C:\Users\Fran\Code\.claude\skills\`, atadas a ese repo): `design-taste-frontend` (gate obligatorio antes de cambios de estilo, referenciado en `CLAUDE.md`), `impeccable` (crítica/pulido — ya tiene precedente de uso real en este proyecto), `project-skills-guide`, `skills-audit`.

## Flujo de fases

| Fase | Qué se hace | Herramienta |
|---|---|---|
| 1. Nuevo sistema de diseño | Explorar 2-3 direcciones de paleta/tipografía con `ui-ux-pro-max --design-system --persist`, usando `DESIGN.md` solo como referencia de tono/marca (no como especificación fija); elegir dirección con el usuario; formalizar tokens (colores, tipografía, espaciado, reglas de uso) y auditar el resultado con `design-taste-frontend` e `impeccable` como sistema nuevo, no contra las reglas de 2026-07-08 | `ui-ux-pro-max`, `design-taste-frontend`, `impeccable` |
| 2. Prototipo visual rápido | Explorar layouts "dos columnas" y hover magnético como bocetos desechables | MCP `21st` (`search`/`generate`/`iterate_generation`) |
| 3. Contenido/CMS | Migrar copy de `app/*.tsx` a colecciones Framer CMS (Blog Posts, Servicios — ver detalle abajo) | subagente `framer` |
| 4. Code Components de motion | Construir `ScrollReveal`, `MagneticButton`, `TwoColumnFeature`, `ServiceCardMotion`/`BlogCardMotion`, `NotaCuidadoBlock` | subagente `framer` |
| 5. Ensamblado de páginas | Recrear las 6+ páginas en Framer con CMS + componentes | subagente `framer` |
| 6. Newsletter/n8n | Form Framer → webhook n8n → ephemeris + MailerLite | MCP n8n + subagente `framer` |
| 7. QA/checklist | Crítica visual, contenido, formulario, responsive, accesibilidad, SEO | `impeccable`, checklist `ui-ux-pro-max` |
| 8. Publicación/corte DNS | Publish en Framer, mover dominio, apagar Vercel | subagente `framer` + acción manual DNS — **requiere aprobación explícita, no se ejecuta automáticamente** |
| 9. Higiene | Revisar qué skills/agents siguen aplicando al nuevo proyecto Framer | `skills-audit` |

## Colecciones CMS en Framer

**Blog Posts**: `slug`, `titulo`, `extracto`, `fecha`, `imagen` (real, no placeholder), `imagen_alt`, `contenido` (rich text), `meta_description`, `nota_cuidado` (toggle + texto, varía por artículo).

**Servicios** (nueva colección — justificado por las 9 tarjetas repetitivas): `linea` (enum Línea A/B), `etiqueta` (opcional), `titulo`, `descripcion`, `para_quien`, `precio` (texto, admite rangos), `cta_label`, `cta_mensaje_whatsapp`, `orden`.

Home/Sobre mí/Privacidad quedan como contenido estático de página (no repetitivo, no necesitan colección).

## Code Components — regla transversal

Los 5 componentes (`ScrollReveal`, `MagneticButton`, `TwoColumnFeature`, `ServiceCardMotion`/`BlogCardMotion`, `NotaCuidadoBlock`) deben cumplir siempre, según las reglas del **sistema de diseño nuevo** salido de la Fase 1 (las reglas concretas abajo son las de `DESIGN.md` actual y sirven de línea base hasta que la Fase 1 las confirme, ajuste o reemplace):
- Cero `box-shadow` en cualquier estado (Regla Sin Sombra) — sujeta a revisión en Fase 1.
- El oro (`#B8924A`) solo en borde/texto en hover/focus, nunca `background-color` (Regla del Oro Escaso) — sujeta a revisión en Fase 1.
- `TwoColumnFeature` solo acepta champán o rosa pálido como fondo — nunca un tercer fondo cálido (Regla de la Casa de Dos Cuartos) — sujeta a revisión en Fase 1.
- Animar solo `transform`/`opacity`, nunca layout (evita reflow y mantiene el patrón scroll-reveal fluido) — esta regla es técnica, no de marca, y se mantiene sin importar el resultado de Fase 1.
- `NotaCuidadoBlock` porta la intención actual de `components/nota-cuidado.tsx` (bloque de mayor peso emocional del sitio, con tratamiento visual diferenciado y casi sin motion decorativo) — el tratamiento exacto (hoy: fondo blanco, nunca rosa pálido) se redefine en Fase 1 dentro del nuevo sistema, preservando la intención.

## Arquitectura "El cielo del mes" fuera de Framer

Framer expone un formulario (mismos campos que hoy: `email`, `fecha_nacimiento`, `hora_nacimiento` opcional, `lugar_nacimiento` con opción "otra ciudad", `consentimiento`) que hace `POST` al Webhook de un workflow n8n. El workflow n8n debe portar: validación (regex de `api/subscribe.js`), el dataset `data/ciudades-chile.json`, el cálculo natal (`lib/ephemeris.js` — **validar en Fase 6 si el Code node de n8n cloud soporta el paquete `circular-natal-horoscope-js**`; si no, usar un microservicio Vercel puente solo para el cálculo, sin secretos de MailerLite), y la llamada a MailerLite (`lib/mailerlite.js`, con el API key como credential de n8n, nunca en el body ni en Framer). La respuesta a Framer debe conservar el shape actual (`{ ok, cartaNatalFallo }` / `{ error }}`) para reusar la lógica de mensajes de éxito/error.

## Puntos que requieren aprobación explícita antes de ejecutar (no asumir)

1. Corte de dominio DNS de Vercel → Framer (definir dominio exacto, si hay período de convivencia con staging).
2. Apagar el deploy de Vercel — solo después de validar Framer end-to-end.
3. Cada `publish` a producción en Framer.
4. Apuntar el form de Framer a la lista de producción real de MailerLite — validar antes con grupo/sandbox separado.
5. Decisión Code node n8n vs. microservicio puente para el cálculo de ephemeris.
6. Fotografía real de herbolaria/astrología que reemplace los placeholders — requiere curación humana del usuario.
7. Dirección final del nuevo sistema de diseño (paleta, tipografía, y si se conservan/ajustan/descartan las 4 reglas nombradas) — elegida entre las 2-3 opciones de Fase 1 antes de avanzar a Fase 2.

## Verificación end-to-end

- **Diseño:** `design-taste-frontend` + `impeccable` sobre las 6+ páginas, verificando consistencia contra las reglas del **nuevo sistema de diseño** definido en Fase 1 (sean las 4 reglas nombradas originales, versiones ajustadas, o reglas nuevas).
- **Contenido:** diff manual contra el copy exacto de cada `page.tsx` actual — nada se pierde o parafrasea sin aprobación.
- **Newsletter:** probar el flujo completo (fecha+hora+ciudad conocida → ascendente; fecha sin hora → solo luna; "otra ciudad"; email inválido) y confirmar que llega a MailerLite con los mismos custom fields.
- **CTAs:** número de WhatsApp correcto (`56976229115`), anclas internos (`/servicios#linea-a/b`) funcionando.
- **Responsive:** menú móvil, `TwoColumnFeature` apilado a una columna en móvil sin recortar la foto.
- **Accesibilidad:** foco visible en oro, labels de formulario, alt text real, contraste ciruela/champán-rosa.
- **SEO:** `title`/`description` equivalentes por página, mismos slugs de blog.
- **Aprobación final del usuario** antes de la Fase 8.

### Archivos críticos de referencia (contenido/lógica a portar, no código a reutilizar)
- `C:\Users\Fran\Code\DESIGN.md`
- `C:\Users\Fran\Code\lib\site-config.ts`
- `C:\Users\Fran\Code\api\subscribe.js`
- `C:\Users\Fran\Code\lib\ephemeris.js`
- `C:\Users\Fran\Code\lib\mailerlite.js`
- `C:\Users\Fran\Code\data\ciudades-chile.json`
- `C:\Users\Fran\Code\components\newsletter-form.tsx`
- `C:\Users\Fran\Code\app\servicios\page.tsx`
- `C:\Users\Fran\Code\app\blog\page.tsx`
