"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/data/site";
import { InquiryForm } from "./InquiryForm";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-page gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-clay">
            05 — Let&apos;s talk
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] sm:text-5xl">
            Tell us what home means to you.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
            Whether you are buying, selling or simply starting to look, we
            would love to hear the story behind it.
          </p>

          <dl className="mt-9 space-y-5 text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                Visit
              </dt>
              <dd className="mt-1 text-ink/75">{SITE.address}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                Talk to us
              </dt>
              <dd className="mt-1">
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="text-ink/75 transition-colors hover:text-clay"
                >
                  {SITE.phone}
                </a>
                <span className="mx-2 text-line">·</span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-ink/75 transition-colors hover:text-clay"
                >
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                Hours
              </dt>
              <dd className="mt-1 text-ink/75">{SITE.hours}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_30px_60px_-50px_rgba(29,27,24,0.5)] sm:p-8">
            <h3 className="font-display text-2xl">Send a note</h3>
            <p className="mt-1 text-sm text-ink/60">
              We reply within one business day.
            </p>
            <InquiryForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
