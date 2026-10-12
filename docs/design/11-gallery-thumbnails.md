# Gallery thumbnail loading

Work Path, Participations, and article galleries now use small WebP previews. Previously optimized Work Path and Thesis previews remain in place. Original source files are unchanged; the lightboxes request their original src only after a photo is clicked. No original images are prefetched by the preview elements.

The generated map is src/data/gallery-thumbnails.ts. Run scripts/generate-gallery-thumbnails.py with Python and Pillow after building when new original images are added or replaced, then build again. The generator reads English gallery metadata from dist, keeps aspect ratios, corrects preview orientation from EXIF, limits previews to 720 pixels on their longest side, and emits WebP at quality 88. Output filenames include the original content hash, so changed originals receive new preview URLs. Commit the generated images and map; the deployed static site does not need Python.

Generated 19 previews: original total 23,645,231 bytes; preview total 1,104,010 bytes (95.33% smaller). Originals passed byte-hash preservation checks.

Production verification passed on eight gallery routes in both languages, including click-to-open and close, and widths 320, 390, and 1440. Request tracking confirmed no full-size gallery originals were downloaded before clicking. English Participations mobile initial resource bytes dropped from approximately 18.2 MB to 0.45 MB; after all previews load, resource bytes are approximately 0.79 MB instead of 21.4 MB. Persian Participations initially loads approximately 0.67 MB and approximately 1.01 MB with all previews.
