import {createRequire} from 'node:module';
import fs from 'node:fs';
const require=createRequire('C:/Users/Amir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');const {chromium}=require('playwright');const browser=await chromium.launch({headless:true,channel:'msedge'});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));const results=[];
for(const path of ['/','/me/']){
 for(const [width,height] of [[320,568],[390,844],[950,768],[1440,900]]){
  await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4322'+path,{waitUntil:'networkidle'});
  for(const mode of ['light','dark']){
   const current=await page.evaluate(()=>document.documentElement.dataset.theme);if(current!==mode)await page.locator('.theme-switch').click();
   if(await page.locator('.theme-switch').getAttribute('aria-checked')!==String(mode==='dark'))throw Error('Switch state');
   await page.waitForTimeout(250);const metric=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:innerHeight,scrollHeight:document.documentElement.scrollHeight}));if(metric.scrollWidth>width||(path==='/'&&width>=1024&&metric.scrollHeight>height))throw Error('Overflow '+path+JSON.stringify(metric));
   if(width===1440||width===390)await page.screenshot({path:`docs/homepage-previews/header-switch-${path==='/'?'home':'me'}-${mode}-${width}.png`,fullPage:true});results.push({path,mode,...metric});
  }
  if(!await page.locator('.language-switch button').isDisabled())throw Error('Persian falsely active');if(await page.locator('.portfolio-brand').getAttribute('href')!=='/')throw Error('Home missing');
  if(width<=1000){const before=await page.locator('main').boundingBox();await page.locator('.mobile-navigation summary').click();await page.waitForTimeout(350);if(await page.locator('.mobile-navigation a').count()!==10)throw Error('Mobile routes missing');if(!await page.locator('.menu-shade').isVisible())throw Error('Shade missing');if(Math.abs(before.y-(await page.locator('main').boundingBox()).y)>1)throw Error('Menu shifts content');await page.keyboard.press('Escape');await page.waitForTimeout(300);}
 }
}
await page.goto('http://127.0.0.1:4322/',{waitUntil:'networkidle'});if(await page.evaluate(()=>document.documentElement.dataset.theme)!=='dark')throw Error('Persistence failed');await page.locator('.theme-switch').focus();await page.keyboard.press('Space');if(await page.evaluate(()=>document.documentElement.dataset.theme)!=='light')throw Error('Keyboard switch failed');
await page.goto('http://127.0.0.1:4322/me/',{waitUntil:'networkidle'});if(await page.evaluate(()=>document.documentElement.dataset.theme)!=='light')throw Error('Cross-page persistence failed');
if(await page.locator('.portfolio-links>a').count()!==4||await page.locator('.more-navigation a').count()!==6)throw Error('Original groups changed');
if(errors.length)throw Error(errors.join('\n'));fs.writeFileSync('docs/homepage-previews/header-switch-verification.json',JSON.stringify({results,theme:'light/dark toggle; keyboard and persistence passed',language:'Persian explicitly unavailable',navigation:'all original groups preserved',errors},null,2));console.log('Light/dark layout, navigation, keyboard and persistence checks passed');await browser.close();

