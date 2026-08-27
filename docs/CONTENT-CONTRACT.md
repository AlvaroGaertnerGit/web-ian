# Content Contract — Búho Detectives

Este documento define qué contenido es real hoy, qué falta por confirmar
con el cliente, y qué afirmaciones no se deben publicar hasta tener datos
verificados. Es la referencia antes de tocar cualquier texto en
`src/content/`.

Contenido y presentación están separados: los componentes de
`src/components/` leen los textos de `src/content/*.es.ts`. Sustituir el
copy real, cuando llegue, es cuestión de editar esos archivos — no debería
hacer falta tocar componentes, animaciones ni estructura.

## Estado actual

| Archivo | Contiene |
|---|---|
| `src/content/home.es.ts` | Hero, StatBand, "Servicios de investigación" (segmentos de cliente), Cómo trabajamos, Confianza, Footer, navLinks |
| `src/content/services.es.ts` | Las 4 capacidades de "Convertimos hechos en evidencia" (Vigilancias/Documentación/Localizaciones/Informes) |
| `src/content/faq.es.ts` | Preguntas y respuestas del acordeón FAQ |
| `src/content/contact.es.ts` | Email, teléfono, labels de CTA, panel de cierre |

## Datos necesarios del cliente

Ninguno de estos datos existe todavía en el proyecto. No se han inventado
en ningún sitio — donde hacían falta se ha dejado sin ese contenido en vez
de rellenarlo con un placeholder visible.

- Nombre comercial / nombre del despacho.
- Nombre del detective (si se quiere personalizar).
- Número de TIP (Tarjeta de Identidad Profesional).
- Número de inscripción en el RNSP (Registro Nacional de Seguridad
  Privada).
- Ciudades / zonas de cobertura real.
- Confirmación de qué servicios de `services.es.ts` y
  `home.es.ts:serviciosContent` son realmente los que se ofrecen (el copy
  actual es el que ya aprobó el cliente en fases anteriores, pero conviene
  una confirmación final antes de publicar).
- Teléfono — **ya existe y es real**: `+34 624 56 27 98`.
- Email — **ya existe y es real**: `buhodetectiveprivado@gmail.com`.
- Dirección postal / despacho físico (si existe y se quiere publicar).
- Horario de atención.
- Proceso de contacto preferido para recibir leads (ver "Formulario de
  contacto" más abajo).
- Datos legales: razón social, CIF, registro mercantil si aplica, para el
  futuro Aviso Legal.

## Copy pendiente

- **Aviso legal, Política de privacidad, Política de cookies**: no
  existen. El footer (`Footer.tsx`) muestra esos tres nombres como texto
  plano, no como enlaces, para no simular un destino que no existe.
- **Respuestas de FAQ**: las 4 preguntas ya existían; las respuestas se
  han redactado en esta fase con contenido genérico y verificable (sin
  inventar credenciales ni compromisos de plazo/resultado). Deberían
  revisarse cuando el cliente confirme el copy definitivo.
- **Formulario de contacto**: no existe todavía ninguna UI de formulario.
  El contacto actual funciona vía `mailto:`/`tel:` directos. Arquitectura
  prevista para cuando el cliente decida cómo quiere recibir los
  contactos:

  Campos: `nombre`, `email`, `teléfono`, `tipo de consulta`, `mensaje`,
  `consentimiento de privacidad`.

  Estados necesarios en la UI: `idle`, `loading`, `success`, `error`. No
  se debe mostrar nunca "Mensaje enviado" salvo que el backend lo haya
  confirmado realmente.

  Sin servicio de envío conectado (no Resend/Formspree/EmailJS/Supabase/
  etc. — ninguno está instalado ni configurado). Se decide cuando el
  cliente confirme el canal preferido.

  El formulario no debe mostrarse en el diseño hasta que forme parte del
  diseño aprobado.

## Claims que no debemos inventar

No usar en ningún texto público hasta tener el dato real y verificado:

- Años de experiencia.
- Número de investigaciones realizadas.
- Número de clientes atendidos.
- Porcentajes o estadísticas de éxito.
- Resultados garantizados ("garantizamos el resultado", "100% de éxito").
- Testimonios o reseñas de clientes.
- Certificaciones, colegiaciones o membresías específicas de este
  despacho (TIP/RNSP concretos).
- Precios o tarifas.
- Validez judicial absoluta ("válido en cualquier juzgado").
- Capacidad de acceso ilegal (dispositivos, cuentas, comunicaciones sin
  consentimiento/autorización).

Cualquier copy nuevo que toque estos temas debe pasar por la skill
`legal-guardrails` antes de publicarse.

## SEO pendiente

- **Dominio real**: no está definido. `src/lib/site-config.ts` lee
  `NEXT_PUBLIC_SITE_URL` con fallback a `http://localhost:3000` — hay que
  fijar la variable de entorno en producción con el dominio real antes del
  deploy. No se ha inventado ningún dominio en el código.
- **Imagen Open Graph**: no existe un asset 1200×630 pensado para
  compartir en redes/mensajería. Por eso `og:image` no está configurado
  todavía — se ha preferido omitirlo a mostrar un logo recortado o
  deformado. Pendiente de diseño.
- **Schema.org (LocalBusiness/ProfessionalService)**: preparado en código
  (`src/lib/schema.ts`) pero **no se inyecta en la página todavía** porque
  requeriría nombre comercial, teléfono formal y dirección — publicarlo
  con placeholders arriesga que Google indexe datos falsos. Se activará en
  cuanto `businessName`/dirección estén confirmados (ver comentario en ese
  archivo).
- **Nombre comercial para `<title>`/OG**: se usa "Búho Detectives" (ya
  usado en el resto del proyecto como nombre de marca) — confirmar que es
  el nombre comercial definitivo y no solo un nombre de trabajo.
- **SEO local**: no se han creado páginas de ciudad
  (`/detective-madrid`, etc.). No se crearán hasta que el cliente confirme
  cobertura real y estrategia — así lo pidió explícitamente.
- **Sitemap**: `src/app/sitemap.ts` solo incluye la homepage real; no
  incluye páginas que no existen.
