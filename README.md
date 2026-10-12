# Academic Portfolio Website

Personal academic website for PhD applications — built with Astro, Tailwind CSS, and
Markdown-based content collections. English first; Persian (`/fa/`) will be added later.

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Structure

- `src/content/` — articles, courses, competitions (one Markdown file per item)
- `src/data/` — site navigation, contact channels, skills lists
- `src/pages/` — one folder per main section (11 sections)
- `src/components/` — reusable UI pieces
- `src/assets/` — optimized images
- `public/files/` — PDFs served as-is (CV, certificates, letters)

See **UPDATING-GUIDE.md** for plain-language instructions on adding content.
