import { ArrowIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import {
  DocumentacionIllustration,
  InformesIllustration,
  LocalizacionesIllustration,
  VigilanciasIllustration,
} from "@/components/sections/EvidenciaIllustrations";
import { servicesContent } from "@/content/services.es";

const ILLUSTRATIONS = {
  vigilancias: VigilanciasIllustration,
  documentacion: DocumentacionIllustration,
  localizaciones: LocalizacionesIllustration,
  informes: InformesIllustration,
} as const;

export function Evidencia() {
  return (
    <section id="evidencia" data-light="light" className="bg-paper px-6 md:px-16 py-16 md:py-[6%]">
      <Reveal>
        <div className="text-[12px] font-bold text-paper-muted">{servicesContent.sectionNumber}</div>
        <h2 className="font-display text-[30px] md:text-[2.6vw] xl:text-[34px] mt-3 mb-10 md:mb-14 max-w-[600px]">
          {servicesContent.title}
        </h2>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6" delay={0.1}>
        {servicesContent.items.map((item) => {
          const Illustration = ILLUSTRATIONS[item.id as keyof typeof ILLUSTRATIONS];
          return (
            <StaggerItem key={item.id} className="group border border-hairline">
              <a href="#contacto" aria-label={`Consultar sobre ${item.title}`} className="block">
                <div className="aspect-[4/3.3] flex items-center justify-center px-6 py-6">
                  <Illustration className="w-[70%] h-auto" />
                </div>

                <div className="relative border-t border-hairline px-5 py-5 md:px-6 md:py-6">
                  <span className="text-[12px] font-bold text-paper-muted-2 tabular-nums">
                    {item.number}
                  </span>
                  <div className="font-display text-[16px] md:text-[17px] mt-2">{item.title}</div>
                  <p className="text-[12.5px] leading-[1.55] text-paper-muted mt-2 pr-7">
                    {item.description}
                  </p>
                  <ArrowIcon
                    className="absolute bottom-5 right-5 md:bottom-6 md:right-6 h-4 w-4 transition-transform duration-300 ease-out [transform:rotate(-45deg)] group-hover:[transform:rotate(-45deg)_translate(1px,-1px)]"
                  />
                </div>
              </a>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
