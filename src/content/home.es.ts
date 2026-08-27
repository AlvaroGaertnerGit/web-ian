/**
 * Content for Hero, StatBand, "Servicios de investigación" (client
 * segments — not to be confused with services.es.ts, which covers the
 * "Convertimos hechos en evidencia" capabilities), Cómo trabajamos,
 * Confianza and Footer. Presentation (layout, animation, illustrations)
 * stays in the components; this file only holds the words and the small
 * structural data (numbers, ids) that come with them.
 */

export const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo trabajamos", href: "#como-trabajamos" },
  { label: "Nosotros", href: "#confianza" },
  { label: "FAQ / Contacto", href: "#faq" },
] as const;

export const heroContent = {
  eyebrow: "Investigación privada",
  /** Rendered as 3 separately-staggered lines on desktop, joined into one line on mobile. */
  titleLines: ["Necesitas", "saber la", "verdad."],
  subtitle:
    "Obtenemos información objetiva y verificable para que tomes decisiones con seguridad.",
};

export const statBandContent = {
  titleLines: ["La información", "cambia las", "decisiones."],
  stats: [
    {
      id: "discrecion",
      title: "Discreción",
      description: "Confidencialidad absoluta en todas nuestras actuaciones.",
    },
    {
      id: "rigor",
      title: "Rigor",
      description: "Metodología profesional basada en hechos verificables.",
    },
    {
      id: "experiencia",
      title: "Experiencia",
      description: "Años de práctica en todo tipo de investigaciones.",
    },
    {
      id: "resultados",
      title: "Resultados",
      description: "Informes claros, útiles y válidos en procesos legales.",
    },
  ],
};

/** "Servicios de investigación" — who we work with, not what we do (that's services.es.ts). Deliberately unnumbered in the UI (see Servicios.tsx). */
export const serviciosContent = {
  title: "Servicios de investigación",
  items: [
    {
      id: "particulares",
      number: "01",
      title: "Particulares",
      description: "Investigaciones personales, familiares y patrimoniales.",
    },
    {
      id: "empresas",
      number: "02",
      title: "Empresas",
      description: "Fraude interno, competencia desleal, absentismo laboral, etc.",
    },
    {
      id: "abogados",
      number: "03",
      title: "Abogados",
      description:
        "Apoyo probatorio, localización de deudores, investigación patrimonial.",
    },
    {
      id: "investigacion-digital",
      number: "04",
      title: "Investigación digital",
      description: "Obtención y análisis de información en entornos digitales.",
    },
  ],
};

export const comoTrabajamosContent = {
  sectionNumber: "03",
  title: "Cómo trabajamos",
  steps: [
    {
      id: "consulta",
      number: "01",
      title: "Consulta",
      description: "Escuchamos tu caso y entendemos tus necesidades.",
    },
    {
      id: "analisis",
      number: "02",
      title: "Análisis",
      description: "Valoramos la información y definimos la estrategia adecuada.",
    },
    {
      id: "investigacion",
      number: "03",
      title: "Investigación",
      description: "Obtenemos datos verificables mediante técnicas profesionales.",
    },
    {
      id: "informe",
      number: "04",
      title: "Informe",
      description:
        "Entregamos un informe claro, detallado y objetivamente verificable.",
    },
    {
      id: "ratificacion",
      number: "05",
      title: "Ratificación",
      description: "Nuestros informes son ratificables en sede judicial.",
    },
  ],
};

export const confianzaContent = {
  sectionNumber: "05",
  title: "Confianza que respalda nuestro trabajo.",
  pillars: [
    {
      id: "confidencialidad",
      number: "01",
      title: "Confidencialidad",
      description: "Máxima discreción en cada actuación.",
    },
    {
      id: "legalidad",
      number: "02",
      title: "Legalidad",
      description: "Cumplimos la ley y actuamos dentro del marco legal.",
    },
    {
      id: "profesionalidad",
      number: "03",
      title: "Profesionalidad",
      description: "Investigadores titulados con amplia trayectoria.",
    },
    {
      id: "rigor",
      number: "04",
      title: "Rigor",
      description: "Métodos y técnicas contrastadas.",
    },
  ],
};

export const footerContent = {
  /** Legal pages don't exist yet — kept as plain (non-link) labels. See CONTENT-CONTRACT.md. */
  legalLinks: ["Aviso legal", "Privacidad", "Política de cookies"],
};
