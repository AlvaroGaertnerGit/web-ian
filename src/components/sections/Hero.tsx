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
 * Solid geometric street lamp silhouette (base, pole and cobra-head arm),
 * matching the flat, angular fill language of the owl mark. Sourced from
 * Noun Project "street lamp" #8280539 by Muhammad Nur Auliady Pamungkas,
 * CC BY 3.0 — attribution is required wherever this icon is used; see
 * docs/references/icons/CREDITS.md.
 */
function StreetLamp({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="27 1 46 98"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="m37.879 64.238v-37.176c0-3.0703 1.6367-5.9062 4.2969-7.4414l14.98-8.6484 0.32422-3.3438 7.8008-4.5039 3.0586 1.3906 2.3438 4.0586-26.164 15.105c-1.207 0.69922-1.9531 1.9883-1.9531 3.3828v37.176z"
      />
      <path
        fillRule="evenodd"
        d="m70 10.77 0.62109 4.7891-6.1094 3.5273-3.8359-2.9336 9.3281-5.3867z"
      />
      <path
        fillRule="evenodd"
        d="m37.098 87.473v-21.672h6.2461v21.672z"
      />
      <path
        fillRule="evenodd"
        d="m33.973 89.035h12.496v6.2461h-12.496z"
      />
      <path
        fillRule="evenodd"
        d="m29.289 93.723h21.867v3.125h-21.867z"
      />
    </svg>
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
              <p className="text-[clamp(13px,1.95vw,17px)] leading-[1.55] text-[#c9c6c0]">
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
            className="absolute left-[32.5%] top-[75%] w-[6%] h-[25%] text-paper/70 pointer-events-none"
            style={{ y: lampY, opacity: lampOpacity }}
          >
            <StaggerItem variants={heroStaggerItem} className="h-full w-full">
              <StreetLamp className="h-full w-auto" />
            </StaggerItem>
            <motion.div
              variants={heroGlowIn}
              className="absolute left-[95%] top-[10%] -translate-x-1/2 -translate-y-1/2 w-[430%] h-[430%]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,214,150,0.55) 0%, rgba(255,190,120,0.22) 30%, rgba(255,170,100,0.08) 56%, rgba(255,170,100,0) 80%)",
              }}
            />
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
          className="mt-5 text-[16px] leading-[1.65] text-[#c9c6c0]"
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
