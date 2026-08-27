"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

import { OwlMark } from "@/components/ui/OwlMark";
import { ArrowIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { useParallax } from "@/lib/motion/use-parallax";

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

export function Servicios() {
  const imageRef = useRef<HTMLDivElement>(null);
  const imageY = useParallax(imageRef, { distance: 18 });

  return (
    <section
      id="servicios"
      data-light="light"
      className="bg-paper px-6 md:px-16 py-16 md:py-[6%] grid grid-cols-1 md:grid-cols-[0.85fr_1.3fr] gap-10 md:gap-16"
    >
      <Reveal>
        <div className="text-[12px] font-bold text-paper-muted">02</div>
        <h2 className="font-display text-[32px] md:text-[2.9vw] xl:text-[38px] leading-[1] mt-3">
          Servicios de investigación
        </h2>
        <div
          ref={imageRef}
          className="relative mt-8 h-[220px] md:h-[300px] rounded-sm overflow-hidden"
          style={{
            background:
              "repeating-linear-gradient(115deg, #141414, #141414 3px, #262626 3px, #262626 34px)",
          }}
        >
          <motion.div
            style={{ y: imageY }}
            className="absolute left-[10%] top-[8%] w-[46%]"
          >
            <OwlMark part="cara" tone="white" className="w-full h-auto opacity-95" />
          </motion.div>
        </div>
      </Reveal>

      <StaggerGroup delay={0.1}>
        {SERVICES.map((service) => (
          <StaggerItem
            key={service.number}
            className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6 py-6 border-b border-hairline"
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
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
