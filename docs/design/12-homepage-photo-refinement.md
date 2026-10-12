# Homepage photos and controls

## Current daylight choice
Use the original sharp Sydney harbour photograph, edited to leave sparse clouds at the upper left and far right near the sun. The center behind the main text is clear; remaining clouds have a similarly light density and natural spacing. No permanent blur or added tint in day mode. Built-in imagegen edited only the sky; exact prompt: homepage-cloud-edit-prompt.md. Source asset: public/images/harbour-sparse-clouds.png; production asset: public/images/harbour-sparse-clouds.webp.

## Other retained choices
- Night photograph edited to remove clouds from the text area and add a few small natural stars. No permanent blur in either theme; the sky-blur overlay and its layout observer have been removed. Night assets: public/images/harbour-night-high-stars.png and harbour-night-high-stars.webp. Built-in imagegen prompt: homepage-night-sky-edit-prompt.md.
- Smooth 850ms photo dissolve with a brief transition blur; reduced motion skips animation. Only the selected photo loads initially, and the replacement is decoded before switching.
- Navigation and contact dock: white in daylight, neutral dark gray #292929 at night. Teal #085b75 primary button with white text in both modes.
- Central type is one small step below the original sizes, with responsive rules.
- Slightly wider harbour view, with a small night position correction to align the bridge more closely.

## Source
src/styles/homepage-photo-refinement.css manages the photo presentation and controls. src/scripts/homepage-photo-transition.ts manages loading and the brief theme transition.

Lower stars around the CTA line removed; remaining stars are confined to the upper sky. City lights and reflections preserved. Latest built-in imagegen removal prompt: homepage-high-stars-edit-prompt.md.
