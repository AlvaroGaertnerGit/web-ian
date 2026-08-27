"use client";

import { motion } from "framer-motion";
import type { MotionStyle, TargetAndTransition, Variants } from "framer-motion";
import type { ReactNode } from "react";

import { defaultViewport } from "@/lib/motion";
import { fadeInUp } from "@/lib/motion/variants";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Defaults to `fadeInUp` — the standard section/card entrance. */
  variants?: Variants;
  /** Fraction of the element that must be visible before it fires. */
  amount?: number;
  /** Delay in seconds before this element's own transition starts. */
  delay?: number;
  style?: MotionStyle;
};

/**
 * Scroll-triggered entrance for content below the fold. Fires once via
 * `whileInView` — never use this for content already visible at first
 * paint (Hero, above-the-fold), which needs `StaggerGroup`/`StaggerItem`
 * instead, since `whileInView` won't reliably fire for it.
 */
export function Reveal({
  children,
  className,
  variants = fadeInUp,
  amount,
  delay,
  style,
}: RevealProps) {
  const visible = variants.visible as TargetAndTransition | undefined;
  const resolvedVariants: Variants = delay
    ? {
        hidden: variants.hidden,
        visible: {
          ...visible,
          transition: { ...visible?.transition, delay },
        },
      }
    : variants;

  return (
    <motion.div
      className={className}
      style={style}
      variants={resolvedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: amount ?? defaultViewport.amount }}
    >
      {children}
    </motion.div>
  );
}
