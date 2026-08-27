"use client";

import { motion } from "framer-motion";
import type { MotionStyle, TargetAndTransition, Variants } from "framer-motion";
import type { ReactNode } from "react";

import { staggerContainer, staggerItem } from "@/lib/motion/variants";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  /** Scroll-triggered by default; set for content visible at first paint (Hero). */
  triggerOnMount?: boolean;
  amount?: number;
  /** Overrides the container's `delayChildren` — use to sequence this group after a sibling (e.g. a heading `Reveal`) rather than firing at the same instant. */
  delay?: number;
};

/**
 * Orchestrates a sequence of `StaggerItem` children. Scroll-triggered
 * (`whileInView`, once) by default; pass `triggerOnMount` for content
 * that's already in the viewport at first paint (e.g. the Hero), since
 * `whileInView` won't reliably fire for that case.
 */
export function StaggerGroup({
  children,
  className,
  variants = staggerContainer,
  triggerOnMount = false,
  amount = 0.2,
  delay,
}: StaggerGroupProps) {
  const visible = variants.visible as TargetAndTransition | undefined;
  const resolvedVariants: Variants =
    delay === undefined
      ? variants
      : {
          hidden: variants.hidden,
          visible: {
            ...visible,
            transition: { ...visible?.transition, delayChildren: delay },
          },
        };

  if (triggerOnMount) {
    return (
      <motion.div
        className={className}
        variants={resolvedVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={resolvedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  /** Optional — omit for a purely decorative leaf (a shape, a gradient) with no content of its own. */
  children?: ReactNode;
  className?: string;
  variants?: Variants;
  style?: MotionStyle;
  /** Render as this element instead of a div — use for real headings (e.g. "h1") so heading hierarchy stays correct even when the content needs stagger/motion. */
  as?: "div" | "h1" | "h2" | "h3";
};

export function StaggerItem({
  children,
  className,
  variants = staggerItem,
  style,
  as = "div",
}: StaggerItemProps) {
  const MotionTag =
    as === "h1" ? motion.h1 : as === "h2" ? motion.h2 : as === "h3" ? motion.h3 : motion.div;
  return (
    <MotionTag className={className} variants={variants} style={style}>
      {children}
    </MotionTag>
  );
}
