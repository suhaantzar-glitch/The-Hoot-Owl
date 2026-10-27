import type { ReactNode } from "react";

/** Railroad track used as a divider between sections. Purely decorative. */
export function TrackDivider({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return <div aria-hidden className={`track ${tone === "dark" ? "track-dark" : ""} ${className}`} />;
}

/** CASH ONLY · NO ATM rubber stamp. */
export function CashStamp({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const big = { sm: "text-xl", md: "text-3xl", lg: "text-4xl sm:text-5xl" }[size];
  const small = { sm: "text-[0.7rem]", md: "text-sm", lg: "text-base sm:text-lg" }[size];
  return (
    <p className={`stamp ${size === "sm" ? "stamp-clean" : ""} ${className}`}>
      <span className={`${big} tracking-[0.06em]`}>Cash Only</span>
      <span className={`${small} tracking-[0.2em]`}>No ATM on site</span>
    </p>
  );
}

/**
 * Enamel station-sign heading, e.g. "TRACK 40". `kicker` is the small
 * timetable line above the sign.
 */
export function StationSign({
  children,
  kicker,
  as: Tag = "h2",
  tone = "depot",
  id,
  className = "",
}: {
  children: ReactNode;
  kicker?: ReactNode;
  as?: "h1" | "h2" | "h3";
  tone?: "depot" | "cream" | "scarlet";
  id?: string;
  className?: string;
}) {
  const toneClass = tone === "cream" ? "enamel-cream" : tone === "scarlet" ? "enamel-scarlet" : "";
  return (
    <div className={`flex flex-col items-start gap-3 ${className}`}>
      {kicker ? <p className="font-mono text-sm tracking-[0.18em] uppercase opacity-90">{kicker}</p> : null}
      <Tag id={id} className={`enamel ${toneClass} px-6 pt-4 pb-3 text-4xl sm:px-8 sm:text-5xl lg:text-6xl`}>
        {children}
      </Tag>
    </div>
  );
}
