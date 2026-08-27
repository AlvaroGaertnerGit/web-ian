"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { duration, easing } from "@/lib/motion";

/**
 * Four small monochrome scenes for "Convertimos hechos en evidencia" — a
 * graphic identity built from flat shapes and thin lines, never the owl
 * mark (that has its own role elsewhere). Each is a plain SVG; the
 * animated pieces are `motion.*` children with `variants` but no
 * `initial`/`whileInView` of their own, so they inherit "hidden"→"visible"
 * from the section's `StaggerItem` ancestor instead of running their own
 * viewport observer — one trigger per card, several layers reacting to it
 * at slightly different delays.
 *
 * Hover micro-reactions are plain CSS (`group`/`group-hover:` on the card),
 * not Framer — same split the rest of the site uses between scroll-driven
 * entrances (Framer) and pointer feedback (CSS transitions).
 */

type IllustrationProps = { className?: string };

const fade = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.slow, ease: easing.out, delay } },
});

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: easing.out, delay } },
});

const growX = (delay = 0): Variants => ({
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: duration.slow, ease: easing.out, delay } },
});

const pop = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: easing.out, delay },
  },
});

export function VigilanciasIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <motion.path
        d="M85 13.5h5.5v5.5"
        fill="none"
        stroke="var(--ink)"
        strokeWidth={1.2}
        variants={fade(0)}
      />
      <motion.path
        d="M15 86.5h-5.5v-5.5"
        fill="none"
        stroke="var(--ink)"
        strokeWidth={1.2}
        variants={fade(0)}
      />

      <motion.rect
        x="12"
        y="21"
        width="10"
        height="50"
        fill="var(--ink)"
        variants={fadeUp(0)}
      />

      <motion.polygon
        points="22,29 22,63 74,46"
        fill="var(--hairline)"
        variants={fade(0.12)}
      />

      <motion.g variants={pop(0.32)}>
        <circle
          cx="76"
          cy="46"
          r="3.2"
          fill="var(--ink)"
          className="transition-transform duration-300 ease-out group-hover:[transform:translateX(3px)]"
        />
      </motion.g>
    </svg>
  );
}

export function DocumentacionIllustration({ className }: IllustrationProps) {
  const lineWidths = [26, 22, 24, 18];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <motion.g variants={fadeUp(0)}>
        <rect
          x="16"
          y="17"
          width="21"
          height="61"
          fill="var(--ink)"
          className="transition-transform duration-300 ease-out group-hover:[transform:translateX(-1.5px)]"
        />
      </motion.g>

      <motion.g variants={fadeUp(0.08)}>
        <g className="transition-transform duration-300 ease-out group-hover:[transform:translateY(-2.5px)]">
          <path
            d="M31 23h38l8 8v50H31z"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth={1.3}
          />
          <path d="M69 23v8h8z" fill="var(--hairline)" stroke="var(--ink)" strokeWidth={1.3} />
        </g>
      </motion.g>

      {lineWidths.map((w, i) => (
        <motion.line
          key={i}
          x1="39"
          y1={42 + i * 8}
          x2={39 + w}
          y2={42 + i * 8}
          stroke="var(--ink)"
          strokeWidth={2}
          strokeLinecap="round"
          variants={growX(0.22 + i * 0.06)}
          style={{ transformOrigin: "39px 0px" }}
        />
      ))}
      <motion.line
        x1="39"
        y1="76"
        x2="69"
        y2="76"
        stroke="var(--paper-muted-2)"
        strokeWidth={1}
        variants={growX(0.5)}
        style={{ transformOrigin: "39px 0px" }}
      />
    </svg>
  );
}

export function LocalizacionesIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <motion.path d="M100 100 62 100 100 62Z" fill="var(--hairline)" variants={fade(0)} />

      <motion.path
        d="M14 79c14 1 10-22 26-19 13 2 8-17 21-14 11 2 6-17 18-22"
        fill="none"
        stroke="var(--ink)"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeDasharray="0.5 5"
        variants={fade(0.1)}
      />

      <motion.circle cx="14" cy="79" r="3" fill="var(--ink)" variants={pop(0.05)} />

      <motion.g variants={fadeUp(0.4)}>
        <g className="transition-transform duration-300 ease-out group-hover:[transform:translateY(-3px)]">
          <path
            d="M79 10c6 0 10 4.5 10 10 0 7.5-10 18-10 18S69 27.5 69 20c0-5.5 4-10 10-10Z"
            fill="var(--ink)"
          />
          <circle cx="79" cy="20" r="3.6" fill="var(--paper)" />
        </g>
      </motion.g>
    </svg>
  );
}

export function InformesIllustration({ className }: IllustrationProps) {
  const lineWidths = [30, 24, 27, 20];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <motion.ellipse
        cx="46"
        cy="82"
        rx="30"
        ry="2.5"
        fill="var(--hairline)"
        variants={fade(0)}
      />

      <motion.rect
        x="15"
        y="16"
        width="19"
        height="62"
        fill="var(--ink)"
        variants={fadeUp(0)}
      />

      <motion.rect
        x="30"
        y="20"
        width="48"
        height="58"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth={1.3}
        variants={fadeUp(0.08)}
      />

      {lineWidths.map((w, i) => (
        <motion.line
          key={i}
          x1="38"
          y1={35 + i * 9}
          x2={38 + w}
          y2={35 + i * 9}
          stroke="var(--ink)"
          strokeWidth={2}
          strokeLinecap="round"
          variants={growX(0.2 + i * 0.06)}
          style={{ transformOrigin: "38px 0px" }}
        />
      ))}

      <motion.g variants={pop(0.62)} style={{ transformOrigin: "72px 71px" }}>
        <g
          className="transition-transform duration-300 ease-out group-hover:[transform:scale(1.12)]"
          style={{ transformOrigin: "72px 71px" }}
        >
          <circle cx="72" cy="71" r="10" fill="var(--ink)" />
          <path
            d="M67 71l3.4 3.6L78 66"
            fill="none"
            stroke="var(--paper)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </motion.g>
    </svg>
  );
}
