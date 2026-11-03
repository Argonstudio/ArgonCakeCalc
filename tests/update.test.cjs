/* Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
 * https://github.com/Argonstudio/ArgonCakeCalc — preserve attribution (section 7 of the Commercial Source-Available License). */
/* Real Service Worker update: changed asset -> generated cache -> explicit activation. */
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),http=require('node:http'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
(async()=>{const temp=fs.mkdtempSync(path.join(os.tmpdir(),'cakecalc-update-')),root=path.join(temp,'app');let b,server;
try{fs.cpSync(path.resolve(__dirname,'..'),root,{recursive:true,filter:p=>!p.includes(path.join('tests','output'))});
const build=()=>execFileSync('python',[path.join(root,'tools/build-standalone.py')]);build();const initial=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'};
server=http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const file=path.join(root,name);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(err?'Not found':data);});});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port;
b=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/usr/local/bin/chromium',args:['--no-sandbox']});const ctx=await b.newContext({locale:'ru-RU'}),p=await ctx.newPage();await ctx.addInitScript(()=>localStorage.setItem('argon-cakecalc-language','ru'));const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto(url);await p.evaluate(()=>navigator.serviceWorker.ready);await p.reload();await p.waitForFunction(()=>!!navigator.serviceWorker.controller);
await p.locator('[data-action="new"]').first().click();await p.locator('[data-field="name"]').fill('Сохранён при обновлении');await p.waitForFunction(()=>document.querySelector('#save-status').textContent.includes('Все изменения'));
const index=path.join(root,'index.html');fs.writeFileSync(index,fs.readFileSync(index,'utf8').replace('v1.0.0','v1.0.0-update-test'));build();assert.notEqual(initial,fs.readFileSync(path.join(root,'sw.js'),'utf8'));
await p.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration();await r.update();});await p.waitForSelector('#apply-update',{timeout:30000});
await p.locator('#apply-update').click();await p.waitForFunction(()=>document.body.textContent.includes('v1.0.0-update-test'),{timeout:30000});assert.equal(await p.locator('[data-field="name"]').inputValue(),'Сохранён при обновлении');
await ctx.setOffline(true);await p.reload();await p.waitForSelector('[data-field="name"]');assert.equal(await p.locator('[data-field="name"]').inputValue(),'Сохранён при обновлении');assert.match(await p.locator('body').textContent(),/v1\.0\.0-update-test/);assert.equal(await p.evaluate(async()=>(await caches.keys()).filter(k=>k.startsWith('argoncakecalc-')).length),1);assert.deepEqual(errors,[]);
console.log('PASS: generated cache update on installed app, explicit activation, preserved IndexedDB, offline new assets, old cache removed.');
}finally{if(b)await b.close();if(server)await new Promise(r=>server.close(r));fs.rmSync(temp,{recursive:true,force:true});}})().catch(e=>{console.error(e);process.exit(1)});
