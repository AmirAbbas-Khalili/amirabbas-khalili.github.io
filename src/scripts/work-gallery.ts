import type { WorkPhoto } from '../data/work-path';

const dialog = document.querySelector<HTMLDialogElement>('.work-lightbox');
if (dialog) {
  const image = dialog.querySelector<HTMLImageElement>('[data-lightbox-image]')!;
  const title = dialog.querySelector<HTMLElement>('#work-lightbox-title')!;
  const count = dialog.querySelector<HTMLElement>('.work-lightbox-count')!;
  const error = dialog.querySelector<HTMLElement>('[data-lightbox-error]')!;
  let photos: WorkPhoto[] = [];
  let index = 0;
  let opener: HTMLButtonElement | null = null;
  let previousOverflow = '';
  let touchX = 0;
  function show(next: number) {
    index = (next + photos.length) % photos.length;
    error.hidden = true;
    image.hidden = false;
    image.alt = photos[index].alt;
    image.src = photos[index].src;
    count.textContent = document.documentElement.lang === 'fa' ? `تصویر ${(index + 1).toLocaleString('fa-IR')} از ${photos.length.toLocaleString('fa-IR')}` : `Image ${index + 1} of ${photos.length}`;
  }
  image.addEventListener('error', () => { image.hidden = true; error.hidden = false; });
  document.querySelectorAll<HTMLElement>('[data-work-gallery]').forEach(gallery => {
    gallery.querySelectorAll<HTMLButtonElement>('[data-photo-index]').forEach(button => {
      button.addEventListener('click', () => {
        photos = JSON.parse(gallery.dataset.photos || '[]');
        if (!photos.length) return;
        opener = button;
        title.textContent = gallery.dataset.title || (document.documentElement.lang === 'fa' ? 'نگارخانه' : 'Gallery');
        show(Number(button.dataset.photoIndex));
        previousOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        dialog.showModal();
      });
    });
  });
  dialog.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-lightbox-next]')?.addEventListener('click', () => show(index + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(index + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  image.addEventListener('touchstart', event => { touchX = event.changedTouches[0].clientX; }, {passive:true});
  image.addEventListener('touchend', event => {
    const delta = event.changedTouches[0].clientX - touchX;
    if (Math.abs(delta) > 50) show(index + (delta < 0 ? 1 : -1));
  }, {passive:true});
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = previousOverflow;
    image.removeAttribute('src');
    opener?.focus();
  });
}
