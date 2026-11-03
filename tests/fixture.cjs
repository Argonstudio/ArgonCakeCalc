/* Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
 * https://github.com/Argonstudio/ArgonCakeCalc — preserve attribution (section 7 of the Commercial Source-Available License). */
const C=require('../assets/core.js');
function fixture(){const db=C.emptyDB();const sugar={...C.newMaterial(),name:'Сахар',price:'100',packQty:'1',unit:'kg'};const box={...C.newMaterial('Packaging'),name:'Коробка',price:'10',packQty:'1',unit:'pcs'};
 const line=(s,qty,unit,type='material',scaling='proportional')=>({id:C.uid(),type,ref:s.id,qty,unit,role:type==='recipe'?'cream':s===box?'packaging':'ingredient',scaling});
 const a={...C.newRecipe(),name:'Крем А',outputQty:'500',loss:'20',components:[line(sugar,'500','g')]};const b={...C.newRecipe(),name:'Начинка Б',outputQty:'300',components:[line(a,'200','g','recipe'),line(sugar,'100','g')]};const p={...C.newProduct(),name:'Торт',outputQty:'1000',portions:'10',components:[line(b,'300','g','recipe'),line(sugar,'50','g'),line(box,'1','pcs','material','fixed')]};p.pricing.labor={enabled:true,amount:'100'};db.materials=[sugar,box];db.recipes=[a,b];db.products=[p];return{db,sugar,box,a,b,p,line};}module.exports=fixture;
