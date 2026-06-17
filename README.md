# Ashke Bhangra Chicago — Official Website

This is the official website for **Ashke Bhangra Club Chicago**, a Punjabi Bhangra dance studio based in Schaumburg, Illinois. Classes are held weekly at the National India Hub — the largest Indian community center in North America.

The site is built with Next.js and designed to be fast, responsive, and visually true to the culture it represents. Navy, gold, and saffron throughout. No templates, no themes — everything written from scratch.

---

## What's on the site

- **Homepage** — full-screen video hero, about section, 3D coverflow class carousel, venue section with embedded map
- **Book a Class** — multi-step booking form with validation
- **Contact page** — contact form (currently hidden, ready to enable when needed)

---

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion — animations and the class carousel
- React Hook Form + Zod — form validation
- Lucide React — icons
- Google Fonts — Cormorant Garamond, Yatra One, Manrope

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project structure

```
app/
  page.tsx          # Homepage
  book/page.tsx     # Booking form
  contact/page.tsx  # Contact page (hidden for now)
  layout.tsx        # Root layout, fonts, metadata
  globals.css       # Design tokens, responsive CSS variables

components/
  Navbar.tsx
  Footer.tsx
  home/
    HeroSection.tsx
    AboutSection.tsx
    ClassesSection.tsx
    VenueSection.tsx
  ui/
    SuccessModal.tsx

public/
  hero.mp4          # Hero background video
  hero.webm         # WebM version (preferred by browsers)
  logo.jpg          # Club logo
  banner.jpeg       # Poster fallback for video
```

---

## Design notes

Colors are pulled directly from the club's banner image:

| Token | Value | Usage |
|---|---|---|
| `--color-navy-deep` | `#060E1E` | Page background |
| `--color-navy` | `#0D1B3E` | Cards, form |
| `--color-gold` | `#FFD700` | Primary accent |
| `--color-saffron` | `#FF6B35` | Secondary accent, labels |

Responsive layout is handled entirely through CSS custom properties defined in `globals.css` — four breakpoints (1100px, 960px, 640px, 400px). No Tailwind breakpoint classes used in components, keeping inline styles clean and consistent.

---

## Classes offered

| Class | Ages |
|---|---|
| Little Sher | 5–9 |
| Youth Crew | 10–16 |
| Beginner | 17+ |
| Advanced | 17+ |
| Wedding Choreography | All ages |

---

## Venue

**National India Hub**
930 National Parkway
Schaumburg, IL 60173

---

## Notes for developers

- The hero video (`hero.mp4` / `hero.webm`) has been cropped to remove letterbox bars baked into the original file. Do not replace with the raw original without re-cropping.
- The Contact page route exists at `/contact` but is not linked from the navbar or footer. It can be re-enabled by uncommenting the link in `Navbar.tsx` and `Footer.tsx`.
- Form submissions currently log to the console. Wire up an email service (Resend recommended) before going live.
- Backup copies of the original videos are saved as `hero.mp4.bak` and `hero.webm.bak` in `/public/`.
