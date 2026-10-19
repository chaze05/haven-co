"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, m, useMotionValue } from "framer-motion";
import { PROPERTIES, type Property } from "@/data/properties";
import { formatPrice } from "@/lib/format";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { Reveal } from "@/components/ui/Reveal";
import { PropertyModal } from "./PropertyModal";

export function FeaturedHomes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const stepRef = useRef(360);
  const [bounds, setBounds] = useState(0);
  const [active, setActive] = useState<Property | null>(null);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;
      setBounds(Math.max(0, track.scrollWidth - container.clientWidth));
      const first = track.firstElementChild as HTMLElement | null;
      if (first) stepRef.current = first.offsetWidth + 24;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const clampX = (value: number) => Math.min(0, Math.max(-bounds, value));

  const step = (direction: number) => {
    animate(x, clampX(x.get() - direction * stepRef.current), {
      type: "spring",
      stiffness: 170,
      damping: 26,
    });
  };

  const snap = () => {
    const nearest = Math.round(x.get() / stepRef.current) * stepRef.current;
    animate(x, clampX(nearest), {
      type: "spring",
      stiffness: 170,
      damping: 26,
    });
  };

  return (
    <section id="homes" className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-page px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-clay">
              01 — Selected homes
            </p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.08] sm:text-5xl">
              Rooms with a view, homes with a point of view.
            </h2>
          </Reveal>
          <Reveal delay={100} className="flex gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous homes"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-clay/60 hover:text-clay"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next homes"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-clay/60 hover:text-clay"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </Reveal>
        </div>

        <div ref={containerRef} className="mt-12 overflow-hidden">
          <m.div
            ref={trackRef}
            className="flex cursor-grab gap-6 active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -bounds, right: 0 }}
            dragElastic={0.06}
            dragMomentum={false}
            onDragEnd={snap}
          >
            {PROPERTIES.map((property) => (
              <PropertyCard
                key={property.slug}
                property={property}
                onOpen={setActive}
              />
            ))}
          </m.div>
        </div>

        <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-muted">
          Drag to explore · {PROPERTIES.length} homes
        </p>
      </div>

      <PropertyModal property={active} onClose={() => setActive(null)} />
    </section>
  );
}

function PropertyCard({
  property,
  onOpen,
}: {
  property: Property;
  onOpen: (property: Property) => void;
}) {
  const { has, toggle } = useFavorites();
  const favorite = has(property.slug);

  return (
    <m.article
      onTap={() => onOpen(property)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group w-[84vw] max-w-[360px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-line bg-white"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          quality={60}
          sizes="(min-width: 640px) 360px, 84vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            toggle(property.slug);
          }}
          aria-label={
            favorite ? "Remove from saved homes" : "Save this home"
          }
          aria-pressed={favorite}
          className={`absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur transition-colors ${
            favorite
              ? "bg-clay text-white"
              : "bg-paper/85 text-ink hover:bg-paper"
          }`}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
          </svg>
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink">
          {property.type}
        </span>
      </div>

      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
          {property.location}
        </p>
        <h3 className="mt-2 font-display text-xl leading-snug">
          {property.title}
        </h3>
        <p className="mt-2 font-display text-lg text-clay">
          {formatPrice(property.price)}
        </p>
        <div className="mt-3 flex gap-4 text-xs text-muted">
          <span>{property.beds} beds</span>
          <span>{property.baths} baths</span>
          <span>{property.sqm} sqm</span>
        </div>
      </div>
    </m.article>
  );
}
