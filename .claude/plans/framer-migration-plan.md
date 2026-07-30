# Migración de "Astrología y Herbolaria" a la plataforma Framer

## Contexto

El sitio actual (`C:\Users\Fran\Code`) es una app Next.js 16 / React 19 / Tailwind v4 desplegada en Vercel — no un proyecto de la plataforma no-code Framer. El `CLAUDE.md` del repo describe una versión anterior (HTML/CSS/JS estático) que ya no existe: su "Overview", "Running locally" y "Architecture" completos (Live Server, `js/site.js`, `partials/`, `css/variables.css`, etc.) son obsoletos y ninguno de esos archivos/mecanismos existe hoy; la migración a Next.js solo se menciona de pasada en una nota sobre el vault de Obsidian. El código real vive en `app/`, `components/`, `lib/`, `api/`.

El usuario quiere una mejora visual de este sitio, inspirada en el sitio de referencia motionsites.ai (prompt "innovation-landing": scroll-reveal por sección, hover magnético, secciones full-bleed con fotografía dramática, layouts de dos columnas texto+imagen, acentos serif itálicos), pero implementada **migrando por completo a la plataforma Framer** — no como librería `framer-motion` dentro del Next.js actual.

Decisiones ya tomadas con el usuario:
- **Migración completa a Framer** (no la librería). Se abandona el hosting/código Next.js una vez validada la migración.
- **Empezar de cero.** No se toca ni se rebasa la rama sin fusionar `claude/astrology-herbalism-web-tools-bd81c8` (tiene componentes de motion y SEO ya construidos, pero se ignora deliberadamente).
- **Dirección de diseño: rediseño más libre.** `DESIGN.md` deja de ser la especificación a conservar y pasa a ser solo referencia de tono/marca (posicionamiento ciruela/champán/tono ceremonial-pero-sobrio). Se construye un **sistema de diseño nuevo** para Framer, con libertad para explorar paleta, tipografía y hasta revisar las 4 reglas nombradas actuales (Oro Escaso, Casa de Dos Cuartos, Rol Único, Sin Sombra) si el nuevo sistema lo justifica — siempre y cuando el resultado final pase una crítica `/impeccable` propia, no la de 2026-07-08. Del sitio de referencia motionsites.ai se siguen tomando los **patrones de movimiento/layout** (scroll-reveal, hover magnético, full-bleed, dos columnas, acentos serif itálicos); su estética oscura/cósmica queda descartada por ser ajena al posicionamiento de marca, no por conflicto con reglas que ahora están abiertas a revisión.

## Hallazgos clave de la exploración

- El newsletter "El cielo del mes" es funcionalidad real, no un placeholder: `components/newsletter-form.tsx` → `POST /api/subscribe` → `api/subscribe.js` → `lib/ephemeris.js` (cálculo natal vía `circular-natal-horoscope-js`) → `lib/mailerlite.js` (API MailerLite). Framer no puede alojar esta lógica (no hay runtime de servidor con secretos), así que se traslada a un workflow **n8n construido desde cero** (no existe ningún workflow n8n previo en este repo) — el usuario ya tiene una instancia n8n cloud configurada para este mismo proyecto (MCP `n8n` presente en la cuenta; **confirmar que está habilitado en el chat/entorno que ejecute la Fase 6**, ver Fase 0).
- `lib/mailerlite.js` y `lib/ephemeris.js` traen funciones ya escritas pero **no conectadas** al flujo de alta actual: `obtenerSuscriptora`, `listarSuscriptorasDeGrupo`, `crearCampania`, `enviarCampania` (mailerlite.js) y `calcularSignoLunaLlena` (ephemeris.js, calcula el signo de la luna llena del mes para contenido editorial). Sugieren que el envío mensual de la campaña era una pieza planeada. **Alcance por confirmar** (ver "Puntos que requieren aprobación").
- Contacto centralizado en `lib/site-config.ts` (WhatsApp `56976229115`, Instagram, email) — son los únicos 3 valores de contacto a portar. Los anclajes internos `#linea-a`/`#linea-b` **no** están en `site-config.ts`: viven hardcodeados como `id="linea-a"`/`id="linea-b"` en `app/servicios/page.tsx`, enlazados desde `app/page.tsx` (`/servicios#linea-a`, `/servicios#linea-b`) — deben preservarse como IDs de sección en Framer, no como valores de configuración centralizados.
- Inventario de páginas a migrar: Home (`app/page.tsx`), Servicios (`app/servicios/page.tsx`, 9 tarjetas confirmadas: 7 en Línea A + 2 en Línea B), Sobre mí (`app/sobre-mi/page.tsx`), Privacidad (`app/privacidad/page.tsx`), Blog índice + 3 posts (`app/blog/page.tsx`, `app/blog/{astrologia-psicologica,herbolaria-ancestral,tarot-como-umbral}/page.tsx`).
- Imágenes actuales son placeholders SVG (`public/img/placeholder-*.svg`, 4 archivos) — deben reemplazarse por fotografía real de herbolaria/astrología (curada por el usuario), nunca por nebulosas cósmicas de stock.
- Dos de las 4 reglas de `DESIGN.md` se describían de forma imprecisa en versiones previas de este plan — quedan corregidas aquí: **"Casa de Dos Cuartos"** es una regla de fondos de sección/vista completa (el sitio nunca usa más de dos fondos cálidos en la misma vista: champán y rosa pálido), no una regla de layout de dos columnas. **"Oro Escaso"** permite el oro (`#B8924A`) en borde/texto en hover/focus **y también** como trazo de ícono lineal decorativo fuera de interacción (siempre ≤5% de cualquier vista) — no es exclusivamente un fenómeno de hover.
- Skills de proyecto ya instaladas y relevantes (viven en `C:\Users\Fran\Code\.claude\skills\`, atadas a ese repo): `design-taste-frontend` (gate obligatorio antes de cambios de estilo, referenciado en `CLAUDE.md`), `impeccable` (crítica/pulido — ya tiene precedente de uso real en este proyecto, incluida una corrección documentada en `DESIGN.md` §5 sobre el fondo de Nota de Cuidado), `skills-audit` (**dos definiciones distintas conviven bajo este nombre**: una genérica de proyecto y otra privada/personalizada de cuenta — resolver cuál aplica en Fase 9), `web-design-guidelines`, `writing-guidelines`, y un clúster de 6 skills de Vercel (`deploy-to-vercel`, `vercel-cli-with-tokens`, `vercel-composition-patterns`, `vercel-optimize`, `vercel-react-best-practices`, `vercel-react-native-skills`, `vercel-react-view-transitions`) que dejan de aplicar una vez completado el corte a Framer. (`project-skills-guide`, mencionada en versiones previas de este plan, no existe en el repo.)

## Fase 0 — Verificación de herramientas y accesos (nueva, precondición de todo lo demás)

Antes de iniciar la Fase 1, confirmar en el entorno real que ejecutará este plan (no en un entorno remoto de verificación aislado):
- El subagente/plugin `framer` está disponible e instalado.
- El MCP `21st` (o el conector equivalente de generación de UI) está disponible e instalado.
- El MCP `n8n` está conectado y **habilitado en el chat/sesión** concreta que se usará para la Fase 6 (no basta con que exista a nivel de cuenta).
- El plan de Framer de la cuenta soporta Code Components y colecciones CMS (no todos los planes de Framer los incluyen).

Si alguna de estas herramientas no está disponible, resolver su instalación/activación antes de continuar — las Fases 2 a 6 dependen de ellas tal como están planteadas.

## Flujo de fases

| Fase | Qué se hace | Herramienta |
|---|---|---|
| 0. Verificación de herramientas | Confirmar acceso a subagente `framer`, MCP `21st`, MCP `n8n` y plan de Framer con Code Components/CMS | — |
| 1. Nuevo sistema de diseño | Explorar 2-3 direcciones de paleta/tipografía con `ui-ux-pro-max --design-system --persist`, usando `DESIGN.md` solo como referencia de tono/marca (no como especificación fija); elegir dirección con el usuario; formalizar tokens (colores, tipografía, espaciado, reglas de uso) y auditar el resultado con `design-taste-frontend` e `impeccable` como sistema nuevo, no contra las reglas de 2026-07-08 | `ui-ux-pro-max`, `design-taste-frontend`, `impeccable` |
| 2. Prototipo visual rápido | Explorar layouts "dos columnas" y hover magnético como bocetos desechables | MCP `21st` (`search`/`generate`/`iterate_generation`) |
| 3. Contenido/CMS | Migrar copy de `app/*.tsx` a colecciones Framer CMS (Blog Posts, Servicios — ver detalle abajo) | subagente `framer` |
| 4. Code Components de motion | Construir `ScrollReveal`, `MagneticButton`, `TwoColumnFeature`, `ServiceCardMotion`/`BlogCardMotion`, `NotaCuidadoBlock` | subagente `framer` |
| 5. Ensamblado de páginas | Recrear las 6+ páginas en Framer con CMS + componentes | subagente `framer` |
| 6. Newsletter/n8n | Form Framer → webhook n8n → ephemeris + MailerLite (construcción desde cero; ver "Arquitectura n8n") | MCP n8n + subagente `framer` |
| 7. QA/checklist | Crítica visual, contenido, formulario, responsive, accesibilidad, SEO | `impeccable`, checklist `ui-ux-pro-max` |
| 8. Publicación/corte DNS | Publish en Framer, mover dominio, apagar Vercel | subagente `framer` + acción manual DNS — **requiere aprobación explícita, no se ejecuta automáticamente** |
| 9. Higiene | Revisar qué skills/agents siguen aplicando al nuevo proyecto Framer; decidir destino de `CLAUDE.md` (mayormente obsoleto) y del repo Next.js/Vercel una vez validada la migración | `skills-audit` |

## Colecciones CMS en Framer

**Blog Posts**: `slug`, `titulo`, `extracto`, `fecha`, `imagen` (real, no placeholder), `imagen_alt`, `contenido` (rich text), `meta_description`, `nota_cuidado` (toggle + texto, varía por artículo).

**Servicios** (nueva colección — justificado por las 9 tarjetas repetitivas): `linea` (enum Línea A/B), `etiqueta` (opcional), `titulo`, `descripcion`, `para_quien`, `precio` (texto, admite rangos), `cta_label`, `cta_mensaje_whatsapp`, `orden`.

Home/Sobre mí/Privacidad quedan como contenido estático de página (no repetitivo, no necesitan colección).

## Code Components — regla transversal

Los 5 componentes (`ScrollReveal`, `MagneticButton`, `TwoColumnFeature`, `ServiceCardMotion`/`BlogCardMotion`, `NotaCuidadoBlock`) deben cumplir siempre, según las reglas del **sistema de diseño nuevo** salido de la Fase 1 (las reglas concretas abajo son las de `DESIGN.md` actual, ya corregidas frente a versiones previas de este plan, y sirven de línea base hasta que la Fase 1 las confirme, ajuste o reemplace):
- Cero `box-shadow` en cualquier estado (Regla Sin Sombra) — sujeta a revisión en Fase 1.
- El oro (`#B8924A`) en borde/texto en hover/focus, o como trazo de ícono lineal decorativo fuera de interacción, nunca como `background-color`, y siempre ≤5% de cualquier vista (Regla del Oro Escaso) — sujeta a revisión en Fase 1.
- Cualquier vista/sección (incluida `TwoColumnFeature`) usa como máximo dos fondos cálidos en la misma vista: champán o rosa pálido, nunca un tercero (Regla de la Casa de Dos Cuartos — es una regla de fondos de sección, no de layout de 2 columnas) — sujeta a revisión en Fase 1.
- Animar solo `transform`/`opacity`, nunca layout (evita reflow y mantiene el patrón scroll-reveal fluido) — esta regla es técnica, no de marca, y se mantiene sin importar el resultado de Fase 1.
- `NotaCuidadoBlock` porta la intención actual de `components/nota-cuidado.tsx` (bloque de mayor peso emocional del sitio, con tratamiento visual diferenciado y casi sin motion decorativo; hoy fondo blanco, tras una corrección documentada en `DESIGN.md` §5 que descartó el rosa pálido por volverse invisible por blend de color) — el tratamiento exacto se redefine en Fase 1 dentro del nuevo sistema, preservando la intención.

## Arquitectura "El cielo del mes" fuera de Framer

No existe ningún workflow n8n previo que migrar — esto es **construcción nueva**, usando la lógica de `api/subscribe.js`, `lib/ephemeris.js` y `lib/mailerlite.js` solo como referencia de comportamiento a igualar, no como código a reutilizar directamente.

Framer expone un formulario (mismos campos que hoy: `email`, `fecha_nacimiento`, `hora_nacimiento` opcional, `lugar_nacimiento` con opción "otra ciudad", `consentimiento`) que hace `POST` al Webhook de un workflow n8n. El workflow n8n debe portar:
- Validación equivalente a la de `api/subscribe.js` (regex de email, fecha `YYYY-MM-DD`, hora `HH:MM` 24h opcional, ciudad requerida salvo "otra ciudad", consentimiento requerido).
- El dataset `data/ciudades-chile.json` (43 ciudades, campos `nombre`/`lat`/`lon`/`timezone`) — **nota importante**: el cálculo actual solo usa `lat`/`lon`; el campo `timezone` no se usa hoy (el propio dataset lo documenta). Puede portarse igual por si se activa a futuro, pero no es bloqueante para la paridad funcional.
- El cálculo natal (`lib/ephemeris.js`: sol y luna siempre, ascendente solo si hay ciudad real y hora conocida; con "otra ciudad" se usa `REFERENCIA_SANTIAGO` como respaldo de lat/lon) — **validar en Fase 6 si el Code node de n8n cloud soporta el paquete `circular-natal-horoscope-js`**; si no, usar un microservicio Vercel puente solo para el cálculo, sin secretos de MailerLite.
- La llamada a MailerLite (`lib/mailerlite.js`, API Connect v2, con el API key como credential de n8n, nunca en el body ni en Framer).

La respuesta a Framer debe conservar el shape actual (`{ ok: true, cartaNatalFallo }` en éxito, `{ error }` en fallo) para reusar la lógica de mensajes de éxito/error.

## Puntos que requieren aprobación explícita antes de ejecutar (no asumir)

1. Corte de dominio DNS de Vercel → Framer (definir dominio exacto, si hay período de convivencia con staging).
2. Apagar el deploy de Vercel — solo después de validar Framer end-to-end.
3. Cada `publish` a producción en Framer.
4. Apuntar el form de Framer a la lista de producción real de MailerLite — validar antes con grupo/sandbox separado.
5. Decisión Code node n8n vs. microservicio puente para el cálculo de ephemeris.
6. Fotografía real de herbolaria/astrología que reemplace los placeholders — requiere curación humana del usuario.
7. Dirección final del nuevo sistema de diseño (paleta, tipografía, y si se conservan/ajustan/descartan las 4 reglas nombradas) — elegida entre las 2-3 opciones de Fase 1 antes de avanzar a Fase 2.
8. Alcance del workflow n8n de Fase 6: ¿solo alta de suscriptoras (paridad exacta con el repo actual), o también envío mensual automatizado de campaña (sugerido por `crearCampania`/`enviarCampania`/`listarSuscriptorasDeGrupo` en `mailerlite.js` y `calcularSignoLunaLlena` en `ephemeris.js`, hoy sin conectar entre sí)?

## Verificación end-to-end

- **Diseño:** `design-taste-frontend` + `impeccable` sobre las 6+ páginas, verificando consistencia contra las reglas del **nuevo sistema de diseño** definido en Fase 1 (sean las 4 reglas nombradas originales, versiones ajustadas, o reglas nuevas).
- **Contenido:** diff manual contra el copy exacto de cada `page.tsx` actual — nada se pierde o parafrasea sin aprobación.
- **Newsletter:** probar el flujo completo (fecha+hora+ciudad conocida → ascendente; fecha sin hora → solo luna; "otra ciudad"; email inválido) y confirmar que llega a MailerLite con los mismos custom fields (`fecha_nacimiento`, `hora_nacimiento`, `lugar_nacimiento`, `ascendente`, `luna_natal`).
- **CTAs:** número de WhatsApp correcto (`56976229115`), anclas internos (`/servicios#linea-a`/`#linea-b`) funcionando.
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
- `C:\Users\Fran\Code\components\nota-cuidado.tsx`
- `C:\Users\Fran\Code\app\page.tsx`
- `C:\Users\Fran\Code\app\servicios\page.tsx`
- `C:\Users\Fran\Code\app\sobre-mi\page.tsx`
- `C:\Users\Fran\Code\app\privacidad\page.tsx`
- `C:\Users\Fran\Code\app\blog\page.tsx`
- `C:\Users\Fran\Code\app\blog\astrologia-psicologica\page.tsx`
- `C:\Users\Fran\Code\app\blog\herbolaria-ancestral\page.tsx`
- `C:\Users\Fran\Code\app\blog\tarot-como-umbral\page.tsx`
