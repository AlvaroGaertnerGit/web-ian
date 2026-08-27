import { Hero } from "@/components/sections/Hero";
import { StatBand } from "@/components/sections/StatBand";
import { Servicios } from "@/components/sections/Servicios";
import { ComoTrabajamos } from "@/components/sections/ComoTrabajamos";
import { Evidencia } from "@/components/sections/Evidencia";
import { Confianza } from "@/components/sections/Confianza";
import { FaqContacto } from "@/components/sections/FaqContacto";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Hero />
      <StatBand />
      <Servicios />
      <ComoTrabajamos />
      <Evidencia />
      <Confianza />
      <FaqContacto />
      <Footer />
    </div>
  );
}
