"use client";

import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

type ParallaxOptions = {
  /** Max travel in px, applied symmetrically (-distance -> distance) across the element's transit through the viewport. */
  distance?: number;
  /** Disable entirely (e.g. below a breakpoint) without unmounting the hook. */
  disabled?: boolean;
};

/**
 * Subtle scroll parallax for a single element: as it travels through the
 * viewport, it drifts by up to `distance` px. Returns a static 0 when the
 * user prefers reduced motion or `disabled` is set — scroll-linked
 * `useTransform` output isn't covered by `MotionConfig`, so every caller
 * must branch explicitly (see docs/MOTION-SYSTEM.md).
 *
 * Intended use: an image sitting inside an `overflow-hidden` container that
 * itself stays stable — pass this hook's `y` to the image, not the
 * container, so the container never moves or reveals its edges.
 */
export function useParallax(
  target: RefObject<HTMLElement | null>,
  { distance = 24, disabled = false }: ParallaxOptions = {}
) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  const range: [number, number] =
    prefersReducedMotion || disabled ? [0, 0] : [-distance, distance];

  return useTransform(scrollYProgress, [0, 1], range);
}
