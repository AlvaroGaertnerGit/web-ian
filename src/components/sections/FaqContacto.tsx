"use client";

import { useState } from "react";

import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { faqContent } from "@/content/faq.es";
import { contactContent } from "@/content/contact.es";

function FaqItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const buttonId = `faq-button-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border-b border-hairline">
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 py-[18px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-[2px]"
        >
          <span className="text-[13.5px] font-semibold">{question}</span>
          {isOpen ? (
            <MinusIcon className="h-4 w-4 shrink-0" />
          ) : (
            <PlusIcon className="h-4 w-4 shrink-0" />
          )}
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <p className="text-[13px] leading-[1.6] text-paper-muted pb-5 pr-8">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqContacto() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section data-light="light" className="bg-paper grid grid-cols-1 lg:grid-cols-[1fr_0.78fr_1fr]">
      <div
        id="faq"
        className="px-6 md:px-16 lg:px-12 py-16 md:py-[6%] lg:border-r border-hairline"
      >
        <Reveal>
          <div className="text-[12px] font-bold text-paper-muted">{faqContent.sectionNumber}</div>
          <h2 className="font-display text-[24px] md:text-[26px] mt-3 mb-7">
            {faqContent.title}
          </h2>
        </Reveal>
        <StaggerGroup delay={0.1}>
          {faqContent.items.map((item, index) => (
            <StaggerItem key={item.id}>
              <FaqItem
                question={item.question}
                answer={item.answer}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <Reveal
        delay={0.1}
        className="px-6 md:px-16 lg:px-10 py-16 md:py-[6%] lg:border-r border-hairline"
      >
        <div id="contacto">
          <div className="text-[12px] font-bold text-paper-muted">{contactContent.sectionNumber}</div>
          <h2 className="font-display text-[20px] md:text-[22px] mt-3 mb-4">
            {contactContent.title}
          </h2>
          <p className="text-[13.5px] leading-[1.6] text-paper-muted mb-7">
            {contactContent.description}
          </p>
          <div className="text-[10.5px] font-bold tracking-[0.14em] text-paper-muted-2 uppercase">
            Email
          </div>
          <a
            href={`mailto:${contactContent.email}`}
            className="block text-[13.5px] mt-1.5 mb-6 hover:opacity-70 transition-opacity"
          >
            {contactContent.email}
          </a>
          <div className="text-[10.5px] font-bold tracking-[0.14em] text-paper-muted-2 uppercase">
            Teléfono
          </div>
          <a
            href={`tel:${contactContent.phone.href}`}
            className="block text-[13.5px] mt-1.5 hover:opacity-70 transition-opacity"
          >
            {contactContent.phone.display}
          </a>
        </div>
      </Reveal>

      <div
        data-light="dark"
        className="relative bg-ink px-6 md:px-11 py-14 flex flex-col justify-between overflow-hidden min-h-[360px]"
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "repeating-linear-gradient(70deg, #141414, #141414 4px, #1c1c1c 4px, #1c1c1c 40px)",
          }}
        />
        {/* Resolution glow: the light gathers around the closing line instead
            of the scene ending abruptly. */}
        <Reveal
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }}
          className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 100%, rgba(255,214,150,0.16) 0%, rgba(255,190,120,0.06) 45%, rgba(255,190,120,0) 75%)",
          }}
        >
          <span />
        </Reveal>

        <Reveal className="relative">
          <div className="w-9 h-px bg-paper/40 mb-5" />
          <h3 className="font-display text-paper text-[34px] md:text-[2.7vw] xl:text-[40px] leading-[1.06]">
            {contactContent.closingPanel.lines.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h3>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-10">
          <CtaButton href="#contacto" variant="light">
            {contactContent.cta.primary}
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
