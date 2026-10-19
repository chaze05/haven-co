"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useFavorites } from "@/components/providers/FavoritesProvider";

const LINKS = [
  { label: "Homes", href: "#homes" },
  { label: "Neighbourhoods", href: "#neighbourhoods" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const { count } = useFavorites();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-line bg-paper/90 shadow-[0_20px_50px_-40px_rgba(29,27,24,0.5)] backdrop-blur-xl"
          : "border-transparent bg-paper/70 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex min-h-[76px] w-full max-w-page items-center justify-between gap-4 px-5">
        <Link href="/" className="font-display text-2xl tracking-tight">
          Haven <span className="italic text-clay">&amp;</span> Co.
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-clay"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#homes"
            aria-label={`Saved homes (${count})`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-clay/50 hover:text-clay"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
            </svg>
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 font-display text-[10px] text-white">
                {count}
              </span>
            ) : null}
          </a>

          <a
            href="#contact"
            className="hidden min-h-11 items-center justify-center rounded-full bg-ink px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-clay sm:inline-flex"
          >
            Book a viewing
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-line lg:hidden"
          >
            <span className={`h-px w-4 bg-ink transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-4 bg-ink transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <m.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-paper lg:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto flex max-w-page flex-col px-5 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line/70 py-3 text-base font-semibold text-ink last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper"
              >
                Book a viewing
              </a>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
