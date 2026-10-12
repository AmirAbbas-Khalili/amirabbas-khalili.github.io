export const HOMEPAGE_DESIGNS = [
  { id: 'flowops', name: 'FlowOps', note: 'Precise, airy glass', font: 'Inter Variable' },
  { id: 'engage', name: 'Engage Portal', note: 'Warm, confident color', font: 'Inter Variable' },
  { id: 'autonomous', name: 'Autonomous Systems', note: 'Olive, copper, and structure', font: 'Inter Variable' },
  { id: 'vortex', name: 'Vortex', note: 'Dark framing, daylight imagery', font: 'Space Grotesk Variable' },
  { id: 'auralis', name: 'Auralis', note: 'Clear typography, orange accents', font: 'Geist Variable' },
] as const;
export type HomepageDesign = typeof HOMEPAGE_DESIGNS[number]['id'];
