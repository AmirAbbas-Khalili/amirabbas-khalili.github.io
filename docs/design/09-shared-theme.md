# Shared portfolio theme

## Approved direction
A restrained academic portfolio for applications: FlowOps typography, daylight colors drawn from the bridge, sparse warm accents, and short interaction feedback. Taste skill dials: variation 3, motion 2, density 3. This is a preservation pass using native Astro/CSS, not a layout redesign.

## Shared rules
- Inter headings, body and small labels; clear hierarchy and generous existing spacing.
- Soft blue-gray base, fine borders, 20px card radius and compact pill controls.
- Same navigation, language and night-mode controls across inner pages.
- Homepage retains its approved bridge, floating compact menu and contact dock.
- All inner pages and their detail pages support light and night themes.
- Quiet background washes reflect the bridge sky without repeating its photograph.
- Preserve existing layouts, prose, placeholders, routes, card hover lifts, article previews and back navigation.
- No drifting decorative objects. Reduced-motion preferences are respected.

## Subtle section identities
| Section | Accent | Small Phosphor icon |
| --- | --- | --- |
| Me | Quiet blue-gray with warm details | Existing portrait symbol; plain header |
| Study Path, Thesis, Articles | Deep blue / sky | Student |
| Courses and course details | Muted teal | Open book |
| Skills & Software | Steel blue | CPU |
| Work Path | Copper | Briefcase |
| Participations | Sage | Trophy |
| Goal | Slate blue | Compass |
| Recommendations | Warm stone | Envelope |
| English Score | Blue-gray | Certificate |
| Contact | Blue-green | Address book |

Color is secondary to the section title and icon; it is never the only way to identify a page. Detail pages inherit the parent section palette. Header navigation stays neutral for consistency.

## Suggestions for the next visual checkpoint
1. Use real project photographs on Work Path and real specimen/simulation figures in Thesis. Keep their grading calm, with natural blue-gray and warm daylight tones.
2. Keep Me, Recommendations and English Score mostly plain, so portraits, letters and certificates get the attention.
3. Simplify the shared footer once content is filled: a short identity line, CV and verified contact actions matching the homepage. Review this separately because it changes structure and content.
4. Replace placeholder blocks with actual material before adding more decorative backgrounds. That will provide stronger, meaningful variation between pages.

## Implementation and review
- Shared styles: src/styles/portfolio-theme.css; route identity on BaseLayout's body data-section.
- Official icons: src/components/SectionMark.astro, using the installed Phosphor package.
- Existing Me and Study Path stylesheet scopes remain for their approved details.
- Original Website backup untouched. Superseded /designs/ previews retained as references.
- Verified 24 portfolio routes at 320, 390, 768 and 1440px in both modes: 192 layout cases, no horizontal overflow.
- Main-page text and links compared with a saved baseline: unchanged.
- Automated axe WCAG A/AA scans passed after theme transitions settled; no browser script errors.
- Desktop and touch interactions checked separately. This is browser-based verification, not a claim of physical testing on every device.

## Taste review exceptions
The user's preservation instructions govern: existing content punctuation, labels, section structures, placeholder slots and the approved contrasting thesis panel remain. No copy, credentials, research results or imagery have been invented to satisfy generic skill heuristics. Layout repetition will be reassessed with real content, not by changing the approved structure in this style pass.
