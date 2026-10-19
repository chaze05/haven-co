"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
};

export function Reveal({ children, delay = 0, className = "", y = 28 }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: delay / 1000,
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
