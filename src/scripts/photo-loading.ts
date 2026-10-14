// Cached, lazy-loaded and lightbox images share the same loading lifecycle.
document.querySelectorAll<HTMLElement>('[data-photo-frame]').forEach(frame => {
  const image = frame.querySelector<HTMLImageElement>('img');
  if (!image) return;
  let generation = 0;
  const state = (value: string) => {
    frame.dataset.photoState = value;
    frame.setAttribute('aria-busy', String(value === 'loading'));
  };
  const finish = async () => {
    const current = generation;
    try { await image.decode(); } catch { /* Existing gallery error handling supplies its message. */ }
    if (current !== generation || !image.getAttribute('src')) return;
    state(image.naturalWidth ? 'ready' : 'error');
  };
  const sync = () => {
    generation++;
    if (!image.getAttribute('src')) { state('idle'); return; }
    if (image.complete) { state(image.naturalWidth ? 'ready' : 'error'); return; }
    state('loading');
  };
  image.addEventListener('load', finish);
  image.addEventListener('error', () => state('error'));
  new MutationObserver(sync).observe(image, { attributes: true, attributeFilter: ['src', 'srcset'] });
  sync();
});
