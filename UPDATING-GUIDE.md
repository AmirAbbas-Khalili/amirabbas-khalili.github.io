# Updating Guide (plain language)

This website is built so that **adding content = adding a file**. You never need to touch
the page designs. Here is where everything lives:

## Where things are

| What | Where |
|---|---|
| Article text | `src/content/articles/` — one `.md` file per article |
| Course text | `src/content/courses/` — one `.md` file per course |
| Participation text | `src/content/participations/` — one `.md` file per item |
| Skills lists | `src/data/skills.ts` |
| Contact values | `src/data/site.ts` (CONTACT_CHANNELS) |
| Navigation & section names | `src/data/site.ts` (SECTIONS, MAIN_NAV/HYBRID_NAV) |
| Background images | `public/images/bg/` + the BACKGROUNDS map in `src/data/site.ts` |
| Images (inline content) | `src/assets/<section>/` |
| PDFs & downloads | `public/files/` |

## How to add a new article (example)

Articles live inside **Study Path**. Each article is a Markdown file:

1. Open `src/content/articles/` and copy any existing file.
2. Rename it, e.g. `my-new-paper.md`.
3. Edit the block at the top:

```
---
title: My New Paper
topic: Lattice
journal: Journal Name Here
summary: One-sentence description shown in the expandable preview.
order: 5
status: published
pdf: /files/articles/my-paper.pdf      (optional)
externalUrl: https://...               (optional)
date: 2026-01-15                       (optional)
---
```

4. Write the full description below the second `---`.
5. Save. It appears automatically:
   - as an expandable row on the Study Path page (slim by default,
     hover/tap to preview, click to open)
   - with its own dedicated page at `/study-path/articles/my-new-paper/`
   - with PDF buttons, journal, date, figures, and external links once provided

The same pattern works for courses and participations.
`status` controls the small badge: `published`, `coming-soon`, etc.

## Background images

Every main section has a reserved background slot. To activate one:

1. Drop the image into `public/images/bg/` named after the section,
   e.g. `me.jpg`, `study-path.jpg`, `goal.jpg`.
2. In `src/data/site.ts`, set its entry in `BACKGROUNDS` to the path:
   `me: '/images/bg/me.jpg'`.

A readability overlay is applied automatically. Until then, each hero shows an
elegant placeholder pattern with soft color washes.

## Language switcher

The header contains a minimal `EN | فا` switcher. The Persian version is prepared
but disabled ("coming soon") until the translation phase begins.

## Previewing locally

Ask your assistant to run the dev server, or run it yourself in this folder:

```
npm run dev
```

Then open the address it prints (usually http://localhost:4321).

## Publishing changes later

Once hosting is connected (Phase 5), publishing is automatic after each update —
no extra steps needed from you.
