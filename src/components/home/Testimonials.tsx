import { TESTIMONIALS } from "@/data/testimonials";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section className="border-y border-line bg-sand/40 py-24 sm:py-28">
      <div className="mx-auto w-full max-w-page px-5">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-clay">
            04 — Client words
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.08] sm:text-5xl">
            The quiet kind of happy.
          </h2>
        </Reveal>
      </div>

      <div className="mt-12">
        <Marquee>
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="w-[300px] shrink-0 rounded-2xl border border-line bg-paper p-6 sm:w-[380px]"
            >
              <p className="font-display text-lg italic leading-relaxed text-ink/85">
                “{testimonial.quote}”
              </p>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clay/10 font-display text-xs text-clay-dark">
                  {testimonial.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    {testimonial.name}
                  </span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-muted">
                    {testimonial.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
