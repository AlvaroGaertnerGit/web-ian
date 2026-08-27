"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { CtaButton } from "@/components/ui/CtaButton";
import { OwlMark } from "@/components/ui/OwlMark";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import {
  fadeIn,
  heroGlowIn,
  heroStaggerContainer,
  heroStaggerItem,
  staggerContainer,
  staggerItem,
} from "@/lib/motion/variants";
import { heroContent } from "@/content/home.es";
import { contactContent } from "@/content/contact.es";

/**
 * Traced from docs/references/hero/hero.png (696x446): the paper wedge is fully
 * hidden behind the black header bar until y=12.1%, then its left edge falls in
 * one straight diagonal to x=67% at the bottom. Right edge is flush with 100%.
 */
const CUT_CLIP_PATH = "polygon(86% 12.1%, 100% 12.1%, 100% 100%, 67% 100%)";

/**
 * Renders the actual public/motif-street-lamp.svg asset (not a redrawn
 * copy) via a CSS mask, so it keeps taking its fill from `currentColor`
 * like an inline SVG would. viewBox is 46:98 (w:h) — the explicit
 * aspect-ratio replicates the intrinsic ratio a real <svg> would report,
 * so `h-full w-auto` sizing keeps working unchanged.
 */
function StreetLamp({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={className}
      style={{
        display: "block",
        aspectRatio: "46 / 98",
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/motif-street-lamp.svg)",
        maskImage: "url(/motif-street-lamp.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

/**
 * Depth model for the Hero's exit parallax (see docs/MOTION-SYSTEM.md): as the
 * section scrolls out from under the viewport, each layer drifts by a small,
 * distinct extra amount on top of native scroll — background barely, the lamp
 * lags slightly behind, the owl leaves a little faster, on-page copy stays
 * close to stationary. All ranges collapse to 0 under reduced motion.
 */
function useHeroExitParallax() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const off = (max: number): [number, number] =>
    prefersReducedMotion ? [0, 0] : [0, max];

  return {
    heroRef,
    bgY: useTransform(scrollYProgress, [0, 1], off(14)),
    lampY: useTransform(scrollYProgress, [0, 1], off(20)),
    lampOpacity: useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 0.55]),
    owlY: useTransform(scrollYProgress, [0, 1], off(-28)),
    contentY: useTransform(scrollYProgress, [0, 1], off(-8)),
  };
}

export function Hero() {
  const { heroRef, bgY, lampY, lampOpacity, owlY, contentY } = useHeroExitParallax();

  return (
    <section ref={heroRef} className="relative bg-ink" id="inicio" data-light="dark">
      {/* Desktop / tablet: geometry-accurate diagonal split */}
      <div
        className="relative hidden md:block w-full overflow-hidden"
        style={{ aspectRatio: "696 / 446" }}
      >
        <motion.div className="absolute inset-0 bg-ink" style={{ y: bgY }} />
        <motion.div
          className="absolute inset-0 bg-paper"
          style={{ clipPath: CUT_CLIP_PATH, y: bgY }}
        />

        <StaggerGroup triggerOnMount variants={heroStaggerContainer} className="contents">
          <motion.div className="absolute top-[23.1%] left-[7.3%]" style={{ y: contentY }}>
            <StaggerItem variants={heroStaggerItem}>
              <p className="text-[clamp(9px,1.55vw,13px)] font-bold uppercase tracking-[0.22em] text-ink-muted">
                {heroContent.eyebrow}
              </p>
            </StaggerItem>
          </motion.div>

          <motion.div
            className="absolute top-[25.8%] left-[7.3%] w-[60%]"
            style={{ y: contentY }}
          >
            <motion.h1
              variants={staggerContainer}
              className="font-display text-paper leading-[0.82] text-[clamp(2.75rem,10.6vw,10.5rem)]"
            >
              {heroContent.titleLines.map((line) => (
                <motion.span key={line} variants={staggerItem} className="block">
                  {line}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>

          <motion.div
            className="absolute top-[74.2%] left-[7.3%] w-[46%]"
            style={{ y: contentY }}
          >
            <StaggerItem variants={heroStaggerItem}>
              <p className="text-[clamp(12px,1.85vw,16px)] leading-[1.55] text-[#c9c6c0]">
                {heroContent.subtitle}
              </p>
            </StaggerItem>
          </motion.div>

          {/* Warm, low urban glow cast by the street lamp onto the button and ground */}
          <motion.div
            aria-hidden
            className="absolute left-[8%] top-[83%] w-[20%] h-[20%] pointer-events-none"
            style={{ y: contentY }}
          >
            <StaggerItem variants={heroGlowIn} className="w-full h-full">
              <div
                className="w-full h-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(255,196,120,0.12) 0%, rgba(255,170,90,0.05) 45%, rgba(255,170,90,0) 75%)",
                }}
              />
            </StaggerItem>
          </motion.div>

          <motion.div className="absolute left-[6%] top-[84.5%]" style={{ y: contentY }}>
            <StaggerItem variants={heroStaggerItem} className="inline-block">
              <CtaButton
                href="#contacto"
                variant="light"
                className="text-[clamp(11px,1.7vw,25px)] px-[clamp(20px,7.3vw,104px)] py-[clamp(13px,2.65vw,38px)]"
              >
                {contactContent.cta.primary}
              </CtaButton>
            </StaggerItem>
          </motion.div>

          <motion.div
            className="absolute left-[32.5%] top-[75%] w-[6%] h-[25%] pointer-events-none"
            style={{ y: lampY, opacity: lampOpacity }}
          >
            {/* Positioned relative to the lamp's own box (not the wider
                outer slot) so the glow's anchor maps directly to the
                bulb's coordinates in the SVG's viewBox: roughly 84%/14%. */}
            <StaggerItem
              variants={heroStaggerItem}
              className="relative inline-block h-full text-paper/70"
              style={{ aspectRatio: "46 / 98" }}
            >
              <StreetLamp className="h-full w-full" />
              <motion.div
                variants={heroGlowIn}
                className="absolute left-[84%] top-[15%] -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%]"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(255,214,150,0.55) 0%, rgba(255,190,120,0.22) 30%, rgba(255,170,100,0.08) 56%, rgba(255,170,100,0) 80%)",
                }}
              />
            </StaggerItem>
          </motion.div>

          {/*
            The reference hero (docs/references/hero/hero.png) shows the
            hat/eye bust silhouette, not the full crouching cuerpo figure —
            cara is the matching asset here.
          */}
          <motion.div
            className="absolute top-[32%] left-[57%] w-[65%] h-auto"
            style={{ y: owlY }}
          >
            <StaggerItem variants={fadeIn}>
              <OwlMark part="cuerpo" tone="black" priority className="w-full h-auto" />
            </StaggerItem>
          </motion.div>
        </StaggerGroup>
      </div>

      {/* Mobile: simplified stacked hero (kept faithful to color, type and copy) */}
      <StaggerGroup
        triggerOnMount
        variants={staggerContainer}
        className="md:hidden bg-ink px-6 pt-24 pb-12"
      >
        <StaggerItem
          variants={staggerItem}
          className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-muted"
        >
          {heroContent.eyebrow}
        </StaggerItem>
        <StaggerItem
          as="h1"
          variants={staggerItem}
          className="font-display text-paper leading-[0.94] text-[13vw] mt-4"
        >
          {heroContent.titleLines.join(" ")}
        </StaggerItem>
        <StaggerItem
          variants={staggerItem}
          className="mt-5 text-[15px] leading-[1.65] text-[#c9c6c0]"
        >
          {heroContent.subtitle}
        </StaggerItem>
        <StaggerItem variants={staggerItem}>
          <CtaButton href="#contacto" variant="light" className="mt-7">
            {contactContent.cta.primary}
          </CtaButton>
        </StaggerItem>

        <StaggerItem variants={staggerItem} className="mt-12 flex items-end justify-between">
          <OwlMark part="cuerpo" tone="white" className="h-20 w-auto" />
          {/* <div className="text-right">
            <p className="text-[11px] font-bold tracking-[0.12em] text-paper">
              MADRID · ESPAÑA
            </p>
            <div className="w-full h-px bg-paper/20 my-2" />
            <p className="text-[11px] text-ink-muted">40.4168° N, 3.7038° W</p>
          </div> */}
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
