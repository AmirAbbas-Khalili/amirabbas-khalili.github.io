# Checkpoint 1 validation

- Production build: passed (29 routes).
- Edge/Chromium viewport checks: 320×568, 390×844, 768×1024, 1024×768, 1440×900, 1920×1080, 844×390.
- No horizontal overflow. Normal desktop viewports fit without scrolling. Very small/short screens scroll for readable content.
- Ten original section routes return HTTP 200.
- Explore sections dialog opens, closes with Escape and restores trigger focus.
- Desktop More menu contains six original links; mobile menu contains all ten.
- Persian remains visibly unavailable pending user review.
- Reduced-motion disables button movement.
- No browser script errors.
- Existing source files other than the homepage entry remain identical to the original project.
- Desktop/mobile screenshots saved beside this report.

Scope: homepage foundation only. Other pages retain their original style until the next approved checkpoint. No ambient animation added yet.

Lighthouse accessibility audit: 100/100. Best practices and SEO: 100/100. Audit was run against the development server, so its performance score includes development scripts. Warm Home text contrast and visible/accessible menu label matching were corrected.
