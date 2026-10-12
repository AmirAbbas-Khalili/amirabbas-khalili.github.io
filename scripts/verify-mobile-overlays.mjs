import {createRequire} from 'node:module';
import fs from 'node:fs';
const require=createRequire('C:/Users/Amir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');const browser=await chromium.launch({headless:true,channel:'msedge'});const context=await browser.newContext({permissions:['clipboard-read','clipboard-write']});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));const results=[];
for(const [width,height] of [[320,568],[390,844],[768,1024],[844,390],[1024,768],[1440,900]]){
 await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4322/',{waitUntil:'networkidle'});
 if(await page.locator('.hero-actions a').getAttribute('href')!=='/me/'||await page.locator('dialog').count())throw Error('CTA not replaced');
 const hero=await page.locator('.hero').boundingBox();
 if(width<=900){
  for(const menu of ['.mobile-navigation','.language']){
   await page.locator(menu+' summary').click();await page.waitForTimeout(100);
   const after=await page.locator('.hero').boundingBox();if(Math.abs(hero.y-after.y)>1)throw Error('Menu pushes hero '+width);
   if(!await page.locator('.menu-shade').isVisible())throw Error('Shade missing');
   if(width===390)await page.screenshot({path:`docs/homepage-previews/checkpoint-8-${menu.includes('language')?'language':'menu'}.png`});
   await page.mouse.click(5,height/2);await page.waitForTimeout(100);if(await page.locator('.menu-shade').isVisible())throw Error('Outside dismissal failed');
  }
 }
 await page.locator('.contact-trigger').click();await page.waitForTimeout(320);
 if(width<=900){const positions=await page.locator('.orbit-item').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().toJSON()));const anchor=await page.locator('.contact-trigger').boundingBox();for(const r of positions){if(Math.abs(r.x+r.width/2-anchor.x-anchor.width/2)>1||r.bottom>anchor.y)throw Error('Stack not aligned above Contact');}if(!(positions[0].y<positions[1].y&&positions[1].y<positions[2].y))throw Error('Invalid stack');}
 for(const item of await page.locator('.orbit-button').all()){await item.hover();await page.waitForTimeout(300);const r=await item.boundingBox();if(r.x<0||r.y<0||r.x+r.width>width||r.y+r.height>height)throw Error('Contact detail clipping '+width);}
 if(width===390){await page.mouse.move(0,0);await page.waitForTimeout(320);await page.screenshot({path:'docs/homepage-previews/checkpoint-8-contact.png'});}
 const metric=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight}));if(metric.scrollWidth>width||(width>=1024&&metric.scrollHeight>height))throw Error('Page overflow');results.push(metric);
 await page.keyboard.press('Escape');
}
await page.locator('.contact-trigger').click();await page.waitForTimeout(320);await page.locator('[data-copy]').click();if(await page.evaluate(()=>navigator.clipboard.readText())!=='amirkahlili.work@gmail.com')throw Error('Copy failed');if(errors.length)throw Error(errors.join('\n'));
if((await page.request.get('http://127.0.0.1:4322/me/')).status()!==200)throw Error('Me route broken');
fs.writeFileSync('docs/homepage-previews/checkpoint-8-verification.json',JSON.stringify({results,CTA:'Me link passed',menus:'overlay without layout movement; shade and outside dismissal passed',contacts:'vertical stack above trigger on compact screens; no clipping',errors},null,2));console.log('Me CTA, mobile overlays, shade dismissal, vertical contact stack and clipboard checks passed');await browser.close();
