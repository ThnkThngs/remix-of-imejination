Remove the About section from the homepage.

## Changes
- `src/routes/index.tsx`: remove the `About` import and the `<About />` render.
- `src/components/site/About.tsx`: delete the file.
- `src/components/site/Nav.tsx`: remove the "About" / "Studio" nav link if present (so it doesn't link to a missing section).
- `src/components/site/Footer.tsx`: remove any in-page `#about` anchor link if present.

Director contact details remain available in the Footer.