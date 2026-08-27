import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import { CursorLight } from "@/components/ui/CursorLight";
import { MotionProvider } from "@/components/motion-provider";
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

export const metadata: Metadata = {
  title: "Búho Detectives | Investigación privada",
  description:
    "Obtenemos información objetiva y verificable para que tomes decisiones con seguridad. Investigación privada para particulares, empresas, abogados y aseguradoras.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <MotionProvider>{children}</MotionProvider>
        <CursorLight />
      </body>
    </html>
  );
}
