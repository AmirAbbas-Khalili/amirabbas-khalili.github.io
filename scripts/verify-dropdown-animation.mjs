import {createRequire} from 'node:module';
import fs from 'node:fs';
const require=createRequire('C:/Users/Amir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');const {chromium}=require('playwright');const browser=await chromium.launch({headless:true,channel:'msedge'});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));const results=[];
for(const [width,height] of [[390,844],[844,390],[1024,768],[1440,900]]){
 await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4322/',{waitUntil:'networkidle'});
 const menu=page.locator(width<=900?'.mobile-navigation':'.more-navigation');const summary=menu.locator('summary');const panel=menu.locator('.dropdown-panel');
 const hero=await page.locator('.hero').boundingBox();await summary.click();await page.waitForTimeout(350);
 const measure=await panel.evaluate(el=>{const range=document.createRange();let longest=0;for(const a of el.querySelectorAll('a')){range.selectNodeContents(a);longest=Math.max(longest,range.getBoundingClientRect().width);}const s=getComputedStyle(el);return{width:el.getBoundingClientRect().width,longest,padding:[s.paddingLeft,s.paddingRight,s.paddingTop,s.paddingBottom]};});
 if(measure.width-measure.longest>30||new Set(measure.padding).size!==1)throw Error('Menu excess spacing '+JSON.stringify(measure));
 if(Math.abs(hero.y-(await page.locator('.hero').boundingBox()).y)>1)throw Error('Hero moved');
 if(width===1440||width===390)await page.screenshot({path:`docs/homepage-previews/checkpoint-9-${width}.png`});
 await page.keyboard.press('Escape');await page.waitForTimeout(80);
 if(!await menu.evaluate(el=>el.open)||!await panel.evaluate(el=>el.inert))throw Error('Exit animation missing');
 const opacity=await panel.evaluate(el=>parseFloat(getComputedStyle(el).opacity));if(!(opacity>0&&opacity<1))throw Error('Exit not interpolated');
 await page.waitForTimeout(220);if(await menu.evaluate(el=>el.open))throw Error('Exit did not finish');
 await summary.click();await page.waitForTimeout(100);await page.keyboard.press('Escape');await page.waitForTimeout(50);await summary.click();await page.waitForTimeout(350);if(!await menu.evaluate(el=>el.open)||await panel.evaluate(el=>el.inert))throw Error('Rapid reversal failed');
 await page.mouse.click(5,height-10);await page.waitForTimeout(300);if(await menu.evaluate(el=>el.open))throw Error('Outside close failed');
 results.push({width,height,...measure});
}
await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.more-navigation summary').click();await page.keyboard.press('Escape');if(await page.locator('.more-navigation').evaluate(el=>el.open))throw Error('Reduced motion close not immediate');
if(errors.length)throw Error(errors.join('\n'));fs.writeFileSync('docs/homepage-previews/checkpoint-9-verification.json',JSON.stringify({results,animations:'opening, closing and reversal passed',reducedMotion:'passed',errors},null,2));console.log('Content-fit sizing, symmetric padding, open/close transitions, reversal and reduced motion passed');await browser.close();
