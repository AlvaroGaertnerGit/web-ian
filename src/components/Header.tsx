"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { Wordmark } from "@/components/ui/Wordmark";
import { CtaButton } from "@/components/ui/CtaButton";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo trabajamos", href: "#como-trabajamos" },
  { label: "Nosotros", href: "#confianza" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

/**
 * Fixed site header, mounted once in the root layout — it lives outside
 * Hero's own `overflow-hidden` composition (see docs/MOTION-SYSTEM.md for
 * why Hero needs that overflow), which is the reason this can't just be a
 * `position: sticky` element nested inside Hero: any `overflow` ancestor
 * other than `visible` breaks sticky the moment you scroll past it.
 *
 * Hero used to render its own logo/nav/CTA row inline; that row is gone now
 * that this header covers the same job everywhere, all the time, instead
 * of only above `xl` while scrolled to the very top.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  useEffect(() => {
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ease-out border-b ${
        scrolled || mobileOpen
          ? "bg-ink/90 backdrop-blur-sm border-hairline-dark"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="px-6 md:px-16 h-16 md:h-[70px] flex items-center justify-between">
        <a href="#inicio" aria-label="Ir al inicio" className="shrink-0">
          <Wordmark tone="light" size="sm" />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[11px] font-semibold uppercase tracking-[0.05em] whitespace-nowrap transition-opacity hover:opacity-100 ${
                activeId === link.href.slice(1)
                  ? "text-paper opacity-100"
                  : "text-paper opacity-65"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CtaButton href="#contacto" variant="light" className="text-[10px] px-4 py-2.5">
            Contactar
          </CtaButton>
        </div>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 -mr-2 text-paper"
        >
          {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden bg-ink border-t border-hairline-dark transition-[grid-template-rows] duration-300 ease-out grid ${
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-[15px] font-semibold uppercase tracking-[0.02em] ${
                  activeId === link.href.slice(1) ? "text-paper" : "text-ink-muted"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="px-6 pb-6">
            <CtaButton
              href="#contacto"
              variant="light"
              fullWidth
              onClick={() => setMobileOpen(false)}
            >
              Cuéntanos tu caso
            </CtaButton>
          </div>
        </div>
      </div>
    </header>
  );
}
