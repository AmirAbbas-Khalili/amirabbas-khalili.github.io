import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
const require = createRequire('C:/Users/Amir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const { chromium } = require('playwright');
const base = 'http://127.0.0.1:4322';
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const variants = ['flowops','engage','autonomous','vortex','auralis'];
const results = [];
const errors = [];
for (const variant of variants) {
  for (const width of [320,390,768,1024,1440]) {
    const page = await browser.newPage({viewport:{width,height:width<500?844:900},reducedMotion:'reduce'});
    page.on('pageerror', e=>errors.push(`${variant}/${width}: ${e.message}`));
    page.on('response', r=>{if(r.status()>=400)errors.push(`${variant}/${width}: ${r.status()} ${r.url()}`);});
    const response = await page.goto(`${base}/designs/${variant}/`,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const measures = await page.evaluate(()=>({
      viewport:window.innerWidth, content:document.documentElement.scrollWidth,
      title:document.querySelector('h1')?.innerText,
      imageLoaded:document.querySelector('.hp-photo img')?.naturalWidth>0,
      animations:document.getAnimations().filter(a=>a.playState==='running').length,
      ctaWrap:Array.from(document.querySelectorAll('.hp-button')).some(el=>el.getBoundingClientRect().height>65),
      overflow:Array.from(document.querySelectorAll('body *')).filter(el=>{
        const r=el.getBoundingClientRect(); const style=getComputedStyle(el);
        return r.width>0&&style.position!=='fixed'&&(r.right>innerWidth+1||r.left< -1);
      }).slice(0,8).map(el=>el.className)
    }));
    results.push({variant,width,status:response.status(),...measures});
    if(measures.content>width||!measures.imageLoaded||measures.ctaWrap)errors.push(`${variant}/${width}: invalid layout ${JSON.stringify(measures)}`);
    if(width===1440||width===390) await page.screenshot({path:`docs/homepage-previews/${variant}-${width}.png`,fullPage:true});
    if(width===390){
      const menu=page.locator('.hp-mobile-nav');
      await menu.locator('summary').click();
      if(await menu.getAttribute('open')===null)errors.push(`${variant}: menu did not open`);
      if(await menu.locator('a:visible').count()!==10)errors.push(`${variant}: mobile links missing`);
      await page.keyboard.press('Escape');
      if(await menu.getAttribute('open')!==null)errors.push(`${variant}: Escape failed`);
      await page.locator('#design-choice').selectOption('/designs/auralis/');
      await page.waitForURL('**/designs/auralis/');
    }
    if(width===1440){
      const menu=page.locator('.hp-more');
      await menu.locator('summary').focus();
      await page.keyboard.press('Enter');
      if(await menu.locator('a:visible').count()!==6)errors.push(`${variant}: desktop links missing`);
      await page.keyboard.press('Escape');
      if(await menu.getAttribute('open')!==null)errors.push(`${variant}: desktop Escape failed`);
    }
    await page.close();
  }
}
const page=await browser.newPage();
await page.goto(base,{waitUntil:'networkidle'});
const paths=await page.locator('a[href^="/"]').evaluateAll(links=>[...new Set(links.map(a=>a.getAttribute('href')))]);
for(const path of paths){const response=await page.request.get(`${base}${path}`);if(response.status()!==200)errors.push(`Link ${path}: ${response.status()}`);}
console.log(JSON.stringify({results,errors,linksChecked:paths.length,chromePath:chromium.executablePath()},null,2));
await writeFile('docs/homepage-previews/verification.json',JSON.stringify({results,errors,linksChecked:paths.length},null,2));
await browser.close();
if(errors.length)process.exitCode=1;

