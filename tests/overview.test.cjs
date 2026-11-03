/* Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
 * https://argon-studio.ru/ | https://github.com/Argonstudio/ArgonCakeCalc
 * Preserve author/origin attribution under section 7 of the Commercial Source-Available License. */
/* Overview, onboarding, scenario and share-flow smoke test. */
const{chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/usr/local/bin/chromium',args:['--no-sandbox']});
 const ctx=await browser.newContext({acceptDownloads:true,viewport:{width:1440,height:1000}});await ctx.addInitScript(()=>{try{Object.defineProperty(navigator,'share',{value:undefined,configurable:true});}catch{}});const page=await ctx.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
 const url=process.env.BASE_URL||'http://localhost:8091';
 await page.goto(url);await page.waitForSelector('[data-action="new"]');
 assert.equal(await page.locator('.welcome-card').count(),1);
 await page.locator('[data-route="overview"]').click();await page.waitForSelector('.dashboard-hero');
 await page.locator('[data-action="demo"]').first().click();await page.waitForSelector('.metric-card strong');
 assert.equal(await page.locator('.metric-card').count(),3);
 await page.locator('[data-route="products"]').first().click();await page.waitForSelector('.scenario-panel');
 assert.equal(await page.locator('.scenario').count(),4);
 let event=page.waitForEvent('download');await page.locator('[data-action="share-pdf"]').click();assert.match((await event).suggestedFilename(),/ArgonCakeCalc-/);
 event=page.waitForEvent('download');await page.locator('[data-action="share-shopping"]').click();assert.match((await event).suggestedFilename(),/shopping/);
 assert.deepEqual(errors,[]);console.log('PASS: overview onboarding, demo, scenarios and share/download flows.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
