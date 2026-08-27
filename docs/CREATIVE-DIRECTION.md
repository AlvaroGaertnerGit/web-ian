# Dirección creativa — Web de detective privado

**Fase 0 — Estrategia, investigación y dirección creativa.** Este documento no implementa nada; define la dirección para que cualquier diseñador/desarrollador pueda continuar sin volver a decidir desde cero.

Toda la información de negocio (nombre, TIP, RNSP, ciudades, años de experiencia, precios) es **placeholder** hasta que se confirme con datos reales, siguiendo `.claude/skills/copywriting-legal-es/` y `.claude/skills/legal-guardrails/`.

---

## 1. Executive Summary

El sector español de detectives privados online es, casi sin excepción, anticuado, denso en texto legal y visualmente intercambiable entre despachos. Esto es una oportunidad clara: **una web premium, editorial y visualmente cuidada destacaría inmediatamente** en un sector que compite casi exclusivamente por precio y SEO agresivo, no por experiencia de marca.

La recomendación de esta fase es una dirección **editorial/documental** ("El Expediente"): tipografía serif de gran presencia, tratamiento casi de reportaje de investigación, con la claridad y el rigor tipográfico de un sistema de "precisión" tomado de una de las otras propuestas exploradas. Prioriza confianza y claridad sobre espectáculo visual, es la más barata de mantener sin fotografía bespoke, y escala mejor a decenas de páginas de servicio/ciudad sin perder coherencia.

Ninguno de los cuatro conceptos explorados usa lupas, sombreros, siluetas, prensa amarilla ni estética de espionaje/hacker — se cumple la restricción central del proyecto.

---

## 2. Market Research

Investigación realizada sobre despachos de detectives privados con presencia online en España (búsqueda + análisis de estructura de dos homepages representativas). Ver fuentes al final de este documento.

### Hallazgos generales

- **Todos** comunican legalidad y validez judicial como argumento central ("informes con plena validez legal", "habilitados por el Ministerio del Interior", número de RNSP visible).
- **Casi todos** listan servicios de forma exhaustiva y indiferenciada: infidelidades, bajas laborales, competencia desleal, localización de personas, herencias, informática forense, todo en una sola lista larga sin jerarquía visual.
- **La mayoría** usa el teléfono como CTA principal ("Llamar ahora"), no un formulario de consulta discreta — probablemente porque el visitante medio de estos sitios busca respuesta inmediata y compara precio.
- **Casi ninguno** invierte en fotografía propia: los sitios analizados son predominantemente texto, con logos institucionales (universidades, colegios profesionales) como única prueba visual de confianza.
- **Precio como argumento de venta explícito** es común ("Desde 200€", "50-80€/hora") — refuerza la percepción de comoditización del sector.
- Diseño visual: plantillas WordPress genéricas, navegación con muchos submenús, sin dirección de arte reconocible, sin sistema tipográfico cuidado.
- SEO: fuerte densidad de páginas por ciudad/servicio, pero con contenido a menudo repetitivo entre ellas (el patrón de "granja de contenido" que `seo-local` está diseñada para evitar).

### Lo que sí funciona y merece conservarse

- Comunicar legalidad y validez judicial pronto y con claridad (pero sin absolutismos — ver `legal-guardrails`).
- FAQ dedicada a objeciones reales (legalidad, confidencialidad, coste).
- Segmentación de servicios por audiencia (particulares / empresas / abogados / seguros).

---

## 3. Competitor Patterns

| Patrón | Qué hace casi todos | Qué funciona | Qué está anticuado | Qué resulta genérico |
|---|---|---|---|---|
| Mensaje de legalidad | Sí, casi universal | Genera confianza si es concreto | — | Cuando se repite como eslogan vacío ("legal y confidencial") sin explicación |
| Lista de servicios | Sí, exhaustiva y plana | Cubre todas las intenciones de búsqueda | Listas sin jerarquía visual, 15+ ítems en un menú | Redacción idéntica entre despachos (parece copiada) |
| CTA telefónico | Sí, dominante | Inmediatez para quien ya decidió | — | Agresivo para quien aún está decidiendo si contactar (`CLAUDE.md` §6) |
| Fotografía | Casi nadie invierte en ella | — | Ausencia total de imagen = frialdad | Stock genérico de "espía con gabardina" cuando aparece |
| Credenciales | RNSP/TIP visibles | Alta confianza cuando es verificable | Formato burocrático, poco legible | — |
| Precio explícito | Frecuente | Transparencia | — | Convierte el servicio en commodity comparado solo por €/hora |
| Diseño visual | Plantilla genérica | — | Tipografía de sistema, sin escala, WordPress por defecto | Prácticamente indistinguible entre despachos |
| Blog/SEO | Presente pero desigual | Tráfico orgánico | Contenido thin repetido por ciudad | Landing pages ciudad×servicio casi idénticas |

---

## 4. Opportunities

1. **Dirección de arte real.** Ningún competidor analizado tiene un sistema tipográfico, de color o de espaciado deliberado — cualquier sistema de diseño coherente ya diferencia.
2. **Jerarquía en los servicios**, no una lista plana: agrupar por audiencia (`CLAUDE.md` §7) con una narrativa clara por segmento.
3. **CTA en dos velocidades**: mantener el CTA calmado ("Cuéntanos tu caso") como principal, sin renunciar a un canal directo (teléfono/WhatsApp) como secundario para quien ya decidió — cubre ambos perfiles de usuario sin sonar agresivo.
4. **Credenciales tratadas como diseño, no como trámite** — TIP/RNSP presentados con la misma calidad tipográfica que el resto de la marca, no como una nota a pie de página burocrática.
5. **Contenido informativo real** (blog, FAQ, "cómo trabajamos") en vez de granjas de páginas ciudad×servicio — mejor SEO a medio plazo y mejor percepción de marca.
6. **Fotografía documental/editorial con intención**, no espía-de-stock, como diferenciador visual inmediato frente a un sector que no invierte en imagen.
7. **Confidencialidad como experiencia de producto**, no solo como palabra: microcopy, transiciones y estructura de formulario que *se sientan* discretos (sin fricción innecesaria, sin campos invasivos).

---

## 5. User Profiles

### 1. Particular — situación personal sensible

- **Busca:** claridad sobre si su situación (infidelidad, familia, custodia) es "investigable" y qué implica.
- **Le preocupa:** exposición, coste, legalidad, si el detective le tomará en serio.
- **Necesita saber:** que es confidencial, que es legal, aproximación de coste, cómo empieza el proceso.
- **Objeciones:** "¿Es legal esto?", "¿Se van a enterar?", "¿Cuánto cuesta realmente?".
- **CTA:** "Cuéntanos tu caso" / "Consulta confidencial" — nunca telefónico como única opción visible arriba.
- **Debe encontrar rápido:** FAQ de legalidad/confidencialidad, sección "Cómo trabajamos", el servicio de particulares.

### 2. Empresa — sospecha o problema interno

- **Busca:** validar una sospecha (baja fraudulenta, fuga de información, competencia desleal) con procedimiento correcto.
- **Le preocupa:** riesgo legal/laboral de actuar mal, impacto reputacional, que el informe no sirva ante un juicio.
- **Necesita saber:** validez del informe, experiencia con casos similares, discreción frente a la plantilla.
- **Objeciones:** "¿Esto puede volverse en mi contra si lo hago mal?", "¿El informe realmente sirve en un despido?".
- **CTA:** "Solicitar valoración" / "Hablar con un detective".
- **Debe encontrar rápido:** servicios para empresas, credenciales/validez legal, casos por sector si existen.

### 3. Abogado — apoyo probatorio

- **Busca:** un proveedor de investigación fiable para aportar como prueba en un procedimiento.
- **Le preocupa:** rigor metodológico, plazos, calidad del informe, coordinación profesional.
- **Necesita saber:** metodología, tipo de informe entregado, experiencia colaborando con despachos.
- **Objeciones:** "¿El informe aguanta un peritaje contrario?", "¿Puedo hablar directamente con el investigador?".
- **CTA:** "Contactar" / vía directa a un canal profesional (no un formulario genérico de particular).
- **Debe encontrar rápido:** página específica para abogados, metodología/proceso, forma de contacto directa.

### 4. Seguros / fraude

- **Busca:** verificar una reclamación o siniestro sospechoso con procedimiento defendible.
- **Le preocupa:** que la investigación sea proporcional y legal, tiempos de entrega, coste por caso/volumen.
- **Necesita saber:** experiencia específica en siniestros/fraude de seguros, formato de entrega, gestión de volumen.
- **Objeciones:** "¿Pueden manejar varios casos con SLA?", "¿El procedimiento es defendible ante una reclamación del asegurado?".
- **CTA:** "Solicitar presupuesto" / canal B2B.
- **Debe encontrar rápido:** página de seguros, proceso, forma de contacto profesional.

---

## 6. Information Architecture

### Mapa del sitio

```
/                                          Inicio
/servicios                                 Hub de servicios
/servicios/particulares
/servicios/empresas
/servicios/abogados
/servicios/seguros
/servicios/investigacion-digital
/servicios/[servicio]                      Página por servicio real (ver seo-local)
/servicios/[servicio]/[ciudad]             Solo si hay cobertura y contenido genuinos
/detectives-privados-[ciudad]              Solo ciudades con cobertura real
/sobre-nosotros
/como-trabajamos
/casos                                     Casos anónimos, solo si existen de verdad
/preguntas-frecuentes
/blog
/blog/[slug]
/contacto
/aviso-legal · /privacidad · /cookies      Contenido legal (redactado con asesoría real, no inventado)
```

### Navegación principal

`Servicios ▾` (con submenú por audiencia) · `Cómo trabajamos` · `Sobre nosotros` · `Preguntas frecuentes` · `Blog` · CTA fijo: **Cuéntanos tu caso**

### Footer

Columnas: Servicios (enlace a cada uno) · Empresa (Sobre nosotros, Cómo trabajamos, Blog, Casos) · Legal (Aviso legal, Privacidad, Cookies) · Contacto (canal directo + placeholders TIP/RNSP) · Redes si existen.

### Contenido comercial vs. informativo

| Comercial (convierte) | Informativo (educa + SEO) |
|---|---|
| Hero, páginas de servicio, CTA final | Blog, FAQ, "Cómo trabajamos" (parcialmente comercial), casos anónimos |
| Objetivo: llevar a "Cuéntanos tu caso" | Objetivo: responder dudas antes de contactar, posicionar autoridad |
| Tono: cálido, orientado a acción | Tono: explicativo, pedagógico |

No se crean páginas SEO artificiales: cada página de `/servicios/[servicio]/[ciudad]` requiere servicio real + cobertura real + intención de búsqueda genuina (regla ya definida en `seo-local/SKILL.md`).

---

## 7. Creative Concepts

### Concepto 01 — El Expediente (editorial/documental)

**Idea central:** la interfaz se comporta como un informe de investigación bien escrito: tipografía con autoridad editorial, estructura clara por secciones numeradas, densidad de información alta pero nunca abrumadora. Cuenta la historia de "esto es un despacho que documenta, no que dramatiza".

**Sensación:** calma, rigor, "esto está en buenas manos".

**Referencias:** revistas de investigación/reportaje (estilo *The New Yorker*, *ProPublica*), despachos de abogados premium, editoriales de no-ficción, papelería/documentación de alta gama.

**Color:** carbón casi negro (`#17181C`) + blanco cálido (`#F7F5F0`) + gris neutro medio + un acento contenido en bronce/dorado apagado (`#9C7A45`) usado con mucha moderación (líneas, subrayados, iconografía puntual).

**Tipografía:** serif editorial de autoridad para titulares (peso variable, tracking ajustado) + sans-serif neutra y muy legible para cuerpo de texto y UI. Números tabulares para credenciales/fechas.

**Imagen:** documental, arquitectónica, detalle (papel, luz de ventana, calles, manos escribiendo un informe) — nunca escenificada como "espía". Tratamiento en duotono sutil sobre el carbón de marca para unificar fotografías de distintas fuentes/calidad hasta que exista banco propio.

**Layout:** grid editorial de columnas (como una revista), con folios/numeración de sección visibles ("01 — Servicios", "02 — Confianza"). Mucho aire vertical entre secciones.

**Scroll:** narrativo pero contenido — cada sección se revela una vez, sin looping ni parallax agresivo. El scroll avanza el "expediente" página a página conceptualmente.

**Parallax:** sutil, solo en imágenes de sección grandes (offset de 10-20px máx.), nunca en texto.

**Glassmorphism:** mínimo — solo en la barra de navegación flotante (fondo translúcido con blur ligero al hacer scroll) para mantener legibilidad sobre imagen sin romper el lenguaje editorial.

**Motion:** reveals de opacidad/traslación corta (8-16px) al entrar en viewport; los folios/números de sección tienen una micro-animación de conteo o subrayado al aparecer. Nada se mueve de forma continua/loop.

**Microinteracciones:** subrayado editorial que crece de izquierda a derecha en hover de enlaces; tarjetas de servicio con un borde que "se dibuja" en hover; botón CTA con cambio de peso tipográfico en vez de un efecto ruidoso.

**Mobile:** el grid editorial colapsa a una columna con el mismo sistema de folios/numeración; la navegación flotante se convierte en un menú de página completa con la misma tipografía serif de autoridad.

**Riesgos:** puede sentirse "demasiado corporativo/legal" si se sobrecarga de texto sin suficiente aire; requiere disciplina tipográfica real (una tipografía serif mediocre arruina el efecto).

**Diferenciación:** ningún competidor analizado tiene una dirección editorial; la mayoría son plantillas genéricas sin sistema tipográfico — este concepto es inmediatamente reconocible como "otra categoría de despacho".

---

### Concepto 02 — El Observador (arquitectónico/espacial)

**Idea central:** la interfaz se comporta como un espacio arquitectónico: observación silenciosa, profundidad real, luz y sombra. Cuenta la historia de "precisión y presencia discreta", no de acción.

**Sensación:** calma tensa, atención, sofisticación silenciosa.

**Referencias:** estudios de arquitectura premium, firmas de inteligencia corporativa (Kroll, Nardello & Co, S-RM — en su registro visual sobrio, no sus productos), fotografía urbana nocturna, marcas de lujo discretas (relojería, no moda).

**Color:** negro cálido casi total + blanco roto + un azul desaturado casi gris como único acento (`#5C7285` aprox.) para elementos interactivos.

**Tipografía:** sans-serif geométrica de gran escala para titulares (mucho tracking negativo, tamaños enormes), la misma familia en peso ligero para cuerpo — sistema tipográfico único, sin serif.

**Imagen:** arquitectura urbana, ventanas, reflejos, calles de noche, luz artificial — fotografía real de gran calidad es *imprescindible* aquí; sin ella el concepto colapsa en genérico.

**Layout:** asimétrico, mucho espacio negativo, contenido "flotando" sobre fotografía a pantalla completa en el hero y en transiciones de sección.

**Scroll:** storytelling fuerte — cada sección ocupa el viewport completo y se revela con una transición de profundidad (la imagen de fondo se mueve más lento que el texto).

**Parallax:** central al concepto — capas de fondo (imagen), capa media (elementos gráficos) y capa de texto se mueven a velocidades distintas en el hero y en 2-3 transiciones clave.

**Glassmorphism:** puntual, para paneles de información flotando sobre la fotografía (tarjeta de servicio o cita destacada con blur sobre imagen) — no en toda la interfaz.

**Motion:** movimiento de cámara simulado (leve zoom/desplazamiento en imágenes de fondo), texto que aparece con más peso dramático que el Concepto 01.

**Microinteracciones:** el cursor puede tener un efecto sutil de "foco" sobre imágenes; tarjetas con leve elevación 3D al hover.

**Mobile:** el parallax se reduce drásticamente (casi desactivado), las secciones a pantalla completa se convierten en bloques normales — riesgo real de que la experiencia móvil se sienta como "otra web" si no se diseña con cuidado.

**Riesgos:** el más alto de los cuatro en "demasiado cinematográfico" si la fotografía no es excelente; alta dependencia de banco de imágenes propio (coste); riesgo de rendimiento (imágenes grandes + parallax) si no se optimiza con rigor (`performance` skill).

**Diferenciación:** muy alta — nada parecido existe en el sector analizado. El riesgo es que se perciba más cerca de una consultora de "riesgo/seguridad corporativa" que de un despacho cercano para particulares — hay que dosificarlo si el público principal es particular, no solo empresa/abogado.

---

### Concepto 03 — Capas de Confianza (glassmorphism deliberado)

**Idea central:** la información se construye en capas translúcidas que se superponen y aclaran progresivamente — visualiza literalmente "de la sospecha a la evidencia" como un proceso de capas que se vuelven nítidas.

**Sensación:** claridad progresiva, modernidad, orden.

**Referencias:** consultoras estratégicas contemporáneas, dashboards editoriales (no SaaS), señalética de museos de diseño.

**Color:** gris neutro cálido de fondo + blanco + un acento en burdeos oscuro (`#6B2737`) para las superficies de mayor jerarquía.

**Tipografía:** sans-serif humanista de peso medio, muy legible, sin serif — el sistema tipográfico es más discreto que en los otros conceptos porque el protagonismo visual lo llevan las superficies.

**Imagen:** fotografía documental discreta, usada con moderación, casi siempre detrás de una capa de vidrio (nunca a pantalla completa sin tratamiento).

**Layout:** sistema de tarjetas apiladas con profundidad — cada sección "flota" sobre la anterior con un desplazamiento sutil de superficie.

**Scroll:** las capas de vidrio se enfocan (menos blur, más contraste) a medida que entran en el centro del viewport — refuerza la metáfora "de la sospecha a la evidencia".

**Parallax:** limitado a la superposición de capas de vidrio, no a fotografía de fondo.

**Glassmorphism:** es el lenguaje central del concepto — cada superficie relevante (nav, cards de servicio, panel de confianza, CTA final) usa transparencia y blur controlados, con bordes de 1px y sombra suave para mantener legibilidad.

**Motion:** transición de blur/opacidad al hacer scroll (de "sospecha" borrosa a "evidencia" nítida) — es el concepto con más motion ligado directamente al mensaje de marca.

**Microinteracciones:** las tarjetas "se aclaran" (menos blur) al hover; el CTA principal tiene un halo de luz sutil.

**Mobile:** el blur pesado en `backdrop-filter` es costoso en móviles de gama media — necesita una versión simplificada (menos capas simultáneas, blur reducido) para no penalizar rendimiento.

**Riesgos:** es el concepto con más riesgo de leer como "app SaaS" o "startup tech" en vez de despacho profesional — exactamente lo que `CLAUDE.md` §2-4 pide evitar si no se dosifica con extremo cuidado; también el de mayor riesgo de accesibilidad (contraste texto/fondo sobre superficies translúcidas) y de rendimiento (blur en múltiples capas).

**Diferenciación:** moderada-alta frente al sector (que no usa glassmorphism en absoluto), pero es la técnica visual más "de moda" ahora mismo — envejece peor que una dirección tipográfica/editorial atemporal.

---

### Concepto 04 — Cronología (precisión tipográfica / técnica)

**Idea central:** la interfaz se comporta como un instrumento de precisión — reglas, numeración, alineación exacta — para comunicar rigor metodológico antes que cualquier otra cosa. Cuenta la historia de "un proceso exacto, no una promesa vaga".

**Sensación:** confianza fría-precisa, orden, competencia técnica.

**Referencias:** dibujo técnico/planos de arquitectura, diseño editorial suizo (grid tipográfico estricto), papelería de despachos de patentes, relojería de precisión.

**Color:** carbón + blanco + un verde oliva desaturado como único acento (`#5B6650`), usado casi exclusivamente en líneas, numeración y estados activos.

**Tipografía:** una única familia sans-serif de altísima legibilidad con números tabulares, usada en una escala tipográfica muy estricta (pocos tamaños, mucha disciplina); los números de proceso ("01", "02"...) en un tamaño desproporcionadamente grande como elemento gráfico central.

**Imagen:** mínima — el concepto puede funcionar casi sin fotografía, apoyándose en líneas, retículas y tipografía. Cuando aparece imagen, es siempre recortada con líneas/marcas de precisión superpuestas (como anotaciones técnicas).

**Layout:** retícula estricta y visible (líneas finas delimitando columnas/secciones), fuerte alineación horizontal, mucho uso de reglas divisorias en vez de tarjetas con sombra.

**Scroll:** una línea de progreso vertical o los números de sección avanzan con el scroll (refuerzo literal de "cronología"/proceso).

**Parallax:** casi nulo — el concepto obtiene su sofisticación de la precisión tipográfica, no del movimiento de capas.

**Glassmorphism:** **no se usa.** Es el concepto que responde explícitamente a "si consideras que otra técnica es mejor, dilo": aquí, bordes finos de 1px, superficies opacas y contraste tipográfico hacen mejor el trabajo que el vidrio — el glassmorphism diluiría la sensación de precisión.

**Motion:** casi todo el motion vive en la tipografía (números que cuentan, líneas que se dibujan, subrayados que avanzan) — prácticamente nada se mueve por decoración.

**Microinteracciones:** líneas divisorias que se "trazan" al hacer scroll hasta la sección; números de proceso con un leve cambio de color al estado activo.

**Mobile:** el sistema de retícula/reglas se simplifica pero se conserva (menos columnas, mismas líneas divisorias) — es, de los cuatro, el que menos se resiente en móvil porque depende mínimamente de imagen o de efectos de profundidad.

**Riesgos:** el más alto de los cuatro en "demasiado técnico/frío" — sin calidez humana en el copy y sin ninguna fotografía, puede sentirse más cercano a una consultora de ingeniería que a un despacho que trata con personas en momentos sensibles.

**Diferenciación:** alta — nadie en el sector usa un sistema tipográfico de precisión así; además es la propuesta más barata y rápida de mantener/escalar (casi sin dependencia de banco de imágenes).

---

## 8. Concept Comparison

Puntuación 1-10 por criterio (no solo por "espectacularidad"):

| Criterio | 01 Expediente | 02 Observador | 03 Capas de Confianza | 04 Cronología |
|---|---|---|---|---|
| Confianza | 9 | 8 | 6 | 7 |
| Claridad | 9 | 7 | 7 | 10 |
| Diferenciación | 7 | 9 | 6 | 8 |
| Profesionalidad | 9 | 8 | 6 | 7 |
| Conversión | 8 | 7 | 7 | 8 |
| Accesibilidad | 9 | 6 | 6 | 9 |
| Rendimiento | 8 | 6 | 6 | 10 |
| Escalabilidad | 9 | 7 | 8 | 10 |
| SEO | 9 | 7 | 7 | 9 |
| Multi-servicio | 9 | 7 | 8 | 9 |
| **Total** | **86** | **72** | **67** | **87** |

El resultado numérico queda prácticamente empatado entre 01 y 04 — la decisión no se basa solo en el total, ver §9.

---

## 9. Recommended Direction

**Recomendación: Concepto 01 — El Expediente, incorporando el sistema tipográfico de precisión del Concepto 04 para la sección "Cómo trabajamos" y para la numeración de secciones en general.**

**Por qué, y no solo por el total:** 01 y 04 quedan prácticamente empatados (86 vs 87). El criterio que el propio encargo sitúa en primer lugar es **confianza**, y ahí 01 (9) supera claramente a 04 (7) — el riesgo de "frialdad técnica" de 04 es real para un servicio que trata con personas en situaciones sensibles (`CLAUDE.md` §6). 01 también gana en profesionalidad (9 vs 7) por el mismo motivo: la calidez editorial humaniza el rigor sin perderlo.

Pero 04 gana con claridad en rendimiento, accesibilidad y escalabilidad — precisamente porque depende mínimamente de fotografía bespoke que hoy no existe. La solución no es descartar 04, es **tomar su sistema de precisión tipográfica** (números de proceso grandes, retícula con reglas finas, disciplina de escala) e insertarlo dentro del lenguaje editorial de 01, especialmente en "Cómo trabajamos" y en la numeración de secciones ("01 — Servicios", "02 — Confianza"...) que 01 ya contemplaba de forma más suave.

02 (Observador) queda descartado como dirección principal por su dependencia de fotografía de gran calidad que no existe todavía y por su riesgo de rendimiento/móvil — pero su fotografía documental/arquitectónica puede reutilizarse puntualmente (p.ej. en la página "Sobre nosotros" o en el hero, una vez exista banco de imágenes real) sin adoptar todo el sistema de parallax.

03 (Capas de Confianza) queda descartado: es el que peor encaja con la advertencia explícita de `CLAUDE.md` §2 y §4 contra la estética "SaaS/startup", y el glassmorphism ya no es un diferenciador (el propio brief de este proyecto lo marca como opcional, no obligatorio).

**Actualización:** tras esta decisión, la comparativa de 4 conceptos quedó cerrada y "El Expediente" se llevó a una exploración de alta fidelidad como dirección única (sin nueva comparativa) — fotografía documental real (tratada, no ilustrada), profundidad en capas, y un componente de marca nuevo (la tarjeta de metadata de expediente) que no estaba en la ronda inicial. Ver `docs/creative-explorations/` para el resultado renderizado y `visual-evaluation.md` para la autoevaluación frente a los criterios de éxito. El §10 de este documento ya refleja los valores validados en esa pasada.

---

## 10. Preliminary Design System

Dirección, no implementación — nada de esto se codifica en esta fase. Valores revisados y validados contra la exploración de alta fidelidad en `docs/creative-explorations/` (ver esa carpeta para el sistema visto ya renderizado, no solo descrito).

### Paleta

| Token | Valor aprox. | Uso |
|---|---|---|
| `background` | `#F6F1E7` (blanco cálido) | Fondo principal en modo claro |
| `background-inverse` | `#0E0D0B` (carbón casi negro, con textura de grano — nunca plano) | Fondo de secciones de énfasis (hero, cómo trabajamos, confianza, CTA final) |
| `foreground` | `#211E17` | Texto sobre fondo claro |
| `foreground-inverse` | `#F4ECDC` | Texto sobre fondo oscuro |
| `muted` | `#8C8368` (claro) / `#8C8368` sobre oscuro, `#5C5646` para texto terciario sobre oscuro | Texto secundario, metadatos |
| `border` | `rgba(20,18,13,0.12)` (claro) / `rgba(244,236,220,0.14)` (oscuro) | Líneas divisorias, reglas editoriales |
| `accent` (bronce) | `#B08A52` | Metadata de expediente, numeración, acentos puntuales — nunca fondos grandes |
| `accent-dim` | `#8A6F45` | Texto en cursiva de énfasis, sellos/etiquetas sobre superficies claras |
| `accent-muted` (verde oliva, tomado del sistema de precisión) | `#5B6650` | Estados activos en la sección "Cómo trabajamos" |

Sin negro puro ni blanco puro. Validado en la exploración: los fondos oscuros llevan **grano fílmico sutil** (ver Textura) y un gradiente radial casi imperceptible — nunca un `#000000` plano — y el blanco cálido se valida bien tanto en superficies grandes como en tarjetas.

### Tipografía

- **Display/serif editorial** (validado: Newsreader o equivalente) — para H1/H2, acentos en cursiva y números de proceso grandes. Peso variable, tracking ajustado en tamaños grandes.
- **Sans-serif neutra de alta legibilidad** (validado: Work Sans o equivalente) — cuerpo de texto, UI, navegación, formularios.
- **Monoespaciada** (validado: IBM Plex Mono o equivalente) — uso exclusivo para "metadata de expediente": folios de sección (`§ 01 —`), coordenadas, timestamps, credenciales tabulares. No se usa para nada más — su presencia puntual es lo que la hace efectiva.
- Tres voces tipográficas, cada una con un rol único y no intercambiable — no cuatro, no dos.

### Escala tipográfica (dirección, no valores finales)

Escala modular ~1.25-1.333, con un salto adicional grande reservado solo para el H1 del hero y los números de proceso ("01", "02"...) — estos pueden romper la escala modular deliberadamente como recurso gráfico, no tipográfico convencional.

### Espaciado

Sistema en base 4/8px, con seguridad de aire generoso entre secciones (el efecto editorial depende de espacio negativo, no de densidad). Ritmo vertical consistente entre folios de sección.

### Radios

Mínimos — el lenguaje editorial usa esquinas mayormente rectas o con radio muy sutil (2-4px) en cards/botones; nada de esquinas muy redondeadas (rompería la sensación de rigor documental).

### Textura

Grano fílmico sutil (ruido de baja intensidad, opacidad ~0.06-0.09, `mix-blend-mode: overlay`) sobre fondos oscuros y sobre toda fotografía — es lo que separa este sistema de un "flat design" corporativo y refuerza la sensación documental/cinematográfica. Extremadamente discreto: no debe notarse como efecto, solo sentirse como material fotográfico.

### Sombras / bordes / blur

- Bordes de 1px (`border` token) siguen siendo el recurso por defecto para separación en superficies de UI (nav, listas de servicio, credenciales).
- **Excepción validada**: los elementos que representan objetos físicos superpuestos (fotografías con cinta adhesiva, documentos, tarjetas de informe en la sección Evidencias) sí llevan una sombra suave y difusa (`0 30px 60px -24px rgba(20,18,13,0.3)` aprox.) más una rotación de <1.5° — esto es lo que les da sensación de profundidad/capas físicas reales. Reservado a esa sección; el resto del sistema sigue sin sombra.
- Blur en dos puntos únicamente: la navegación flotante al hacer scroll, y la tarjeta de metadata de expediente sobre fotografía (`EXPEDIENTE 024 / MADRID / 22:47`) — nunca en cards de contenido general.

### Superficies

Superficies opacas por defecto. Las dos superficies translúcidas del sistema son la barra de navegación al hacer scroll y la tarjeta de metadata de expediente sobre fotografía — ambas con blur ligero (10-14px) y borde casi imperceptible (`rgba(244,236,220,0.16)` sobre oscuro).

### Botones

Primario: fondo carbón/texto claro (o inverso sobre fondo oscuro), sin radio pronunciado, con un subrayado o cambio de peso tipográfico en hover en vez de un efecto de sombra/elevación. Secundario: solo borde + texto, sin fondo.

### Cards

Borde de 1px + tipografía, sin sombra pronunciada; el "folio" de sección (numeración editorial) puede vivir dentro o junto a la card como recurso gráfico compartido con el sistema de precisión tipográfica.

### Componente: tarjeta de metadata de expediente

Validado como el componente de marca más distintivo del sistema — reutilizable en cualquier punto donde una fotografía necesite una anotación breve: superficie translúcida (blur 10-14px, `rgba(20,18,13,0.42)`), borde de 1px casi imperceptible, una etiqueta mono en bronce (p. ej. "EXPEDIENTE 024") + un dato secundario en mono claro (ciudad, hora, referencia). Nunca más de 3 líneas de información — su fuerza está en la brevedad.

### Navegación

Barra superior con fondo transparente sobre el hero, que gana fondo translúcido con blur ligero al hacer scroll (uno de los dos únicos usos de glassmorphism del sistema). En móvil, menú a pantalla completa con la tipografía serif de titulares.

### Tratamiento fotográfico

Duotono de marca — sombras `#121210`, medios `#7A6650`, luces `#F4ECDC` — más grano fílmico (ver Textura), aplicado a toda fotografía para unificar procedencias distintas hasta que exista banco propio consistente. Receta completa y reproducible (Python/Pillow) documentada en `docs/creative-explorations/prompts.md`. Validado: una fotografía real con este tratamiento es sustancialmente más efectiva que cualquier composición abstracta/vectorial — priorizar conseguir fotografía real (aunque sea de banco libre en fase de exploración) sobre ilustrarla.

### Sistema de motion

Ver §12 — reveals cortos (opacidad + 8-16px de traslación), sin loops, `prefers-reduced-motion` respetado en todo el sistema, motion adicional (contadores, líneas que se trazan) reservado a la sección de proceso.

---

## 11. Homepage Concept

| Sección | Objetivo | Información clave | CTA | Importancia | Tratamiento visual | Interacción |
|---|---|---|---|---|---|---|
| **Hero** | Responder "qué hacemos" en 3 segundos | Titular + subtítulo + valor central | Cuéntanos tu caso (primario) · Consulta confidencial (secundario) | Máxima | Fondo carbón o imagen documental duotono, titular serif de gran escala, folio "00" | Reveal de titular por línea al cargar; nav transparente sobre el hero |
| **Problema/Insight** | Diferenciar sospecha de evidencia | "Una sospecha puede generar dudas. Una investigación aporta información." | — | Alta | Bloque tipográfico grande sobre fondo claro, folio "01" | Reveal simple al hacer scroll |
| **Servicios** | Mostrar que hay una vía clara para cada perfil de usuario | Grid por audiencia (particulares/empresas/abogados/seguros/digital) | Enlace a cada servicio | Máxima | Cards con borde 1px, icono/numeración editorial, sin fotografía | Borde que se dibuja en hover |
| **Confianza/Credenciales** | Resolver "¿puedo confiar en esto?" | TIP/RNSP (placeholder), metodología, confidencialidad | — | Máxima | Bloque sobre fondo oscuro con tipografía de credenciales en números tabulares | Ninguna, la sobriedad es el efecto |
| **Cómo trabajamos** | Mostrar proceso, reducir incertidumbre | 6 pasos numerados (Consulta → Análisis → Estrategia → Investigación → Informe → Ratificación) | — | Alta | Sistema de precisión del Concepto 04: números grandes, línea de progreso | Línea de progreso avanza con el scroll |
| **Evidencia** | Explicar qué recibe el cliente | Tipos de informe/evidencia, sin prometer resultado | — | Media-alta | Bloque editorial con ejemplos genéricos (no casos reales inventados) | Reveal simple |
| **Casos** (si existen) | Prueba social real, anónima | Resúmenes anónimos | — | Media (opcional en v1 si no hay casos reales) | Cards estilo "expediente" | Reveal simple |
| **FAQ** | Resolver objeciones antes del contacto | Legalidad, confidencialidad, coste | — | Alta | Acordeón tipográfico simple | Expandir/colapsar |
| **CTA final** | Conversión calmada | Reafirmación del mensaje central + CTA | Cuéntanos tu caso | Máxima | Fondo oscuro, tipografía grande, sin urgencia | Ninguna especial |

**Primer viewport:** título corto y directo + subtítulo de una frase + dos CTA (primario calmado, secundario directo) + indicio visual de scroll. En 3 segundos el visitante debe saber: qué hacemos, para quién (implícito en el subtítulo o en un enlace rápido a "Particulares/Empresas"), qué nos diferencia (el tono y la ejecución, no un claim), cómo contactar (CTA visible sin scroll).

---

## 12. Animation & Interaction Philosophy

- Motion como refuerzo de jerarquía y significado (contador de la sección de proceso, línea que avanza), nunca decorativo por sí mismo — coherente con `motion/SKILL.md`.
- Reveals de 200-500ms, easing suave, sin rebote.
- `viewport={{ once: true }}` en todo reveal de scroll — nada se repite al volver a pasar por encima.
- `prefers-reduced-motion` deshabilita reveals y contadores, deja el contenido visible de inmediato — la web debe ser igual de comprensible sin ninguna animación.
- Sin animaciones en bucle, sin parallax salvo el sutil del hero/imágenes de sección grandes.
- Microinteracciones con propósito: hover de enlace (subrayado que crece), hover de card (borde que se dibuja), botón (cambio de peso tipográfico) — nunca un efecto que no comunique nada.

---

## 13. Image Direction

- Documental, arquitectónica, de detalle — papel, luz, calles, manos, documentos abstractos. Nunca "detective con gabardina/lupa" ni estética de vigilancia.
- Duotono de marca sobre cualquier fotografía hasta que exista un banco propio consistente — evita el efecto "stock mezclado".
- Ninguna imagen decorativa sin función: cada fotografía ilustra un concepto real de la sección en la que vive (proceso, confianza, servicio), no relleno.
- Placeholder explícito (bloque de color + etiqueta) donde aún no exista fotografía real, en vez de stock genérico de "detective" — un placeholder honesto es mejor que un cliché.

---

## 14. Mobile Philosophy

- Mobile-first real, no reducción del layout desktop.
- La retícula editorial colapsa a una columna conservando folios/numeración de sección (identidad de marca intacta en cualquier tamaño).
- CTA principal siempre accesible sin scroll excesivo (fijo o repetido al final de cada sección larga).
- Parallax/motion reducidos al mínimo indispensable en mobile — prioridad total a rendimiento y legibilidad sobre efecto visual.
- Navegación: menú a pantalla completa con la misma jerarquía tipográfica que desktop, no una versión empobrecida.

---

## 15. Accessibility Considerations

- Contraste AA mínimo garantizado en toda combinación fondo/texto del sistema (carbón/blanco cálido da margen amplio; el acento bronce nunca se usa como color de texto sobre fondo claro sin verificar contraste).
- Foco visible en todo elemento interactivo (heredado de `design-system/SKILL.md`).
- Ningún significado transmitido solo por color o solo por animación (p. ej. el estado activo del proceso usa color **y** peso tipográfico **y** posición).
- Objetivo táctil mínimo 44×44px en todo elemento interactivo, incluidos los del menú móvil.
- `prefers-reduced-motion` respetado en la totalidad del sistema de motion (§12).
- Jerarquía de encabezados semántica y consistente con la numeración visual de folios (no depender de la numeración visual para la estructura real del documento).

---

## 16. Performance Considerations

- El concepto recomendado es, deliberadamente, el que menos depende de fotografía bespoke de alta resolución — reduce el mayor riesgo de rendimiento del proyecto hasta que exista banco de imágenes real.
- Server Components por defecto; motion y cualquier interacción con estado quedan en componentes cliente puntuales (`performance/SKILL.md`).
- Blur (`backdrop-filter`) limitado a un único elemento (nav en scroll) — evita el coste de render de blur en múltiples capas simultáneas.
- Tipografía vía `next/font`, sin peticiones externas a Google Fonts.
- Imágenes vía `next/image`, con `sizes` correcto en toda imagen con `fill`.

---

## 17. SEO Considerations

- Arquitectura de URLs y reglas de creación de páginas ya definidas en `seo-local/SKILL.md` — ninguna página ciudad×servicio sin cobertura y contenido reales.
- El sistema editorial es naturalmente denso en texto bien estructurado (encabezados claros, folios de sección) — favorece indexación y featured snippets frente a la competencia, que es visual-mente pobre pero también, a menudo, pobre en estructura semántica real.
- Schema.org (`LocalBusiness`/`ProfessionalService`/`FAQPage`) solo con datos confirmados — ver `seo-local/reference/schema-checklist.md`.
- Contenido informativo real (blog, FAQ) como estrategia principal de SEO a medio plazo, no expansión artificial de landing pages.

---

## 18. Risks

| Riesgo | Concepto afectado | Mitigación |
|---|---|---|
| Demasiado "legal/corporativo" si el texto domina sin suficiente aire | 01 | Disciplina de espaciado (§10), fotografía documental puntual, copy humano (`copywriting-legal-es`) |
| Demasiado "cinematográfico" si se reintroduce fotografía de gran escala sin cuidado | 01 (si se toma prestado de 02) | Duotono de marca obligatorio, fotografía siempre funcional, nunca decorativa |
| Ausencia de fotografía real retrasa la sensación "premium" | Todos, especialmente 02 | El concepto recomendado (01+04) es el menos dependiente de fotografía bespoke |
| El sistema de precisión tipográfica (04) se siente frío si se aplica a toda la web en vez de solo al proceso | 01+04 | Limitar el lenguaje de Cronología a la sección "Cómo trabajamos" y a la numeración, no a todo el sitio |
| Placeholders de credenciales visibles ([TIP], [RNSP]) reducen confianza mientras no haya datos reales | Todos | Priorizar obtener los datos reales antes de publicar en producción; los placeholders son aceptables en fase de desarrollo/staging, no en producción pública |

---

## 19. Open Questions

Estas preguntas bloquean partes de la implementación y deben resolverse con el cliente antes o durante el desarrollo:

1. Nombre real del despacho/detective, TIP, RNSP, ciudad(es) de cobertura real.
2. ¿Existen casos anónimos reales que puedan mostrarse en `/casos`, o esa sección se pospone?
3. ¿Existe banco de fotografía propio o hay presupuesto para encargarlo? (condiciona cuánto puede acercarse la ejecución final al Concepto 02 en secciones puntuales).
4. Canal de contacto preferente además del formulario (¿teléfono visible? ¿WhatsApp? — el sector lo usa mucho, pero debe integrarse sin romper el tono calmado).
5. ¿Servicios reales confirmados por audiencia? (particulares/empresas/abogados/seguros/digital — no asumir que se ofrecen todos).
6. ¿Existe ya un rango de precios comunicable, o se mantiene siempre "Solicitar presupuesto"?
7. Idioma: confirmado solo español de España, sin i18n — mantener así salvo indicación contraria explícita.

---

## 20. Recommended Next Steps

1. Resolver las preguntas abiertas de §19 con el cliente — en particular nombre/TIP/RNSP/ciudades, que bloquean gran parte del copy real.
2. Revisar y validar este documento y las exploraciones visuales (`docs/creative-explorations/`) antes de tocar código.
3. Una vez aprobada la dirección, iniciar Fase 1: definición del design system real (tokens en `globals.css`) siguiendo `design-system/SKILL.md`, ya informada por §10 de este documento.
4. Construir la arquitectura de información real (`architecture/SKILL.md`) y las páginas base con placeholders, pasando `copywriting-legal-es` y `legal-guardrails` sobre cada pieza de contenido.
5. Encargar o seleccionar el banco fotográfico real antes de implementar el hero definitivo — es la pieza que más condiciona el resultado final del concepto recomendado.
6. No implementar nada de esta fase hasta recibir aprobación explícita de la dirección creativa.

---

# Creative Principles — Final Direction

Esta sección fija la dirección **definitiva**, tras dos rondas de exploración: una ejecución premium pero genérica ("El Expediente" — demasiado reconocible como "web corporativa de investigación oscura") y un intento de reset hacia una mecánica de "experiencia de investigación" que se descartó por anteponer el descubrimiento a la claridad. Esta sección la sustituye a ambas como referencia de trabajo. La exploración renderizada que la acompaña vive en `docs/creative-explorations/` — en particular `homepage.html` (canvas publicado) y `visual-evaluation.md` (autoevaluación).

**Calibración objetivo:** 7/10 en dirección artística, 4-5/10 en complejidad de interacción, 3-4/10 en complejidad de navegación. La sofisticación se siente, no se demuestra.

### Referencias — principios extraídos, no estéticas copiadas

| Referencia | Principio extraído (no su estética) |
|---|---|
| LVMH — The Journey | Relación entre imagen y movimiento para generar profundidad sin saturar la composición. |
| Immersion (Valérian Kinyock) | Disciplina de grid y control tipográfico como fuente de sofisticación, no el efecto. |
| StudioFMRG | Hacer mucho con pocos elementos — restricción como criterio de diseño. |
| LVMH Openlands | Transiciones fluidas entre secciones, sin cortes bruscos ni saltos de ritmo. |
| Studio Freight / Stord | Jerarquía clara entre información general y detalle — el usuario nunca se pierde entre ambas capas. |
| Active Theory | Una interfaz sencilla puede tener personalidad digital propia sin depender de complejidad técnica. |
| Clear Street | Presentación visual de información compleja de forma inmediatamente legible. |

Ninguna de estas referencias se replica en layout, color, animación o nivel de complejidad — de cada una se toma solo el principio de la tabla, aplicado dentro de la calibración 7/4-5/3-4 de este proyecto.

## 1. Dirección visual definitiva

Web editorial, tipográfica y fotográfica, de estructura completamente convencional (Nav → Hero → Propuesta de valor → Servicios → Cómo trabajamos → Evidencias/Resultados → Confianza → FAQ → Contacto). La innovación vive en composición, tipografía, fotografía, espaciado, profundidad y transiciones — nunca en la navegación ni en la mecánica de acceso a la información. Ningún recurso visual único (vidrio, negro, parallax) puede ser "la identidad" — la identidad es la combinación disciplinada de todos ellos.

## 2. Nivel de complejidad

- Dirección artística: 7/10.
- Complejidad de interacción: 4-5/10 (scroll + reveals + un acordeón de FAQ; nada más).
- Complejidad de navegación: 3-4/10 (nav superior convencional, sin mega-menús ni navegación espacial).
- Regla de simplificación aplicada a cada decisión: *¿podemos conseguir el 80% del impacto con el 20% de la complejidad? Si sí, elegimos la opción simple.*

## 3. Principios de composición

- Estructura convencional y predecible; la sorpresa está en la ejecución, no en el orden de las secciones.
- Ritmo claro/oscuro entre secciones (ver Color) para crear cadencia visual sin depender de efectos.
- Asimetría moderada donde aporte (p. ej. Servicios: lista + imagen asociada en vez de columna centrada), nunca como gesto gratuito.
- Espacio negativo generoso — la composición respira antes de añadir un elemento más.
- Un elemento por composición puede romper la retícula (un titular, un número grande); el resto se disciplina a ella.

## 4. Tipografía

Dos voces, no tres: una serif editorial de autoridad (titulares, acentos en cursiva, números de proceso) y una sans-serif neutra de alta legibilidad (cuerpo, UI, navegación). Jerarquía por encima de decoración — cada salto de tamaño/peso debe corresponder a un salto real de importancia, no a una preferencia estética. Números tabulares para credenciales y fechas. Se retira la tercera familia monoespaciada usada en la ronda anterior para "metadata de expediente" — simplificación deliberada; su función (etiquetas cortas, datos) la cubre la sans-serif con tracking ampliado cuando haga falta.

## 5. Color

Paleta neutra y atemporal, no un "todo negro + bronce":

| Token | Valor | Uso |
|---|---|---|
| `background` | `#F7F5F1` | Fondo claro principal |
| `background-alt` | `#EFEBE1` | Fondo claro secundario (variación sutil para secciones como Confianza) |
| `background-inverse` | `#0E0D0B` | Fondo oscuro de máximo contraste — reservado al hero y al CTA final |
| `background-inverse-soft` | `#242219` | Fondo oscuro secundario, más grafito que negro — usado en "Cómo trabajamos" para evitar que todo lo oscuro sea idéntico |
| `foreground` | `#221F19` | Texto sobre claro |
| `foreground-inverse` | `#F2EEE4` | Texto sobre oscuro |
| `muted` | `#8C8672` | Texto secundario |
| `accent` | `#A9824F` | Único color de acento — bronce apagado, nunca como fondo dominante |

Ritmo de página objetivo: no más de un tercio de las secciones en fondo oscuro (en la exploración final: 3 de 9). El acento es uno solo y aparece con moderación — subrayados, numeración, detalles puntuales.

## 6. Fotografía

Protagonista, pero nunca sobre un cliché de detective (sin lupas, sin cámaras apuntando, sin agentes ni siluetas). Registro editorial/documental: arquitectura, ciudad, interiores, detalles, documentos, texturas. Dos tratamientos, no uno — un duotono más marcado para las escenas nocturnas (hero, cierre) y una desaturación ligera que conserva el tono natural para escenas diurnas/neutras (ver Servicios en la exploración) — evita que toda la fotografía del sitio lea igual. Grano fílmico sutil (opacidad ~0.05-0.09) en toda fotografía, como firma de tratamiento consistente. Nunca fotografía sin tratar a pantalla completa salvo que sea banco propio ya confirmado.

## 7. Motion

Con función, nunca decorativo: un titular que aparece progresivamente, una imagen que se desplaza ligeramente, una línea de progreso que avanza con el scroll, una sección que transiciona con suavidad. Reveals cortos (opacidad + 8-12px), una sola vez, sin loops. Prohibido explícitamente: texto volando por la pantalla, múltiples elementos moviéndose a la vez, scroll hijacking, animación continua, WebGL "porque queda espectacular". Prueba de fuego: si se elimina la mitad del motion, la página debe seguir siendo espectacular por composición y tipografía — si no lo es, el motion estaba sosteniendo un diseño débil.

## 8. Parallax

Sí, pero cinematográfico y limitado. Regla de tres capas (aplicada solo en el hero de la exploración final): un elemento se mueve bastante (la fotografía de fondo), uno ligeramente (un indicador secundario), uno permanece prácticamente estático (el titular). Nunca las tres capas a la misma velocidad, nunca parallax en más de un punto por página salvo que una sección lo justifique explícitamente.

## 9. Glassmorphism

No obligatorio, no protagonista. Un único uso validado en la exploración final: la barra de navegación gana un fondo con blur muy sutil (~10px) al hacer scroll, con un hairline inferior — nada más en toda la página. Si se añade un segundo uso en implementación, debe justificarse con la misma pregunta que cualquier otro efecto: ¿resuelve un problema de legibilidad/jerarquía, o es decoración?

## 10. Responsive

Mobile-first real: la retícula editorial colapsa a una columna sin perder jerarquía (titulares, folios, fotografía siguen presentes, solo cambian de escala). El parallax se reduce al mínimo indispensable en mobile — prioridad total a rendimiento y legibilidad. La navegación pasa a menú de página completa con la misma tipografía que desktop. Ninguna sección depende de hover para revelar información — todo lo que es legible en desktop lo es también en mobile sin interacción adicional.

## 11. Accesibilidad

Contraste AA verificado en toda combinación fondo/texto, incluidas las variantes de fondo oscuro secundario (`background-inverse-soft`) que son más claras que el carbón principal y requieren su propia comprobación. Foco visible en todo elemento interactivo. Ningún significado transmitido solo por color o solo por animación. `prefers-reduced-motion` desactiva parallax y reveals sin perder contenido. Objetivo táctil mínimo 44×44px, incluido el acordeón de FAQ.

## 12. Performance

La fotografía sigue siendo el mayor riesgo de rendimiento — mitigado por: tratamiento y compresión consistentes, `next/image` con `sizes` correcto, y por limitar el número de fotografías por página (tres en la exploración final, no más). Blur (`backdrop-filter`) limitado a un único elemento (nav en scroll). Tipografía vía `next/font`. Motion implementado con CSS/transform y opacity — nunca JS pesado para efectos que CSS resuelve solo.

## 13. Information hierarchy

La estructura convencional (Nav → Hero → Propuesta → Servicios → Cómo trabajamos → Evidencias → Confianza → FAQ → Contacto) es intencional, no un compromiso: cada sección responde una pregunta real del visitante en el orden en que normalmente se la hace (`CLAUDE.md` §1). Ninguna información de servicio, proceso, confianza o FAQ está oculta detrás de una interacción — todo es legible con scroll simple. La única superficie interactiva real es el acordeón de FAQ, un patrón estándar y esperado, no una invención.

## 14. Qué NO hacer

- No convertir ningún recurso visual (vidrio, negro, parallax, un tipo de fotografía) en la identidad completa del sitio.
- No esconder información de servicios, proceso o confianza detrás de una interacción.
- No usar más de un parallax por página salvo justificación explícita.
- No animar más de un elemento a la vez sin una razón narrativa clara.
- No usar WebGL, scroll hijacking, ni navegación espacial/experimental.
- No dejar que una sección oscura sea idéntica a otra (usar `background-inverse` vs `background-inverse-soft` con criterio).
- No añadir una tercera familia tipográfica.
- No usar fotografía de stock obvia ni clichés de detective bajo ningún concepto.
- No añadir un efecto que, al eliminarlo, no cambie nada — si no se nota que falta, no debía estar.

---

## Fuentes (Market Research)

- [Detectives Privados en España | Investigación Privada — CTX Detectives](https://www.ctxdetectives.com/detectives-privados-en-espana)
- [Detectives Privados en Madrid | Investigación e inteligencia — DETCODE](https://detcode.es/)
- [Detectives privados Madrid y España — Sippem](https://detectiveprivadoenmadrid.com/)
- [Detectives Privados en Madrid — Ochoa Detectives](https://www.ochoadetectives.com/)
- [Despacho de detectives privados — Detectives 360º](https://detectives-360.com/)
- [Agencia Detectives Privados España | Privalia Detectives](https://www.privaliadetectives.com/detective-privado-espana/)
- [Detectives Privados Madrid | Cuzco Detectives](https://cuzcodetectives.com/)
- [Detectives privados Madrid precios — Detectives Privados Madrid IRIS](https://detectivesmadrid.org/detectives-privados-madrid-precios/)
- [Pide presupuestos de Detectives Privados en Madrid — Cronoshare](https://www.cronoshare.com/servicios/detectives-privados/madrid/madrid)
- [Detectives privados madrid precios — Gran Vía Detectives Privados](https://agenciagranvia.com/detectives-privados-madrid-precios/)
- [Los 10 Mejores Detectives Privados en Madrid — Qdetective](https://qdetective.com/detectives-privados/madrid-aranjuez/)
- [Detectives Privados en Madrid con licencia — desde 200€](https://detectives-madrid.es/)
- [Welcome — Nardello & Co. Homepage](https://nardelloandco.com/)
- [Investigations, Diligence and Compliance — Kroll](https://www.kroll.com/en/services/investigations-diligence-and-compliance)
