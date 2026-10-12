# Edit content once

Articles live in `src/content/articles/*.md`. Each file supplies the individual page and the Study Path entry. Put the title, authors, abstract, keywords, conference, affiliation, year, date, paper ID, presentation details, links, and images in that file only. Parent previews use a shortened excerpt of the abstract (or Markdown body), never a separately written parent summary. A record with an abstract or body automatically loses its Soon label; empty records retain it. Soon entries show their title and summary on Study Path, have no detail-page links, and do not generate detail routes. Adding an abstract or body makes the detail route and links available automatically. Existing summary fields are only a fallback for unfinished records.

Keep abstract paragraphs separated by a blank line inside a YAML literal block (`abstract: |`). Author profile URLs belong in author objects with `name` and `url`; only add verified profiles.

For images, add `images` entries with `src`, `alt`, and optional `caption`. Omit unknown venue/location; no filler notes are rendered. Dates use YYYY-MM-DD. Images and PDFs must be saved under public and referenced by their site URL.

Education lives in `src/data/academic-profile.ts` for Me and Study Path. Thesis topics, keywords, title, and summary live in `src/data/thesis-topics.ts`. Courses use their Markdown file for detail content and generated parent excerpts. Other collection pages already read their content records. Keep new shared content in its record, rather than copying it into page templates.

The local development server refreshes these pages when content changes. Published static pages update together on the next build and deployment; the website does not currently contain an online content editor.
