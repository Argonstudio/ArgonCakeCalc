/* Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
 * https://argon-studio.ru/ | https://github.com/Argonstudio/ArgonCakeCalc
 * Preserve author/origin attribution under section 7 of the Commercial Source-Available License; see ADDITIONAL_TERMS.md. */
/* SPDX-License-Identifier: ARGONCAKECALC-COMMERCIAL-1.0
 * Copyright (C) 2026 Ivan Voitkov. https://github.com/Argonstudio/ArgonCakeCalc
 * Static translations only: never pass user data to t() or its template chunks.
 */
(function(root){'use strict';
const catalogs=root.ArgonLocales||(typeof require==='function'?require('./locales.js'):{});
const languages={en:{name:'English',locale:'en-US',currency:'USD'},ru:{name:'Русский',locale:'ru-RU',currency:'RUB'},fr:{name:'Français',locale:'fr-FR',currency:'EUR'},de:{name:'Deutsch',locale:'de-DE',currency:'EUR'},nb:{name:'Norsk bokmål',locale:'nb-NO',currency:'NOK'},es:{name:'Español',locale:'es-ES',currency:'EUR'},it:{name:'Italiano',locale:'it-IT',currency:'EUR'},zh:{name:'简体中文',locale:'zh-CN',currency:'CNY'},ja:{name:'日本語',locale:'ja-JP',currency:'JPY'}};
const key='argon-cakecalc-language';let language='en';
if(typeof document!=='undefined'){let saved;try{saved=localStorage.getItem(key);}catch{}language=languages[saved]?saved:'en';}
const missing=new Set();
function t(source){source=String(source);if(language==='ru')return source;
 // Split ONLY source-code literals, preserving HTML punctuation and whitespace.
 return source.split(/([<>"'\n\r])/).map(part=>{const core=part.trim();if(!/[\u0400-\u04ff]/.test(core))return part;const value=catalogs[language]?.[core];if(value===undefined){missing.add(core);return part;}return part.replace(core,value);}).join('');}
t.l=(strings,...values)=>strings.reduce((text,chunk,i)=>text+t(chunk)+(i<values.length?values[i]:''),'');
const routeSources={overview:['Обзор','Быстрый доступ к материалам, рецептам и последним расчётам.'],materials:['Материалы','Ваши закупочные цены — основа каждой калькуляции.'],recipes:['Рецепты и компоненты','Собирайте базовые рецепты и используйте их снова.'],products:['Конструктор изделий','От состава и размеров — к готовому изделию.'],costs:['Калькуляция стоимости','Знайте себестоимость, прибыль и цену каждого изделия.'],settings:['Настройки и резервные копии','Ваши данные под вашим контролем.']};
const api={languages,key,t,missing,catalogs,currencies:['USD','EUR','RUB','NOK','CNY','JPY','GBP','CHF','CAD','AUD','KZT','BYN','UAH'],locales:Object.values(languages).map(x=>x.locale),
 get language(){return language;},set language(value){if(!languages[value])throw Error('Unsupported interface language');language=value;},
 get routes(){return Object.fromEntries(Object.entries(routeSources).map(([k,v])=>[k,v.map(t)]));},
 defaultSettings(){return{currency:languages[language].currency,locale:languages[language].locale};},
 currencyOptions(){const names=new Intl.DisplayNames([languages[language].locale],{type:'currency'});return this.currencies.map(c=>[c,`${names.of(c)} · ${c}`]);},
 numberOptions(){return Object.values(languages).map(x=>[x.locale,`${x.locale} · ${new Intl.NumberFormat(x.locale,{minimumFractionDigits:2}).format(1234.56)}`]);},
 hydrate(){document.documentElement.lang=language;document.title=t(document.title);const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode()){if(!node.parentElement?.closest('[data-brand]')&&!['SCRIPT','STYLE','NOSCRIPT'].includes(node.parentElement?.tagName))node.textContent=t(node.textContent);}for(const el of document.querySelectorAll('[aria-label],[placeholder],meta[name="description"]'))for(const attr of ['aria-label','placeholder','content'])if(el.hasAttribute(attr))el.setAttribute(attr,t(el.getAttribute(attr)));const select=document.querySelector('#language-select');if(select){for(const [code,item]of Object.entries(languages)){const option=document.createElement('option');option.value=code;option.textContent=item.name;option.selected=code===language;select.append(option);}}}
};root.CakeI18n=api;if(typeof module==='object'&&module.exports)module.exports=api;
})(globalThis);
