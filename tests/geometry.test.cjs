/* Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
 * https://github.com/Argonstudio/ArgonCakeCalc — preserve attribution (section 7 of the Commercial Source-Available License). */
// These business regressions explicitly exercise Russian validation text.
require('../assets/i18n.js').language='ru';
const assert = require('node:assert/strict');
const M = require('../assets/geometry.js');
let checks = 0;
function test(name, fn) { fn(); checks++; console.log('OK', name); }
const opts = {grams:5000, count:3, height:8, margin:4, density:.75, shape:'round'};
test('round volume', () => assert.ok(Math.abs(M.volume({size:20,height:10},'round')-1000*Math.PI)<1e-9));
test('square volume', () => assert.equal(M.volume({size:20,height:10},'square'),4000));
for (const shape of ['round','square']) for (const count of [1,3,6,14]) {
 test(`${shape}, ${count} tiers: target, ordering, ledges`, () => {
   const p = {...opts, grams:count===14?100000:20000, count, shape, margin:2};
   const tiers = M.solve(p), totals = M.totals(tiers, shape, p.density, 150);
   assert.equal(tiers.length, count); assert.ok(Math.abs(totals.grams-p.grams)/p.grams < .02);
   assert.equal(totals.height, count * 8);
   tiers.slice(1).forEach((t,i) => assert.ok(Math.abs(tiers[i].size - t.size - 4)<1e-9));
 });
}
test('margin changes dimensions not height', () => {
 const a=M.solve(opts), b=M.solve({...opts,margin:2});
 assert.notEqual(a[0].size,b[0].size);
 assert.equal(M.totals(a,'round',.75,150).height,M.totals(b,'round',.75,150).height);
});
test('square uses different size solution', () => assert.ok(M.solve({...opts,shape:'square'})[0].size < M.solve(opts)[0].size));
test('infeasible target rejected', () => assert.throws(() => M.solve({...opts,count:14}),/минимальный вес/));
test('zero/NaN rejected', () => {
 for(const key of ['grams','height','density']) for(const value of [0,-1,NaN,Infinity]) assert.throws(()=>M.solve({...opts,[key]:value}));
});
test('edit ledge moves upper tiers, retains heights and lower size', () => {
 const a=M.solve(opts), b=M.changeLedge(a,1,2);
 assert.equal(b[0].size,a[0].size);assert.equal(M.ledge(b,1),2);assert.equal(M.ledge(b,2),M.ledge(a,2));
 assert.deepEqual(a.map(t=>t.height),b.map(t=>t.height));
});
test('impossible ledge rejected without mutation', () => {
 const a=M.solve(opts), original=JSON.stringify(a);assert.throws(()=>M.changeLedge(a,1,200));assert.equal(JSON.stringify(a),original);
});
test('portion count floors', () => assert.equal(M.totals([{size:10,height:1}], 'square', 1, 150).portions,0));
console.log(`${checks} tests passed`);
