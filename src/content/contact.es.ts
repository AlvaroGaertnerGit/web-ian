/**
 * Contact info and every CTA label on the site — centralized so "Cuéntanos
 * tu caso" (Hero, Header mobile menu, final CTA panel) and "Contactar"
 * (Header desktop) never drift into slightly different wording across
 * components. Email and phone are the two real, verified contact points
 * that exist today — see docs/CONTENT-CONTRACT.md for what's still
 * missing (address, hours, a real contact form).
 */
export const contactContent = {
  sectionNumber: "07",
  title: "Cuéntanos tu caso",
  description:
    "Estaremos encantados de escucharte. Consulta inicial gratuita y sin compromiso.",
  email: "buhodetectiveprivado@gmail.com",
  phone: {
    display: "+34 624 56 27 98",
    href: "+34624562798",
  },
  cta: {
    /** Main call-to-action label, used by Hero and the closing panel. */
    primary: "Cuéntanos tu caso",
    /** Compact label for the persistent header CTA. */
    navbar: "Contactar",
  },
  closingPanel: {
    lines: ["La verdad existe.", "Nosotros te ayudamos", "a encontrarla."],
  },
} as const;
