import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

const DEPOT = "#1f3a2e";
const DEPOT_DEEP = "#152a20";
const CREAM = "#efe6d2";
const SCARLET = "#a6192e";
const BRASS = "#c8902e";
const INK = "#1a1714";

const fontDir = join(process.cwd(), "src/assets/fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "BigShoulders-ExtraBold.ttf")),
  readFile(join(fontDir, "CourierPrime-Bold.ttf")),
]);

function Owl({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <path d="M14 5 25 15h14L50 5l4 19v16c0 12-10 20-22 20S10 52 10 40V24Z" fill={DEPOT} />
      <circle cx="23" cy="28" r="9" fill={BRASS} />
      <circle cx="41" cy="28" r="9" fill={BRASS} />
      <circle cx="23" cy="28" r="6.5" fill={CREAM} />
      <circle cx="41" cy="28" r="6.5" fill={CREAM} />
      <circle cx="23.5" cy="27" r="3" fill={INK} />
      <circle cx="40.5" cy="27" r="3" fill={INK} />
      <path d="M28.5 35h7L32 42Z" fill={BRASS} />
      <rect x="4" y="60" width="56" height="3" rx="1" fill={BRASS} />
    </svg>
  );
}

/** The shared depot-style social card. `title` names the page, e.g. "Fare Table". */
export async function renderOgImage({ title, line }: { title?: string; line: string }) {
  const [display, mono] = await fonts;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: DEPOT,
        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(221,169,74,0.28), ${DEPOT} 60%)`,
        padding: "56px 64px 0",
        color: CREAM,
        fontFamily: "Courier Prime",
      }}
    >
      <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, opacity: 0.85 }}>
        CANTON, N.Y. · EST. MARCH 10, 1970
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", backgroundColor: CREAM, borderRadius: 22, padding: 8 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              color: DEPOT,
              border: `5px solid ${DEPOT}`,
              borderRadius: 16,
              padding: "22px 40px 16px 26px",
            }}
          >
            <Owl size={140} />
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Big Shoulders" }}>
              <span style={{ fontSize: 40, letterSpacing: 12, lineHeight: 1 }}>THE</span>
              <span style={{ fontSize: 138, lineHeight: 0.9 }}>HOOT OWL</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: "rotate(-6deg)",
            backgroundColor: CREAM,
            color: SCARLET,
            border: `7px solid ${SCARLET}`,
            borderRadius: 12,
            padding: "14px 22px",
            fontFamily: "Big Shoulders",
          }}
        >
          <span style={{ fontSize: 60, lineHeight: 1 }}>CASH ONLY</span>
          <span style={{ fontSize: 24, letterSpacing: 4, lineHeight: 1.2 }}>NO ATM ON SITE</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {title ? (
          <span
            style={{
              display: "flex",
              backgroundColor: SCARLET,
              color: CREAM,
              fontFamily: "Big Shoulders",
              fontSize: 44,
              padding: "6px 22px 2px",
              borderRadius: 10,
            }}
          >
            {title.toUpperCase()}
          </span>
        ) : null}
        <span style={{ display: "flex", fontSize: 30, color: CREAM }}>{line}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", margin: "0 -64px" }}>
        <div style={{ display: "flex", height: 8, backgroundColor: BRASS }} />
        <div
          style={{
            display: "flex",
            height: 18,
            backgroundColor: DEPOT_DEEP,
            backgroundImage: `linear-gradient(90deg, ${INK} 0 18px, transparent 18px 44px)`,
            backgroundSize: "44px 18px",
          }}
        />
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Big Shoulders", data: display, weight: 800, style: "normal" },
        { name: "Courier Prime", data: mono, weight: 700, style: "normal" },
      ],
    },
  );
}
