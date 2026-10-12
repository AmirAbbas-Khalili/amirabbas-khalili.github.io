import { parse, serialize } from 'parse5';
import translations from './fa.json';

const dictionary: Record<string, string> = translations;
const digits = (value: string | number) => String(value).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);
const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();
const monthPattern = '(January|February|March|April|May|June|July|August|September|October|November|December)';
export function persianDate(date: string | Date) {
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { day:'numeric', month:'long', year:'numeric', timeZone:'UTC' }).format(new Date(date));
}
// For year-only records, the owner requested the lower of the two Solar Hijri years.
export const persianYear = (year: number) => digits(year - 622);

export function translate(value: string): string {
  const clean = normalize(value);
  if (!clean) return value;
  if (/^(?:\d{2,}-[A-Z][A-Za-z0-9-]*|[A-Z]{1,8}\d+)$/.test(clean)) return clean;
  if (/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(clean)) return clean;
  if (dictionary[clean]) return dictionary[clean];
  if (/^20\d{2}$/.test(clean)) return persianYear(Number(clean));
  if (!/[a-z]/i.test(clean)) return digits(clean);
  if (/^EN$/.test(clean)) return clean; // Language-switch placement and labels are preserved.
  if (/^(?:Astro v|website$|noindex, nofollow$)/.test(clean)) return clean;
  const date = clean.match(new RegExp(`^${monthPattern} (\\d{1,2}), (\\d{4})$`));
  if (date) {
    const month = ['January','February','March','April','May','June','July','August','September','October','November','December'].indexOf(date[1]) + 1;
    return persianDate(`${date[3]}-${String(month).padStart(2,'0')}-${date[2].padStart(2,'0')}`);
  }
  const copyright = clean.match(/^© (\d{4}) Amir\. All rights reserved\.$/);
  if (copyright) return clean;
  const patterns: [RegExp, (m: RegExpMatchArray) => string][] = [
    [/^Dr\. (.+)$/, m => `دکتر ${translate(m[1])}`],
    [/^(\d+) photos?$/, m => `${digits(m[1])} تصویر`],
    [/^(.+) · Amir$/, m => `${translate(m[1])} · امیر`],
    [/^Amir \| Academic Portfolio \| (.+)$/, m => `امیر | وبگاه دانشگاهی | ${translate(m[1])}`],
    [/^(.+) · (20\d{2})$/, m => `${translate(m[1])} · ${persianYear(Number(m[2]))}`],
    [/^(20\d{2}) · Amirkabir University of Technology$/, m => `${persianYear(Number(m[1]))} · دانشگاه صنعتی امیرکبیر`],
    [/^Recommendations – (20\d{2})(?:, letter (\d+))?$/, m => `توصیه‌نامه‌ها – ${persianYear(Number(m[1]))}${m[2] ? `، نامهٔ ${digits(m[2])}` : ''}`],
    [/^Click to Download PDF, letter (\d+): PDF not yet available$/, m => `دریافت توصیه‌نامهٔ ${digits(m[1])}؛ سند هنوز آماده نیست`],
    [/^Open (.+) gallery, image (\d+)$/, m => `باز کردن نگارخانهٔ ${translate(m[1])}، تصویر ${digits(m[2])}`],
    [/^(.+), image (\d+)$/, m => `${translate(m[1])}، تصویر ${digits(m[2])}`],
    [/^Open image (\d+)$/, m => `باز کردن تصویر ${digits(m[1])}`],
    [/^Open (.+) photo$/, m => `باز کردن تصویر ${translate(m[1])}`],
    [/^Open (.+)$/, m => `باز کردن ${translate(m[1])}`],
    [/^Read more about (.+)$/, m => `مطالعهٔ بیشتر دربارهٔ ${translate(m[1])}`],
    [/^Toggle details for (.+)$/, m => `نمایش یا بستن جزئیات ${translate(m[1])}`],
    [/^(Next|Previous) design: (.+)$/, m => `طرح ${m[1]==='Next'?'بعدی':'قبلی'}: ${translate(m[2])}`],
  ];
  for (const [pattern, format] of patterns) { const match = clean.match(pattern); if (match) return format(match); }
  // Comma-separated author fragments emitted by Astro can include whitespace boundaries.
  if (clean.endsWith(',')) return `${translate(clean.slice(0,-1))}،`;
  throw new Error(`Missing Persian translation: ${clean}`);
}

export function localizeHtml(html: string): string {
  const document = parse(html, {scriptingEnabled:false}) as any;
  const attr = (node: any, name: string) => node.attrs?.find((a: any) => a.name===name);
  function visit(node: any, skipped = false) {
    const tag = node.tagName;
    const skip = skipped || ['script','style','svg'].includes(tag);
    if (tag === 'html') { attr(node,'lang').value='fa'; node.attrs.push({name:'dir',value:'rtl'}); }
    if (tag === 'a' || tag === 'option') {
      const href = attr(node,tag==='option'?'value':'href');
      if (href?.value.startsWith('/') && !href.value.startsWith('/fa/') && !/^\/(images|files|_astro)\//.test(href.value) && !node.attrs.some((a:any)=>a.name==='data-language')) href.value='/fa'+href.value;
    }
    if (node.nodeName==='#text' && !skip && normalize(node.value)) {
      const original = node.value;
      const parent = node.parentNode;
      const dateTime = parent?.tagName==='time' ? attr(parent,'datetime')?.value : undefined;
      let result;
      if (dateTime && /^\d{4}-\d{2}-\d{2}$/.test(dateTime)) result=persianDate(dateTime);
      else if (dateTime && /^\d{4}$/.test(dateTime)) result=persianYear(Number(dateTime));
      else result=translate(original);
      node.value = `${original.match(/^\s*/)?.[0] ?? ''}${result}${original.match(/\s*$/)?.[0] ?? ''}`;
      if (parent?.attrs && /[A-Za-z]/.test(result) && !/[\u0600-\u06ff]/.test(result) && result !== 'EN') {
        if (!attr(parent,'dir')) parent.attrs.push({name:'dir',value:'ltr'});
        parent.attrs.push({name:'data-original-text',value:'true'});
      }
    }
    if (!skip) for (const a of node.attrs ?? []) {
      if (['alt','title','aria-label','data-title','data-label'].includes(a.name) && a.value) a.value=translate(a.value);
      if (a.name==='content' && tag==='meta' && (attr(node,'name')?.value==='description' || ['og:title','og:description'].includes(attr(node,'property')?.value))) a.value=translate(a.value);
      if (a.name==='data-photos') {
        const photos=JSON.parse(a.value);
        for (const photo of photos) for (const field of ['alt','label','caption']) if (photo[field]) photo[field]=translate(photo[field]);
        a.value=JSON.stringify(photos);
      }
    }
    for (const child of node.childNodes ?? []) visit(child,skip);
    if (node.content) visit(node.content,skip); // Include thesis pop-up template text.
  }
  visit(document);
  return serialize(document);
}
