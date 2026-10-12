import { createRequire } from 'node:module';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const require=createRequire('C:/Users/Amir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({channel:'msedge',headless:true,args:['--remote-debugging-port=9223']});
try{
 const result=await promisify(execFile)(process.execPath,['C:/Users/Amir/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/lighthouse/cli/index.js','http://127.0.0.1:4322/','--port=9223','--quiet','--only-categories=performance,accessibility,best-practices,seo','--output=json','--output-path=docs/homepage-previews/checkpoint-1-lighthouse.json'],{timeout:60000});
 console.log(result.stdout||'Audit complete');
}finally{await browser.close();}
