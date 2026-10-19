import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const values = [
  "We show you fewer homes, chosen better.",
  "We tell you when a house is wrong for you.",
  "We stay after the keys are handed over.",
];

const agents = [
  { name: "Camille Reyes", role: "BGC & Makati", initials: "CR" },
  { name: "Miguel Torres", role: "Alabang & Tagaytay", initials: "MT" },
  { name: "Sofia Lim", role: "Cebu & Visayas", initials: "SL" },
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-page items-center gap-14 px-5 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-28 w-28 rounded-tl-3xl border-l-2 border-t-2 border-clay/60"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line">
              <Image
                src="/images/about.jpg"
                alt="A quiet corner of a Haven home"
                fill
                quality={60}
                sizes="(min-width: 1024px) 540px, 92vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-3 rounded-2xl bg-ink px-5 py-4 text-paper shadow-[0_24px_50px_-30px_rgba(29,27,24,0.8)]">
              <p className="font-display text-2xl">12 yrs</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-paper/60">
                In the Philippine market
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-clay">
            03 — About Haven
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] sm:text-5xl">
            Quietly obsessive about the details that matter.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink/70">
            Haven {"&"} Co. is a small advisory built on a simple idea: a home
            should fit a life, not the other way around. We work with a handful
            of clients at a time, across the neighbourhoods we know best.
          </p>

          <ul className="mt-7 space-y-3">
            {values.map((value) => (
              <li key={value} className="flex items-start gap-3 text-sm text-ink/75">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                {value}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-6">
            {agents.map((agent) => (
              <div key={agent.name} className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand font-display text-sm text-ink">
                  {agent.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold">{agent.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                    {agent.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
