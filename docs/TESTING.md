# Testing and release checks

Documentation author: ChatGPT (OpenAI), with Ivan Voitkov.
Project author © 2026 Ivan Voitkov — https://github.com/Argonstudio/ArgonCakeCalc

## Requirements

Calculation tests: Node.js 24. Oracle/build tests: Python 3 standard library.
No third-party Python dependency is needed unless rebuilding optional fonts.
Browser tests: Playwright 1.56.1 and Chromium. Runtime does not use Playwright.

```sh
npm ci
npx playwright install chromium
# On Linux CI: npx playwright install --with-deps chromium
npm test
npm run test:oracle
python tests/build.test.py
npm run check
```

`npm test` runs 56 business tests, 17 geometry tests, 16 calculation regressions
and 4563 locale/catalog/default/currency checks. The independent Python Fraction
oracle performs 34,745 exact comparisons across 200 generated databases,
2400 recipes and 600 products. Those comparisons are not claimed as instrumented
100% line/branch coverage or proof against every possible input.

## Browser tests

In one terminal, from repository root:

```sh
python -m http.server 8093
```

In another:

```sh
export BASE_URL=http://localhost:8093
export CHROMIUM_PATH="$(node -p "require('playwright').chromium.executablePath()")"
npm run test:browser
```

If Playwright lives outside node resolution, set PLAYWRIGHT_PATH to its package
directory. CHROMIUM_PATH can point to a compatible installed Chromium. The tests
use localhost or temporary files; they never need a production user database.

- `browser.test.cjs`: real CRUD, nested prices, cycles, scaling, geometry, JSON,
  PDF, 390 px routes, offline edit/reload and tab revision conflict.
- `storage.test.cjs`: full browser restart, previous snapshot, recovery, simulated
  quota error and explicit unsaved warnings.
- `review-browser.test.cjs`: real legacy IDB migration, planned/actual tier counts,
  format-2 rejection, the exact 4+1+1 g procurement case in UI/PDF.
- `languages-browser.test.cjs`: nine languages × five routes × two widths = 90
  combinations; author links, no untranslated Russian UI except the native
  language name, translated validation, unmodified user names, CJK PDF downloads,
  real selector reload, preserved currency and offline language.
- `portable.test.cjs`: standalone file with no server, full restart and PDF.
- `subpath.test.cjs`: GitHub Pages-style subdirectory, correct relative assets,
  SW scope, persisted data and offline reload.
- `update.test.cjs`: content-changed generated SW, explicit activation, preserved
  IndexedDB, new resources offline and old-cache removal.

Screenshots/PDFs are written under tests/output (gitignored). Do not publish them
as user data. Inspect generated screenshots and PDF pages, not just process exit
codes. Use pdfinfo/pdftotext/pdftoppm or another real PDF viewer to verify CJK text,
font embedding, metadata, wrapping and pagination.

## Release sequence

1. Preserve copyright, Commercial License/OFL notices and original project links.
2. Update source/catalogs/docs and add tests. Keep package/public version aligned.
3. Run `python tools/build-locales.py`, then `python tools/build-standalone.py`.
4. Run both `--check` commands, all calculation/oracle/build tests and affected
   browser tests. Never include stale standalone/SW outputs.
5. Inspect 1440/390 px, long labels, CJK PDF and both themes.
6. Commit source plus generated standalone, locales and SW. Exclude node_modules,
   tests/output, logs, profiles and personal JSON.
7. Publish the complete release to the same origin. Ask users to export JSON
   before activating. Do not delete IndexedDB or promise file:// persistence in
   every browser.

Local results are Chromium/Linux. Do not claim unexecuted Safari/Firefox or
physical iOS/Android results. GitHub workflows are supplied, not a claim they
have already run on the owner's repository.

Additional regressions: tests/pdf-font.test.cjs verifies synchronous offline exports with both fonts; tests/sw-cache.test.cjs verifies the full precache including CJK, install failure safety and stale-cache cleanup. tests/build.test.py also checks early UTF-8 declaration, eager embedding and font-sensitive build hashes.

`tests/font-offline.test.cjs` starts a fresh Chinese-language profile, disconnects immediately after offline-ready, exports CJK PDF before any prior PDF use, reloads offline, and repeats. It also opens the standalone HTML with the network disabled and checks eager fonts and UTF-8.
