/* Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
 * https://github.com/Argonstudio/ArgonCakeCalc — preserve attribution (section 7 of the Commercial Source-Available License). */
// These business regressions explicitly exercise Russian validation text.
require('../assets/i18n.js').language='ru';
const assert=require('node:assert/strict'),C=require('../assets/core.js');
let n=0;function test(name,fn){fn();n++;console.log('OK',name);}const eq=(a,b)=>assert.equal(String(a),b);
function f(pack='6',output='6'){
 const db=C.emptyDB(),m={...C.newMaterial(),name:'Мука',packQty:pack,unit:'g',price:'60'},r={...C.newRecipe(),outputQty:output},p=C.newProduct();
 const line=(ref,qty,type='recipe',scaling='proportional')=>({id:C.uid(),type,ref,qty,unit:'g',role:'ingredient',scaling});
 r.components=[line(m.id,pack,'material')];p.components=['4','1','1'].map(q=>line(r.id,q));db.materials=[m];db.recipes=[r];db.products=[p];return{db,m,r,p,line};
}
test('review reproduction: 4/6 + 1/6 + 1/6 = 1 package exactly',()=>{const{db,p}=f();const a=new C.Engine(db).flatten(p)[0];eq(a.qty,'6');eq(a.packages,'1');eq(a.cost,'60');});
test('700g yield split into three uses: 400 + 200 + 100',()=>{const{db,p,r,line}=f('700','700');p.components=['400','200','100'].map(q=>line(r.id,q));const a=new C.Engine(db).flatten(p)[0];eq(a.qty,'700');eq(a.packages,'1');});
test('real excess of 1e-9 g must require a second package',()=>{const{db,p,m,line}=f();p.components=[line(m.id,'6.000000001','material')];eq(new C.Engine(db).flatten(p)[0].packages,'2');});
test('real excess of 1e-12 g must also require a second package',()=>{const{db,p,m,line}=f();p.components=[line(m.id,'6.000000000001','material')];eq(new C.Engine(db).flatten(p)[0].packages,'2');});
test('repeating conversions cannot add a package',()=>{const{db,p,r,line}=f('6','6');db.materials[0].unit='ml';db.materials[0].density='1.2';r.components[0].unit='ml';r.outputUnit='g';p.components=['4','1','1'].map(q=>line(r.id,q));eq(new C.Engine(db).flatten(p)[0].packages,'1');});
test('piece scaling: six pieces for output6 -> output4 gives four, not five',()=>{const{r,m,line}=f();r.components=[line(m.id,'6','material','pieces')];eq(C.scaleEntity(r,{mode:'weight',target:'4'}).components[0].qty,'4');});
test('piece scaling retains true fractional excess',()=>{const{r,m,line}=f();r.components=[line(m.id,'6','material','pieces')];eq(C.scaleEntity(r,{mode:'weight',target:'4.000000001'}).components[0].qty,'5');});
test('round form ratio 3->2: nine pieces times4/9 = four',()=>{const{p,m,line}=f();p.cake.tiers[0].size='3';p.components=[line(m.id,'9','material','pieces')];eq(C.scaleEntity(p,{mode:'diameter',diameter:'2'}).components[0].qty,'4');});
test('price must not accumulate rounding across 3000 rows',()=>{const{db,p,m,r,line}=f();m.price='1000000000';p.components=Array.from({length:1000},()=>['4','1','1'].map(q=>line(r.id,q))).flat();const e=new C.Engine(db);eq(e.product(p.id).full,'1000000000000');eq(e.flatten(p)[0].packages,'1000');});
test('division followed by multiplication is exact internally',()=>eq(C.D(1).div(7).mul(7),'1'));
test('no double rounding at a half-cent boundary',()=>eq(C.D('0.004999999999').add(C.D('0.000000000001').div(3)).round(2),'0'));
test('quote unit cost retains exact repeating fraction',()=>{const{db,r}=f();r.outputQty='7';const q=new C.Engine(db).recipe(r.id);eq(q.unitCost.mul(7),'60');});
test('new format rejects count inconsistent with tier data',()=>{const{db,p}=f();p.cake.count=5;assert.throws(()=>C.validateDB(db),/не совпадает/);});
test('planned count and real count can intentionally differ',()=>{const{db,p}=f();p.cake.targetCount=5;C.validateDB(db);eq(p.cake.count,'1');});
test('v1 migration preserves planned count and physical tiers',()=>{const{db,p}=f();db.formatVersion=1;p.cake.count=5;delete p.cake.targetCount;const migrated=C.migrate(db);eq(migrated.formatVersion,'2');eq(migrated.products[0].cake.count,'1');eq(migrated.products[0].cake.targetCount,'5');eq(p.cake.count,'5');});
test('corrupt v2 JSON is rejected, not silently normalized',()=>{const{db,p}=f();p.cake.count=2;assert.throws(()=>C.migrate(db),/не совпадает/);});
console.log(`${n} review regression tests passed`);
