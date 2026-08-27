"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

import { OwlMark } from "@/components/ui/OwlMark";
import { ArrowIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { fadeIn } from "@/lib/motion/variants";
import { easing } from "@/lib/motion";

const SERVICES = [
  {
    number: "01",
    title: "Particulares",
    description: "Investigaciones personales, familiares y patrimoniales.",
  },
  {
    number: "02",
    title: "Empresas",
    description: "Fraude interno, competencia desleal, absentismo laboral, etc.",
  },
  {
    number: "03",
    title: "Abogados",
    description:
      "Apoyo probatorio, localización de deudores, investigación patrimonial.",
  },
  {
    number: "04",
    title: "Investigación digital",
    description: "Obtención y análisis de información en entornos digitales.",
  },
];

/**
 * Geometry for the "lupa observando al búho" scene. Everything is expressed
 * in container-query units resolved against the scene's own box (`cqw` for
 * anything horizontal or size-related, `cqh` for vertical position) so the
 * lens stays a true circle and the composition holds together across
 * breakpoints without any JS measurement.
 *
 * The lens sweeps around `LENS_REST_X` by `SWEEP` in each direction; the
 * magnified copy of the owl must counter-shift so the circle always shows
 * the correctly-magnified patch of the *same* point it currently sits over
 * (see the two `useTransform`s below) instead of a fixed zoomed image
 * sliding under a moving window.
 */
const OWL_CENTER_X = 42; // cqw
const OWL_CENTER_Y = 50; // cqh
const OWL_WIDTH = 46; // cqw
const LENS_REST_X = 50; // cqw
const LENS_Y = 45; // cqh
const LENS_DIAMETER = 27; // cqw
const ZOOM = 1.6;
const SWEEP = 6; // cqw either side of LENS_REST_X

// Ambient, continuous "examining" sweep — not a discrete reveal, so it
// doesn't come from the shared duration/easing tokens (see MOTION-SYSTEM.md).
const LOOP_DURATION = 7;
const LOOP_START_DELAY = 0.6;

export function Servicios() {
  const prefersReducedMotion = useReducedMotion();
  const delta = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const controls = animate(delta, [0, SWEEP, 0, -SWEEP, 0], {
      duration: LOOP_DURATION,
      times: [0, 0.25, 0.5, 0.75, 1],
      delay: LOOP_START_DELAY,
      repeat: Infinity,
      ease: easing.inOut,
    });
    return () => controls.stop();
  }, [prefersReducedMotion, delta]);

  const lensTransform = useTransform(delta, (d) => `translateX(${d}cqw)`);
  const zoomTransform = useTransform(
    delta,
    (d) => `translate(-50%, -50%) translateX(${-ZOOM * d}cqw)`
  );

  // Static placement derived from the constants above — see the geometry
  // comment: the magnified copy's resting position depends on both the
  // owl's own center and where the lens sits at rest, so it lines up
  // exactly with the base logo before any motion is applied.
  const zoomLocalLeft = ZOOM * (OWL_CENTER_X - LENS_REST_X) + LENS_DIAMETER / 2;
  const zoomCenterYCqh = ZOOM * OWL_CENTER_Y - (ZOOM - 1) * LENS_Y;
  const zoomLocalTop = `calc(${zoomCenterYCqh - LENS_Y}cqh + ${LENS_DIAMETER / 2}cqw)`;

  return (
    <section
      id="servicios"
      data-light="light"
      className="bg-paper px-6 md:px-16 py-16 md:py-[6%] grid grid-cols-1 md:grid-cols-[0.85fr_1.3fr] gap-10 md:gap-16"
    >
      <Reveal>
        {/* <div className="text-[12px] font-bold text-paper-muted">02</div> */}
        <h2 className="font-display text-[32px] md:text-[2.9vw] xl:text-[38px] leading-[1] mt-3">
          Servicios de investigación
        </h2>

        {/*
          A lens examining the owl mark: the original "cara" asset (black
          tone) sits at normal size, and the exact same asset appears again,
          scaled up, visible only through a circular window that sweeps
          gently across it. Nothing else in the scene — plain white.
        */}
        <div
          className="relative mt-8 h-[220px] md:h-[300px] [container-type:size]"
        >
          <StaggerGroup className="absolute inset-0">
            <StaggerItem variants={fadeIn} className="absolute inset-0">
              <div
                className="absolute"
                style={{
                  left: `${OWL_CENTER_X}cqw`,
                  top: `${OWL_CENTER_Y}cqh`,
                  width: `${OWL_WIDTH}cqw`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <OwlMark part="cara" tone="black" className="w-full h-auto" />
              </div>
            </StaggerItem>

            <StaggerItem variants={fadeIn} className="absolute inset-0">
              <motion.div
                aria-hidden
                className="absolute"
                style={{
                  left: `${LENS_REST_X - LENS_DIAMETER / 2}cqw`,
                  top: `calc(${LENS_Y}cqh - ${LENS_DIAMETER / 2}cqw)`,
                  width: `${LENS_DIAMETER}cqw`,
                  height: `${LENS_DIAMETER}cqw`,
                  transform: lensTransform,
                  filter: "drop-shadow(0 4px 10px rgba(12, 12, 10, 0.16))",
                }}
              >
                <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-ink bg-paper">
                  <motion.div
                    className="absolute"
                    style={{
                      left: `${zoomLocalLeft}cqw`,
                      top: zoomLocalTop,
                      width: `${OWL_WIDTH * ZOOM}cqw`,
                      transform: zoomTransform,
                    }}
                  >
                    <OwlMark part="cara" tone="black" className="w-full h-auto" />
                  </motion.div>
                </div>

                <div
                  className="absolute bg-ink rounded-full"
                  style={{
                    left: "76%",
                    top: "76%",
                    width: "58%",
                    height: "17%",
                    transformOrigin: "0% 50%",
                    transform: "rotate(45deg)",
                  }}
                />
              </motion.div>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </Reveal>

      <StaggerGroup delay={0.1}>
        {SERVICES.map((service) => (
          <StaggerItem
            key={service.number}
            className="border-b border-hairline"
          >
            <a
              href="#contacto"
              aria-label={`Consultar sobre ${service.title}`}
              className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6 py-6"
            >
              <div className="flex gap-5 items-baseline flex-1">
                <span className="text-[16px] font-bold text-paper-muted-2 tabular-nums">
                  {service.number}
                </span>
                <span className="font-display text-[21px] md:text-[24px]">
                  {service.title}
                </span>
              </div>
              <div className="flex-1 max-w-[280px] text-[13px] leading-[1.55] text-paper-muted">
                {service.description}
              </div>
              <ArrowIcon className="h-[18px] w-[18px] shrink-0 mt-1 hidden sm:block" />
            </a>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
