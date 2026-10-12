import {createRequire} from 'node:module';
import fs from 'node:fs';
const require=createRequire('C:/Users/Amir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'});
const context=await browser.newContext({permissions:['clipboard-read','clipboard-write']});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const sizes=[];
for(const [width,height] of [[320,568],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080],[844,390]]){
 await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4322/',{waitUntil:'networkidle'});
 await page.locator('.contact-trigger').click();await page.waitForTimeout(350);
 const circles=await page.locator('.orbit-item').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}}));
 if(!(circles[1].x>circles[0].x+40&&Math.abs(circles[0].x-circles[2].x)<2&&circles[0].y<circles[1].y&&circles[1].y<circles[2].y))throw Error('Arc is not right-facing '+JSON.stringify(circles));
 for(const item of await page.locator('.orbit-button').all()){
  await item.hover();await page.waitForTimeout(200);const r=await item.boundingBox();
  if(r.x<0||r.x+r.width>width+1||r.y<0||r.y+r.height>height+1)throw Error('Expanded item clipped '+width+JSON.stringify(r));
 }
 await page.mouse.move(0,0);await page.screenshot({path:`docs/homepage-previews/checkpoint-5-${width}.png`,fullPage:true});
 const metric=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight}));
 if(metric.scrollWidth>width||(width>=1024&&metric.scrollHeight>height))throw Error('Page overflow');sizes.push(metric);
 await page.keyboard.press('Escape');
 const dock=await page.locator('.shortcut-dock').boundingBox();
 for(const item of [page.locator('.youtube-link'),page.locator('.contact-trigger')]){
  await item.hover();const r=await item.boundingBox();if(Math.abs((r.y+r.height/2)-(dock.y+dock.height/2))>1)throw Error('Hover not centered');
  if(await item.evaluate(el=>getComputedStyle(el).transform)!=='none')throw Error('Dock highlight shifted');
 }
}
await page.setViewportSize({width:1440,height:900});await page.goto('http://127.0.0.1:4322/',{waitUntil:'networkidle'});
await page.locator('.contact-trigger').click();await page.mouse.move(0,0);await page.waitForTimeout(3250);
if(await page.locator('.contact-fan').isVisible())throw Error('Idle did not close');
await page.locator('.contact-trigger').click();await page.waitForTimeout(2100);await page.locator('.orbit-button').first().hover();await page.waitForTimeout(1300);
if(!await page.locator('.contact-fan').isVisible())throw Error('Activity failed to restart timer');
await page.locator('[data-copy]').click();if(await page.evaluate(()=>navigator.clipboard.readText())!=='amirkahlili.work@gmail.com')throw Error('Email copy failed');
if(await page.locator('.contact-fan').isVisible())throw Error('Copy menu stuck');
if(await page.locator('.copy-status').evaluate(el=>getComputedStyle(el).animationName)!=='copied-feedback')throw Error('Soft feedback missing');
await page.waitForTimeout(2000);if(await page.locator('.copy-status').textContent())throw Error('Feedback stuck');
await context.route('https://www.linkedin.com/**',r=>r.fulfill({status:200,body:'LinkedIn test'}));
await context.route('https://t.me/**',r=>r.fulfill({status:200,body:'Telegram test'}));
for(const url of ['https://www.linkedin.com/in/amirjas','https://t.me/Amirjas']){
 await page.locator('.contact-trigger').click();await page.waitForTimeout(350);const popupPromise=page.waitForEvent('popup');await page.locator(`.contact-fan a[href="${url}"]`).click();const popup=await popupPromise;await popup.waitForLoadState();if(popup.url()!==url)throw Error('Wrong social target');await popup.close();
}
await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.contact-trigger').click();await page.locator('[data-copy]').click();
if(await page.locator('.copy-status').evaluate(el=>getComputedStyle(el).animationName)!=='none')throw Error('Reduced motion failed');
if(errors.length)throw Error(errors.join('\n'));
fs.writeFileSync('docs/homepage-previews/checkpoint-5-verification.json',JSON.stringify({sizes,arc:'right-facing',idle:'closes after 3 seconds; activity resets timer',email:'clipboard passed',social:'LinkedIn and Telegram new tabs passed',dock:'hover centers aligned',feedback:'soft animation and cleanup passed',errors},null,2));
console.log('Right arc, idle/reset timing, social tabs, email clipboard, feedback animation and dock alignment passed');await browser.close();
