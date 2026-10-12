# Work Path gallery

Design read: restrained academic portfolio, native Astro/CSS, existing typography and section colors. Dials: DESIGN_VARIANCE 3, MOTION_INTENSITY 2, VISUAL_DENSITY 3.

Audit: the existing Work Path page had three alternating rows with blank descriptions and image columns. Preserve its route, shared header, navigation, fonts, theme tokens and section anchor IDs. New order: Civil Engineering, Teaching, Editorial. The user explicitly requested all three alternating rows, overriding the skill's generic alternation cap.

Descriptions and image lists live in src/data/work-path.ts. The four user-supplied test images appear only in Civil Engineering. Teaching and Editorial have empty gallery states until photos are supplied. WebP previews and larger lightbox copies preserve original aspect ratios; cropping occurs only in thumbnail presentation. Existing uploaded files remain untouched.

Native dialog provides an in-page dimmed overlay, focus containment and Escape dismissal. Buttons, arrow keys, and touch swipes navigate; closing returns focus and restores scrolling. No navigation occurs. Native top layer avoids conflicts with the shared header. Empty/error states and reduced-motion support are included.

Participations now shares ExperienceGallery with Work Path, including alternating rows and lightbox controls. Its six entries are stored in the participations collection; Harekat is removed. Images remain empty until supplied. University Entrance Exam Rankings has no description pending actual rankings.
