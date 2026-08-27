import { Wordmark } from "@/components/ui/Wordmark";
import { Reveal } from "@/components/motion/reveal";
import { fadeIn } from "@/lib/motion/variants";
import { footerContent } from "@/content/home.es";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Reveal variants={fadeIn} amount={0.5}>
      <footer
        data-light="dark"
        className="bg-ink px-6 md:px-16 py-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-0 justify-between border-t border-hairline-dark"
      >
        <Wordmark tone="light" size="sm" />
        <div className="text-[12px] text-ink-muted order-3 sm:order-none">
          © {year} Búho Detectives. Todos los derechos reservados.
        </div>
        <div className="flex gap-6 text-[12px] text-ink-muted">
          {/* No hay páginas legales publicadas todavía — texto informativo,
              no un enlace, para no simular un destino que no existe. */}
          {footerContent.legalLinks.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </div>
      </footer>
    </Reveal>
  );
}
