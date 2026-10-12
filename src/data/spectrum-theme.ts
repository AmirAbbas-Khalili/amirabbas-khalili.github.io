import { SECTIONS, type SectionMeta } from './site.ts';

type ColorStop = readonly [number, string];
// Approved pastel reference, and a stronger counterpart for small visual cues.
const SOFT: readonly ColorStop[] = [[0, '#c8a2c8'], [0.5, '#8fd0dd'], [1, '#ffcba6']];
const STRONG: readonly ColorStop[] = [[0, '#85618f'], [0.5, '#0788a1'], [1, '#ea580c']];

function interpolate(position: number, stops: readonly ColorStop[]): string {
  const t = Math.max(0, Math.min(1, position));
  const index = t <= stops[1][0] ? 0 : 1;
  const [start, from] = stops[index];
  const [end, to] = stops[index + 1];
  const amount = (t - start) / (end - start);
  const channels = [1, 3, 5].map(offset => {
    const a = parseInt(from.slice(offset, offset + 2), 16);
    const b = parseInt(to.slice(offset, offset + 2), 16);
    return Math.round(a + (b - a) * amount).toString(16).padStart(2, '0');
  });
  return `#${channels.join('')}`;
}

/** Navigation order is the source of truth. Nested routes inherit their parent. */
export function getSectionTheme(
  pathname: string,
  sections: readonly Pick<SectionMeta, 'id'>[] = SECTIONS,
): string {
  const section = pathname.replace(/^\/fa(?=\/)/, '').split('/').filter(Boolean)[0];
  const index = sections.findIndex(item => item.id === section);
  // Study Path anchors Lilac; preceding sections share its gentle starting tone.
  const anchor = Math.max(0, sections.findIndex(item => item.id === 'study-path'));
  const remaining = sections.length - 1 - anchor;
  const position = index < 0 || sections.length < 2 ? 0.5
    : remaining <= 0 ? 0 : Math.max(0, index - anchor) / remaining;
  return `--section-soft:${interpolate(position, SOFT)};--section-strong:${interpolate(position, STRONG)}`;
}
