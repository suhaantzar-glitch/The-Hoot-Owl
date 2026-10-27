type OwlMarkProps = {
  /** "light" draws a green owl for cream backgrounds, "dark" a cream owl for green ones. */
  tone?: "light" | "dark";
  className?: string;
  title?: string;
};

const TONES = {
  light: {
    body: "var(--color-depot)",
    eye: "var(--color-cream)",
    pupil: "var(--color-ink)",
    feather: "var(--color-cream)",
  },
  dark: {
    body: "var(--color-cream)",
    eye: "var(--color-depot)",
    pupil: "var(--color-cream)",
    feather: "var(--color-depot)",
  },
} as const;

/** The Hoot's owl: a sign-painted owl perched on a rail. Original artwork. */
export function OwlMark({ tone = "light", className, title }: OwlMarkProps) {
  const c = TONES[tone];
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <path d="M14 5 25 15h14L50 5l4 19v16c0 12-10 20-22 20S10 52 10 40V24Z" fill={c.body} />
      <circle cx="23" cy="28" r="9" fill="var(--color-brass)" />
      <circle cx="41" cy="28" r="9" fill="var(--color-brass)" />
      <circle cx="23" cy="28" r="6.5" fill={c.eye} />
      <circle cx="41" cy="28" r="6.5" fill={c.eye} />
      <circle cx="23.5" cy="27" r="3" fill={c.pupil} />
      <circle cx="40.5" cy="27" r="3" fill={c.pupil} />
      <path d="M28.5 35h7L32 42Z" fill="var(--color-brass)" />
      <path
        d="m21 46 4 3 4-3m6 0 4 3 4-3m-15 6 4 3 4-3"
        fill="none"
        stroke={c.feather}
        strokeOpacity=".55"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="4" y="60" width="56" height="3" rx="1" fill="var(--color-brass)" />
    </svg>
  );
}
