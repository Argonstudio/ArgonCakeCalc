/* Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),I=require('../assets/i18n.js');
const ru=JSON.parse(fs.readFileSync(path.join(__dirname,'../locales/ru.json'),'utf8'));let checks=0;
for(const lang of Object.keys(I.languages)){
 I.language=lang;delete require.cache[require.resolve('../assets/core.js')];const C=require('../assets/core.js');
 const d=C.emptyDB();assert.equal(d.settings.currency,I.languages[lang].currency);assert.equal(d.settings.locale,I.languages[lang].locale);C.validateDB(d);assert.deepEqual(d.categories,['Ingredients','Decorations','Packaging','Consumables','Other']);checks+=4;
 for(const currency of I.currencies){d.settings.currency=currency;C.validateDB(d);checks++;}
 for(const locale of I.locales){d.settings.locale=locale;C.validateDB(d);checks++;}
 for(const key of Object.keys(ru)){const text=I.t(key);assert.equal(typeof text,'string');if(lang!=='ru')assert(!/[А-Яа-яЁё]/.test(text),`${lang}: ${key} -> ${text}`);checks++;}
 const sentinel='Сахар <script>prompt(1)</script> 名称';assert.equal(I.t.l`Название: ${sentinel}`,I.t('Название: ')+sentinel);checks++;
 assert.throws(()=>C.convert('1','pcs','g'),e=>!e.message.includes('Штуки')||lang==='ru');checks++;
 const m={...C.newMaterial(),price:'100',packQty:'1',unit:'kg'};d.materials=[m];assert.equal(new C.Engine(d).material(m.id).unitCost.toString(),'0.1');checks++;
 assert.equal(I.missing.size,0,[...I.missing].join('\n'));checks++;
}
I.language='ru';console.log(`PASS: ${checks} locale/catalog/default/currency/decimal checks across 9 languages; dynamic user text unchanged.`);
