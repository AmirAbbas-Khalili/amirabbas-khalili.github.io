# Two-page palette comparison

User request: compare palettes 1/2 in light mode and 3/4 in dark mode. Preserve the simple academic resume style. Vivid swatches are small accents or pale tints, never large primary surfaces.

- Skills & Software overview: palette 1 light (orange/peach, neutral white, charcoal/slate text), palette 3 dark (charcoal/slate with small terracotta details).
- Study Path overview: palette 2 light (small indigo accents, faint cool shading, white surfaces), palette 4 dark (near-black, muted purple details, a small softened cyan research link).
- Existing content, route hierarchy, layouts, typography and interactions preserved.
- Other pages, including Study Path detail routes and homepage, are excluded via the route-local palette-comparison body class.
- Styles: src/styles/palette-comparison.css. Imported only by the two overview pages.
- Existing global theme switch selects each page's palette for that mode. No additional controls.
- Validation: Astro build passed; 16 viewport/mode cases passed at 320/390/768/1440px; automated WCAG A/AA scans returned no violations; mobile menu, article expansion and cross-page theme persistence passed.
- This comparison is pending user selection; do not extend these palettes to other pages until requested.
