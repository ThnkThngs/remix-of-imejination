
# Imejination — Premium Dark Portfolio

Build a single-page, cinematic dark portfolio for **imejination** using the provided brand assets and brief.

## Design tokens (src/styles.css)
- Background: `#000` / charcoal `#121212`
- Surface: `#1a1a1a`
- Foreground: white / `#e5e5e5` muted
- Accent (mint): `#7CC4B8` (matches uploaded logo seafoam)
- Typography: Inter (body) + Space Grotesk (display) via `<link>` in `__root.tsx`
- Tokens for shadows, mint glow, thin mint dividers

## Assets
Upload the white-text logo (`Asset_2@3.png`) via `lovable-assets` for navbar use on dark bg. Generate ~10 photography images via `imagegen` saved to `src/assets/`:
- 1 hero: cinematic aerial twilight property shot
- 4 category thumbnails (aerial, landscape, architecture, still life)
- 6–8 portfolio shots grouped by the 4 client projects
- 2 director portraits (moody studio lighting)

## Page structure (src/routes/index.tsx + components)
1. **Nav** — fixed, transparent→charcoal on scroll, logo left, anchor links right (Work, Services, About, Contact) in mint hover
2. **Hero** — full-viewport, large aerial photo with dark gradient overlay, huge "IMEJINATION" wordmark, tagline, mint "Explore Portfolio" CTA → smooth scroll
3. **Services bar** — thin mint top/bottom rule, 5 uppercase labels separated by mint pipes: AERIAL | LANDSCAPE | ARCHITECTURE | PROPERTY | STILL LIFE
4. **Portfolio** — masonry grid (CSS columns), 4 project groups with label captions, hover: brightness up + mint caption reveal, shutter fade-in via IntersectionObserver
5. **About** — two-column dark cards for Nicholas Chen (MD) and Moses Lim (ED) with portraits and bios
6. **Footer/Contact** — IMEJINATION SDN BHD, mailto askimeji@gmail.com, two CTAs (View Projects, Get a Quote), copyright

## Animations
Reusable `<ShutterImage>` component: aperture-style mask + opacity/blur transition triggered on intersect.

## SEO
Route `head()`: title "Imejination — Aerial & Architectural Photography", meta description, og tags using hero image.

## Files
- `src/styles.css` — add tokens + mint variables
- `src/routes/__root.tsx` — fonts link, updated default meta
- `src/routes/index.tsx` — page composition + section meta
- `src/components/site/{Nav,Hero,Services,Portfolio,About,Footer,ShutterImage}.tsx`
- `src/assets/*` (generated images) + `imejination-logo.png.asset.json`

No backend / Cloud needed.
