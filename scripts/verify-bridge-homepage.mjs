import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('C:/Users/Amir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const page = await browser.newPage();
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
const results=[];
for(const [width,height] of [[320,568],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080],[844,390]]){
 await page.setViewportSize({width,height}); await page.goto('http://127.0.0.1:4322/'); await page.evaluate(()=>document.fonts.ready);
 const metrics=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,image:document.querySelector('.bridge-background').naturalWidth}));
 if(metrics.scrollWidth>width) throw Error('Horizontal overflow '+width);
 if(width>=1024 && metrics.scrollHeight>height) throw Error('Desktop scroll '+width);
 if(!metrics.image) throw Error('Missing bridge');
 results.push(metrics);
 if(width===1440||width===390) await page.screenshot({path:`docs/homepage-previews/checkpoint-2-${width===1440?'desktop':'mobile'}.png`,fullPage:true});
}
await page.setViewportSize({width:1440,height:900}); await page.goto('http://127.0.0.1:4322/');
await page.locator('[data-sections-open]').click();
if(!await page.locator('dialog').evaluate(el=>el.open))throw Error('Dialog failed');
const routes=await page.locator('dialog a').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
if(routes.length!==10)throw Error('Lost sections');
await page.keyboard.press('Escape');
if(!await page.locator('[data-sections-open]').evaluate(el=>el===document.activeElement))throw Error('Focus not restored');
await page.locator('.desktop-navigation summary').click();
if(await page.locator('.desktop-navigation details[open] a').count()!==8)throw Error('More menu');
await page.keyboard.press('Escape');
await page.locator('.language summary').click();
if(!await page.locator('.language button').isDisabled())throw Error('Persian incorrectly active');
await page.keyboard.press('Escape');
await page.setViewportSize({width:390,height:844});
await page.locator('.mobile-navigation summary').click();
if(await page.locator('.mobile-navigation details').count())throw Error('Unexpected structure');
if(await page.locator('.mobile-navigation a').count()!==10)throw Error('Mobile missing links');
for(const route of routes){ const res=await page.request.get('http://127.0.0.1:4322'+route); if(res.status()!==200)throw Error('Broken route '+route); }
await page.emulateMedia({reducedMotion:'reduce'});
const transition=await page.locator('.action').first().evaluate(el=>getComputedStyle(el).transitionDuration);
if(transition!=='0s')throw Error('Reduced motion failed');
if(errors.length)throw Error(errors.join('\n'));
fs.writeFileSync('docs/homepage-previews/checkpoint-2-verification.json',JSON.stringify({results,routes,errors,keyboard:'Escape closes and restores focus',reducedMotion:transition},null,2));
console.log(JSON.stringify({results,routes:routes.length,errors,keyboard:'passed',reducedMotion:'passed'}));
await browser.close();

