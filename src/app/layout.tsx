import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import { CursorLight } from "@/components/ui/CursorLight";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/motion-provider";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const title = "Búho Detectives | Investigación privada";
const description =
  "Obtenemos información objetiva y verificable para que tomes decisiones con seguridad. Investigación privada para particulares, empresas, abogados y aseguradoras.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    // Sin og:image todavía: no hay un asset 1200x630 pensado para
    // compartir en redes — ver docs/CONTENT-CONTRACT.md → SEO pendiente.
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${archivoBlack.variable} h-full antialiased scroll-pt-24`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <MotionProvider>
          <Header />
          {children}
        </MotionProvider>
        <CursorLight />
      </body>
    </html>
  );
}
