"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionStyle, MotionValue } from "framer-motion";

import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

const STEPS = [
  {
    number: "01",
    title: "Consulta",
    description: "Escuchamos tu caso y entendemos tus necesidades.",
  },
  {
    number: "02",
    title: "Análisis",
    description: "Valoramos la información y definimos la estrategia adecuada.",
  },
  {
    number: "03",
    title: "Investigación",
    description: "Obtenemos datos verificables mediante técnicas profesionales.",
  },
  {
    number: "04",
    title: "Informe",
    description:
      "Entregamos un informe claro, detallado y objetivamente verificable.",
  },
  {
    number: "05",
    title: "Ratificación",
    description: "Nuestros informes son ratificables en sede judicial.",
  },
];

type Step = (typeof STEPS)[number];

function StepBlock({ step, style }: { step: Step; style?: MotionStyle }) {
  return (
    <motion.div style={style}>
      <div className="font-display text-ink-muted text-[22px]">{step.number}</div>
      <div className="text-[12.5px] font-bold uppercase tracking-[0.06em] text-paper mt-3.5">
        {step.title}
      </div>
      <div className="text-[12.5px] leading-[1.55] text-ink-muted mt-2">
        {step.description}
      </div>
    </motion.div>
  );
}

/**
 * Scroll-scrubbed process timeline: a tall wrapper holds a `sticky` viewport
 * in place while the user scrolls through it — no JS pinning, no
 * `preventDefault`, native scroll stays in full control.
 *
 * The line and each step's activation track the *maximum* scroll progress
 * reached (`maxProgress`), not the live value, so scrolling back up never
 * retracts the line or deactivates a step — this section's own spec says
 * "cada paso queda activo, no desaparece", matching the site-wide rule that
 * the world accumulates instead of erasing itself.
 */
function PinnedTimeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const maxProgress = useMotionValue(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v > maxProgress.get()) maxProgress.set(v);
    });
  }, [scrollYProgress, maxProgress]);

  // Fixed count (5 steps) — explicit calls, not a loop, per rules-of-hooks.
  const op0 = useTransform(maxProgress, [0, 0.06], [0.35, 1]);
  const op1 = useTransform(maxProgress, [0.18, 0.24], [0.35, 1]);
  const op2 = useTransform(maxProgress, [0.38, 0.44], [0.35, 1]);
  const op3 = useTransform(maxProgress, [0.58, 0.64], [0.35, 1]);
  const op4 = useTransform(maxProgress, [0.78, 0.84], [0.35, 1]);
  const opacities: MotionValue<number>[] = [op0, op1, op2, op3, op4];

  return (
    <div ref={wrapperRef} className="hidden md:block relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center px-16">
        <div className="relative pt-9">
          <div className="absolute top-0 left-0 right-0 h-px bg-hairline-dark" />
          <motion.div
            aria-hidden
            className="absolute top-0 left-0 h-px w-full bg-paper origin-left"
            style={{ scaleX: maxProgress }}
          />
          <div className="grid grid-cols-5 gap-x-6">
            {STEPS.map((step, i) => (
              <StepBlock key={step.number} step={step} style={{ opacity: opacities[i] }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Non-scrubbed fallback for `prefers-reduced-motion` — same content, no pin, no extra scroll distance. */
function ReducedMotionTimeline() {
  return (
    <div className="hidden md:grid px-16 pb-16 grid-cols-5 gap-x-6 border-t border-hairline-dark pt-9">
      {STEPS.map((step) => (
        <StepBlock key={step.number} step={step} />
      ))}
    </div>
  );
}

/** Mobile: no pin/scrub — a plain scroll-triggered reveal, always rendered below `md`. */
function StaticTimeline() {
  return (
    <div className="md:hidden px-6 pb-16">
      <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10 border-t border-hairline-dark pt-9">
        {STEPS.map((step) => (
          <StaggerItem key={step.number}>
            <StepBlock step={step} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

export function ComoTrabajamos() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="como-trabajamos" data-light="dark" className="bg-ink">
      <div className="px-6 md:px-16 pt-16 md:pt-[6%]">
        <Reveal>
          <div className="text-[12px] font-bold text-ink-muted">02</div>
          <h2 className="font-display text-paper text-[30px] md:text-[2.6vw] xl:text-[34px] mt-3 mb-10 md:mb-12">
            Cómo trabajamos
          </h2>
        </Reveal>
      </div>

      {prefersReducedMotion ? <ReducedMotionTimeline /> : <PinnedTimeline />}
      <StaticTimeline />
    </section>
  );
}
