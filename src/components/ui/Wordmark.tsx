import Image from "next/image";

type WordmarkProps = {
  tone?: "light" | "dark";
  size?: "xs" | "sm" | "md";
  className?: string;
};

/**
 * Original client artwork (docs: AAFFLETRAS_*). The typographic logo is an
 * image, never reproduced with HTML/CSS text.
 */
const SOURCES = {
  light: { src: "/brand/letras-white.png", width: 2000, height: 1475 },
  dark: { src: "/brand/letras-black.png", width: 1191, height: 878 },
};

const HEIGHT = {
  md: "h-30",
  sm: "h-15",
  xs: "h-8",
};

export function Wordmark({ tone = "light", size = "md", className = "" }: WordmarkProps) {
  const { src, width, height } = SOURCES[tone];
  return (
    <Image
      src={src}
      loading="eager"
      alt="Búho Detectives"
      width={width}
      height={height}
      className={`${HEIGHT[size]} w-auto ${className}`}
    />
  );
}
