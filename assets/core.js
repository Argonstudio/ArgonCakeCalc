/* Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
 * https://argon-studio.ru/ | https://github.com/Argonstudio/ArgonCakeCalc
 * Preserve author/origin attribution under section 7 of the Commercial Source-Available License; see ADDITIONAL_TERMS.md. */
/* ArgonCakeCalc 1.0.0 — ARGONCAKECALC-COMMERCIAL-1.0. Pure business logic; no DOM or storage dependencies. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CakeCore=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';
const CakeI18n=globalThis.CakeI18n||(typeof require==='function'?require('./i18n.js'):null),T=CakeI18n.t;

const SCALE=1000000000000n; // Display precision, NOT a rounding boundary for calculations.
function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b){const t=a%b;a=b;b=t;}return a||1n;}
function divRound(a,b){if(!b)throw Error(T("Деление на ноль."));const neg=(a<0n)!==(b<0n);a=a<0n?-a:a;b=b<0n?-b:b;let q=a/b;if((a%b)*2n>=b)q++;return neg?-q:q;}
class Dec{
 constructor(v=0,raw=false){
  if(v instanceof Dec){this.p=v.p;this.q=v.q;return;}
  if(raw){this.p=v;this.q=SCALE;this.normalize();return;}
  let s=String(v).trim().replace(',','.').replace(/^([+-]?)\./,'$10.');
  if(!/^[+-]?\d+(\.\d{0,12})?$/.test(s))throw Error(T("Ожидается десятичное число (до 12 знаков после запятой)."));
  const neg=s[0]==='-';s=s.replace(/^[+-]/,'');const[a,b='']=s.split('.');this.p=BigInt(a+b);if(neg)this.p=-this.p;this.q=10n**BigInt(b.length);this.normalize();
 }
 normalize(){if(!this.q)throw Error(T("Деление на ноль."));if(this.q<0n){this.p=-this.p;this.q=-this.q;}const g=gcd(this.p,this.q);this.p/=g;this.q/=g;return this;}
 static ratio(p,q){const v=Object.create(Dec.prototype);v.p=p;v.q=q;return v.normalize();}
 static raw(n){return new Dec(n,true);}
 add(v){v=D(v);const g=gcd(this.q,v.q);return Dec.ratio(this.p*(v.q/g)+v.p*(this.q/g),(this.q/g)*v.q);}
 sub(v){v=D(v);return this.add(Dec.ratio(-v.p,v.q));}
 mul(v){v=D(v);const a=gcd(this.p,v.q),b=gcd(v.p,this.q);return Dec.ratio((this.p/a)*(v.p/b),(this.q/b)*(v.q/a));}
 div(v){v=D(v);if(!v.p)throw Error(T("Деление на ноль."));return this.mul(Dec.ratio(v.q,v.p));}
 cmp(v){v=D(v);const a=this.p*v.q,b=v.p*this.q;return a<b?-1:a>b?1:0;}
 round(d=2){if(!Number.isInteger(d)||d<0||d>12)throw Error(T("Точность округления: 0–12."));const k=10n**BigInt(d);return Dec.ratio(divRound(this.p*k,this.q),k);}
 ceil(d=0){if(!Number.isInteger(d)||d<0||d>12)throw Error(T("Точность округления: 0–12."));const k=10n**BigInt(d),n=this.p*k;return Dec.ratio(n/this.q+(n>0n&&n%this.q?1n:0n),k);}
 toString(){let n=divRound(this.p*SCALE,this.q),neg=n<0n;if(neg)n=-n;const frac=String(n%SCALE).padStart(12,'0').replace(/0+$/,'');return(neg?'-':'')+String(n/SCALE)+(frac?'.'+frac:'');}
 toNumber(){return Number(this.toString());}
 toJSON(){return this.toString();}
 toRatio(){return{numerator:String(this.p),denominator:String(this.q)};}
}
const D=v=>v instanceof Dec?v:new Dec(v), sum=arr=>arr.reduce((a,v)=>a.add(v),D(0));
const UNITS={g:{dim:'mass',factor:'1',label:T("г")},kg:{dim:'mass',factor:'1000',label:T("кг")},ml:{dim:'volume',factor:'1',label:T("мл")},l:{dim:'volume',factor:'1000',label:T("л")},pcs:{dim:'piece',factor:'1',label:T("шт")}};
const DEFAULT_CATEGORIES=['Ingredients','Decorations','Packaging','Consumables','Other'];
const ROLES={ingredient:T("Ингредиент"),cake:T("Коржи"),filling:T("Начинка"),cream:T("Крем"),soak:T("Пропитка"),coating:T("Покрытие"),decor:T("Декор"),packaging:T("Упаковка"),consumable:T("Расходники"),other:T("Прочее")};
const SCALING={proportional:T("Пропорционально"),surface:T("По поверхности"),fixed:T("Не менять"),pieces:T("Пропорц., округлить ↑")};
const uid=()=>globalThis.crypto?.randomUUID?.()||'id-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
function emptyDB(){return{app:'CakeCalc',formatVersion:2,materials:[],recipes:[],products:[],categories:[...DEFAULT_CATEGORIES],settings:{...CakeI18n.defaultSettings()},exportedAt:null};}
function amount(q,name,min='0',exclusive=false,max='1000000000'){
 let v;try{v=D(q);}catch{throw Error(T.l`${name}: введите десятичное число.`);}if(v.cmp(min)<0||(exclusive&&v.cmp(min)===0)||v.cmp(max)>0)throw Error(T.l`${name}: значение должно быть ${exclusive?T("больше"):T("не меньше")} ${min} и не больше ${max}.`);return v;
}
function convert(q,from,to,density=''){
 if(!UNITS[from]||!UNITS[to])throw Error(T("Неизвестная единица измерения."));let value=D(q).mul(UNITS[from].factor),a=UNITS[from].dim,b=UNITS[to].dim;
 if(a!==b){if(a==='piece'||b==='piece')throw Error(T("Штуки нельзя преобразовать в массу или объём."));if(density===''||density===null||density===undefined)throw Error(T("Для перевода массы в объём нужна плотность, г/мл."));const rho=amount(density,T("Плотность"),'0',true);value=a==='volume'?value.mul(rho):value.div(rho);}
 return value.div(UNITS[to].factor);
}
function netOutput(r){return D(r.outputQty).mul(D(1).sub(D(r.loss||'0').div(100)));}
function object(o,name){if(!o||typeof o!=='object'||Array.isArray(o))throw Error(T.l`${name}: неверный объект.`);}
function text(s,name,required=false,max=100000){if(typeof s!=='string'||s.length>max||(required&&!s.trim()))throw Error(T.l`${name}: некорректный текст${required?T(" или пустое значение"):''}.`);}
function validateDB(db){
 object(db,T("База"));if(db.app!=='CakeCalc'||db.formatVersion!==2)throw Error(T("Несовместимый формат базы. Поддерживается ArgonCakeCalc, версия 2."));
 for(const k of ['materials','recipes','products','categories'])if(!Array.isArray(db[k]))throw Error(T.l`Отсутствует массив ${k}.`);
 if(!db.categories.length)throw Error(T("Нужна хотя бы одна категория материалов."));db.categories.forEach(x=>text(x,T("Категория"),true,200));if(new Set(db.categories).size!==db.categories.length)throw Error(T("Повторяющиеся категории."));
 object(db.settings,T("Настройки"));if(!CakeI18n.currencies.includes(db.settings.currency))throw Error(T("Неизвестная валюта."));if(!CakeI18n.locales.includes(db.settings.locale))throw Error(T("Неверный формат чисел."));
 const ids=new Set();for(const row of [...db.materials,...db.recipes,...db.products]){object(row,T("Запись"));text(row.id,'ID',true,200);if(ids.has(row.id))throw Error(T("Повторяющийся ID записи."));ids.add(row.id);text(row.name,T("Название"),true,300);text(row.description??'',T("Описание"));}
 const materials=new Map(db.materials.map(x=>[x.id,x])),recipes=new Map(db.recipes.map(x=>[x.id,x]));
 for(const m of db.materials){if(!db.categories.includes(m.category))throw Error(T.l`${m.name}: неизвестная категория.`);if(!UNITS[m.unit])throw Error(T.l`${m.name}: неверная единица.`);amount(m.price,T.l`${m.name}: цена`);amount(m.packQty,T.l`${m.name}: упаковка`,'0',true);if(m.density)amount(m.density,T.l`${m.name}: плотность`,'0',true);if(typeof m.priceUpdated!=='string'||(!/^\d{4}-\d{2}-\d{2}$/.test(m.priceUpdated)||Number.isNaN(Date.parse(m.priceUpdated+'T00:00:00Z'))||new Date(m.priceUpdated+'T00:00:00Z').toISOString().slice(0,10)!==m.priceUpdated))throw Error(T.l`${m.name}: укажите дату цены.`);}
 for(const row of [...db.recipes,...db.products]){
  amount(row.outputQty,T.l`${row.name}: выход`,'0',true);if(!UNITS[row.outputUnit])throw Error(T.l`${row.name}: единица выхода неверна.`);if(row.density)amount(row.density,T.l`${row.name}: плотность`,'0',true);text(row.instructions??'',T("Инструкция"));
  if(!Array.isArray(row.components))throw Error(T.l`${row.name}: отсутствует состав.`);
  const lineIDs=new Set();for(const c of row.components){object(c,T("Строка состава"));text(c.id,T("ID строки"),true,200);if(lineIDs.has(c.id))throw Error(T("Повторяющийся ID строки."));lineIDs.add(c.id);if(!['material','recipe'].includes(c.type))throw Error(T("Неверный тип компонента."));const source=(c.type==='material'?materials:recipes).get(c.ref);if(!source)throw Error(T.l`${row.name}: компонент не найден.`);amount(c.qty,T.l`${row.name} / ${source.name}: количество`,'0',true);if(!UNITS[c.unit])throw Error(T("Неверная единица компонента."));convert(c.qty,c.unit,c.type==='material'?source.unit:source.outputUnit,source.density);if(!ROLES[c.role]||!SCALING[c.scaling])throw Error(T("Неверная роль или правило масштабирования."));}
 }
 for(const r of db.recipes){amount(r.loss??'0',T.l`${r.name}: потери`,'0',false,'99.99');if(netOutput(r).round(12).cmp(0)<=0)throw Error(T.l`${r.name}: выход после потерь слишком мал для точности расчёта.`);}
 for(const p of db.products){text(p.category??'',T("Категория изделия"),false,200);amount(p.portions??'1',T("Порции"),'1',false,'1000000');if(!Number.isInteger(Number(p.portions)))throw Error(T("Количество порций должно быть целым."));object(p.cake,T("Геометрия"));if(!['round','square'].includes(p.cake.shape))throw Error(T("Неверная форма торта."));amount(p.cake.density,T("Плотность торта"),'0',true);amount(p.cake.height,T("Высота яруса"),'0',true,'1000');amount(p.cake.margin,T("Отступ"),'0',false,'500');if(p.cake.targetCount!==undefined&&(!Number.isInteger(p.cake.targetCount)||p.cake.targetCount<1||p.cake.targetCount>14))throw Error(T("План подбора: нужно 1–14 ярусов."));if(!Number.isInteger(p.cake.count)||p.cake.count<1||p.cake.count>14)throw Error(T("Нужно 1–14 ярусов."));amount(p.cake.layers,T("Количество коржей"),'1',false,'1000');if(!Number.isInteger(Number(p.cake.layers)))throw Error(T("Количество коржей — целое число."));if(!Array.isArray(p.cake.tiers)||p.cake.tiers.length<1||p.cake.tiers.length>14)throw Error(T("Некорректный список ярусов."));if(p.cake.count!==p.cake.tiers.length)throw Error(T("Количество ярусов не совпадает со списком размеров."));for(const t of p.cake.tiers){amount(t.size,T("Размер яруса"),'0',true,'1000');amount(t.height,T("Высота яруса"),'0',true,'1000');}
  object(p.pricing,T("Калькуляция"));if(!['markup','margin'].includes(p.pricing.mode))throw Error(T("Неизвестный способ расчёта цены."));amount(p.pricing.rate,T("Процент"),'0',false,p.pricing.mode==='margin'?'99.99':'10000');amount(p.pricing.loss,T("Дополнительные потери"),'0',false,'99.99');amount(p.pricing.desiredProfit,T("Желаемая прибыль"));for(const k of ['labor','energy','other']){object(p.pricing[k],T("Расходы"));if(typeof p.pricing[k].enabled!=='boolean')throw Error(T("Неверный переключатель расходов."));amount(p.pricing[k].amount,T("Дополнительные расходы"));}if(typeof p.pricing.lossEnabled!=='boolean'||typeof p.pricing.profitEnabled!=='boolean')throw Error(T("Неверный переключатель калькуляции."));
 }
 const order=topological(db.recipes);return{materials,recipes,order};
}
function topological(recipes){
 const nodes=new Map(recipes.map(r=>[r.id,r])),degree=new Map(),parents=new Map();
 for(const r of recipes){const dependencies=new Set(r.components.filter(c=>c.type==='recipe').map(c=>c.ref));degree.set(r.id,dependencies.size);for(const id of dependencies){if(!nodes.has(id))throw Error(T("Вложенный рецепт не найден."));if(!parents.has(id))parents.set(id,[]);parents.get(id).push(r.id);}}
 const queue=recipes.filter(r=>!degree.get(r.id)).map(r=>r.id),order=[];for(let i=0;i<queue.length;i++){const id=queue[i];order.push(id);for(const p of parents.get(id)||[]){degree.set(p,degree.get(p)-1);if(!degree.get(p))queue.push(p);}}
 if(order.length!==recipes.length)throw Error(T("Циклическая зависимость рецептов: рецепт не может содержать сам себя прямо или через другие рецепты."));return order;
}
class Engine{
 constructor(db){this.db=db;const v=validateDB(db);this.materials=v.materials;this.recipes=v.recipes;this.order=v.order;this.recipeCosts=new Map();this.productCache=new Map();for(const id of this.order){const r=this.recipes.get(id);this.recipeCosts.set(id,sum(r.components.map(c=>this.lineCost(c))));}}
 source(c){const s=(c.type==='material'?this.materials:this.recipes).get(c.ref);if(!s)throw Error(T("Компонент удалён."));return s;}
 sourceAmount(c){const s=this.source(c);return convert(c.qty,c.unit,c.type==='material'?s.unit:s.outputUnit,s.density);}
 lineCost(c){const s=this.source(c),q=this.sourceAmount(c);return c.type==='material'?q.div(s.packQty).mul(s.price):q.div(netOutput(s)).mul(this.recipeCosts.get(s.id));}
 recipe(id){const r=this.recipes.get(id);return{cost:this.recipeCosts.get(id),net:netOutput(r),unitCost:this.recipeCosts.get(id).div(netOutput(r))};}
 material(id){const m=this.materials.get(id),base=UNITS[m.unit].dim==='mass'?'g':UNITS[m.unit].dim==='volume'?'ml':'pcs';return{base,unitCost:D(m.price).div(convert(m.packQty,m.unit,base,m.density))};}
 product(id){if(this.productCache.has(id))return this.productCache.get(id);const p=this.db.products.find(p=>p.id===id);const material=sum(p.components.map(c=>this.lineCost(c))),pricing=p.pricing;
  const loss=pricing.lossEnabled?material.div(D(1).sub(D(pricing.loss).div(100))).sub(material):D(0);
  const extras=sum(['labor','energy','other'].map(k=>pricing[k].enabled?pricing[k].amount:0));const full=material.add(loss).add(extras).round(2);
  let sale=pricing.mode==='markup'?full.mul(D(1).add(D(pricing.rate).div(100))):full.div(D(1).sub(D(pricing.rate).div(100)));
  if(pricing.profitEnabled&&full.add(pricing.desiredProfit).cmp(sale)>0)sale=full.add(pricing.desiredProfit);sale=sale.ceil(2);const profit=sale.sub(full);
  let mass=null;try{mass=convert(p.outputQty,p.outputUnit,'g',p.density);}catch{}
  const r={material,loss,extras,full,sale,profit,markup:full.cmp(0)>0?profit.div(full).mul(100):null,margin:sale.cmp(0)>0?profit.div(sale).mul(100):null,perKg:mass&&mass.cmp(0)>0?full.div(mass).mul(1000):null,perPortion:full.div(p.portions)};this.productCache.set(id,r);return r;
 }
 flatten(entity){
  // Iterative DAG propagation: no recursive call-stack limit, shared paths are aggregated.
  const leaves=new Map(),factors=new Map();const add=(map,id,v)=>map.set(id,(map.get(id)||D(0)).add(v));
  const feed=(c,mult)=>{const s=this.source(c),qty=this.sourceAmount(c).mul(mult);if(c.type==='material')add(leaves,s.id,qty);else add(factors,s.id,qty.div(netOutput(s)));};
  entity.components.forEach(c=>feed(c,D(1)));for(let i=this.order.length-1;i>=0;i--){const id=this.order[i],f=factors.get(id);if(f)this.recipes.get(id).components.forEach(c=>feed(c,f));}
  return [...leaves].map(([id,qty])=>{const m=this.materials.get(id),base=this.material(id).base,baseQty=convert(qty,m.unit,base,m.density);let volume=null,mass=null;try{volume=convert(qty,m.unit,'ml',m.density);}catch{}try{mass=convert(qty,m.unit,'g',m.density);}catch{}
   return{material:m,qty:baseQty,unit:base,cost:qty.div(m.packQty).mul(m.price),packages:qty.div(m.packQty).ceil(),mass,volume};});
 }
}
function referencedBy(db,type,id){const result=[];for(const row of [...db.recipes,...db.products])if(row.components.some(c=>c.type===type&&c.ref===id))result.push(row.name);return result;}
function scaleEntity(entity,{mode,target,diameter,height}){
 const e=JSON.parse(JSON.stringify(entity));let factor,surfaceFactor;
 if(mode==='weight'){factor=amount(target,T("Новый выход"),'0',true).div(e.outputQty);surfaceFactor=D(String(Math.pow(factor.toNumber(),2/3).toFixed(12)));}
 else if(mode==='diameter'){
  if(!e.cake||e.cake.shape!=='round')throw Error(T("Пересчёт диаметра доступен только для круглого торта."));const old=D(e.cake.tiers[0].size),newSize=amount(diameter,T("Новый диаметр"),'0',true,'1000'),ratio=newSize.div(old),h=height?amount(height,T("Новая высота"),'0',true,'1000'):D(e.cake.tiers[0].height),hr=h.div(e.cake.tiers[0].height);
  factor=ratio.mul(ratio).mul(hr);const topArea=old.mul(old).div(4),sideArea=sum(e.cake.tiers.map(t=>D(t.size).mul(t.height)));const oldSurface=topArea.add(sideArea),newSurface=topArea.mul(ratio).mul(ratio).add(sideArea.mul(ratio).mul(hr));surfaceFactor=newSurface.div(oldSurface);
  e.cake.tiers=e.cake.tiers.map(t=>({size:D(t.size).mul(ratio).round(3).toString(),height:D(t.height).mul(hr).round(3).toString()}));e.cake.height=D(e.cake.height).mul(hr).round(3).toString();e.cake.margin=D(e.cake.margin).mul(ratio).round(3).toString();
 }else throw Error(T("Неизвестный режим масштабирования."));
 e.components=e.components.map(c=>{let q=D(c.qty);if(c.scaling!=='fixed')q=q.mul(c.scaling==='surface'?surfaceFactor:factor);if(c.scaling==='pieces')q=q.ceil();return{...c,qty:q.round(6).toString()};});
 e.outputQty=D(e.outputQty).mul(factor).round(6).toString();if(e.portions)e.portions=D(e.portions).mul(factor).ceil().toString();
 if(mode==='weight'&&e.cake){const ratio=D(String(Math.cbrt(factor.toNumber()).toFixed(12)));e.cake.tiers=e.cake.tiers.map(t=>({size:D(t.size).mul(ratio).round(3).toString(),height:D(t.height).mul(ratio).round(3).toString()}));e.cake.height=D(e.cake.height).mul(ratio).round(3).toString();e.cake.margin=D(e.cake.margin).mul(ratio).round(3).toString();}
 return e;
}
function newMaterial(category=DEFAULT_CATEGORIES[0]){return{id:uid(),name:T("Новый материал"),description:'',category,price:'0',packQty:'1',unit:'kg',density:'',priceUpdated:new Date().toISOString().slice(0,10)};}
function newRecipe(){return{id:uid(),name:T("Новый рецепт"),description:'',instructions:'',outputQty:'1000',outputUnit:'g',loss:'0',density:'',components:[]};}
function newProduct(){return{id:uid(),name:T("Новое изделие"),category:T("Торты"),description:'',instructions:'',outputQty:'1000',outputUnit:'g',density:'',portions:'8',components:[],cake:{shape:'round',count:1,targetCount:1,height:'8',margin:'4',density:'0.75',layers:'3',tiers:[{size:'20',height:'8'}]},pricing:{mode:'markup',rate:'50',loss:'0',lossEnabled:false,labor:{enabled:false,amount:'0'},energy:{enabled:false,amount:'0'},other:{enabled:false,amount:'0'},desiredProfit:'0',profitEnabled:false}};}
const FORMAT_VERSION=2;
const MIGRATIONS=new Map([[1, old=>{const next=JSON.parse(JSON.stringify(old));if(!Array.isArray(next.products))throw Error(T("Некорректный список изделий."));for(const p of next.products){if(!p.cake||!Number.isInteger(p.cake.count)||p.cake.count<1||p.cake.count>14||!Array.isArray(p.cake.tiers))throw Error(T("Некорректная геометрия старой копии."));p.cake.targetCount=p.cake.count;p.cake.count=p.cake.tiers.length;}next.formatVersion=2;return next;}]]); // key: source version; value: pure function returning next version.
function migrate(raw){
 object(raw,T("Импорт"));if(raw.app!=='CakeCalc')throw Error(T("Это не резервная копия ArgonCakeCalc."));
 if(!Number.isInteger(raw.formatVersion)||raw.formatVersion>FORMAT_VERSION||raw.formatVersion<1)throw Error(T("Версия резервной копии не поддерживается."));
 let value=JSON.parse(JSON.stringify(raw));
 while(value.formatVersion<FORMAT_VERSION){const from=value.formatVersion,step=MIGRATIONS.get(from);if(!step)throw Error(T("Для этой версии нет безопасной миграции. Используйте соответствующую версию ArgonCakeCalc."));value=step(value);if(value.formatVersion!==from+1)throw Error(T("Миграция не повысила версию формата."));}
 validateDB(value);return value;
}
return{FORMAT_VERSION,Dec,D,sum,UNITS,ROLES,SCALING,DEFAULT_CATEGORIES,uid,emptyDB,convert,netOutput,validateDB,topological,Engine,referencedBy,scaleEntity,newMaterial,newRecipe,newProduct,migrate,amount};
});
