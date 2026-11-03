/* Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
 * https://github.com/Argonstudio/ArgonCakeCalc — preserve attribution (section 7 of the Commercial Source-Available License). */
/* Protocol-only adapter. All expected values are produced by Python Fraction. */
const fs=require('node:fs'),C=require('../assets/core.js');
const batches=JSON.parse(fs.readFileSync(0,'utf8'));
const ratio=v=>v===null?null:v.toRatio();
const out=batches.map(db=>{const e=new C.Engine(db);return{
 materials:db.materials.map(m=>ratio(e.material(m.id).unitCost)),
 recipes:db.recipes.map(r=>{const a=e.recipe(r.id);return{cost:ratio(a.cost),net:ratio(a.net),unitCost:ratio(a.unitCost)};}),
 products:db.products.map(p=>{const r=e.product(p.id),a={};for(const key of ['material','loss','extras','full','sale','profit','markup','margin','perKg','perPortion'])a[key]=ratio(r[key]);a.flat=e.flatten(p).map(l=>({id:l.material.id,unit:l.unit,qty:ratio(l.qty),cost:ratio(l.cost),packages:ratio(l.packages),mass:ratio(l.mass),volume:ratio(l.volume)}));return a;})};});
process.stdout.write(JSON.stringify(out));
