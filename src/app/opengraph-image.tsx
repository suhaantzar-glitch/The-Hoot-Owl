import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "The Hoot Owl, Canton N.Y., est. 1970: an enamel station sign and a Cash Only stamp";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ line: "Have a Hoot of a time. · 40 Park St" });
}
