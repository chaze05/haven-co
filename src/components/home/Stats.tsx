"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { Reveal } from "@/components/ui/Reveal";

type CounterProps = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

function Counter({ to, decimals = 0, prefix = "", suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = usePrefersReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const stats = [
  { to: 120, suffix: "+", label: "Homes placed" },
  { to: 2.1, decimals: 1, prefix: "₱", suffix: "B", label: "In sales closed" },
  { to: 12, suffix: "", label: "Years in the market" },
  { to: 98, suffix: "%", label: "Client satisfaction" },
];

export function Stats() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto grid w-full max-w-page grid-cols-2 gap-px bg-line px-0 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 70} className="bg-paper">
            <div className="px-6 py-10 sm:px-8">
              <p className="font-display text-3xl text-ink sm:text-4xl">
                <Counter
                  to={stat.to}
                  decimals={stat.decimals ?? 0}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
