"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import type { Property } from "@/data/properties";
import { formatPeso } from "@/lib/format";
import { InquiryForm } from "./InquiryForm";

const FOCUSABLE = 'button, a[href], input, textarea, select';

export function PropertyModal({
  property,
  onClose,
}: {
  property: Property | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [property?.slug]);

  useEffect(() => {
    if (!property) return;

    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = Array.from(
          panel.querySelectorAll<HTMLElement>(FOCUSABLE)
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [property, onClose]);

  return (
    <AnimatePresence>
      {property ? (
        <m.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/70 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={property.title}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[94svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-paper sm:rounded-3xl"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 30 }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close property"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-ink shadow-[0_10px_24px_-12px_rgba(29,27,24,0.6)] transition-colors hover:bg-clay hover:text-white"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>

            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[620px]">
                <AnimatePresence mode="wait">
                  <m.div
                    key={property.images[imageIndex]}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={property.images[imageIndex]}
                      alt={property.title}
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="object-cover"
                    />
                  </m.div>
                </AnimatePresence>
                {property.images.length > 1 ? (
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {property.images.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setImageIndex(index)}
                        aria-label={`View image ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          index === imageIndex ? "w-8 bg-paper" : "w-4 bg-paper/50"
                        }`}
                      />
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-clay">
                  {property.type} · {property.location}
                </p>
                <h3 className="mt-2 font-display text-3xl leading-tight">
                  {property.title}
                </h3>
                <p className="mt-3 font-display text-2xl text-clay">
                  {formatPeso(property.price)}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4 text-center">
                  <div>
                    <p className="font-display text-lg">{property.beds}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Beds</p>
                  </div>
                  <div>
                    <p className="font-display text-lg">{property.baths}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Baths</p>
                  </div>
                  <div>
                    <p className="font-display text-lg">{property.sqm}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Sqm</p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-ink/70">
                  {property.description}
                </p>

                <ul className="mt-5 grid gap-2 text-sm text-ink/70">
                  {property.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-clay" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-3 rounded-xl bg-sand/60 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clay font-display text-sm text-white">
                    {property.agent.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{property.agent.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                      {property.agent.role}
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                    Arrange a viewing
                  </h4>
                  <div className="mt-3">
                    <InquiryForm fixedInterest={property.title} compact />
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
