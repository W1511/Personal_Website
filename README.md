# Wardah Basil — Personal Website

Interactive **film-set scrapbook** portfolio: clapboard hero, Polaroids, contact sheets, ticket stubs, and sticky-note projects.

Built with Next.js, Tailwind CSS, and Framer Motion. Ready to deploy on Vercel.

## Local development

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Swap in your media

Placeholder art lives in [`public/placeholders/`](public/placeholders/). Replace the SVGs (or drop JPG/PNG/WebP with the same filenames) and update paths in [`lib/content.ts`](lib/content.ts) if needed.

For the **short films slideshow**: set `posterSrc` (and optional `videoSrc`) on each short in `lib/content.ts`. The frame auto-advances; hover pauses it.

Edit copy, tickets, and project buckets in `lib/content.ts` as well.

## Deploy on Vercel

1. Push this repo to GitHub (already connected to `W1511/Personal_Website` if you cloned that remote).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Next.js** — leave build settings as defaults (`next build`).
4. Deploy. Later, point `wardahbasil.com` to the project under **Settings → Domains**.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- Google fonts: Instrument Serif, Caveat, DM Sans
