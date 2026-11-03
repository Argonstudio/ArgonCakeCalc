# ArgonCakeCalc 1.0.0 — release notes

© 2026 Ivan Voitkov · https://argon-studio.ru/  
Original source: https://github.com/Argonstudio/ArgonCakeCalc  
Documentation: ChatGPT (OpenAI), in collaboration with Ivan Voitkov.
Project created by ChatGPT in collaboration with Ivan Voitkov.

This is a GitHub-ready source/static distribution, not a claim of live deployment.
It adds nine bundled language interfaces, national currency/default number
settings, local CJK PDF support, author attribution, Commercial Source-Available License notices, English AI
documentation and separate English/Russian human READMEs. Financial fixes from
the predecessor are retained. The legacy data marker/IDB name remains compatible.

## Upgrade

Export JSON in the old application before changing a file or origin. Format-1
and format-2 CakeCalc backups are accepted. Language changes do not convert
currency, rename saved records or rewrite recipe instructions. The product
version is 1.0.0; data format remains 2 and IDB structural version remains 1.

## Verification

- 89 calculation/regression tests passed locally.
- 34,745 independent exact Fraction comparisons passed.
- 5076 catalog/default/currency checks passed across nine interfaces.
- 90 browser locale/route/width combinations passed, including author links,
  localized errors, user text isolation, currency preservation, CJK PDF download,
  actual selector reload and offline language persistence.
- Full browser, storage, legacy migration, standalone and generated SW-update
  tests passed locally. A GitHub Pages-style `/ArgonCakeCalc/` subdirectory also
  passed scoped-worker, persistence and offline reload checks.
- PDF metadata/text extraction and visual rendering confirmed readable CJK,
  preserved user text, author/source metadata and correct pagination.
- Generated catalog/standalone/SW consistency and deterministic build checks passed.

These are local execution results, not claims of completed GitHub-hosted Actions
or a published Pages site.

Translations are machine-assisted with terminology/formula review; native review
is welcome. CJK fonts increase standalone/PDF size. Browser scope is Chromium on
Linux, not a guarantee for every device. Unsupported PDF characters may become ?.

Preserve Ivan Voitkov's name and original repository notice under the section 7 of the Commercial Source-Available License
term. Modified versions can add their own attribution without erasing origin.

## Interface refinements, still version 1.0.0

English first-launch defaults and English material-category seeds; a fixed Cyrillic АргонТорт wordmark; an offline calendar localized in all nine interface languages; a collapsible mobile hamburger; labeled mobile composition/procurement cards; and 5px-inset select arrows. Existing user categories and saved language choices remain unchanged.

Additional regression coverage checks the nine calendars, mobile card editing/live calculation, hamburger keyboard behavior and 320px overflow. Visual inspection covered mobile cards, desktop tables, English/Russian/Chinese calendars, and a 320px German dark-theme calendar.

## Empty-expense fix and guidance, still 1.0.0

Empty zero-allowed numeric input is normalized at the UI boundary, avoiding a blocked draft when clearing an expense. Core arithmetic and imported backup validation remain strict. Every editable field has a visible, associated hint; four localized dialogs explain pricing, scaling and the two geometry commands. The dedicated regression covers the reported 245 → 255 → 246 → 245 sequence, cross-field recovery and persistence, all-form hint coverage, and geometry-only commands preserving ingredient quantities and total cost.

## Eager PDF fonts restored, still 1.0.0

Both fonts load immediately and belong to the application precache. Initial download size is intentionally larger so the offline-ready signal also covers CJK PDF export. Standalone HTML embeds both fonts. Early charset placement and explicit UTF-8 build-tool improvements are retained.
