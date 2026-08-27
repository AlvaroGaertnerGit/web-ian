"use client";

import { useEffect, useRef } from "react";

const RADIUS_PX = 300;
const RADIUS_MIN_PX = 260;
const LERP = 0.12;
const RADIUS_LERP = 0.08;
const TRANSITION_MS = 420;

type LightMode = "dark" | "light";

export function CursorLight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const whiteLayerRef = useRef<HTMLDivElement>(null);
  const blackLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const whiteLayer = whiteLayerRef.current;
    const blackLayer = blackLayerRef.current;
    if (!container || !whiteLayer || !blackLayer) return;

    const pointerIsFine = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!pointerIsFine || prefersReducedMotion) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let mode: LightMode | null = null;
    let rafId = 0;

    // Scroll reaction: the light narrows a few px while actively scrolling
    // and eases back to its resting radius at rest — additive to the
    // existing dark/light mode system, never replacing it.
    let lastScrollY = window.scrollY;
    let targetRadius = RADIUS_PX;
    let currentRadius = RADIUS_PX;

    function setMode(next: LightMode) {
      if (mode === next) return;
      mode = next;
      whiteLayer!.style.opacity = next === "dark" ? "1" : "0";
      blackLayer!.style.opacity = next === "light" ? "1" : "0";
    }

    function handlePointerMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;

      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const section = el?.closest<HTMLElement>("[data-light]");
      setMode(section?.dataset.light === "light" ? "light" : "dark");
    }

    function handleScroll() {
      const y = window.scrollY;
      const velocity = Math.abs(y - lastScrollY);
      lastScrollY = y;
      targetRadius = Math.max(RADIUS_MIN_PX, RADIUS_PX - velocity * 2);
    }

    function tick() {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;
      // Relax the target back toward the resting radius between scroll events.
      targetRadius += (RADIUS_PX - targetRadius) * 0.05;
      currentRadius += (targetRadius - currentRadius) * RADIUS_LERP;
      container!.style.setProperty("--cursor-x", `${currentX}px`);
      container!.style.setProperty("--cursor-y", `${currentY}px`);
      container!.style.setProperty("--cursor-radius", `${currentRadius}px`);
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={
        {
          "--cursor-x": "50%",
          "--cursor-y": "50%",
          "--cursor-radius": `${RADIUS_PX}px`,
        } as React.CSSProperties
      }
    >
      <div
        ref={whiteLayerRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          transition: `opacity ${TRANSITION_MS}ms ease-out`,
          background: `radial-gradient(circle var(--cursor-radius) at var(--cursor-x) var(--cursor-y), rgba(255,255,255,0.09), rgba(255,255,255,0.035) 40%, transparent 72%)`,
        }}
      />
      <div
        ref={blackLayerRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          transition: `opacity ${TRANSITION_MS}ms ease-out`,
          background: `radial-gradient(circle var(--cursor-radius) at var(--cursor-x) var(--cursor-y), rgba(0,0,0,0.07), rgba(0,0,0,0.03) 40%, transparent 72%)`,
        }}
      />
    </div>
  );
}
