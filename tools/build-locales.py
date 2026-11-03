# Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
# https://github.com/Argonstudio/ArgonCakeCalc — preserve attribution (section 7 of the Commercial Source-Available License).
"""Build the embedded, offline translation asset from committed JSON. No network required."""
from pathlib import Path
import json,argparse
r=Path(__file__).resolve().parents[1];langs=['en','fr','de','nb','es','it','zh','ja']
source=json.loads((r/'locales/ru.json').read_text(encoding='utf-8'));catalogs={lang:json.loads((r/'locales'/f'{lang}.json').read_text(encoding='utf-8')) for lang in langs}
for lang,d in catalogs.items():
 if set(d)!=set(source):raise SystemExit(f'{lang}: missing/extra translation keys')
 if any(not isinstance(v,str) or not v.strip() or any(c in v for c in '<>"') for v in d.values()):raise SystemExit(f'{lang}: invalid/unsafe translation')
text='/* Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.\n * Machine-assisted translations reviewed for key terminology; native review welcome.\n * https://github.com/Argonstudio/ArgonCakeCalc */\n(function(root){const catalogs='+json.dumps(catalogs,ensure_ascii=False,separators=(',',':'))+';root.ArgonLocales=catalogs;if(typeof module===\'object\'&&module.exports)module.exports=catalogs;})(globalThis);\n'
p=r/'assets/locales.js';parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args()
if args.check:
 if not p.exists() or p.read_text(encoding='utf-8')!=text:raise SystemExit('Stale locales.js. Run python tools/build-locales.py')
 print('Translation asset matches all source catalogs.')
else:p.write_text(text,encoding='utf-8');print('Built 8 translated catalogs and Russian source:',len(source),'keys each.')
