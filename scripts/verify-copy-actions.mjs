import {createRequire} from 'node:module';
import fs from 'node:fs';
const require=createRequire('C:/Users/Amir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'});
const context=await browser.newContext({permissions:['clipboard-read','clipboard-write']});
const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const sizes=[];
for(const [width,height] of [[320,568],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080],[844,390]]){
 await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4322/',{waitUntil:'networkidle'});
 const metrics=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight}));
 if(metrics.scrollWidth>width||(width>=1024&&metrics.scrollHeight>height))throw Error(JSON.stringify(metrics));
 if(await page.locator('.hero .eyebrow').count())throw Error('Label not removed');
 if(await page.getByText('Not added yet',{exact:true}).count())throw Error('Placeholder text remains');
 if(width===1440||width===390)await page.screenshot({path:`docs/homepage-previews/checkpoint-3-${width===1440?'desktop':'mobile'}.png`,fullPage:true});
 sizes.push(metrics);
}
await page.setViewportSize({width:1440,height:900});
for(const [label,value] of [['Email','amirkahlili.work@gmail.com'],['YouTube handle','@farsish_by_ak']]){
 const button=page.locator(`[data-label="${label}"]`);
 await button.hover();
 const tooltip=button.locator('..').locator('[role="tooltip"]');
 if(!await tooltip.isVisible()||await tooltip.textContent()!==value)throw Error('Tooltip failed');
 await button.click();
 if(await page.evaluate(()=>navigator.clipboard.readText())!==value)throw Error('Clipboard incorrect');
 if(await page.locator('.copy-status').textContent()!==label+' copied')throw Error('Feedback missing');
 await button.focus();if(!await tooltip.isVisible())throw Error('Focus tooltip missing');
}
await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied')}}}));
await page.locator('[data-label="Email"]').click();
if(!(await page.locator('.copy-status').textContent()).startsWith('Could not copy'))throw Error('Failure feedback missing');
if(errors.length)throw Error(errors.join('\n'));
fs.writeFileSync('docs/homepage-previews/checkpoint-3-verification.json',JSON.stringify({sizes,clipboard:'email and YouTube passed',failureFeedback:'passed',errors},null,2));
console.log('Responsive, tooltip, clipboard and failure-feedback checks passed');
await browser.close();
