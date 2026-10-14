# Mobile compatibility and image transfer size

Large published images now use WebP copies in public/images/optimized. Pixel dimensions are unchanged. The 28 changed images total 5,230,694 bytes instead of 26,559,895 bytes (80.3% reduction). Gallery previews remain thumbnails, with the full-resolution compressed image requested on click. Originals remain available locally for future editing. The largest compressed image is 617,428 bytes; the two architectural boards retain 4961 x 3508 resolution for legible details.

Regenerate compression after building new image content using Python/Pillow: scripts/compress-website-images.py, then rebuild. Commit the generated images together with changed source paths. Do not repeatedly recompress files already under /images/optimized/.

Vite uses Lightning CSS targeting Safari 15.4 so range-based media queries are compiled to min/max-width. This makes Tailwind breakpoints usable on the iPhone 7 Safari generation. mobile-compatibility.css supplies viewport-height, subgrid and color-mix fallbacks, inhibits automatic iOS text enlargement, and permits content to shrink/wrap within its actual containers. The homepage CV link gets light text on its dark night-mode dock.

Validation: 50-route Astro build; 40 public English/Persian pages, light/dark themes, 320/375/390/667/1440px widths in current WebKit, Chromium, and a CSS fallback simulation (1200 layout cases). No document/body horizontal overflow, console exceptions or uncompiled range media queries. Navigation panels and homepage contact fan checked open at 375px. All 94 rendered image references exist, and compressed gallery images decode and open. Full-page screenshots reviewed for the homepage and Persian recommendations; a compressed architectural board was inspected for readability.

The fallback simulation removes unsupported color-mix, dvh/svh and subgrid declarations and enables their fallbacks. This is not a real iOS 15 device; physical iPhone 7 confirmation remains useful. This patch covers image size, homepage CV text and layout compatibility; it does not claim to audit all older-browser JavaScript features.
