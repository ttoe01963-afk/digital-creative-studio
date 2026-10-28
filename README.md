# [STUDIO NAME] — Digital Creative Studio

A responsive, silver-and-graphite creative portfolio built with React 19, TypeScript and Vite. Includes ten original demonstration projects, filterable work, deep-linkable project dialogs, a selectable lighting study, a mouse/touch/keyboard comparison tool, motion storyboards, service exploration and a validated project brief form.

## Visual preview

The homepage has been rebuilt around photographic product concepts, a graphite hero and an asymmetric editorial gallery. All ten portfolio covers are distinct.

![Desktop homepage screenshot](docs/preview-desktop.webp)

[View mobile screenshot](docs/preview-mobile.webp). These are rendered browser screenshots, not a deployed website.

## Run locally (Windows, macOS or Linux)

Install Node.js 22 or 24 LTS, then open a terminal in this directory:

```sh
npm ci
npm run dev
```

Open the address Vite prints (normally port 5173). To build and check the production site:

```sh
npm run build
npm run preview
```

Deploy the generated `dist` directory to a static host. Project detail links use hashes (`#project-06`) and survive refresh without server routing configuration. No database, API server or account is required.

## Configure before public launch

Edit `src/data/site.ts`:

- Replace `site.name` with the real studio name. Also update the title, description and Open Graph metadata in `index.html`.
- Add the real contact email and WhatsApp number (international digits, without `+`). The site displays a clear setup message until these are provided.
- Add real social links to `socialLinks`. No empty social links are rendered.
- Set `inquiryEndpoint` to a trusted HTTPS service that accepts JSON POSTs and returns a 2xx status **only after accepting the inquiry**. Configure the service's CORS policy, validation, rate limits, privacy requirements and spam protection before enabling public submissions. Never place private API keys in frontend configuration.
- With no endpoint, the form validates and downloads a text project brief. It explicitly states that nothing was sent. No inquiries are stored on the server or in browser storage. No fake submission success is displayed.
- No attachments, payments, accounts, pricing or order tracking are enabled. Define scope, pricing and actual policies before adding these features.

If configuring real inquiry collection, add a privacy notice appropriate to your business and provider. The form's input checks are helpful feedback, not a substitute for server validation.

## Content and assets

`src/data/site.ts` contains project records (objectives, art direction, work, deliverables, tags and storyboard frames), services and public studio settings. Brand colors, typography, layouts and reduced-motion styles are in `src/styles.css`. Fonts are bundled locally; no font service is requested at runtime.

All portfolio entries are clearly labeled **studio concepts**, not client work. The photorealistic assets are AI-assisted original concepts, not photographs of supplied products or evidence of client commissions. No business relationships, performance results, efficacy claims or technical specifications are implied.

- `public/art/photography/hero-bag.webp`: dedicated full-resolution leather campaign hero.
- `public/art/photography/{leather,speaker,catalog,camera,fragrance,footwear,timepiece,travel,accessories,package}.webp`: ten distinct photographic concept compositions. The matching `-small.webp` assets are responsive derivatives. Source concepts were generated for this project as coordinated photographic contact sheets and extracted into individual local assets.
- `public/art/photography/studio.webp`: art-direction worktable concept used in About.
- `public/art/photography/headphone-study.webp`: the original photographic headphone study, retained only in the interactive lighting and explicitly conceptual comparison components.
- `public/art/photography/social-cover.jpg`: JPEG social cover. Set its absolute public URL in `index.html` once you have a deployment domain.
- The old vector product mockups and unused SVG social cover have been removed. The remaining favicon and inline logo are interface marks, not portfolio product imagery.
- See `public/art/photography/ASSETS.md` for subjects, provenance and replacement notes.
- Replace the ten concept artworks and their copy with your own authorized portfolio work when available. Update `image` and `gallery` in the data records. Current details display the main cover; add a gallery presentation if supplying additional detail images.
- Replace the illustrative before/after pair in `Showcase.tsx` with an aligned genuine original and retouched pair before presenting an authentic retouch comparison. The current version deliberately labels its simulated tone treatment as conceptual.
- Supply real video files through each project's optional `video` field. Project details render native controls with plays-inline playback, a poster, deferred video loading and a loading-error message. Current motion projects use clearly labeled storyboards; **no actual videos are supplied or claimed**. Add appropriate caption tracks if videos contain speech.
- Personalize the About copy with real founder information when available. No clients, testimonials, history, awards or performance numbers have been fabricated.

## Project structure

```text
src/components/Navigation.tsx   Header, mobile navigation and logo
src/components/Showcase.tsx     Lighting study and comparison tool
src/components/Portfolio.tsx    Filters, project gallery and accessible dialogs
src/components/Services.tsx     Services, motion storyboards, process and About
src/components/Contact.tsx      Validation, brief download and endpoint submission
src/data/site.ts               Public configuration and structured content
src/App.tsx                    Page composition and hash-linked project state
src/styles.css                 Visual system and responsive layouts
public/art/                    Local original concept artwork
```

## Tests

```sh
npx playwright install chromium
npm test
```

The suite checks all ten project dialogs, hash refresh, keyboard focus trapping, Escape, filtering, service navigation, lighting selection, range keyboard/mouse/touch input, form errors and downloaded briefs, mobile menu behavior, image loading, no page overflow at 320/375/430/768/1280/1440/1920px, reduced motion and automated WCAG AA accessibility rules.

For a machine with system Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its path instead of downloading a browser. In this cloud instance:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

Automated accessibility checks supplement manual inspection; they do not establish complete WCAG conformance. Real endpoint delivery, real video playback, live WhatsApp and social destinations need their supplied integrations and have not been tested as live services.

## Future ordering system

Keep future authenticated orders, uploads and payments in a separate trusted backend. The public data records and presentation components can be reused without mixing payment verification or private credentials into this portfolio.
