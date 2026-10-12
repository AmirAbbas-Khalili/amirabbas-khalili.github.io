# Approved section spectrum

## User direction
- Keep the simple academic resume layout and the approved daylight bridge homepage.
- All portfolio sections use the palette 4 near-black night base, #101113; light mode stays neutral white.
- Assign sections evenly across the approved soft spectrum: #b184ca (purple), #8fd0dd (blue-green), #ffcba6 (peach).
- Use pastel colors for faint background washes. Use the corresponding stronger spectrum (#8957a3, #0788a1, #ea580c) for narrow category lines, small status dots and other tiny cues. Large surfaces and body text remain neutral.
- Title box has about 20% more vertical space: 58px above/below on desktop, 41px on phones. Font size and weight retain their compact shared values.
- Every inner-page title section has a 1px full-spectrum line along its bottom edge, in both modes. Night mode uses a slightly brighter pastel edge and a static 3px halo at 40% opacity with 2px blur; light mode keeps the simple line. Homepage has no spectrum line, per the latest review.

## Section sequence
Use the existing SECTIONS order: Me, Study Path, Courses, Skills & Software, Work Path, Participations, Goal, Recommendations, English Score, Contact.
Compute colors from index / (count - 1), so future additions/removals retain the endpoints and even spacing. With one section, use the middle color. Course/thesis/article routes inherit their parent's position. Homepage uses the neutral middle.

## Implementation
- src/data/spectrum-theme.ts: shared color interpolation and route inheritance, based on src/data/site.ts.
- src/styles/spectrum-theme.css: shared tokens, pastel shading, small strong markers, title spacing and spectrum borders.
- BaseLayout and BridgeHomepage apply the shared style and spectrum-theme body class.
- The old two-page palette comparison is superseded and no longer imported. Keep its CSS and previews only as references.
- Existing navigation, content, icons, routes, layouts and interactions preserved. Original Website backup untouched.

## Verification
Astro build passed, producing 29 routes (24 portfolio pages plus five archived design experiments).
24 portfolio pages checked at 320, 390, 768 and 1440px in both themes: 192 cases with no horizontal overflow or browser errors.
Automated WCAG A/AA checks found no violations. Existing main content and links match a freshly captured baseline.
Title padding, 1px gradient borders and near-black night base checked across inner pages; mobile article expansion, menu navigation and theme persistence passed.
Section-count checks passed for 1, 2, 10 and 14 sections; nested Study Path routes inherit their parent's color.

Purple endpoint refinement: #b184ca is the RGB midpoint of Lilac #c8a2c8 and Amethyst #9966cc. Strong cues use #8957a3; the night title line uses the lighter #c7a9da. Shared section interpolation and both title-line themes now use this purple family.

Latest refinement: softened purple toward Lilac, using #bc93c9 (75% Lilac / 25% Amethyst), muted #85618f for strong cues, and #d0b3da for the night title line. These replace the preceding midpoint values.

Current starting point: Study Path uses pure Lilac #c8a2c8; Me shares that soft tone. Remaining sections interpolate from Study Path through blue-green to the final peach endpoint. Small light-mode accents retain muted #85618f. Title-line endpoints use Lilac, with #d9bed9 for the lighter night line.
