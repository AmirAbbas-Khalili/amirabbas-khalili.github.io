// Retain the first photo until its replacement is decoded, then dissolve gently.
const background = document.querySelector<HTMLElement>('.bridge-background');
const root = document.documentElement;
const initialFrame = background?.querySelector<HTMLElement>(`.harbour-frame--${root.dataset.harbourTheme}`);
if (initialFrame) initialFrame.dataset.loaded = 'true';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let request = 0;
let blurAnimation: Animation | undefined;
const syncPhoto = async () => {
  const theme = root.dataset.theme === 'dark' ? 'dark' : 'light';
  const currentRequest = ++request;
  if (theme === root.dataset.harbourTheme) return;
  const frame = background?.querySelector<HTMLElement>(`.harbour-frame--${theme}`);
  if (!background || !frame) return;
  const image = new Image();
  image.src = theme === 'dark' ? '/images/harbour-night-high-stars.webp' : '/images/optimized/harbour-sparse-clouds-2bdffd4a38.webp';
  try { await image.decode(); } catch { return; }
  if (currentRequest !== request) return;
  frame.dataset.loaded = 'true';
  blurAnimation?.cancel();
  root.dataset.harbourTheme = theme;
  if (!reducedMotion.matches) {
    blurAnimation = background.animate([
      {filter:'blur(0px)'},
      {filter:'blur(5px)',offset:.45},
      {filter:'blur(0px)'},
    ], {duration:850,easing:'ease-in-out'});
  }
};
new MutationObserver(syncPhoto).observe(root,{attributes:true,attributeFilter:['data-theme']});
