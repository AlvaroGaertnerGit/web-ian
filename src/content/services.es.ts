/**
 * "Convertimos hechos en evidencia" — the four investigative capabilities
 * shown as illustrated cards. Not to be confused with `serviciosContent`
 * in home.es.ts, which lists client segments (particulares/empresas/...),
 * not capabilities. Each id maps to an illustration component chosen in
 * Evidencia.tsx — this file only holds the words.
 */
export const servicesContent = {
  sectionNumber: "04",
  title: "Convertimos hechos en evidencia.",
  items: [
    {
      id: "vigilancias",
      number: "01",
      title: "Vigilancias",
      description:
        "Seguimiento discreto y documentación fotográfica y videográfica.",
    },
    {
      id: "documentacion",
      number: "02",
      title: "Documentación",
      description: "Obtención y análisis de documentos e información.",
    },
    {
      id: "localizaciones",
      number: "03",
      title: "Localizaciones",
      description: "Geolocalización y seguimiento de objetivos y bienes.",
    },
    {
      id: "informes",
      number: "04",
      title: "Informes",
      description: "Informes detallados, claros y ratificables en juicio.",
    },
  ],
} as const;
