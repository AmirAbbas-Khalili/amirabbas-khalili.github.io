import {createRequire} from 'node:module';
import fs from 'node:fs';
const require=createRequire('C:/Users/Amir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'});
const page=await browser.newPage();
const results=[];
for(const width of [320,390,768,900,1024,1200,1440,1920]){
 await page.setViewportSize({width,height:900}); await page.goto('http://127.0.0.1:4322/');
 await page.locator(width<=900?'.mobile-navigation summary':'.more-navigation summary').click();
 await page.waitForTimeout(100);
 const result=await page.evaluate(()=>{
  const panel=document.querySelector('details[open] .dropdown-panel').getBoundingClientRect();
  const texts=[...document.querySelectorAll('.hero h1,.hero p,.hero-actions')].map(el=>el.getBoundingClientRect());
  return {width:innerWidth,overlap:texts.some(r=>panel.left<r.right && panel.right>r.left && panel.top<r.bottom && panel.bottom>r.top),overflow:document.documentElement.scrollWidth>innerWidth,panel:{left:panel.left,right:panel.right,top:panel.top,bottom:panel.bottom}};
 });
 if(result.overlap||result.overflow)throw Error(JSON.stringify(result));
 results.push(result);
 if(width===1440)await page.screenshot({path:'docs/homepage-previews/checkpoint-2-more-menu.png',fullPage:true});
 await page.keyboard.press('Escape');
 await page.locator('.language summary').click();
 const collision=await page.evaluate(()=>{const a=document.querySelector('.language .dropdown-panel').getBoundingClientRect();const b=document.querySelector('.hero').getBoundingClientRect();return a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top});
 if(collision)throw Error('Language overlaps hero at '+width);
}
if(await page.locator('.shortcut-dock button:disabled').count()!==1)throw Error('Missing status');
if(await page.locator('.shortcut-dock a').count()!==0)throw Error('Duplicated route links');
fs.writeFileSync('docs/homepage-previews/checkpoint-2-menu-verification.json',JSON.stringify(results,null,2));
console.log('Menu placement and dock checks passed at '+results.length+' widths');
await browser.close();

