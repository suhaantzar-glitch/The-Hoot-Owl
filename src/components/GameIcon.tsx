import type { Game } from "@/content/games";

/** Line drawings for the Games Room cards. Colored by `currentColor`. */
export function GameIcon({ name, className }: { name: Game["icon"]; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      {name === "darts" && (
        <>
          <circle cx="22" cy="26" r="18" />
          <circle cx="22" cy="26" r="11" />
          <circle cx="22" cy="26" r="4" fill="currentColor" />
          <path d="m22 26 18-18m0 0h-6m6 0v6M36 12l-4 0m4 0 0-4" />
        </>
      )}
      {name === "pool" && (
        <>
          <circle cx="24" cy="24" r="19" fill="currentColor" />
          <circle cx="24" cy="21" r="8.5" fill="var(--color-depot-deep)" stroke="none" />
          <circle cx="24" cy="18" r="2.6" strokeWidth="2" />
          <circle cx="24" cy="23.5" r="3.2" strokeWidth="2" />
        </>
      )}
      {name === "foosball" && (
        <>
          <path d="M3 18h42" />
          <circle cx="24" cy="10" r="4" />
          <path d="M19 15h10v14H19zM20 29l-3 11M28 29l3 11M14 40h6M28 40h6" />
          <circle cx="38" cy="40" r="3.5" fill="currentColor" />
        </>
      )}
      {name === "cornhole" && (
        <>
          <path d="M8 40 16 8h18l8 32Z" />
          <circle cx="25" cy="16" r="3.5" />
          <path d="M14 42v4M36 42v4" />
          <rect
            x="17"
            y="27"
            width="11"
            height="8"
            rx="2"
            fill="currentColor"
            transform="rotate(-12 22 31)"
          />
        </>
      )}
    </svg>
  );
}
