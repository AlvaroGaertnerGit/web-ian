"use client";

import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionStyle, MotionValue } from "framer-motion";

import { Reveal } from "@/components/motion/reveal";
import { comoTrabajamosContent } from "@/content/home.es";

const STEPS = comoTrabajamosContent.steps;
type Step = (typeof STEPS)[number];

/**
 * "Línea de investigación": the case's path through the five stages. On
 * desktop it descends in four short straight drops (a quiet staircase, not
 * a wandering line) from just under the title down to the step row; on
 * mobile it's a single vertical line. Coordinates are percentages of the
 * graphic's own box — safe because only *positions* use `%`; the one thing
 * that animates every frame (the observation point) moves via `transform`
 * in container-query units instead, per the site's "only transform/opacity"
 * performance rule.
 */
const NODE_X = [10, 30, 50, 70, 90]; // desktop, % of graphic width
const NODE_Y = [15, 35, 55, 75, 95]; // desktop, % of graphic height

// Where each stage "activates" along the section's scroll transit
// (`maxProgress`, 0→1) — evenly spaced, with a short ramp so the change
// reads as a transition rather than a snap.
const ACTIVATE_AT = [0.08, 0.28, 0.48, 0.68, 0.88];
const RAMP = 0.1;

function StepBlock({ step, style }: { step: Step; style?: MotionStyle }) {
  return (
    <motion.div style={style}>
      <div className="font-display text-ink-muted text-[22px]">{step.number}</div>
      <div className="text-[12.5px] font-bold uppercase tracking-[0.06em] text-paper mt-3.5">
        {step.title}
      </div>
      <div className="text-[13.5px] leading-[1.55] text-ink-muted mt-2">
        {step.description}
      </div>
    </motion.div>
  );
}

/** A stage's node on the line: a dim ring, always present, with a small bright core that fades/grows in once that stage activates. */
const NodeMarker = forwardRef<
  HTMLDivElement,
  { glow: MotionValue<number>; scale: MotionValue<number> }
>(function NodeMarker({ glow, scale }, ref) {
  return (
    <div ref={ref} className="relative w-2.5 h-2.5">
      <div className="absolute inset-0 rounded-full border border-hairline-dark" />
      <motion.div
        className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-paper"
        style={{ opacity: glow, scale }}
      />
    </div>
  );
});

/** The observation point: a small reticle tracking the live (unaccumulated) scroll position along the line — it moves back and forth instantly with the user, unlike the stages, which only ever move forward. */
function ObservationPoint({ transform }: { transform: MotionValue<string> }) {
  return (
    <motion.div
      aria-hidden
      className="absolute left-0 top-0 w-3 h-3 rounded-full border border-paper/70"
      style={{ transform, boxShadow: "0 0 10px 2px rgba(247, 247, 245, 0.22)" }}
    >
      <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-paper" />
    </motion.div>
  );
}

/**
 * Scroll-linked (never sticky, never pinned) process line. A single
 * `useScroll` on the natural, normal-height wrapper drives two values:
 * `progress`, the live position, used only by the observation point (so it
 * can move backward the instant the user scrolls up, with no queued
 * animation); and `maxProgress`, which only ever grows, driving every
 * "reached" state (line segments, nodes, step text) — once a stage has
 * been reached it stays lit, matching the rest of the site's rule that
 * the world accumulates instead of erasing itself on scroll-up.
 */
function ScrollTimeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: wrapperRef,
    // Tighter than a full enter-to-exit transit: starting only once the
    // section has mostly entered, and finishing well before it starts
    // leaving, so the whole thing plays out during a normal scroll past —
    // not stretched across scrolling it fully out of view.
    offset: ["start 0.85", "end 0.6"],
  });

  // Mobile's line has no fixed height (its 5 rows wrap to whatever their
  // text needs), so the observation point's vertical stops are measured
  // from the actual node positions instead of assumed — re-measured on
  // resize, never on scroll.
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileNodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mobileNodeOffsets, setMobileNodeOffsets] = useState<number[]>([0, 0, 0, 0, 0]);

  useLayoutEffect(() => {
    const measure = () => {
      const container = mobileContainerRef.current;
      if (!container) return;
      const containerTop = container.getBoundingClientRect().top;
      setMobileNodeOffsets(
        mobileNodeRefs.current.map((el) => {
          if (!el) return 0;
          const rect = el.getBoundingClientRect();
          return rect.top + rect.height / 2 - containerTop;
        })
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (mobileContainerRef.current) ro.observe(mobileContainerRef.current);
    return () => ro.disconnect();
  }, []);

  const maxProgress = useMotionValue(0);
  useEffect(() => {
    return progress.on("change", (v) => {
      if (v > maxProgress.get()) maxProgress.set(v);
    });
  }, [progress, maxProgress]);

  // Fixed count (5 stages / 4 segments) — explicit calls, not a loop, per
  // rules-of-hooks (see the original timeline this replaces).
  const act0 = useTransform(maxProgress, [ACTIVATE_AT[0], ACTIVATE_AT[0] + RAMP], [0, 1]);
  const act1 = useTransform(maxProgress, [ACTIVATE_AT[1], ACTIVATE_AT[1] + RAMP], [0, 1]);
  const act2 = useTransform(maxProgress, [ACTIVATE_AT[2], ACTIVATE_AT[2] + RAMP], [0, 1]);
  const act3 = useTransform(maxProgress, [ACTIVATE_AT[3], ACTIVATE_AT[3] + RAMP], [0, 1]);
  const act4 = useTransform(maxProgress, [ACTIVATE_AT[4], ACTIVATE_AT[4] + RAMP], [0, 1]);
  const activations = [act0, act1, act2, act3, act4];

  const scale0 = useTransform(act0, [0, 1], [1, 1.3]);
  const scale1 = useTransform(act1, [0, 1], [1, 1.3]);
  const scale2 = useTransform(act2, [0, 1], [1, 1.3]);
  const scale3 = useTransform(act3, [0, 1], [1, 1.3]);
  const scale4 = useTransform(act4, [0, 1], [1, 1.3]);
  const scales = [scale0, scale1, scale2, scale3, scale4];

  const textOp0 = useTransform(act0, [0, 1], [0.35, 1]);
  const textOp1 = useTransform(act1, [0, 1], [0.35, 1]);
  const textOp2 = useTransform(act2, [0, 1], [0.35, 1]);
  const textOp3 = useTransform(act3, [0, 1], [0.35, 1]);
  const textOp4 = useTransform(act4, [0, 1], [0.35, 1]);
  const textOpacities = [textOp0, textOp1, textOp2, textOp3, textOp4];

  const seg0 = useTransform(maxProgress, [ACTIVATE_AT[0], ACTIVATE_AT[1]], [0, 1]);
  const seg1 = useTransform(maxProgress, [ACTIVATE_AT[1], ACTIVATE_AT[2]], [0, 1]);
  const seg2 = useTransform(maxProgress, [ACTIVATE_AT[2], ACTIVATE_AT[3]], [0, 1]);
  const seg3 = useTransform(maxProgress, [ACTIVATE_AT[3], ACTIVATE_AT[4]], [0, 1]);
  const segments = [seg0, seg1, seg2, seg3];

  // Desktop observation point: continuous position along the staircase,
  // driven by the live (non-accumulating) progress.
  const obsXDesktop = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], NODE_X);
  const obsYDesktop = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], NODE_Y);
  const obsTransformDesktop = useMotionTemplate`translate(${obsXDesktop}cqw, ${obsYDesktop}cqh) translate(-50%, -50%)`;

  // Mobile observation point: same live progress, vertical only, mapped to
  // the *measured* node centers (not assumed percentages) and fixed at the
  // line's x offset.
  const obsYMobile = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], mobileNodeOffsets);
  const obsTransformMobile = useMotionTemplate`translate(11px, ${obsYMobile}px) translateY(-50%)`;

  return (
    <div ref={wrapperRef} className="px-6 md:px-16 pb-16">
      {/* Desktop: staircase line above a 5-column step grid. */}
      <div className="hidden md:block">
        <div className="relative h-[190px] [container-type:size]">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <polyline
              points={NODE_X.map((x, i) => `${x},${NODE_Y[i]}`).join(" ")}
              fill="none"
              stroke="var(--hairline-dark)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            {segments.map((seg, i) => (
              <motion.line
                key={i}
                x1={NODE_X[i]}
                y1={NODE_Y[i]}
                x2={NODE_X[i + 1]}
                y2={NODE_Y[i + 1]}
                stroke="var(--paper)"
                strokeWidth={1.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ opacity: seg }}
              />
            ))}
          </svg>

          {NODE_X.map((x, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: `${x}%`, top: `${NODE_Y[i]}%`, transform: "translate(-50%, -50%)" }}
            >
              <NodeMarker glow={activations[i]} scale={scales[i]} />
            </div>
          ))}

          <ObservationPoint transform={obsTransformDesktop} />
        </div>

        <div className="grid grid-cols-5 gap-x-6 border-t border-hairline-dark pt-9">
          {STEPS.map((step, i) => (
            <StepBlock key={step.number} step={step} style={{ opacity: textOpacities[i] }} />
          ))}
        </div>
      </div>

      {/* Mobile: single vertical line, one stage per row. */}
      <div ref={mobileContainerRef} className="md:hidden relative">
        <div className="absolute left-[11px] top-1 bottom-1 w-px bg-hairline-dark" />
        <motion.div
          aria-hidden
          className="absolute left-[11px] top-1 bottom-1 w-px bg-paper origin-top"
          style={{ scaleY: maxProgress }}
        />
        <ObservationPoint transform={obsTransformMobile} />

        <div className="flex flex-col gap-8">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex gap-4">
              <div className="w-[22px] shrink-0 flex justify-center pt-1">
                <NodeMarker
                  ref={(el) => {
                    mobileNodeRefs.current[i] = el;
                  }}
                  glow={activations[i]}
                  scale={scales[i]}
                />
              </div>
              <StepBlock step={step} style={{ opacity: textOpacities[i] }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Reduced-motion fallback: identical content, fully lit, no line-draw, no observation point. */
function StaticProcess() {
  return (
    <div className="px-6 md:px-16 pb-16">
      <div className="hidden md:block">
        <div className="relative h-[190px]">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <polyline
              points={NODE_X.map((x, i) => `${x},${NODE_Y[i]}`).join(" ")}
              fill="none"
              stroke="var(--paper)"
              strokeWidth={1.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {NODE_X.map((x, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-paper"
              style={{ left: `${x}%`, top: `${NODE_Y[i]}%`, transform: "translate(-50%, -50%)" }}
            />
          ))}
        </div>
        <div className="grid grid-cols-5 gap-x-6 border-t border-hairline-dark pt-9">
          {STEPS.map((step) => (
            <StepBlock key={step.number} step={step} />
          ))}
        </div>
      </div>

      <div className="md:hidden relative">
        <div className="absolute left-[11px] top-1 bottom-1 w-px bg-paper" />
        <div className="flex flex-col gap-8">
          {STEPS.map((step) => (
            <div key={step.number} className="flex gap-4">
              <div className="w-[22px] shrink-0 flex justify-center pt-1">
                <div className="w-2.5 h-2.5 rounded-full bg-paper" />
              </div>
              <StepBlock step={step} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ComoTrabajamos() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="como-trabajamos" data-light="dark" className="bg-ink">
      <div className="px-6 md:px-16 pt-16 md:pt-[6%]">
        <Reveal>
          <div className="text-[12px] font-bold text-ink-muted">{comoTrabajamosContent.sectionNumber}</div>
          <h2 className="font-display text-paper text-[30px] md:text-[2.6vw] xl:text-[34px] mt-3 mb-10 md:mb-12">
            {comoTrabajamosContent.title}
          </h2>
        </Reveal>
      </div>

      {prefersReducedMotion ? <StaticProcess /> : <ScrollTimeline />}
    </section>
  );
}
