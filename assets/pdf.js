/* Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
 * https://argon-studio.ru/ | https://github.com/Argonstudio/ArgonCakeCalc
 * Preserve author/origin attribution under section 7 of the Commercial Source-Available License; see ADDITIONAL_TERMS.md. */
/* Minimal offline Unicode PDF writer. Font embedded, real selectable text. ARGONCAKECALC-COMMERCIAL-1.0. */
(function(root){'use strict';
const CakeI18n=globalThis.CakeI18n||(typeof require==='function'?require('./i18n.js'):null),T=CakeI18n.t;

const enc=new TextEncoder(),ascii=s=>enc.encode(s),join=parts=>{const size=parts.reduce((s,p)=>s+p.length,0),out=new Uint8Array(size);let i=0;for(const p of parts){out.set(p,i);i+=p.length;}return out;};
function create(title,sections){
 const texts=[title,...sections.flatMap(s=>[s.heading||'',...(s.lines||[])])].join('');
 const needsCJK=Array.from(texts).some(c=>!root.CakePdfFont?.chars[c.codePointAt(0)]&&root.CakePdfFontCJK?.chars[c.codePointAt(0)]);
 const font=needsCJK?root.CakePdfFontCJK:root.CakePdfFont;if(!font)throw Error(T("Шрифт PDF не загружен."));
 const chars=font.chars,cpOf=c=>chars[c.codePointAt(0)]?c.codePointAt(0):63;
 function width(s,size){return Array.from(s).reduce((w,c)=>w+(chars[cpOf(c)]?.[1]||500)*size/1000,0);}
 function lines(text,size,max=499){const result=[];for(const paragraph of String(text).split('\n')){let line='';for(const word of paragraph.split(/\s+/)){let remaining=word;if(width(remaining,size)>max){if(line){result.push(line);line='';}let part='';for(const c of remaining){if(width(part+c,size)>max){result.push(part);part='';}part+=c;}line=part;}else if(width(line+(line?' ':'')+word,size)>max){result.push(line);line=word;}else line+=(line?' ':'')+word;}result.push(line);}return result;}
 const pages=[[]];let y=788;const used=new Set([32,63]);
 function emit(text,size=11,kind='body'){
  for(const s of lines(text,size)){if(y<size+48){pages.push([]);y=788;}const hex=Array.from(s).map(c=>{const cp=cpOf(c);used.add(cp);return cp.toString(16).padStart(4,'0');}).join('');pages.at(-1).push(`${kind==='heading'?'0.13 0.34 0.35':'0.17 0.17 0.17'} rg BT /F1 ${size} Tf 1 0 0 1 48 ${y} Tm <${hex}> Tj ET\n`);y-=size*1.5;}
 }
 emit('ArgonCakeCalc',12,'heading');y-=14;emit(title,22,'heading');y-=8;
 for(const section of sections){if(section.heading){if(y<125){pages.push([]);y=788;}y-=8;emit(section.heading,14,'heading');}for(const s of section.lines||[])emit(s,11);y-=7;}
 pages.forEach((p,i)=>{const s=`${i+1} / ${pages.length}`;p.push(`0.45 0.45 0.45 rg BT /F1 9 Tf 1 0 0 1 48 28 Tm <${Array.from(s).map(c=>{const cp=cpOf(c);used.add(cp);return cp.toString(16).padStart(4,'0');}).join('')}> Tj ET`);});
 const fontName=font.name||'CakeCalcSans';
 const objects=[],add=body=>{objects.push(typeof body==='string'?ascii(body):body);return objects.length;},stream=(data,extra='')=>join([ascii(`<< /Length ${data.length} ${extra} >>\nstream\n`),data,ascii('\nendstream')]);
 const catalog=add(''),pageTree=add('');const fontBytes=Uint8Array.from(atob(font.base64),c=>c.charCodeAt(0)),fontFile=add(stream(fontBytes,`/Length1 ${fontBytes.length}`));
 const descriptor=add(`<< /Type /FontDescriptor /FontName /${fontName} /Flags 32 /FontBBox [${font.bbox.join(' ')}] /ItalicAngle 0 /Ascent ${font.ascent} /Descent ${font.descent} /CapHeight 700 /StemV 80 /FontFile2 ${fontFile} 0 R >>`);
 const max=Math.max(...used),map=new Uint8Array((max+1)*2);for(const cp of used){const gid=chars[cp]?.[0]||0;map[cp*2]=gid>>8;map[cp*2+1]=gid&255;}
 const gidMap=add(stream(map));const ordered=[...used].sort((a,b)=>a-b),widths=ordered.map(cp=>`${cp} [${chars[cp]?.[1]||500}]`).join(' ');
 const cid=add(`<< /Type /Font /Subtype /CIDFontType2 /BaseFont /${fontName} /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> /FontDescriptor ${descriptor} 0 R /DW 500 /W [${widths}] /CIDToGIDMap ${gidMap} 0 R >>`);
 let cmap='/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def\n/CMapName /CakeCalcUnicode def\n/CMapType 2 def\n1 begincodespacerange\n<0000> <FFFF>\nendcodespacerange\n';
 for(let i=0;i<ordered.length;i+=90){const batch=ordered.slice(i,i+90);cmap+=`${batch.length} beginbfchar\n`+batch.map(cp=>{const h=cp.toString(16).padStart(4,'0');return`<${h}> <${h}>`;}).join('\n')+'\nendbfchar\n';}cmap+='endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend';
 const unicode=add(stream(ascii(cmap))),type0=add(`<< /Type /Font /Subtype /Type0 /BaseFont /${fontName} /Encoding /Identity-H /DescendantFonts [${cid} 0 R] /ToUnicode ${unicode} 0 R >>`),pageIDs=[];
 for(const commands of pages){const content=add(stream(ascii(commands.join('')))),page=add(`<< /Type /Page /Parent ${pageTree} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${type0} 0 R >> >> /Contents ${content} 0 R >>`);pageIDs.push(page);}
 objects[catalog-1]=ascii(`<< /Type /Catalog /Pages ${pageTree} 0 R >>`);objects[pageTree-1]=ascii(`<< /Type /Pages /Count ${pageIDs.length} /Kids [${pageIDs.map(id=>id+' 0 R').join(' ')}] >>`);
 const unicodeString=s=>'<FEFF'+Array.from(String(s)).map(c=>{const cp=c.codePointAt(0);if(cp<=0xffff)return cp.toString(16).padStart(4,'0');const n=cp-0x10000;return(0xd800+(n>>10)).toString(16)+(0xdc00+(n&1023)).toString(16);}).join('')+'>';
 const info=add(`<< /Title ${unicodeString(title)} /Author (Ivan Voitkov) /Subject (https://github.com/Argonstudio/ArgonCakeCalc) /Creator (ArgonCakeCalc 1.0.0) /Producer (ArgonCakeCalc offline PDF) >>`);
 const chunks=[ascii('%PDF-1.7\n%CakeCalc\n')],offsets=[0];let pos=chunks[0].length;objects.forEach((body,i)=>{offsets.push(pos);const b=join([ascii(`${i+1} 0 obj\n`),body,ascii('\nendobj\n')]);chunks.push(b);pos+=b.length;});
 const xref=pos;chunks.push(ascii(`xref\n0 ${objects.length+1}\n0000000000 65535 f \n${offsets.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n \n').join('')}trailer\n<< /Size ${objects.length+1} /Root ${catalog} 0 R /Info ${info} 0 R >>\nstartxref\n${xref}\n%%EOF`));return new Blob([join(chunks)],{type:'application/pdf'});
}
root.CakePDF={create};})(globalThis);
