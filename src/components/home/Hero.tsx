"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

const IMAGES = [
  { src: "/images/hero-1.jpg", alt: "Sunlit living room with garden views" },
  { src: "/images/hero-2.jpg", alt: "Modern home exterior at dusk" },
  { src: "/images/hero-3.jpg", alt: "Minimal interior with warm timber" },
];

const AUTOPLAY_MS = 5000;

export function Hero() {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 700], [0, 110]);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % IMAGES.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [reduce]);

  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-ink text-paper">
      <AnimatePresence initial={false}>
        <m.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <m.div
            className="absolute inset-0"
            style={{ y: reduce ? 0 : parallax }}
            initial={{ scale: 1.02 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 7, ease: "linear" }}
          >
            <Image
              src={IMAGES[index].src}
              alt={IMAGES[index].alt}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "low"}
              quality={60}
              sizes="100vw"
              className="object-cover"
            />
          </m.div>
        </m.div>
      </AnimatePresence>

      <div aria-hidden="true" className="absolute inset-0 bg-ink/30" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/95 via-transparent to-ink/30"
      />

      <div className="relative z-10 mx-auto flex min-h-[92svh] w-full max-w-page flex-col justify-center px-5 pb-24 pt-28">
        <m.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] font-semibold uppercase tracking-[0.36em] text-clay"
        >
          Boutique real estate · Philippines
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-3xl font-display text-[clamp(2.8rem,7.4vw,5.6rem)] leading-[1.02]"
        >
          A home with a<br />
          <span className="italic text-clay">sense of place.</span>
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg"
        >
          Considered homes across BGC, Makati, Alabang, Tagaytay and Cebu —
          guided by people who live where they sell.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <a
            href="#homes"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-clay px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
          >
            Explore homes
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-paper/25 px-6 py-3 text-sm font-semibold text-paper backdrop-blur transition-colors hover:border-clay/70"
          >
            Book a viewing
          </a>
        </m.div>

        <div className="mt-auto flex items-end justify-between gap-6 pt-16">
          <div className="flex items-center gap-4">
            {IMAGES.map((image, slideIndex) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Show slide ${slideIndex + 1}`}
                aria-current={slideIndex === index}
                onClick={() => setIndex(slideIndex)}
                className={`h-px transition-all duration-500 ${
                  slideIndex === index ? "w-12 bg-clay" : "w-6 bg-paper/35 hover:bg-paper/70"
                }`}
              />
            ))}
            <span className="font-display text-xs tracking-[0.2em] text-paper/60">
              0{index + 1} / 0{IMAGES.length}
            </span>
          </div>

          <a
            href="#homes"
            className="hidden items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.34em] text-paper/55 transition-colors hover:text-paper sm:flex"
          >
            Scroll
            <span className="h-10 w-px bg-gradient-to-b from-paper/70 to-transparent" />
          </a>
        </div>
      </div>
    </section>
  );
}
