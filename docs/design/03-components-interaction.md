# Components and interaction

- Subtle Apple-inspired frosted glass, implemented as a web approximation using CSS backdrop blur, inner highlights, fine borders, and restrained shadows.
- Floating navigation means a fixed visual position over the scene, not bobbing up and down.
- No bouncing cards, floating objects, magnetic cursors, scroll hijacking, or perpetual UI animation.
- Basic checkpoint: opacity/color/focus feedback only, no ambient motion.
- Native links for navigation; details/summary menus; native dialog for section directory.
- Menus close on Escape/outside click. Dialog contains keyboard focus and restores focus to trigger.
- At mobile widths use a dedicated Menu control with all original links.
- Language selector: English active. Persian visibly unavailable until content is reviewed; do not create a fake translation or broken /fa/ link.
- Research reference: https://docs.21st.dev/blog/react-floating-navbar-components
- Solid-fill fallback for reduced transparency; visible keyboard focus and sufficient contrast regardless of blur.

Confirmed button interaction: subtle 2 px upward hover movement only; no continuously floating objects. Reduced-motion removes this movement.

## Checkpoint 3 clipboard actions
Email and YouTube use hover/focus tooltips and click-to-copy. Success is announced in a live status message. Copy failure shows manual-copy guidance rather than a false success. CV remains disabled until the PDF is supplied. Desktop bars are approximately 40 px tall; phone controls retain comfortable touch sizes.

## Checkpoint 4
More supports pointer hover and click, with a small closing delay and keyboard/Escape support. Contact at the dock's right end opens a one-time rotating upper semicircle from -90 to 90 degrees. Icons expand on hover/focus to reveal details; reduced-motion disables rotation. Email and Telegram copy values; on success close the fan and show a single live confirmation for 1.8 seconds. YouTube opens the supplied channel in a new tab. LinkedIn awaits user information. Remove homepage Home and Get in touch controls. Top Skills & Software shortcut is called Expertise; original section title/data are preserved.

## Checkpoint 5 corrections
Contact icons occupy the right-facing semicircle at -90, 0 and +90 degrees. On phones the arc shifts above the dock to remain on screen. Close after 3 seconds without pointer/keyboard activity; interactions restart the timer. Email copies; LinkedIn and Telegram open their URLs in new tabs. Telegram shows t.me/Amirjas. Copied feedback fades/moves softly for 1.8 seconds and respects reduced motion. Bottom dock items share equal heights and centered hover surfaces; remove vertical hover displacement in this dock.

## Checkpoint 6 alignment
Desktop middle Contact circle shares the bottom dock's center line. Use a compact 36 px arc and 32 px circles; hover/focus expands circles into 40 px-high pills toward the right, with a smooth width transition. Neighboring circles move by 8 px during expansion and return afterward. Dock outer padding is 3 px on all sides. Phone arc remains above the dock and moves inward to fit right-expanded details. Preserve 3-second inactivity timeout, email copy, social redirects and reduced motion.

## Checkpoint 7 spacing and hover hold
All floating bars use uniform 3 px outer insets. Menu panels use uniform 4 px insets and rows with symmetric 8 px horizontal padding. Language panel is 152 px wide. Contact expanded widths are measured from their text plus icon/gap/equal padding, removing trailing empty space. Contact stays open while pointer is over its trigger or icons/details, and while a contact icon has keyboard focus. A 3-second close timer starts after leaving; re-entering cancels it. Outside click and Escape close immediately.

## Checkpoint 9 dropdown sizing and animation
More and compact Menu panels fit their longest label instead of fixed widths. Preserve equal 4 px panel and 8 px row insets. Dropdowns fade/slide gently over 300 ms opening and 240 ms closing; native details stays open until the exit finishes, with links inert during exit. Animation reversal is supported and reduced-motion opens/closes immediately. Hover, click, Escape and outside dismissal remain available.
