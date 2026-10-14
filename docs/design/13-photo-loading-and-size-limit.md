# Photo size limit and loading placeholders

Published raster images are capped at 800,000 bytes. scripts/check-image-sizes.mjs runs before every npm build and fails with the offending paths if the limit is exceeded. Existing compressed images retain their pixel dimensions; the largest published photo is 617,428 bytes.

Fourteen unused large originals were moved out of public into .local-image-originals/images with matching subdirectories. This local archive is ignored by Git. All current page/image metadata paths use the smaller files. Original assets remain available locally for future editing.

Night-mode homepage CV/YouTube/Contact shortcuts now have a white background, black text/icons and a light-gray hover surface. This supersedes the earlier CV-only night-mode correction.

Photos use a subdued image outline on a neutral surface while loading, including the portrait, work/participation strips, research-image previews, thesis previews and full-size gallery images. Frame dimensions remain reserved. Cached images are shown immediately; loading ends after decoding, error states clear the placeholder, and lightbox src changes reset state. Reduced-motion preferences disable the pulse; images remain visible with JavaScript disabled. No additional external assets or network requests are used for the icon.

Validation: 50-page build; all 94 image references resolve; 24 delayed-image cases in WebKit across English/Persian, light/dark at 375 x 667; loading-to-ready, lightbox navigation and failed-request cleanup passed. Screenshots reviewed for the night-mode homepage bar and loading certificate photo.
