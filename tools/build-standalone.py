# Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
# https://github.com/Argonstudio/ArgonCakeCalc — preserve attribution (section 7 of the Commercial Source-Available License).
"""Build portable HTML and a content-addressed Service Worker. Python is build-time only.
Use --check in CI to reject a stale release after changing any application asset.
"""
from pathlib import Path
import argparse,hashlib,json,re
root=Path(__file__).resolve().parents[1]
read=lambda p:Path(p).read_text(encoding='utf-8')
files=['./','./index.html','./manifest.webmanifest','./assets/icon.svg','./assets/style.css','./assets/locales.js','./assets/i18n.js','./assets/core.js','./assets/geometry.js','./assets/storage.js','./assets/pdf-font.js','./assets/pdf-font-cjk.js','./assets/pdf.js','./assets/app.js']
template=read(root/'tools/sw-template.js')
hash_input=hashlib.sha256(template.encode())
for filename in files[1:]:
 hash_input.update(filename.encode()+b'\0'+(root/filename[2:]).read_bytes()+b'\0')
sw=template.replace('__BUILD_HASH__',hash_input.hexdigest()[:20]).replace('__ASSETS__',json.dumps(files,separators=(',',':')))
text=read(root/'index.html')
text=text.replace('<link rel="manifest" href="manifest.webmanifest">','').replace('<link rel="icon" href="assets/icon.svg" type="image/svg+xml">','')
text=text.replace('<link rel="stylesheet" href="assets/style.css">','<style>\n'+read(root/'assets/style.css')+'\n</style>')
text=re.sub(r'<script src="(assets/[^\"]+)"></script>',lambda m:'<script>\n'+read(root/m[1])+'\n</script>',text)
# The encoding declaration must stay inside the first 1024 bytes, so the legal header goes AFTER it.
assert '<meta charset="UTF-8">' in text,'index.html must declare <meta charset="UTF-8">'
header='<!--\n'+read(root/'NOTICE')+'\n'+read(root/'LICENSE')+'\n'+read(root/'ADDITIONAL_TERMS.md')+'\nCJK font license:\n'+read(root/'docs/NOTO-OFL.txt')+'\n-->'
text=text.replace('<meta charset="UTF-8">','<meta charset="UTF-8">\n'+header,1)
parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args()
outputs={'sw.js':sw,'ArgonCakeCalc.html':text}
if args.check:
 stale=[name for name,value in outputs.items() if not (root/name).is_file() or read(root/name)!=value]
 if stale:raise SystemExit('Stale release: '+', '.join(stale)+'. Run python tools/build-standalone.py')
 print('Release outputs match current sources.')
else:
 for name,value in outputs.items():
  with open(root/name,'w',encoding='utf-8',newline='\n') as f:f.write(value)
 print('Built ArgonCakeCalc.html and sw.js; asset hash '+hash_input.hexdigest()[:20])
