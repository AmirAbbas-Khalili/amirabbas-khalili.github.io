const panel = document.querySelector<HTMLElement>('#thesis-detail');
const copy = panel?.querySelector<HTMLElement>('.thesis-detail-copy');
const cards = [...document.querySelectorAll<HTMLElement>('.thesis-card')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

let active: HTMLButtonElement | undefined;
let pinned = false;
let hoverCooldown = 0;
let closeTimer: ReturnType<typeof setTimeout> | undefined;
const cancelClose = () => clearTimeout(closeTimer);
const dismiss = (restoreFocus = false) => {
  cancelClose();
  panel?.hidePopover();
  if (restoreFocus) active?.focus();
};
const laterClose = () => {
  cancelClose();
  if (!pinned) closeTimer = setTimeout(() => dismiss(), 450);
};
const open = (card: HTMLElement, pin = false) => {
  if (!panel || !copy) return;
  cancelClose();
  if (panel.matches(':popover-open') && !pin) return;
  active?.setAttribute('aria-expanded','false');
  active = card.querySelector<HTMLButtonElement>('.thesis-open')!;
  pinned = pin;
  active.setAttribute('aria-expanded','true');
  copy.replaceChildren(card.querySelector<HTMLTemplateElement>('template')!.content.cloneNode(true));
  copy.querySelector('h2')!.id = 'thesis-detail-title';
  panel.showPopover();
  panel.scrollTop = 0;
  if (!reduced.matches) {
    panel.getAnimations().forEach(animation => animation.cancel());
    panel.animate([{opacity:.3,transform:'scale(.94)'},{opacity:1,transform:'none'}],{duration:180,easing:'ease-out'});
  }
  if (pin) panel.querySelector<HTMLButtonElement>('.thesis-close')?.focus();
};
cards.forEach(card => {

  card.addEventListener('pointerleave',laterClose);
  card.querySelector('button')?.addEventListener('click',()=>open(card,true));
});
panel?.addEventListener('pointerenter',cancelClose);
panel?.addEventListener('pointerleave',laterClose);
panel?.querySelector('button')?.addEventListener('click',()=>dismiss(true));
panel?.addEventListener('toggle',()=>{
  if (!panel.matches(':popover-open')) {active?.setAttribute('aria-expanded','false');pinned=false;hoverCooldown=performance.now()+400;}
});
const track = document.querySelector<HTMLElement>('#thesis-gallery-track');
const prev = document.querySelector<HTMLButtonElement>('[data-gallery-prev]');
const next = document.querySelector<HTMLButtonElement>('[data-gallery-next]');
const updateArrows = () => {
  if (!track || !prev || !next) return;
  const offset = Math.abs(track.scrollLeft);
  prev.disabled = offset <= 2;
  next.disabled = offset + track.clientWidth >= track.scrollWidth - 2;
};
const move = (direction: number) => track?.scrollBy({left:direction*(document.documentElement.lang === 'fa' ? -1 : 1)*((track.firstElementChild?.getBoundingClientRect().width ?? 250)+18),behavior:reduced.matches?'instant':'smooth'});
prev?.addEventListener('click',()=>move(-1));
next?.addEventListener('click',()=>move(1));
track?.addEventListener('scroll',updateArrows,{passive:true});
track?.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move((event.key==='ArrowRight'?1:-1)*(document.documentElement.lang === 'fa' ? -1 : 1))}});
if(track)new ResizeObserver(updateArrows).observe(track);
updateArrows();

const photoDialog = document.querySelector<HTMLDialogElement>('.thesis-photo-dialog');
if (photoDialog) {
 const photos: {src:string;label:string}[] = JSON.parse(photoDialog.dataset.photos!);
 const image = photoDialog.querySelector<HTMLImageElement>('[data-photo-image]')!;
 const caption = photoDialog.querySelector<HTMLElement>('[data-photo-caption]')!;
 let photoIndex = 0;
 let opener: HTMLElement | null = null;
 let savedOverflow = '';
 const displayPhoto = (index:number) => {
  photoIndex = (index + photos.length) % photos.length;
  image.src = photos[photoIndex].src; image.alt = photos[photoIndex].label;
  caption.textContent = photos[photoIndex].label;
 };
 document.querySelectorAll<HTMLButtonElement>('[data-thesis-photo]').forEach(button => button.addEventListener('click',()=>{
  opener = button;displayPhoto(Number(button.dataset.thesisPhoto));savedOverflow = document.body.style.overflow;document.body.style.overflow = 'hidden';photoDialog.showModal();
 }));
 photoDialog.querySelector('[data-photo-close]')?.addEventListener('click',()=>photoDialog.close());
 photoDialog.querySelector('[data-photo-prev]')?.addEventListener('click',()=>displayPhoto(photoIndex-1));
 photoDialog.querySelector('[data-photo-next]')?.addEventListener('click',()=>displayPhoto(photoIndex+1));
 photoDialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();displayPhoto(photoIndex+(event.key==='ArrowLeft'?-1:1));}});
 photoDialog.addEventListener('click',event=>{if(event.target===photoDialog){const r=photoDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)photoDialog.close();}});
 photoDialog.addEventListener('close',()=>{document.body.style.overflow=savedOverflow;opener?.focus();});
}
