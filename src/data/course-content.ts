import type { CollectionEntry } from 'astro:content';

/** Both course views share publication visibility and date formatting. */
export function courseView(entry: CollectionEntry<'courses'>) {
  const published = entry.data.status === 'published' || entry.data.status === 'complete';
  const date = published ? entry.data.publicationDate : undefined;
  return {
    published,
    date: date?.toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric', timeZone:'UTC'}),
    dateTime: date?.toISOString().slice(0,10),
    links: published ? entry.data.links : [],
    files: published ? entry.data.files : [],
  };
}
