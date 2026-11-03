/* Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
 * https://github.com/Argonstudio/ArgonCakeCalc — preserve attribution (section 7 of the Commercial Source-Available License). */
/* Run against static hosting: BASE_URL=http://localhost:8091 node tests/browser.test.cjs */
require('../assets/i18n.js').language='ru';
const{chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),C=require('../assets/core.js'),fixture=require('./fixture.cjs');
const OUT=process.env.QA_OUTPUT||path.join(__dirname,'output');fs.mkdirSync(OUT,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/usr/local/bin/chromium',args:['--no-sandbox']});
 const ctx=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true,locale:'ru-RU'}),page=await ctx.newPage(),errors=[];
 await ctx.addInitScript(()=>localStorage.setItem('argon-cakecalc-language','ru'));
 page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
 const url=process.env.BASE_URL||'http://localhost:8091';
 const nav=async r=>{if(await page.locator('#menu-toggle').isVisible()&&!(await page.locator('nav').isVisible()))await page.locator('#menu-toggle').click();await page.locator(`nav [data-route="${r}"]`).click();};
 const field=p=>page.locator(`[data-field="${p}"]`);
 const saved=async()=>{await page.waitForFunction(()=>document.querySelector('#save-status').textContent.includes('Все изменения'));};
 async function readDB(){await saved();return page.evaluate(()=>new Promise((res,rej)=>{const r=indexedDB.open('CakeCalc',1);r.onsuccess=()=>{const d=r.result,q=d.transaction('snapshots').objectStore('snapshots').get('current');q.onsuccess=()=>{res(q.result.data);d.close();};q.onerror=()=>rej(q.error);};}));}
 async function importDB(data){await nav('settings');await page.locator('#import-file').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(typeof data==='string'?data:JSON.stringify(data))});}
 await page.goto(url);await page.waitForSelector('[data-action="new"]');await saved();
 await page.screenshot({path:path.join(OUT,'empty-desktop.png'),fullPage:true});
 // Create material through the real editor.
 await page.locator('.toolbar [data-action="new"]').click();await field('name').fill('Мой сахар');await field('price').fill('100');await field('packQty').fill('1');await field('unit').selectOption('kg');
 assert.match(await page.locator('#live').textContent(),/0,1/);await saved();await page.reload();await page.waitForSelector('[data-field="name"]');assert.equal(await field('name').inputValue(),'Мой сахар');
 // Export and invalid import are non-destructive.
 const exportEvent=page.waitForEvent('download');await page.locator('.toolbar [data-action="backup"]').click();const backup=await exportEvent;await backup.saveAs(path.join(OUT,'backup.json'));assert.equal(JSON.parse(fs.readFileSync(path.join(OUT,'backup.json'))).materials[0].name,'Мой сахар');
 await importDB('{broken');await page.waitForFunction(()=>!document.querySelector('#global-message').hidden);assert.equal((await readDB()).materials.length,1);
 const f=fixture();await importDB(f.db);await page.waitForFunction(()=>document.querySelector('#global-message').hidden);await saved();
 // Nested costs and quote.
 await nav('recipes');assert.equal(await field('name').inputValue(),'Крем А');await page.locator('#quote-qty').fill('100');assert.match(await page.locator('#quote-cost').textContent(),/12,50/);
 // Cycle prevention through the source selector, not just core API.
 await page.locator('[data-source="0"]').selectOption('recipe:'+f.b.id);assert.match(await page.locator('#toast').textContent(),/Циклическая/);assert.equal(await page.locator('[data-source="0"]').inputValue(),'material:'+f.sugar.id);
 // Price propagation, protected deletion, invalid quantities.
 await nav('materials');await field('price').fill('200');assert.equal(await field('price').evaluate(el=>el===document.activeElement),true);await saved();
 await page.locator('[data-action="delete"]').click();assert.match(await page.locator('#toast').textContent(),/Используется/);assert.equal((await readDB()).materials.length,2);
 await page.screenshot({path:path.join(OUT,'materials-desktop.png'),fullPage:true});
 await nav('products');assert.match(await page.locator('#live').textContent(),/190,00/);
 const q=field('components.1.qty');await q.fill('-1');assert.equal(await page.locator('#edit-error').isVisible(),true);assert.equal((await readDB()).products[0].components[1].qty,'50');await page.screenshot({path:path.join(OUT,'invalid-desktop.png'),fullPage:true});await q.fill('50');assert.equal(await page.locator('#edit-error').isVisible(),false);
 // Geometry and two-way output command.
 await page.locator('[data-action="geometry-fit"]').click();assert.equal(await page.locator('#cake-drawing rect').count(),1);
 await field('cake.tiers.0.height').fill('10');await page.locator('[data-action="geometry-weight"]').click();assert.notEqual(await field('outputQty').inputValue(),'1000');
 // Scale by output. Fixed packaging unchanged; quantity edits remain possible.
 await page.locator('#scale-target').fill('2000');await page.locator('[data-action="scale-weight"]').click();assert.equal(await field('outputQty').inputValue(),'2000');assert.equal(await field('components.2.qty').inputValue(),'1');
 const before=await readDB();const expected=C.scaleEntity(before.products[0],{mode:'diameter',diameter:'30',height:'8'});
 await page.locator('#scale-diameter').fill('30');await page.locator('#scale-height').fill('8');await page.locator('[data-action="scale-diameter"]').click();assert.equal(await field('outputQty').inputValue(),expected.outputQty);
 // Clone as a template makes independent product.
 await page.locator('[data-action="clone"]').click();assert.match(await field('name').inputValue(),/копия/);assert.equal((await readDB()).products.length,2);
 // Margin and toggles.
 await nav('costs');await field('pricing.mode').selectOption('margin');await field('pricing.rate').fill('25');await field('pricing.energy.amount').fill('20');await field('pricing.energy.enabled').check();await saved();
 let state=await readDB();const result=new C.Engine(state).product(state.products[0].id);assert.ok(Math.abs(result.margin.toNumber()-25)<.1);
 await page.screenshot({path:path.join(OUT,'costs-desktop.png'),fullPage:true});
 // Real PDF download (not print dialog).
 const pdfEvent=page.waitForEvent('download');await page.locator('[data-action="pdf"]').click();await(await pdfEvent).saveAs(path.join(OUT,'product.pdf'));
 assert.equal(fs.readFileSync(path.join(OUT,'product.pdf')).subarray(0,5).toString(),'%PDF-');
 await nav('recipes');const rp=page.waitForEvent('download');await page.locator('[data-action="pdf"]').click();await(await rp).saveAs(path.join(OUT,'recipe.pdf'));
 await page.screenshot({path:path.join(OUT,'recipes-desktop.png'),fullPage:true});
 await nav('settings');await page.locator('#new-category').fill('Моя категория');await page.locator('[data-action="add-category"]').click();assert.ok((await readDB()).categories.includes('Моя категория'));await page.screenshot({path:path.join(OUT,'settings-desktop.png'),fullPage:true});
 // Reopen a page: state persists in IndexedDB beyond the page lifecycle.
 await saved();await page.close();const p2=await ctx.newPage();p2.on('dialog',d=>d.accept());p2.on('pageerror',e=>errors.push(e.message));await p2.goto(url+'/#products');await p2.waitForSelector('[data-field="name"]');assert.match(await p2.locator('[data-field="name"]').inputValue(),/копия/);
 // Offline reload from service worker after initial load.
 await p2.evaluate(()=>navigator.serviceWorker.ready);await p2.reload();await p2.waitForSelector('[data-field="name"]');await ctx.setOffline(true);await p2.reload();await p2.waitForSelector('[data-field="name"]');await p2.locator('[data-field="name"]').fill('Офлайн-торт');await p2.waitForFunction(()=>document.querySelector('#save-status').textContent.includes('Все изменения'));await ctx.setOffline(false);
 // Responsive screenshots for every route; no page-level horizontal overflow.
 await p2.setViewportSize({width:390,height:844});for(const r of ['materials','recipes','products','costs','settings']){if(await p2.locator('#menu-toggle').isVisible()&&!(await p2.locator('nav').isVisible()))await p2.locator('#menu-toggle').click();await p2.locator(`nav [data-route="${r}"]`).click();await p2.screenshot({path:path.join(OUT,`${r}-mobile.png`),fullPage:true});assert.ok(await p2.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`horizontal overflow ${r}`);}
 // Two tabs refuse silent overwrites.
 const p3=await ctx.newPage();p3.on('dialog',d=>d.accept());await p3.goto(url+'/#materials');await p3.waitForSelector('[data-field="name"]');if(await p2.locator('#menu-toggle').isVisible()&&!(await p2.locator('nav').isVisible()))await p2.locator('#menu-toggle').click();await p2.locator('nav [data-route="materials"]').click();await p3.locator('[data-field="name"]').fill('Цена из другой вкладки');await p3.waitForFunction(()=>document.querySelector('#save-status').textContent.includes('Все изменения'));await p2.locator('[data-field="price"]').fill('333');await p2.waitForFunction(()=>document.querySelector('#save-status').classList.contains('error-text'));assert.ok(await p2.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'horizontal overflow in conflict error');await p2.screenshot({path:path.join(OUT,'conflict-mobile.png'),fullPage:true});assert.match(await p2.locator('#global-message').textContent(),/Не удалось сохранить/);
 assert.deepEqual(errors,[]);console.log('Browser scenarios passed: CRUD, persistence, nested recipes, cycles, prices, scaling, geometry, JSON, PDF, offline, responsive, tab conflict.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
