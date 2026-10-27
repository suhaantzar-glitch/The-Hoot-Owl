import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "The Hoot Owl gallery";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "Gallery", line: "Postcards from the depot" });
}
