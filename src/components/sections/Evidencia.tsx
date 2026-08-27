import { MapPinIcon, PersonIcon, StackIcon, DocumentIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

const ITEMS = [
  {
    icon: PersonIcon,
    title: "Vigilancias",
    description:
      "Seguimiento discreto y documentación fotográfica y videográfica.",
  },
  {
    icon: DocumentIcon,
    title: "Documentación",
    description: "Obtención y análisis de documentos e información.",
  },
  {
    icon: MapPinIcon,
    title: "Localizaciones",
    description: "Geolocalización y seguimiento de objetivos y bienes.",
  },
  {
    icon: StackIcon,
    title: "Informes",
    description: "Informes detallados, claros y ratificables en juicio.",
  },
];

export function Evidencia() {
  return (
    <section data-light="light" className="bg-paper px-6 md:px-16 py-16 md:py-[6%]">
      <Reveal>
        <div className="text-[12px] font-bold text-paper-muted">04</div>
        <h2 className="font-display text-[30px] md:text-[2.6vw] xl:text-[34px] mt-3 mb-10 md:mb-12 max-w-[600px]">
          Convertimos hechos en evidencia.
        </h2>
      </Reveal>
      <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6" delay={0.1}>
        {ITEMS.map((item, i) => (
          <StaggerItem key={item.title} className={i % 2 === 1 ? "lg:mt-6" : ""}>
            <div className="aspect-[4/3.4] rounded-sm bg-[#141414] flex items-center justify-center">
              <item.icon className="h-8 w-8 text-paper/85" />
            </div>
            <div className="text-[13px] font-bold uppercase tracking-[0.05em] mt-4">
              {item.title}
            </div>
            <div className="text-[12.5px] leading-[1.55] text-paper-muted mt-2">
              {item.description}
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
