import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "The Hoot Owl fare table: cheap beer, the Lime Rickey, cash only";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "Fare Table", line: "$2.75 PBR · $3.50 Lime Rickey" });
}
