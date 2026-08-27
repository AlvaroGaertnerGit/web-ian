import Link from "next/link";
import { ArrowIcon } from "./icons";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
};

export function CtaButton({
  href,
  children,
  variant = "dark",
  className = "",
  fullWidth = false,
  onClick,
}: CtaButtonProps) {
  const isDark = variant === "dark";
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "relative inline-flex items-center gap-2.5 rounded-[7px] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.08em] transition-[opacity,transform,box-shadow] duration-200 ease-out hover:opacity-85 hover:-translate-y-0.5",
        fullWidth ? "justify-center w-full" : "",
        isDark
          ? "bg-ink text-paper hover:shadow-[0_14px_30px_-10px_rgba(12,12,10,0.45)]"
          : "bg-paper text-ink shadow-[0_10px_24px_-8px_rgba(12,12,10,0.35)] hover:shadow-[0_16px_32px_-10px_rgba(12,12,10,0.4)]",
        className,
      ].join(" ")}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-6 w-12 rounded-full bg-amber-300/25 blur-md"
      />
      <span className="relative">{children}</span>
      <ArrowIcon className="relative h-3.5 w-3.5 shrink-0" />
    </Link>
  );
}
