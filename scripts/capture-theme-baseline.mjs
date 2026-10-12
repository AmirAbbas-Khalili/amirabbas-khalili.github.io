import {createRequire} from 'node:module';import fs from 'node:fs';import path from 'node:path';
const require=createRequire('C:/Users/Amir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');const {chromium}=require('playwright');
export const routes=fs.readdirSync('dist',{recursive:true}).filter(p=>p.endsWith('index.html')&&!p.startsWith('designs')).map(p=>'/'+p.replaceAll('\\','/').replace(/index.html$/,''));
const browser=await chromium.launch({headless:true,channel:'msedge'});const page=await browser.newPage();const baseline={};
for(const route of routes){await page.goto('http://127.0.0.1:4322'+route,{waitUntil:'domcontentloaded'});baseline[route]=await page.locator('main').evaluate(el=>({text:el.textContent.replace(/\s+/g,' ').trim(),links:[...el.querySelectorAll('a')].map(a=>a.getAttribute('href'))}));}
fs.writeFileSync('docs/homepage-previews/site-theme-baseline.json',JSON.stringify(baseline,null,2));await browser.close();console.log('Saved content/link baseline for '+routes.length+' pages.');
