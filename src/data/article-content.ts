import type { CollectionEntry } from 'astro:content';

/** Parent previews and detail-page metadata always derive from the same content. */
export function contentPreview(text: string, maxLength = 440) {
  const clean = text.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[#*_`>]/g, '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  const sentences = clean.match(/[^.!?]+[.!?](?:\s|$)|[^.!?]+$/g) ?? [clean];
  const excerpt = sentences.slice(0, 2).join(' ').replace(/\s+/g, ' ').trim();
  if(excerpt.length<=maxLength)return excerpt;
  return excerpt.slice(0,maxLength).replace(/\s+\S*$/, '') + '…';
}

export function articleView(entry: CollectionEntry<'articles'>) {
  const data = entry.data;
  const content = data.abstract?.trim() || entry.body?.trim() || '';
  const summary = content ? contentPreview(content) : (data.summary?.trim() || '');
  const year = data.year ?? data.date?.getUTCFullYear();
  const publication = [data.conference || data.journal, year].filter(Boolean).join(' · ');
  return { summary, publication, status: content && data.detailPage ? 'published' as const : 'coming-soon' as const };
}
