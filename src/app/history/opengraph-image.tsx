import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "The Hoot Owl history: the line since 1970";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "The Line Since 1970", line: "From railroad depot to Canton's bar" });
}
