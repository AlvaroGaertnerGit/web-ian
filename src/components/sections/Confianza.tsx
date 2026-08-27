"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

import { OwlMark } from "@/components/ui/OwlMark";
import { LockIcon, ScaleIcon, BadgeIcon, TargetIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { useParallax } from "@/lib/motion/use-parallax";
import { fadeIn } from "@/lib/motion/variants";

const ITEMS = [
  {
    icon: LockIcon,
    title: "Confidencialidad",
    description: "Máxima discreción en cada actuación.",
  },
  {
    icon: ScaleIcon,
    title: "Legalidad",
    description: "Cumplimos la ley y actuamos dentro del marco legal.",
  },
  {
    icon: BadgeIcon,
    title: "Profesionalidad",
    description: "Investigadores titulados con amplia trayectoria.",
  },
  {
    icon: TargetIcon,
    title: "Rigor",
    description: "Métodos y técnicas contrastadas.",
  },
];

export function Confianza() {
  const sectionRef = useRef<HTMLElement>(null);
  const owlY = useParallax(sectionRef, { distance: 10 });

  return (
    <section
      ref={sectionRef}
      id="confianza"
      data-light="dark"
      className="relative bg-ink px-6 md:px-16 py-16 md:py-[6%] overflow-hidden"
    >
      {/* The owl watches from the corner — a brand cameo, not a mascot: it
          only ever fades in place (fadeIn) and drifts a few px with scroll,
          the original asset untouched (no redraw, no reshaping). */}
      <motion.div
        className="hidden md:block absolute -right-4 -top-6 w-[18%]"
        style={{ y: owlY }}
      >
        <Reveal variants={fadeIn} amount={0.15}>
          <OwlMark part="cara" tone="white" className="w-full h-auto opacity-90 rotate-[6deg]" />
        </Reveal>
      </motion.div>

      <Reveal>
        <div className="text-[12px] font-bold text-ink-muted">05</div>
        <h2 className="font-display text-paper text-[30px] md:text-[2.6vw] xl:text-[34px] leading-[1.08] mt-3 max-w-[600px]">
          Confianza que respalda nuestro trabajo.
        </h2>
      </Reveal>

      <StaggerGroup
        className="relative grid grid-cols-2 sm:grid-cols-4 max-w-[780px] mt-10 md:mt-12"
        delay={0.15}
      >
        {ITEMS.map((item, i) => (
          <StaggerItem
            key={item.title}
            className={[
              "pr-6 py-2",
              i > 0 ? "sm:border-l border-hairline-dark sm:pl-7" : "",
            ].join(" ")}
          >
            <item.icon className="h-[22px] w-[22px] text-paper" />
            <div className="text-[12.5px] font-bold uppercase tracking-[0.06em] text-paper mt-4">
              {item.title}
            </div>
            <div className="text-[12.5px] leading-[1.55] text-ink-muted mt-2">
              {item.description}
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
