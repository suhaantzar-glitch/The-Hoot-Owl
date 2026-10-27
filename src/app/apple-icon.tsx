import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: "#1f3a2e" }}>
      <svg width="180" height="180" viewBox="0 0 64 64">
        <path d="M14 9 25 18h14l11-9 4 18v13c0 10-10 17-22 17S10 50 10 40V27Z" fill="#efe6d2" />
        <circle cx="23" cy="30" r="8.5" fill="#c8902e" />
        <circle cx="41" cy="30" r="8.5" fill="#c8902e" />
        <circle cx="23" cy="30" r="6" fill="#1f3a2e" />
        <circle cx="41" cy="30" r="6" fill="#1f3a2e" />
        <circle cx="23.5" cy="29" r="2.8" fill="#efe6d2" />
        <circle cx="40.5" cy="29" r="2.8" fill="#efe6d2" />
        <path d="M28.5 37h7L32 43Z" fill="#c8902e" />
      </svg>
    </div>,
    size,
  );
}
