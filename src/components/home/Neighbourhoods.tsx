import Image from "next/image";
import { NEIGHBOURHOODS } from "@/data/neighbourhoods";
import { Reveal } from "@/components/ui/Reveal";

export function Neighbourhoods() {
  return (
    <section id="neighbourhoods" className="border-y border-line bg-sand/40 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-page px-5">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-clay">
            02 — Where we work
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.08] sm:text-5xl">
            Four neighbourhoods, one quiet standard.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {NEIGHBOURHOODS.map((neighbourhood, index) => (
            <Reveal key={neighbourhood.slug} delay={index * 80}>
              <article className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-line">
                <Image
                  src={neighbourhood.image}
                  alt={`${neighbourhood.name}, Philippines`}
                  fill
                  quality={60}
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 46vw, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
                  <h3 className="font-display text-2xl">{neighbourhood.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-paper/75">
                    {neighbourhood.blurb}
                  </p>
                  <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-paper/60">
                    {neighbourhood.medianPrice} · {neighbourhood.listings} listings
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
