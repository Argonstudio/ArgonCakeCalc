# Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
# https://github.com/Argonstudio/ArgonCakeCalc — preserve attribution (section 7 of the Commercial Source-Available License).
"""Optional build-time tool: python build-font.py /path/to/LiberationSans-Regular.ttf.
Requires fonttools. The browser application does not use Python.
Subset and rename under SIL OFL; original reserved font names are not reused.
"""
from fontTools import subset
from fontTools.ttLib import TTFont
from pathlib import Path
import base64,json,sys,io
font=TTFont(sys.argv[1]);sub=subset.Subsetter(options=subset.Options());sub.populate(unicodes=list(range(32,0x530))+[0xa0,0xb0,0xb2,0xb3,0xb7,0xd7,0x2013,0x2014,0x2018,0x2019,0x201c,0x201d,0x2022,0x2026,0x20ac,0x2116,0x2191]);sub.subset(font)
for record in font['name'].names:
 if record.nameID in [1,2,3,4,6,16,17]:
  names={1:'CakeCalc Sans',2:'Regular',3:'CakeCalcSans-Regular-1.0',4:'CakeCalc Sans Regular',6:'CakeCalcSans-Regular',16:'CakeCalc Sans',17:'Regular'}
  record.string=names[record.nameID].encode(record.getEncoding(),errors='replace')
output=io.BytesIO();font.save(output);upm=font['head'].unitsPerEm
chars={str(cp):[font.getGlyphID(name),round(font['hmtx'][name][0]*1000/upm)] for cp,name in font.getBestCmap().items()}
data={'base64':base64.b64encode(output.getvalue()).decode(),'chars':chars,'bbox':[round(getattr(font['head'],a)*1000/upm) for a in ['xMin','yMin','xMax','yMax']],'ascent':round(font['hhea'].ascent*1000/upm),'descent':round(font['hhea'].descent*1000/upm)}
path=Path(__file__).resolve().parents[1]/'assets/pdf-font.js';path.write_text('/* CakeCalc Sans, subset derived from Liberation Sans.\n'+(path.parent.parent/'docs/FONT-LICENSE.txt').read_text(encoding='utf-8')+'\n*/\nglobalThis.CakePdfFont='+json.dumps(data,separators=(',',':'))+';\n',encoding='utf-8',newline='\n')
