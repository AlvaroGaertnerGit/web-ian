import { Wordmark } from "@/components/ui/Wordmark";
import { Reveal } from "@/components/motion/reveal";
import { fadeIn } from "@/lib/motion/variants";

const LEGAL_LINKS = ["Aviso legal", "Privacidad", "Política de cookies"];

export function Footer() {
  return (
    <Reveal variants={fadeIn} amount={0.5}>
      <footer
        data-light="dark"
        className="bg-ink px-6 md:px-16 py-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-0 justify-between border-t border-hairline-dark"
      >
        <Wordmark tone="light" size="sm" />
        <div className="text-[12px] text-ink-muted order-3 sm:order-none">
          © 2024 Búho Detectives. Todos los derechos reservados.
        </div>
        <div className="flex gap-6 text-[12px] text-ink-muted">
          {LEGAL_LINKS.map((link) => (
            <a key={link} href="#" className="hover:text-paper transition-colors">
              {link}
            </a>
          ))}
        </div>
      </footer>
    </Reveal>
  );
}
