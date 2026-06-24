## Add Social feed section to the homepage

Create a new "Social" section between the Portfolio and Footer on the home route that embeds the Taggbox widget.

### Changes

1. **New file `src/components/site/Social.tsx`**
   - Section with `id="social"`, dark background, matching studio padding (`py-24 md:py-32`) and container width used by Services/Portfolio.
   - Header block: small "Social" eyebrow label + display-serif heading ("Latest from the field." or similar) + short subtext, with the existing mint divider treatment.
   - Embed the iframe:
     ```html
     <iframe src="https://widget.taggbox.com/328738?website=1"
             allow="fullscreen"
             title="Imejination social feed"
             className="w-full h-[720px] border-0 block" />
     ```
   - Wrap in a rounded container consistent with site cards. No client-side fetching, no extra deps.
   - Reuse the existing `useInView` fade-up reveal pattern used in Services for the header.

2. **Edit `src/routes/index.tsx`**
   - Import `Social` and render `<Social />` after `<Portfolio />`, before `<Footer />`.

### Out of scope
- No nav link, no new route, no metadata changes (can add later if wanted).
- No styling changes to other components.