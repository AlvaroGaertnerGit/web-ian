import { DocumentIcon, EyeIcon, ShieldIcon, TargetIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { GrowLine } from "@/components/motion/grow-line";

const STATS = [
  {
    icon: EyeIcon,
    title: "Discreción",
    description: "Confidencialidad absoluta en todas nuestras actuaciones.",
  },
  {
    icon: TargetIcon,
    title: "Rigor",
    description: "Metodología profesional basada en hechos verificables.",
  },
  {
    icon: DocumentIcon,
    title: "Experiencia",
    description: "Años de práctica en todo tipo de investigaciones.",
  },
  {
    icon: ShieldIcon,
    title: "Resultados",
    description: "Informes claros, útiles y válidos en procesos legales.",
  },
];

export function StatBand() {
  return (
    <section
      data-light="dark"
      className="relative bg-ink px-6 md:px-16 py-14 md:py-[4.5%] grid grid-cols-1 md:grid-cols-[0.85fr_1.3fr] gap-10 md:gap-14"
    >
      <GrowLine className="absolute top-0 left-6 right-6 md:left-16 md:right-16 h-px bg-hairline-dark" />

      <Reveal className="flex flex-col md:flex-row md:items-center gap-6 md:gap-7">
        <div className="hidden md:block w-32 h-44 shrink-0" />
        <div className="md:hidden h-40" />
        <h2 className="font-display text-paper text-[28px] md:text-[2.6vw] xl:text-[34px] leading-[1.08]">
          La información
          <br />
          cambia las
          <br />
          decisiones.
        </h2>
      </Reveal>

      <StaggerGroup className="grid grid-cols-2 sm:grid-cols-4" amount={0.4} delay={0.15}>
        {STATS.map((stat, i) => (
          <StaggerItem
            key={stat.title}
            className={[
              "px-0 sm:px-7 py-2",
              i > 0 ? "sm:border-l border-hairline-dark" : "",
              i % 2 === 1 ? "pl-6 sm:pl-7" : "",
            ].join(" ")}
          >
            <stat.icon className="h-6 w-6 text-paper" />
            <div className="text-[12.5px] font-bold uppercase tracking-[0.08em] text-paper mt-4">
              {stat.title}
            </div>
            <div className="text-[13px] leading-[1.55] text-ink-muted mt-2">
              {stat.description}
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
