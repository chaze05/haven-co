# Haven & Co. — Single-Page Real Estate Demo — Design Spec

- **Date**: 2026-10-19
- **Type**: Portfolio demo (fictional brand) for PH real-estate market
- **Route**: single long page (`/`), static, deployed on Vercel
- **Stack**: Next.js 15 App Router · TypeScript strict · Tailwind CSS · Framer Motion (`LazyMotion`) · `next/font`

## Brand & positioning

Haven & Co. is a boutique real-estate advisory for the Philippine market — considered homes in
**BGC, Makati, Alabang, Tagaytay and Cebu**. Tone: warm, editorial, quietly luxurious. Prices in
Philippine pesos. Copy is English with Filipino names, locations and references.

- Palette: ivory `#F6F1E7`, ink `#1D1B18`, clay `#B4552D`, olive `#4B5744`, sand `#E8DDCB`.
- Type: **Fraunces** (display serif, variable) + **Manrope** (body). Editorial spacing, generous white
  space, thin rules, oversized serif headlines with italic accents.
- Imagery: curated Unsplash architecture/interior photography, downloaded and optimized locally.

## Page sections

1. **Header** — minimal sticky header, serif logo, anchor nav (Homes, Neighbourhoods, About, Contact),
   "Book a viewing" CTA. Mobile menu.
2. **Hero** — full-viewport crossfading property images with slow Ken Burns + scroll parallax; serif
   headline ("A home with a sense of place."), lede, two CTAs, scroll cue, image counter.
3. **Stats band** — count-ups: 120+ homes sold, ₱2.1B in sales, 12 years, 98% client satisfaction.
4. **Featured homes** — draggable Framer Motion carousel (spring snap) with 6 PH properties; arrows;
   cards show image, location, ₱ price, beds · baths · sqm, favorite heart (persisted). Clicking a card
   opens a modal property sheet (shared layout animation) with photo gallery, details, agent, and a
   validated inquiry form (simulated submit).
5. **Neighbourhoods** — four image cards (BGC, Makati, Tagaytay, Cebu) with hover reveal of median
   price and tags.
6. **About / team** — editorial split, values, agent spotlight (initial avatars, PH names).
7. **Testimonials** — marquee of 4 client quotes with initial avatars.
8. **Contact** — split form (name, email, phone, interest, message; validated, simulated success) +
   office card (Makati address, phone, hours).
9. **Footer** — brand, nav, contact, socials placeholders, copyright.

## Interactions (must actually work)

- Favorites toggle + persist (`localStorage`), badge in header.
- Carousel drag, arrows, keyboard focus, snap.
- Modal opens/closes with focus trap + Escape; gallery arrows.
- Inquiry + contact forms validate inline and show success; no backend.
- Smooth anchor scrolling with sticky-header offset.
- `prefers-reduced-motion`: no parallax/autoplay/count-ups; content visible.

## Motion (Framer Motion)

`LazyMotion` + `domAnimation`; `useScroll`/`useTransform` hero parallax; `AnimatePresence` crossfade;
drag carousel with spring; `layoutId` card→modal; reveal-on-scroll wrapper; count-ups with
`useMotionValue`/`animate`; hover choreography. Only transform/opacity; no animation libraries beyond
Framer Motion.

## Technical

- Typed data layer: `src/data/properties.ts` (6), `neighbourhoods.ts` (4), `testimonials.ts` (4),
  `site.ts`. Pure helpers: favorites parsing, currency formatting, inquiry validation — unit tested
  (`node:test`, type stripping).
- All images local in `public/images/`, `next/image`, first hero image priority.
- SEO: metadata, OG, sitemap/robots, favicon. A11y: landmarks, labels, focus-visible, 44px targets.
- QA: build + typecheck + unit tests; puppeteer QA matrix (1440/1024/768/390/320, 0 overflow, 0 console
  errors); motion E2E (crossfade/carousel/modal/favorites/forms/reduced-motion); Lighthouse targets
  ≥90 mobile / 100 a11y.
- Delivery: repo `chaze05/haven-co`, Vercel production URL, portfolio card with live-link screenshot.

## Non-goals

Real listings backend, payments, map integration, CMS, multi-language.
