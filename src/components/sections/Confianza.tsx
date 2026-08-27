"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { useParallax } from "@/lib/motion/use-parallax";
import { duration, easing } from "@/lib/motion";
import { confianzaContent } from "@/content/home.es";

const PILLARS = confianzaContent.pillars;

// Node centers as % of the beam's width — aligned to the 4-column grid below.
const NODE_X = [12.5, 37.5, 62.5, 87.5];
// Each bright segment ends at its pillar's node (the first starts at a short
// left overhang, the last extends past the final node) — an architectural
// beam, not a progress line: it doesn't move once drawn.
const SEGMENTS = [
  [6, NODE_X[0]],
  [NODE_X[0], NODE_X[1]],
  [NODE_X[1], NODE_X[2]],
  [NODE_X[2], 94],
];

/**
 * "Cuatro pilares sosteniendo una misma viga": a one-shot construction
 * (viewport-triggered, never scroll-scrubbed — deliberately not the
 * live-progress mechanism Cómo trabajamos uses) where the beam and its four
 * nodes appear in step with each pillar's own text. `staggerChildren` on
 * one shared `StaggerGroup` drives both — a node's `delay` is computed to
 * land exactly when its pillar's `StaggerItem` would, so "línea → 01 → 02 →
 * 03 → 04" reads as a single sequence despite living in two DOM subtrees.
 */
const STAGGER_CHILDREN = 0.12;
const DELAY_CHILDREN = 0.05;

function pillarDelay(index: number) {
  return DELAY_CHILDREN + (index + 1) * STAGGER_CHILDREN;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: DELAY_CHILDREN } },
};

const baseLineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.slow, ease: easing.out } },
};

const numberVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: duration.slow, ease: easing.out } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: easing.out } },
};

function segmentVariants(delay: number): Variants {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.base, ease: easing.out, delay } },
  };
}

/** A pillar's node on the beam: a dim hollow diamond, always present, with a solid fill that lands with that pillar's own text. */
function NodeMark({
  delay,
  className,
  style,
}: {
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`w-2 h-2 border border-hairline-dark ${className ?? ""}`} style={style}>
      <motion.div
        className="w-full h-full bg-paper"
        variants={{
          hidden: { opacity: 0, scale: 0.4 },
          visible: { opacity: 1, scale: 1, transition: { duration: duration.base, ease: easing.out, delay } },
        }}
      />
    </div>
  );
}

export function Confianza() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberY = useParallax(sectionRef, { distance: 2 });

  return (
    <section
      ref={sectionRef}
      id="confianza"
      data-light="dark"
      className="relative bg-ink px-6 md:px-16 py-16 md:py-[6%] overflow-hidden"
    >
      <Reveal>
        <div className="text-[12px] font-bold text-ink-muted">{confianzaContent.sectionNumber}</div>
        <h2 className="font-display text-paper text-[30px] md:text-[2.6vw] xl:text-[34px] leading-[1.08] mt-3 max-w-[600px]">
          {confianzaContent.title}
        </h2>
      </Reveal>

      {/* Desktop: a beam spanning the four pillars, its segments and nodes arriving with each pillar's own text. */}
      <StaggerGroup className="hidden md:block mt-14" variants={containerVariants} amount={0.35}>
        <StaggerItem variants={baseLineVariants} className="relative h-10">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <line x1={6} y1={50} x2={94} y2={50} stroke="var(--hairline-dark)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            {SEGMENTS.map(([x1, x2], i) => (
              <motion.line
                key={i}
                x1={x1}
                y1={50}
                x2={x2}
                y2={50}
                stroke="var(--paper)"
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
                variants={segmentVariants(pillarDelay(i))}
              />
            ))}
          </svg>

          {NODE_X.map((x, i) => (
            <NodeMark
              key={i}
              delay={pillarDelay(i)}
              className="absolute"
              style={{ left: `${x}%`, top: "50%", transform: "translate(-50%, -50%) rotate(45deg)" }}
            />
          ))}
        </StaggerItem>

        <div className="group grid grid-cols-4 gap-x-6 mt-8">
          {PILLARS.map((pillar) => (
            <StaggerItem key={pillar.number} variants={{ hidden: {}, visible: {} }}>
              <div className="transition-opacity duration-300 group-hover:opacity-45 group-hover:hover:opacity-100">
                <motion.div
                  variants={numberVariants}
                  style={{ y: numberY }}
                  className="font-display text-paper text-[44px] md:text-[52px] leading-none"
                >
                  {pillar.number}
                </motion.div>
                <motion.div variants={textVariants} className="font-display text-paper text-[19px] md:text-[21px] mt-4">
                  {pillar.title}
                </motion.div>
                <motion.p
                  variants={textVariants}
                  className="text-[12.5px] leading-[1.55] text-ink-muted mt-3 max-w-[220px]"
                >
                  {pillar.description}
                </motion.p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerGroup>

      {/* Mobile: the same structure turned vertical — one line, one node per pillar. */}
      <StaggerGroup className="md:hidden group relative mt-12" variants={containerVariants} amount={0.2}>
        <div className="absolute left-[7px] top-1 bottom-1 w-px bg-hairline-dark" />
        <motion.div
          variants={baseLineVariants}
          className="absolute left-[7px] top-1 bottom-1 w-px bg-paper origin-top"
        />

        <div className="flex flex-col gap-9">
          {PILLARS.map((pillar, i) => (
            <StaggerItem key={pillar.number} variants={{ hidden: {}, visible: {} }}>
              <div className="flex gap-4 transition-opacity duration-300 group-hover:opacity-45 group-hover:hover:opacity-100">
                <div className="w-[15px] shrink-0 flex justify-center pt-2">
                  <NodeMark delay={pillarDelay(i)} style={{ transform: "rotate(45deg)" }} />
                </div>
                <div>
                  <motion.div variants={numberVariants} className="font-display text-paper text-[38px] leading-none">
                    {pillar.number}
                  </motion.div>
                  <motion.div variants={textVariants} className="font-display text-paper text-[18px] mt-3">
                    {pillar.title}
                  </motion.div>
                  <motion.p variants={textVariants} className="text-[12.5px] leading-[1.55] text-ink-muted mt-2 max-w-[240px]">
                    {pillar.description}
                  </motion.p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerGroup>
    </section>
  );
}
