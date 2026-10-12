import {createRequire} from 'node:module';
import fs from 'node:fs';
const require=createRequire('C:/Users/Amir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'});
const context=await browser.newContext({permissions:['clipboard-read','clipboard-write']});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const results=[];
for(const [width,height] of [[320,568],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080],[844,390]]){
 await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4322/',{waitUntil:'networkidle'});
 if(await page.locator('.brand').count()||await page.getByText('Get in touch',{exact:true}).count())throw Error('Removed controls remain');
 await page.locator('.contact-trigger').click();await page.waitForTimeout(350);
 if(!await page.locator('.contact-fan').isVisible())throw Error('Contact not open');
 for(const button of await page.locator('.orbit-button').all()){
  await button.hover();await page.waitForTimeout(220);
  const bounds=await button.boundingBox();if(bounds.x<0||bounds.x+bounds.width>width+1)throw Error('Contact overflow '+width+JSON.stringify(bounds));
 }
 const metric=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight}));
 if(metric.scrollWidth>width || (width>=1024&&metric.scrollHeight>height)){ await page.screenshot({path:'docs/homepage-previews/contact-debug.png',fullPage:true}); console.log(await page.evaluate(()=>[...document.querySelectorAll('body,header,main,footer,.contact-fan,.orbit-item')].map(el=>({class:el.className,rect:el.getBoundingClientRect().toJSON()}))));throw Error('Page overflow '+JSON.stringify(metric)); }
 if(width===1440||width===390){await page.mouse.move(0,0);await page.screenshot({path:`docs/homepage-previews/checkpoint-4-contact-${width}.png`,fullPage:true});}
 await page.keyboard.press('Escape');
 if(await page.locator('.contact-fan').isVisible())throw Error('Escape failed');
 results.push(metric);
}
await page.setViewportSize({width:1440,height:900});await page.goto('http://127.0.0.1:4322/',{waitUntil:'networkidle'});
if(await page.locator('.desktop-navigation>a').nth(1).textContent()!=='Expertise')throw Error('Expertise label');
if(await page.locator('.desktop-navigation>a').nth(1).getAttribute('href')!=='/skills/')throw Error('Expertise route');
await page.locator('.more-navigation summary').hover();await page.waitForTimeout(100);
if(!await page.locator('.more-navigation').evaluate(el=>el.open))throw Error('Hover failed');
await page.locator('.more-navigation summary').click();await page.mouse.move(600,600);await page.waitForTimeout(250);
if(!await page.locator('.more-navigation').evaluate(el=>el.open))throw Error('Click did not pin menu');
await page.keyboard.press('Escape');
for(const [label,value] of [['Email','amirkahlili.work@gmail.com'],['Telegram ID','@Amirjas'],['LinkedIn profile','https://www.linkedin.com/in/amirjas']]){
 await page.locator('.contact-trigger').click();await page.waitForTimeout(350);
 const button=page.locator(`[data-label="${label}"]`);await button.hover();await button.click();
 if(await page.evaluate(()=>navigator.clipboard.readText())!==value)throw Error('Copy failed');
 if(await page.locator('.contact-fan').isVisible())throw Error('Fan stuck after copying');
 if(await page.locator('.copy-status').textContent()!==label+' copied')throw Error('Feedback missing');
 await page.waitForTimeout(1950);
 if(await page.locator('.copy-status').textContent())throw Error('Feedback froze');
}
await context.route('https://www.youtube.com/**',route=>route.fulfill({status:200,body:'YouTube test'}));
const popupPromise=page.waitForEvent('popup');await page.locator('.youtube-link').click();const popup=await popupPromise;await popup.waitForLoadState();
if(popup.url()!=='https://www.youtube.com/@farsish_by_ak')throw Error('Incorrect YouTube target');await popup.close();
await page.locator('.contact-trigger').click();await page.keyboard.press('Tab');
if(!await page.locator('.orbit-button').first().evaluate(el=>el===document.activeElement))throw Error('Keyboard access failed');
await page.keyboard.press('Escape');
await page.emulateMedia({reducedMotion:'reduce'});if(await page.locator('.orbit-item').first().evaluate(el=>getComputedStyle(el).transitionDuration)!=='0s')throw Error('Reduced motion failed');
if(errors.length)throw Error(errors.join('\n'));
fs.writeFileSync('docs/homepage-previews/checkpoint-4-verification.json',JSON.stringify({results,more:'hover and click passed',clipboard:'email and Telegram passed; feedback clears',youtube:'new tab passed',keyboard:'passed',errors},null,2));
console.log('Contact layout, hover/click menu, clipboard cleanup, YouTube popup and keyboard checks passed');await browser.close();


