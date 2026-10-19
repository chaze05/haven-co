import { SITE } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto w-full max-w-page px-5 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl">
              Haven <span className="italic text-clay">{"&"}</span> Co.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/70">
              {SITE.description}
            </p>
            <p className="mt-6 font-display text-lg italic text-paper/80">
              {SITE.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-paper/50">
              Explore
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-paper/75">
              <li><a className="transition-colors hover:text-clay" href="#homes">Homes</a></li>
              <li><a className="transition-colors hover:text-clay" href="#neighbourhoods">Neighbourhoods</a></li>
              <li><a className="transition-colors hover:text-clay" href="#about">About</a></li>
              <li><a className="transition-colors hover:text-clay" href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-paper/50">
              Visit
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-paper/75">
              <li>{SITE.address}</li>
              <li><a className="transition-colors hover:text-clay" href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a></li>
              <li><a className="transition-colors hover:text-clay" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li className="text-paper/55">{SITE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs text-paper/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p className="uppercase tracking-[0.24em]">Makati · BGC · Tagaytay · Cebu</p>
        </div>
      </div>
    </footer>
  );
}
