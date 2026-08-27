type IconProps = {
  className?: string;
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg aria-hidden className={className} {...base}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg aria-hidden className={className} {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg aria-hidden className={className} {...base}>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function TargetIcon({ className }: IconProps) {
  return (
    <svg aria-hidden className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DocumentIcon({ className }: IconProps) {
  return (
    <svg aria-hidden className={className} {...base}>
      <path d="M6 2h9l5 5v15H6z" />
      <path d="M15 2v5h5" />
      <path d="M9 13h6M9 17h6M9 9h2" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg aria-hidden className={className} {...base}>
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg aria-hidden className={className} {...base}>
      <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function PersonIcon({ className }: IconProps) {
  return (
    <svg aria-hidden className={className} {...base}>
      <circle cx="12" cy="7" r="3.2" />
      <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
    </svg>
  );
}

export function StackIcon({ className }: IconProps) {
  return (
    <svg aria-hidden className={className} {...base}>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M8 9h8M8 13h8M8 17h4" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg aria-hidden className={className} {...base}>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}

export function ScaleIcon({ className }: IconProps) {
  return (
    <svg aria-hidden className={className} {...base}>
      <path d="M12 3v18M5 7l-3 6a4 4 0 008 0zM19 7l-3 6a4 4 0 008 0zM5 7h14" />
    </svg>
  );
}

export function BadgeIcon({ className }: IconProps) {
  return (
    <svg aria-hidden className={className} {...base}>
      <circle cx="12" cy="9" r="5" />
      <path d="M8 13l-2 8 6-3 6 3-2-8" />
    </svg>
  );
}
