import Image from "next/image";

type OwlPart = "cara" | "cuerpo";
type OwlTone = "black" | "white";

type OwlMarkProps = {
  part?: OwlPart;
  tone?: OwlTone;
  className?: string;
  priority?: boolean;
};

/**
 * Original client artwork (docs: AAFFCARA and AAFFCUERPO files). Never
 * redrawn or filtered — pick the tone that matches the background instead
 * of inverting.
 */
const SOURCES: Record<OwlPart, Record<OwlTone, { src: string; width: number; height: number }>> = {
  cara: {
    black: { src: "/brand/cara-black.png", width: 1191, height: 1074 },
    white: { src: "/brand/cara-white.png", width: 1299, height: 1074 },
  },
  cuerpo: {
    black: { src: "/brand/cuerpo-black.png", width: 1191, height: 878 },
    white: { src: "/brand/cuerpo-white.png", width: 1191, height: 1074 },
  },
};

export function OwlMark({
  part = "cuerpo",
  tone = "black",
  className,
  priority = false,
}: OwlMarkProps) {
  const { src, width, height } = SOURCES[part][tone];
  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
