import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  speed?: number;
};

export function Marquee({ children, speed = 46 }: MarqueeProps) {
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
      }}
    >
      <div
        className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center gap-5">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}
