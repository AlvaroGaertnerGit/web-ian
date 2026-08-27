# Sistema de motion — Búho Detectives

Scroll storytelling de la homepage: "el mundo se construye mientras avanzas".
Este documento describe la arquitectura de motion implementada sobre el
diseño y contenido ya existentes (no sustituye a `.claude/skills/motion`,
que sigue siendo la fuente de verdad para tokens/variants de Framer Motion;
esto documenta cómo se aplicó ese sistema a esta homepage en concreto).

## Filosofía

- El scroll es una cámara avanzando por un mundo, no una serie de secciones
  independientes con fade-ups.
- Profundidad + escala + luz + scroll, nunca bounce/elastic/glitch/partículas.
- Lo que ya apareció no desaparece al seguir haciendo scroll (el mundo se
  acumula) — ver "Cómo trabajamos" más abajo, el caso más estricto.
- La información siempre por encima del motion: si una animación dificulta
  leer o entender, se reduce o se elimina.

## Librería

**Framer Motion** (`framer-motion`, ya mandatado por `.claude/skills/motion`
para este proyecto — no existía instalado, se añadió como única dependencia
de motion). Cubre entrada por mount, reveals por scroll, scroll-linked
parallax (`useScroll`/`useTransform`) y pin/scrub (`position: sticky` +
`useScroll`) sin necesitar GSAP/ScrollTrigger ni Lenis. No se añadió smooth
scroll: el scroll nativo ya es preciso y el pin/scrub no lo necesita.

## Arquitectura

```
src/lib/motion/
  durations.ts / easings.ts / springs.ts / distances.ts   # tokens primitivos
  transitions.ts                                          # combos duration+easing listos para usar
  viewport.ts                                             # { once: true, amount } por defecto para whileInView
  variants.ts                                              # fadeIn, fadeInUp, fadeInDown, scaleIn,
                                                             # staggerContainer/Item, heroStaggerContainer/Item,
                                                             # heroGlowIn, growLine
  use-parallax.ts                                          # hook de parallax de un solo elemento
  index.ts                                                 # barrel de los primitivos (no de variants)

src/components/motion-provider.tsx   # <MotionConfig reducedMotion="user">, montado una vez en layout.tsx
src/components/motion/
  reveal.tsx      # Reveal — entrada scroll-triggered (whileInView, once)
  stagger.tsx     # StaggerGroup / StaggerItem — secuencias (mount o scroll)
  grow-line.tsx   # GrowLine — línea que se dibuja de izquierda a derecha
```

Cada sección importa estos primitivos; no hay lógica de motion "suelta"
fuera de este árbol salvo los `useScroll`/`useTransform` bespoke de Hero y
ComoTrabajamos (documentados abajo), que son demasiado específicos de su
escena como para vivir en un hook genérico.

## Escenas

### Hero (`Hero.tsx`)

**Entrada** (mount-triggered, `StaggerGroup triggerOnMount` +
`heroStaggerContainer`/`heroStaggerItem`): farola+luz → logo → navegación →
etiqueta → titular (por líneas, stagger anidado con `staggerContainer`
estándar) → subtítulo → CTA → búho (`fadeIn`, sin desplazamiento — "se
revela ligeramente"). `staggerChildren: 0.09s`, `delayChildren: 0.05s`:
todo resuelto en ~1.1–1.3s, se siente inmediato sin aparecer de golpe.

**Salida / parallax** (`useHeroExitParallax`, scroll-linked vía
`useScroll({ target: heroRef, offset: ["start start", "end start"] })`):
cada capa recibe un offset adicional MUY sutil sobre el scroll nativo —
fondo (±14px), farola (±20px + fade de opacidad a 0.55, "queda atrás"),
búho (±28px en sentido contrario, "tiene su propia velocidad"), contenido
—logo/nav/etiqueta/titular/subtítulo/CTA— (±8px, "mantiene estabilidad").
Todos los rangos colapsan a `[0,0]` bajo `prefers-reduced-motion`.

Patrón usado en toda la homepage para combinar ambos sistemas sin que
compitan por la misma propiedad: un `motion.div` **exterior** lleva la
posición absoluta + el `style` scroll-linked (MotionValue), y un
`StaggerItem`/`motion.*` **interior** lleva la animación de entrada por
variants. Nunca se anima la misma propiedad del mismo elemento desde los
dos sistemas a la vez.

Mobile (`md:hidden`) no repite el parallax: es un único
`StaggerGroup`/`StaggerItem` con las variants por defecto (más rápidas, sin
scroll-linking).

### "La información cambia las decisiones" (`StatBand.tsx`)

`GrowLine` dibuja el hairline superior (la "estructura" apareciendo
primero) → `Reveal` en el titular → `StaggerGroup` (con `delay` para que
arranque después del titular) en las 4 estadísticas.

### Servicios (`Servicios.tsx`)

`Reveal` en la columna izquierda (titular + contenedor de imagen).
Contenedor `overflow-hidden` estable; la imagen interior (`OwlMark`) lleva
un `useParallax` propio (`distance: 18`) — nunca se mueve el contenedor,
solo lo que hay dentro, y nunca se ve fuera de su máscara. Las 4 filas de
servicios son un único `StaggerGroup`/`StaggerItem`: se leen como un
sistema que se construye, no como cuatro reveals independientes.

### Cómo trabajamos (`ComoTrabajamos.tsx`) — sticky scrub

La escena más compleja. Un wrapper alto (`260vh`) con un interior
`sticky top-0 h-screen` mantiene la sección en pantalla mientras el scroll
nativo avanza por ese alto extra — **sin pin por JS, sin
`preventDefault`**, el usuario nunca pierde el control del scroll.

`useScroll({ target: wrapperRef, offset: ["start start", "end end"] })` da
un progreso 0→1. Ese progreso **no** controla la línea/pasos directamente:
se alimenta a un `useMotionValue` (`maxProgress`) que solo puede crecer —

```ts
scrollYProgress.on("change", (v) => {
  if (v > maxProgress.get()) maxProgress.set(v);
});
```

— de modo que al volver a subir el scroll la línea y los pasos ya
activados **se quedan activos** ("cada paso queda activo, no desaparece",
y la regla general del sitio de que el mundo se acumula). La línea usa
`scaleX: maxProgress` directamente; los 5 pasos activan su opacidad
(0.35→1) en umbrales repartidos a lo largo de `maxProgress`
(0, .2, .4, .6, .8, con una rampa corta de 0.06).

Tres variantes según contexto, nunca más de una visible a la vez:

- **Desktop, motion normal** → `PinnedTimeline` (la descrita arriba).
- **Desktop, `prefers-reduced-motion`** → `ReducedMotionTimeline`: mismo
  contenido, sin pin, sin scroll extra de 260vh, todo visible de inmediato.
- **Mobile** (cualquier preferencia de motion) → `StaticTimeline`: sin pin,
  un `StaggerGroup`/`StaggerItem` normal por scroll.

### Evidencia (`Evidencia.tsx`)

`Reveal` en el titular, `StaggerGroup`/`StaggerItem` en las 4 tarjetas.
Profundidad editorial ligera: las tarjetas impares llevan `lg:mt-6` (un
desnivel de maquetación, no de motion) para evitar que la retícula se vea
perfectamente uniforme — sin fotografía real todavía, así que no hay
parallax de imagen aquí (ver nota en "Limitaciones" más abajo).

### Confianza (`Confianza.tsx`)

El búho ya vivía asomado en la esquina (`-right-4 -top-6`, rotado); se le
añadió únicamente `Reveal` con `fadeIn` (nunca se redibuja ni se deforma el
asset) y un `useParallax` propio de ±10px — "nos observa", con una deriva
casi imperceptible en vez de estar completamente estático. Titular con
`Reveal`, 4 items de confianza con `StaggerGroup`/`StaggerItem`.

### FAQ / Contacto / CTA final (`FaqContacto.tsx`)

Columna FAQ: `Reveal` + `StaggerGroup`/`StaggerItem` por pregunta. Columna
de contacto: un único `Reveal` (contenido corto, no necesita más
orquestación). Panel oscuro final: `Reveal` en la cita de cierre +
`Reveal` (variant `fadeIn` inline) en un glow radial de resolución detrás
del texto — "la luz se concentra", sin final explosivo.

### Footer (`Footer.tsx`)

Un único `Reveal` con `fadeIn`, sin stagger — "la escena se calma".

## Parallax

Dos mecanismos, según si es un elemento suelto o una escena completa:

- `useParallax(ref, { distance })` (`src/lib/motion/use-parallax.ts`): para
  un elemento que se desplaza al atravesar el viewport. Usado en la imagen
  de Servicios y en el búho de Confianza.
- `useScroll` + varios `useTransform` bespoke: para una escena con varias
  capas a velocidades distintas (Hero) o un progreso que gobierna una
  línea/pasos (ComoTrabajamos). No se generalizó en un hook porque cada
  escena pesa/mapea sus rangos de forma distinta.

Todos los valores son pequeños (rango típico 8–28px) — nunca se busca que
algo "flote", solo que el cerebro perciba profundidad relativa.

## Timelines y sticky scenes

Solo ComoTrabajamos usa pin/scrub. Es intencional: es la única escena cuyo
contenido es literalmente un proceso secuencial que "avanza". El resto de
la homepage usa reveals discretos (`Reveal`/`StaggerGroup`, disparados una
vez al entrar en viewport) — mezclar más pines habría competido con la
regla "no quiero un único parallax [genérico], quiero un sistema de
profundidad" sin aportar narrativa adicional.

## Easing y duración

Todo sale de `src/lib/motion/` — nunca un número mágico en un componente:

| Uso | Token |
|---|---|
| Reveals de sección/tarjeta | `duration.base` (0.25s) + `easing.out` |
| Entrada de Hero (page-level) | `duration.slow`/`slower` + `easing.out` |
| Línea que se dibuja (`growLine`) | `duration.slow` (0.4s) + `easing.out` |
| Toggles / cursor light (CSS aparte) | `easing.inOut` |

`"linear"` no se usa en ningún sitio. Ningún reveal supera `duration.slower`
(0.6s); ningún offset de entrada supera `distance.lg` (24px) salvo el propio
`heroStaggerItem`, que usa `distance.lg` explícitamente por ser contenido de
hero a pantalla completa (ver `reference/tokens.md` del skill `motion`).

## Cursor light

`src/components/ui/CursorLight.tsx` es el sistema global preexistente (luz
que sigue al cursor, cambia entre modo claro/oscuro según la sección bajo
el puntero vía `data-light`). **No se ha duplicado ni sustituido.** Se le
añadió una única reacción al scroll, aditiva: el radio del gradiente
(`--cursor-radius`, antes una constante) respira entre `RADIUS_MIN_PX` y
`RADIUS_PX` según la velocidad de scroll —se estrecha un poco mientras se
hace scroll rápido y vuelve a su radio de reposo al parar—, calculado en el
mismo `requestAnimationFrame` que ya movía `--cursor-x`/`--cursor-y`. Sigue
desactivado igual que antes quen `pointer: fine` es falso o
`prefers-reduced-motion` está activo.

## Microinteracciones

`CtaButton` (usado en todas las secciones) gana una elevación sutil en
hover (`-translate-y-0.5` + sombra más profunda) además de la opacidad que
ya tenía — "botones → luz/profundidad" sin más artificio; es CSS puro
(`transition`), así que ya respeta la regla global de
`prefers-reduced-motion` en `globals.css` sin código adicional.

## Responsive

El motion desktop no se copia a mobile:

- Hero: mobile usa un único `StaggerGroup` con variants por defecto (más
  rápidas, sin desplazamientos grandes), sin el parallax de salida.
- ComoTrabajamos: mobile nunca ve el pin/scrub — siempre `StaticTimeline`.
- El resto de secciones comparten `Reveal`/`StaggerGroup` en ambos
  tamaños porque ya eran sutiles por diseño (fades + 12px), no hizo falta
  una variante mobile aparte.

## Reduced motion

Dos capas, igual que documenta `reference/accessibility.md` del skill
`motion`:

1. `MotionProvider` (`<MotionConfig reducedMotion="user">`, montado una vez
   en `layout.tsx` envolviendo `{children}`) neutraliza automáticamente
   cualquier `x`/`y`/`scale`/`rotate` de `variants`/`animate` en todos los
   `motion.*` de la homepage — no hace falta comprobarlo por componente.
2. Todo lo que no pasa por `variants` (scroll-linked `useTransform`) se
   comprueba a mano con `useReducedMotion()`: `useHeroExitParallax`,
   `useParallax`, y `ComoTrabajamos` (que además renderiza una escena
   completamente distinta, `ReducedMotionTimeline`, sin el alto extra de
   260vh). `CursorLight` comprueba `matchMedia` directamente porque vive
   fuera del árbol de Framer Motion.

Verificación: Chrome DevTools → Command palette → "Emulate CSS
prefers-reduced-motion" → `reduce`.

## Performance

- Solo se anima `transform`/`opacity` (y `scaleX`/`scaleY` para las
  líneas) en todo el sistema — nunca `width`/`height`/`top`/`left`.
- El pin/scrub de ComoTrabajamos no dispara renders de React por frame:
  `useMotionValue`/`useTransform` actualizan el DOM directamente vía
  Framer Motion, igual que `CursorLight` ya hacía con sus CSS custom
  properties.
- `viewport={{ once: true }}` en todos los reveals: ninguna animación se
  repite al re-entrar en viewport.

## Limitaciones conocidas / trabajo futuro

- Evidencia todavía usa iconos sobre fondo oscuro en vez de fotografía real
  (así estaba antes de esta fase). El parallax "contenedor estable +
  imagen interior que se desplaza" (sección 12/16 del brief) está resuelto
  como patrón en Servicios y queda listo para aplicarse aquí en cuanto
  haya fotografías reales que colocar dentro de esos contenedores.
