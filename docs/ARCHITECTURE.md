# Architecture

Documentation author: ChatGPT (OpenAI), in collaboration with Ivan Voitkov.
Project created jointly by ChatGPT and Ivan Voitkov; project author Ivan Voitkov.
© 2026 Ivan Voitkov — https://github.com/Argonstudio/ArgonCakeCalc

## Runtime modules, in load order

1. `locales.js`: compiled, local static catalogs. Source JSON is in `locales/`.
2. `i18n.js`: locale selection, literal/tag translation, routes, currency names,
   first-use financial defaults and initial static-document hydration.
3. `core.js`: UMD business module; exact rational arithmetic, units, validation,
   recipes, costing, scaling and format migrations. No DOM or persistence logic.
4. `geometry.js`: dimension fitting and volume totals, using Number arithmetic.
5. `storage.js`: IndexedDB snapshots, queued writes, previous state, revisions,
   BroadcastChannel notification and conflict handling.
6. `pdf-font.js`, `pdf-font-cjk.js`: local OFL fonts. They are separate from the application code.
7. `pdf.js`: local PDF 1.7, embedded TrueType/CID fonts, Unicode text mapping,
   wrapping, pagination and metadata. CJK font chosen when base font lacks a
   supported character. No print dialog or network service.
8. `app.js`: views, HTML escaping, valid/invalid drafts, commands, PDF section
   content and JSON export/import. All formulas remain in the core/model.

`index.html` wires these modules. `ArgonCakeCalc.html` is a generated inline copy,
not a second implementation. `manifest.webmanifest` provides installation hints.
`sw.js` is generated from `tools/sw-template.js` and caches static assets only.

## Exact arithmetic and performance

`Dec` stores reduced `p/q` BigInts. Cross-cancellation limits growth during
multiplication. No intermediate division rounding occurs. Display conversion
rounds to 12 decimal places. Explicit `round` is half-up; `ceil` rounds upward.
`toRatio` exposes numerator/denominator pairs for an independent Python oracle.
See CALCULATIONS.md for business rounding boundaries.

Engine validates the whole candidate database, topologically evaluates recipes,
and caches recipe/product results for that immutable valid revision. Shared
recipe branches propagate iteratively in flattening. There is no explicit
nesting-depth cap or recursive JS stack dependence.

Validation and calculations execute locally on each valid edit. Lists render
in batches of 50. The control fixture of 1000 materials, 1000 recipes and 500
products has a simple graph; its speed does not guarantee arbitrary dense-graph
performance. Exact fractions may grow on contrived graphs. Thousands of lines
in a single composition may require future virtualization/search UI work.

## Draft lifecycle

The selected record has a separate draft. On input, a candidate whole database
is validated, including references, units and cycles. Only then does it replace
the valid state and enter the persistence queue. Invalid edits preserve the
last valid calculation and show the error; navigation asks before discarding.
Ordinary editing does not rebuild the focused input.

## Persistence

IDB database `CakeCalc`, structural version 1, store `snapshots`, keys `current`
and `previous`. A write transaction checks current revision, then writes the
old snapshot as previous and the new revision as current. Conflicts never use
silent last-write-wins. BroadcastChannel is advisory; revision checking is
still effective without it. Pending writes are coalesced; active writes are not
mutated. Quota/permission/conflict failure is visible and JSON remains available.

There is no global database, service backend, filesystem backup daemon or cloud.
The stable origin is part of the user's storage identity. SW cache changes do
not delete IndexedDB. A browser can still clear it; JSON is the portable backup.

## Internationalization

See I18N.md. Source literals are wrapped explicitly in `T` or `T.l`. Dynamic user
values are never sent to translation. The initial static HTML is hydrated before
records are rendered. A language switch flushes valid edits, persists a small
localStorage preference and reloads to initialize translated constants. It does
not mutate categories, names or prices in a saved database.

## Build and release

`build-locales.py` compiles all committed JSON catalogs into `assets/locales.js`.
`build-standalone.py` inlines the actual assets and generates a deterministic
SW key from the template and asset contents. `--check` detects stale generated
outputs. No download, npm or framework is required for either normal build.
Font-conversion tools are optional: prebuilt fonts are committed.

A SW install reloads resources into its own new cache; fetch reads that cache,
not a global cache search. New versions wait for user activation. Old app caches
are removed after activation. Host/CDN policy must allow retrieval of a new
`sw.js`; build hashing cannot fix a permanently stale HTTP proxy response.

## PDF font initialization

Both local PDF font scripts execute before pdf.js and app.js. Both are in the main Service Worker precache; offline-ready includes the CJK font. The standalone HTML embeds both as executable inline scripts. No lazy CJK requests, background timers or separate font cache are used. Build tools keep UTF-8 explicit and place the charset declaration within the first 1024 bytes.
