# Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
# https://github.com/Argonstudio/ArgonCakeCalc — preserve attribution (section 7 of the Commercial Source-Available License).
"""Reproducible release: assets change the SW key automatically; stale build is rejected."""
from pathlib import Path
import tempfile,shutil,subprocess
root=Path(__file__).resolve().parents[1]
with tempfile.TemporaryDirectory(prefix='cakecalc-build-') as d:
 copy=Path(d)/'app';shutil.copytree(root,copy,ignore=shutil.ignore_patterns('output','__pycache__'))
 script=copy/'tools/build-standalone.py'
 subprocess.run(['python',str(script)],check=True,capture_output=True)
 first=(copy/'sw.js').read_text(encoding='utf-8')
 subprocess.run(['python',str(script),'--check'],check=True,capture_output=True)
 f=copy/'assets/core.js';f.write_text(f.read_text(encoding='utf-8')+'\n/* Independent release regression marker */\n',encoding='utf-8')
 assert subprocess.run(['python',str(script),'--check'],capture_output=True).returncode!=0
 subprocess.run(['python',str(script)],check=True,capture_output=True)
 second=(copy/'sw.js').read_text(encoding='utf-8');assert first!=second
 subprocess.run(['python',str(script)],check=True,capture_output=True)
 assert second==(copy/'sw.js').read_text(encoding='utf-8')
 for f in (copy/'assets').glob('*.js'):
  if f.name!='icon.svg':assert f.read_text(encoding='utf-8') in (copy/'ArgonCakeCalc.html').read_text(encoding='utf-8')
 # Encoding and eager-font regressions: every PDF font is ready with the app.
 html_bytes=(copy/'ArgonCakeCalc.html').read_bytes();html=html_bytes.decode('utf-8')
 for name,data in (('ArgonCakeCalc.html',html_bytes),('index.html',(copy/'index.html').read_bytes())):
  assert data[:3]!=b'\xef\xbb\xbf',name+' must not start with a BOM'
  assert b'<meta charset="UTF-8">' in data[:1024],name+': charset must be inside the first 1024 bytes'
 assert '<script src="assets/pdf-font-cjk.js"></script>' in (copy/'index.html').read_text(encoding='utf-8')
 assert 'id="argon-cjk-font"' not in html and 'type="text/plain"' not in html
 sw=(copy/'sw.js').read_text(encoding='utf-8');precache=sw.split('const FILES=')[1].split(';')[0]
 assert 'pdf-font-cjk.js' in precache and 'LAZY_CACHE' not in sw
 font=copy/'assets/pdf-font-cjk.js';before=sw;font.write_text(font.read_text(encoding='utf-8')+'\n/* font marker */\n',encoding='utf-8')
 subprocess.run(['python',str(script)],check=True,capture_output=True);after=(copy/'sw.js').read_text(encoding='utf-8')
 assert before!=after
 print('PASS: deterministic build, stale-build guard, identical inline sources, charset in first 1024 bytes, eager CJK font in precache and font-sensitive build hash.')
