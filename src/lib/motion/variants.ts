import type { Variants } from "framer-motion";

import { distance, duration, easing } from "@/lib/motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: easing.out },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.out },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.out },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: easing.out },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const staggerItem: Variants = fadeInUp;

/**
 * Wider-spaced page-level entrance for content already above the fold on
 * load (Hero). Distinct from `staggerContainer`/`staggerItem`, which are
 * tuned for scroll-triggered lists — a mount-triggered sequence needs more
 * breathing room per step but must still resolve quickly end-to-end.
 */
export const heroStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const heroStaggerItem: Variants = {
  hidden: { opacity: 0, y: distance.lg },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.out },
  },
};

/** Hero-only: opacity settles in place, no translation — for the lamp glow. */
export const heroGlowIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.slower, ease: easing.out },
  },
};

/**
 * A line that draws itself left-to-right. Requires the element to have a
 * defined width and `transform-origin: left` (apply via className, e.g.
 * `origin-left`) — this only animates `scaleX`.
 */
export const growLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: duration.slow, ease: easing.out },
  },
};
