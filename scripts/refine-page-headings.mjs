import fs from 'node:fs';
const edit=(path,fn)=>{const old=fs.readFileSync(path,'utf8');fs.writeFileSync(path,fn(old));};
fs.writeFileSync('src/components/PageHero.astro',`---
import BackButton from './BackButton.astro';
import SectionMark from './SectionMark.astro';
import type { SectionTint } from '../data/site';
interface Props {
 title: string;
 back?: { href: string; label?: string };
 eyebrow?: string; lede?: string; sectionId?: string; tint?: SectionTint; dark?: boolean;
}
const { title, back } = Astro.props;
---
<header class="page-heading">
 <div class="shell page-heading-inner">
  {back && <div class="page-heading-back"><BackButton fallback={back.href} label={back.label} /></div>}
  <div class="page-heading-row"><SectionMark /><h1>{title}</h1></div>
  {Astro.slots.has('default') && <div class="page-heading-actions"><slot /></div>}
 </div>
</header>
`);
edit('src/components/SectionMark.astro',s=>s.replace("import student", "import user from '@phosphor-icons/core/assets/regular/user.svg?raw';\nimport student").replace("= {'study-path':student", "= {me:user,'study-path':student"));
edit('src/pages/me/index.astro',s=>s.replace("import BaseLayout", "import PageHero from '../../components/PageHero.astro';\nimport BaseLayout").replace(/  <section class="me-intro[\s\S]*?<\/section>/,'  <PageHero title="Me" />'));
edit('src/pages/goal/index.astro',s=>{
 s=s.replace("import NightSky from '../../components/NightSky.astro';", "import PageHero from '../../components/PageHero.astro';").replace("import SectionMark from '../../components/SectionMark.astro';",'');
 const start=s.indexOf('  <section class="relative');const end=s.indexOf('      <div class="mt-14',start);
 s=s.slice(0,start)+'  <PageHero title="Goal" />\n  <section class="goal-content">\n    <div class="shell relative pb-16">\n'+s.slice(end);
 return s;
});
edit('src/pages/study-path/thesis/index.astro',s=>{
 s=s.replace("import SectionMark from '../../../components/SectionMark.astro';","import PageHero from '../../../components/PageHero.astro';").replace("import BackButton from '../../../components/BackButton.astro';",'');
 const start=s.indexOf('  <div class="shell shell-x');const chips=s.indexOf('      <div class="hero-rise hero-rise-3 mt-7',start);const end=s.indexOf('    </header>',chips);
 const slots=s.slice(chips,end).replace('hero-rise hero-rise-3 mt-7 flex','flex');
 return s.slice(0,start)+'  <PageHero title="Thesis" back={{href: "/study-path/"}}>\n'+slots+'  </PageHero>\n  <div class="shell shell-x border-line/70 pt-12">'+s.slice(end+'    </header>'.length);
});
for(const [path,prefix,back]of [['src/pages/courses/[slug].astro','../../','/courses/'],['src/pages/study-path/articles/[slug].astro','../../../','/study-path/#articles']]){
 edit(path,s=>{
  s=s.replace(`import Backdrop from '${prefix}components/Backdrop.astro';`,`import PageHero from '${prefix}components/PageHero.astro';`).replace(`import BackButton from '${prefix}components/BackButton.astro';`,'').replace(`import SectionMark from '${prefix}components/SectionMark.astro';`,'');
  const start=s.indexOf('    <header');const end=s.indexOf('    </header>',start);const header=s.slice(start,end);
  const isCourse=path.includes('courses');
  const actionStart=isCourse?header.indexOf('        {\n          (d.links'):header.indexOf('        <div class="hero-rise hero-rise-4');
  // Normalize CRLF before locating actions below.
  const normalized=header.replaceAll('\r\n','\n');const idx=isCourse?normalized.indexOf('        {\n          (d.links'):normalized.indexOf('        <div class="hero-rise hero-rise-4');
  if(idx<0)throw Error('Missing detail actions: '+path);
  let actions=normalized.slice(idx,normalized.lastIndexOf('      </div>')).replaceAll('hero-rise hero-rise-4 mt-8 flex','flex');
  if(isCourse)actions='<span class={`chip ${status.class}`}>{status.label}</span>\n'+actions;
  else actions='{d.journal && <p class="text-sm text-ink-mute">{d.journal}</p>}\n{d.date && <time class="text-sm text-ink-mute">{d.date.toLocaleDateString(\'en-US\', {year:\'numeric\', month:\'long\'})}</time>}\n'+actions;
  s=s.slice(0,start)+`    <PageHero title={d.title} back={{href: '${back}'}}>\n${actions}\n    </PageHero>`+s.slice(end+'    </header>'.length);
  return s;
 });
}
edit('src/components/homepage/BridgeHomepage.astro',s=>s.replace('<h1>Amir</h1>','<h1>Amir A. Khalili</h1>'));
edit('src/components/DaylightHeader.astro',s=>s.replace("import '../styles/portfolio-header.css';","import '../styles/portfolio-header.css';\nimport '../styles/theme-refinement.css';").replace('const open = dropdowns.some(dropdown => dropdown.open);',`const open = dropdowns.some(dropdown => dropdown.querySelector('summary')?.getAttribute('aria-expanded') === 'true');`).replace('duration: open ? 300 : 240','duration: open ? 250 : 140'));
// Remove section-specific palette assignments; every section now uses the same blue-gray family.
edit('src/styles/portfolio-theme.css',s=>s.replace(/^body\.site-interior\[data-section=[^\n]+\n/gm,''));
