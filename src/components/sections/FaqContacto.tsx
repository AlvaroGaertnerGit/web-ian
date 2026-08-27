import { ArrowIcon, PlusIcon } from "@/components/ui/icons";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

const FAQS = [
  "¿Es legal contratar un detective privado?",
  "¿Qué tipo de casos aceptáis?",
  "¿Cómo garantizáis la confidencialidad?",
  "¿Cuánto tiempo tarda una investigación?",
];

export function FaqContacto() {
  return (
    <section data-light="light" className="bg-paper grid grid-cols-1 lg:grid-cols-[1fr_0.78fr_1fr]">
      <div
        id="faq"
        className="px-6 md:px-16 lg:px-12 py-16 md:py-[6%] lg:border-r border-hairline"
      >
        <Reveal>
          <div className="text-[12px] font-bold text-paper-muted">06</div>
          <h2 className="font-display text-[24px] md:text-[26px] mt-3 mb-7">
            Preguntas frecuentes
          </h2>
        </Reveal>
        <StaggerGroup delay={0.1}>
          {FAQS.map((question) => (
            <StaggerItem
              key={question}
              className="flex items-center justify-between gap-4 py-[18px] border-b border-hairline"
            >
              <span className="text-[13.5px] font-semibold">{question}</span>
              <PlusIcon className="h-4 w-4 shrink-0" />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <a
          href="#faq"
          className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.04em] mt-6"
        >
          Ver todas las preguntas
          <ArrowIcon className="h-3.5 w-3.5" />
        </a>
      </div>

      <Reveal
        delay={0.1}
        className="px-6 md:px-16 lg:px-10 py-16 md:py-[6%] lg:border-r border-hairline"
      >
        <div id="contacto">
          <div className="text-[12px] font-bold text-paper-muted">07</div>
          <h2 className="font-display text-[20px] md:text-[22px] mt-3 mb-4">
            Cuéntanos tu caso
          </h2>
          <p className="text-[13.5px] leading-[1.6] text-paper-muted mb-7">
            Estaremos encantados de escucharte. Consulta inicial gratuita y sin
            compromiso.
          </p>
          <div className="text-[10.5px] font-bold tracking-[0.14em] text-paper-muted-2 uppercase">
            Email
          </div>
          <div className="text-[13.5px] mt-1.5 mb-6">
            buhodetectiveprivado@gmail.com
          </div>
          <div className="text-[10.5px] font-bold tracking-[0.14em] text-paper-muted-2 uppercase">
            Teléfono
          </div>
          <div className="text-[13.5px] mt-1.5">+34 624 56 27 98</div>
          <CtaButton href="mailto:buhodetectiveprivado@gmail.com" fullWidth className="mt-8">
            Contactar ahora
          </CtaButton>
        </div>
      </Reveal>

      <div
        data-light="dark"
        className="relative bg-ink px-6 md:px-11 py-14 flex flex-col justify-end overflow-hidden min-h-[260px]"
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "repeating-linear-gradient(70deg, #141414, #141414 4px, #1c1c1c 4px, #1c1c1c 40px)",
          }}
        />
        {/* Resolution glow: the light gathers around the closing line instead
            of the scene ending abruptly. */}
        <Reveal
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }}
          className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 100%, rgba(255,214,150,0.16) 0%, rgba(255,190,120,0.06) 45%, rgba(255,190,120,0) 75%)",
          }}
        >
          <span />
        </Reveal>
        <Reveal className="relative">
          <div className="w-9 h-px bg-paper/40 mb-4" />
          <h3 className="font-display text-paper text-[22px] md:text-[24px] leading-[1.12]">
            La verdad existe. Nosotros te ayudamos a encontrarla.
          </h3>
        </Reveal>
      </div>
    </section>
  );
}
