import { contactContent } from "@/content/contact.es";
import { siteConfig } from "@/lib/site-config";

/**
 * LocalBusiness/ProfessionalService JSON-LD — built, but deliberately
 * NOT injected into layout.tsx yet. Publishing this with placeholder
 * `name`/`address` risks Google indexing fake data (a real, user-facing
 * consequence, not just an internal placeholder) — see
 * docs/CONTENT-CONTRACT.md → SEO pendiente.
 *
 * To activate once the client confirms the business name and address:
 * fill in `businessName`/`streetAddress`/`addressLocality` below, then
 * render `<script type="application/ld+json">` with this in
 * `src/app/layout.tsx`.
 */
const businessName: string | undefined = undefined; // e.g. "Búho Detectives — Investigación Privada"
const streetAddress: string | undefined = undefined;
const addressLocality: string | undefined = undefined;

export function buildLocalBusinessSchema() {
  if (!businessName) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: businessName,
    url: siteConfig.url,
    telephone: contactContent.phone.href,
    email: contactContent.email,
    ...(streetAddress && addressLocality
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress,
            addressLocality,
            addressCountry: "ES",
          },
        }
      : {}),
  };
}
