# Wedding Invitation — A · weds · P

A cinematic, mobile-first, scroll-driven wedding invitation built with Next.js, Framer Motion, and Lenis smooth scroll.

## What's inside

Seven scenes stitched together by smooth scroll:

1. **Cold open** — black void, single particle, "you've been invited"
2. **The match** — dating-app match screen as the prelude (the arranged-marriage joke)
3. **Our story** — parallax polaroid gallery
4. **The journey** — animated map of the cities that brought you here
5. **Day 1** — sunrise palette, sun travels across the sky as you scroll
6. **Day 2** — night sky with stars, moon, mandap silhouette
7. **RSVP** — minimal form, ready to wire to your backend

## Quick start

```bash
# Install
npm install

# Run dev server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Customizing it

### 1. Names, dates, events

Everything user-facing routes through `lib/data.ts`. Open it and edit:

- `couple` — your names, ages, blurbs, tags
- `wedding` — date, city, hashtag
- `journey` — cities for the map (with normalized 0-1 coordinates)
- `story` — your photo gallery
- `day1` and `day2` — events, times, venues, dress codes

### 2. Photos

Drop your photos into `public/images/` named `photo-1.jpg`, `photo-2.jpg`, etc. They're already referenced in `lib/data.ts`.

**Tip**: compress them. Aim for under 200KB each, max 1600px wide. Use [squoosh.app](https://squoosh.app) or `npx @squoosh/cli`.

The gallery currently shows colored placeholders where photos go — once you add real images, swap the `<div>` placeholder in `components/scenes/StoryGallery.tsx` for a `next/image` component.

### 3. Wiring up the RSVP form

The form in `components/scenes/RSVP.tsx` currently just `console.log`s. Pick one of:

- **Formspree** — paste an action URL, easiest
- **Supabase** — full DB, free tier, lets you build an admin dashboard
- **Firebase Firestore** — same idea, Google-flavored
- **Google Sheets via Apps Script** — zero-cost, slightly hacky

### 4. Colors and aesthetic

Tailwind theme colors live in `tailwind.config.ts`:

- `ink` — near-black background
- `cream` — warm off-white text
- `rose`, `deepRose` — the pink accents
- `marigold`, `ember` — warm yellows/oranges

Day 1 and Day 2 backgrounds are inline gradients in their respective components.

### 5. Fonts

Currently using Fraunces (display) + Mulish (body) from Google Fonts. To swap:

1. Update the import URL in `app/globals.css`
2. Update the CSS variables at the top of `globals.css`

## Mobile considerations baked in

- `min-height: 100svh` so address bars don't break layouts
- Star/particle counts auto-reduce on small screens
- Touch-friendly tap targets (44px+)
- `prefers-reduced-motion` respected (Lenis disables, animations shorten)
- No hover-dependent interactions
- No fixed positioning that breaks on iOS Safari
- Tap highlight removed for cleaner mobile feel

## Performance

- Everything is statically rendered except where motion needs `'use client'`
- Lenis smooth scroll runs at 60fps on most devices
- No heavy 3D libs by default — Three.js / R3F is in `package.json` for if you want to add a single 3D scene later (e.g. a real photogrammetry venue model)

## Deploying

### Vercel (recommended)

```bash
# Push to GitHub, then:
# 1. Go to vercel.com
# 2. Import your repo
# 3. Done — auto-deploys on every push
```

Custom domain like `aditya-weds-priya.com` costs ~$10-15 on Namecheap or Cloudflare.

### Netlify, Cloudflare Pages, AWS Amplify

All work the same — point them at the repo.

## Adding a real 3D scene (optional)

The `package.json` includes `@react-three/fiber` and `@react-three/drei`. If you want to add a 3D moment (e.g. a real model of the venue), create a component in `components/3d/` and dynamically import it with SSR off:

```tsx
import dynamic from 'next/dynamic';
const VenueModel = dynamic(() => import('@/components/3d/VenueModel'), { ssr: false });
```

Use `gltfjsx` to convert any `.glb` 3D model into a React component.

## License

Yours. Make it your own.
