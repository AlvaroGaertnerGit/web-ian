/**
 * FAQ content. Answers were written during the QA/polish pass (the
 * questions pre-existed, answers didn't) using only generic, verifiable
 * statements — no invented credentials, years of experience or outcome
 * guarantees. See docs/CONTENT-CONTRACT.md before editing these for
 * anything that touches legal claims.
 */
export const faqContent = {
  sectionNumber: "06",
  title: "Preguntas frecuentes",
  items: [
    {
      id: "legalidad",
      question: "¿Es legal contratar un detective privado?",
      answer:
        "Sí, es completamente legal. La investigación privada es una profesión regulada en España, y un detective privado colegiado puede obtener pruebas lícitas y admisibles siempre que actúe dentro del marco legal.",
    },
    {
      id: "casos",
      question: "¿Qué tipo de casos aceptáis?",
      answer:
        "Trabajamos con particulares, empresas, abogados y aseguradoras: infidelidades, absentismo laboral, localización de personas, competencia desleal, informes periciales y otros supuestos dentro del marco legal.",
    },
    {
      id: "confidencialidad",
      question: "¿Cómo garantizáis la confidencialidad?",
      answer:
        "Toda la información del caso se trata con máxima discreción, tanto durante la investigación como en la comunicación contigo.",
    },
    {
      id: "duracion",
      question: "¿Cuánto tiempo tarda una investigación?",
      answer:
        "Depende de la complejidad y el tipo de caso. Tras la consulta inicial te damos una estimación orientativa antes de empezar.",
    },
  ],
} as const;
