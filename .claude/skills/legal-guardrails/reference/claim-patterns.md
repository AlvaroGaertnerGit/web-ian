# Claim pattern reference

Full table behind `scripts/scan-claims-es.mjs`. Keep this in sync with
the script's `CLAIM_PATTERNS` constant — if you add/change a pattern in
one, update the other.

| Category | Prohibited example | Why problematic | Prudent alternative |
|---|---|---|---|
| `illegal-access-claim` | "Accedemos a WhatsApp y redes sociales para obtener las pruebas." | Sugiere acceso no autorizado a dispositivos/cuentas/comunicaciones de terceros — puede constituir un delito contra el secreto de las comunicaciones (art. 197 CP). | "Obtenemos evidencias mediante vigilancia y documentación directa, dentro del marco legal vigente." |
| `illegal-access-claim` | "Podemos acceder a cualquier móvil." | Misma razón — capacidad de acceso ilimitado a dispositivos. | "Trabajamos con las técnicas de investigación permitidas por la ley, sin acceder a dispositivos ajenos." |
| `unlawful-data-obtaining` | "Conseguimos sus datos sin necesidad de autorización." | Obtención de datos personales sin base legal (LOPDGDD/RGPD). | "Recabamos información dentro del marco legal de protección de datos vigente." |
| `indiscriminate-surveillance-claim` | "Podemos localizar a cualquier persona." | Vigilancia/localización sin las limitaciones legales de interés legítimo y proporcionalidad. | "Localizamos personas dentro del marco legal, cuando existe un interés legítimo acreditado." |
| `absolute-result-guarantee` | "Garantizamos resultados." / "100% de éxito." / "Siempre obtenemos pruebas." | El resultado depende de los hechos del caso y no puede garantizarse; puede constituir publicidad engañosa. | "Investigamos con rigor para maximizar las posibilidades de obtener evidencia válida." |
| `judicial-validity-absolute-claim` | "Pruebas válidas ante cualquier juzgado." | La admisibilidad de una prueba la determina el juez caso por caso; no es algo que el despacho pueda garantizar de forma universal. | "Elaboramos los informes siguiendo la metodología habitual para que puedan aportarse como prueba, si el juzgado así lo determina." |

## Differentiating claim types

Not every sentence matching a pattern above is a violation — classify
before rewriting:

| Type | What it is | Example | Action |
|---|---|---|---|
| **Factual statement** | A fact about the regulatory framework, independent of this firm | "La investigación privada está regulada en España." | Usually fine as-is. |
| **Commercial claim** | A promise about *this firm's* capability or result | "Garantizamos el éxito de tu caso." | Highest risk — rewrite per the table above. |
| **Service description** | What the firm does, in neutral process terms | "Realizamos seguimiento y documentación fotográfica." | Fine if it doesn't imply an illegal method or a guaranteed outcome. |
| **Legal explanation** | General info about legality/admissibility | "Un informe de investigación puede aportarse como prueba." | Keep general and hedged; never state it as universal fact. |
| **Promise of outcome** | Anything implying the client will get the specific result they hope for | "Encontraremos las pruebas que buscas." | Always rewrite to describe the process, not the guaranteed outcome. |
| **Compliance reassurance** | A statement of what the firm *won't* do, usually with "no"/"nunca" before the trigger phrase | "No accedemos a dispositivos sin autorización judicial." | Keep — this is the correct, reassuring framing. The scanner still flags it (`possibleCompliance: true`) because regex can't fully parse negation; a human confirms it's fine, doesn't reword it into something vaguer. |

## Notes on scope

This table is not exhaustive and not legal advice. If new copy raises a
concern that doesn't match any pattern here, flag it manually with the
same why/alternative structure and consider adding a pattern to the
script. When a claim is genuinely ambiguous (e.g., involves specific
Spanish case law or a jurisdiction-specific nuance), say so explicitly
and recommend the user confirm with an actual lawyer — this skill's job
ends at "here's a risky-sounding phrasing," not "here's the correct
legal answer."
