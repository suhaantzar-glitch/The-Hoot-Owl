"use client";

import type { ReactNode } from "react";
import { scrollToId } from "./motion/SmoothScroll";

/** Link to a section on the current page that scrolls smoothly. */
export function AnchorLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(event) => {
        if (scrollToId(to)) event.preventDefault();
      }}
    >
      {children}
    </a>
  );
}
