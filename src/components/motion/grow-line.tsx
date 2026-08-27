"use client";

import { motion } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";

import { defaultViewport } from "@/lib/motion";
import { growLine } from "@/lib/motion/variants";

type GrowLineProps = {
  className?: string;
  amount?: number;
  delay?: number;
};

/**
 * A hairline that draws itself left-to-right once, on scroll into view.
 * Caller supplies size/color via className (e.g. `h-px w-full bg-hairline-dark`)
 * — this only ever animates `scaleX`, so it composes safely with any static
 * border/background utility.
 */
export function GrowLine({ className, amount, delay }: GrowLineProps) {
  const visible = growLine.visible as TargetAndTransition;
  const variants = delay
    ? {
        hidden: growLine.hidden,
        visible: { ...visible, transition: { ...visible.transition, delay } },
      }
    : growLine;

  return (
    <motion.div
      aria-hidden
      className={["origin-left", className].filter(Boolean).join(" ")}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: amount ?? defaultViewport.amount }}
    />
  );
}
