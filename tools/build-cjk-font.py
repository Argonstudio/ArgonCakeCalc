# Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
# https://github.com/Argonstudio/ArgonCakeCalc — preserve attribution (section 7 of the Commercial Source-Available License).
"""Optional build tool: convert a local OFL Noto Sans SC OpenType font to PDF TrueType.
No runtime/build download. Usage: python tools/build-cjk-font.py /path/to/NotoSansSC-Regular.otf
Requires fonttools. Renames the derived font to Argon Cake CJK under OFL.
"""
from pathlib import Path
import sys,io,base64,json
from fontTools.ttLib import TTFont,newTable
from fontTools import subset
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.cu2quPen import Cu2QuPen
source=TTFont(sys.argv[1]);options=subset.Options();options.notdef_glyph=True
sub=subset.Subsetter(options=options)
# BMP: Latin, Cyrillic, CJK unified + extension A, kana and common punctuation.
sub.populate(unicodes=[cp for cp in source.getBestCmap() if 32<=cp<=0xffff]);sub.subset(source)
upm=source['head'].unitsPerEm;order=source.getGlyphOrder();glyphset=source.getGlyphSet();glyphs={}
for name in order:
 pen=TTGlyphPen(None);glyphset[name].draw(Cu2QuPen(pen,max_err=1.0,reverse_direction=True));glyphs[name]=pen.glyph()
fb=FontBuilder(upm,isTTF=True);fb.setupGlyphOrder(order);fb.setupCharacterMap(source.getBestCmap());fb.setupGlyf(glyphs);fb.setupHorizontalMetrics({name:source['hmtx'][name] for name in order});fb.setupHorizontalHeader(ascent=source['hhea'].ascent,descent=source['hhea'].descent)
fb.setupNameTable({'familyName':'Argon Cake CJK','styleName':'Regular','uniqueFontIdentifier':'ArgonCakeCJK-Regular-1.0','fullName':'Argon Cake CJK Regular','psName':'ArgonCakeCJK-Regular','version':'Version 1.0','copyright':'Copyright (C) 2014-2021 Adobe (http://www.adobe.com/). Derived font: Argon Cake CJK, converted by Ivan Voitkov, 2026.','licenseDescription':(Path(__file__).resolve().parents[1]/'docs/NOTO-OFL.txt').read_text(encoding='utf-8'),'licenseInfoURL':'https://openfontlicense.org/'})
fb.setupOS2(sTypoAscender=source['hhea'].ascent,sTypoDescender=source['hhea'].descent,usWinAscent=max(0,source['hhea'].ascent),usWinDescent=max(0,-source['hhea'].descent));fb.setupPost();fb.setupMaxp()
font=fb.font;output=io.BytesIO();font.save(output)
chars={str(cp):[font.getGlyphID(name),round(font['hmtx'][name][0]*1000/upm)] for cp,name in font.getBestCmap().items()}
data={'base64':base64.b64encode(output.getvalue()).decode(),'chars':chars,'bbox':[round(getattr(font['head'],a)*1000/upm) for a in ['xMin','yMin','xMax','yMax']],'ascent':round(font['hhea'].ascent*1000/upm),'descent':round(font['hhea'].descent*1000/upm),'name':'ArgonCakeCJK-Regular'}
r=Path(__file__).resolve().parents[1];(r/'assets/pdf-font-cjk.js').write_text('/* Argon Cake CJK, derived from Noto Sans SC.\n'+(r/'docs/NOTO-OFL.txt').read_text(encoding='utf-8')+'\n*/\nglobalThis.CakePdfFontCJK='+json.dumps(data,separators=(',',':'))+';\n',encoding='utf-8',newline='\n')
print('Converted CJK TrueType:',len(output.getvalue()),'bytes;',len(chars),'Unicode characters')
