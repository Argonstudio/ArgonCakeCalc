# Changelog

## Unreleased — workflow improvements

- Added an overview dashboard with quick actions, counts, recent work and template entry points.
- Added a guided first-run card with a clean start or demo workspace.
- Added non-destructive price scenario comparison for products.
- Added PDF sharing with download fallback and shopping-list PDF sharing/download.
- Added responsive styling for the new onboarding and dashboard surfaces.

## ArgonCakeCalc 1.0.0 - publication fixes

- `ArgonCakeCalc.html`: `<meta charset="UTF-8">` now sits at byte ~200 instead of byte
  42 302 (the legal header moved after it), so file:// opening cannot fall back to a
  locale encoding. `build.test.py` enforces the 1024-byte rule for both HTML files.
- Build/font tools read and write UTF-8 explicitly (Windows builds no longer depend on
  the system code page) and always write LF.
- The CJK PDF font is loaded immediately again, embedded as executable script in the
  standalone HTML, and precached with all application assets. There is no lazy load,
  delayed warm-up, or separate font cache. UTF-8 improvements are retained.
- Tests: `pdf-font.test.cjs`, `sw-cache.test.cjs` and eager-font build regressions.
- Removed an internal note about an unrelated project from `docs/PUBLISHING.md`.

## ArgonCakeCalc 1.0.0 — 2026

- New public name and release line, retaining all audited predecessor fixes.
- Nine offline interfaces: English, Russian, French, German, Norwegian Bokmål,
  Spanish, Italian, Simplified Chinese and Japanese.
- Separate UI language preference; saved names, prices and currency are preserved.
- Nine number locales; USD, EUR, RUB, NOK, CNY, JPY, GBP, CHF, CAD, AUD, KZT, BYN, UAH.
- Bundled CJK TrueType font for Chinese/Japanese PDF, Unicode title/author metadata.
- Author Ivan Voitkov, 2026; author website/GitHub and original repository links.
- ArgonCakeCalc Commercial Source-Available License 1.0 with permitted section 7 of the Commercial Source-Available License preservation of reasonable origin notices.
- English AI documentation, English and Russian human READMEs, CI/Pages workflows.
- Locale and browser regression tests; exact rational costing retained.

## Predecessor CakeCalc 1.0.1

- Fixed extra procurement pack and extra scaled piece caused by intermediate
  rounding; exact rational BigInt arithmetic replaced fixed-point division.
- Separate planned/actual tiers, format-1 to format-2 migration.
- Content-hashed SW build and PDF metadata. See the historical calculation audit.

### 1.0.0 — interface refinements (same release)

- Default first launch and material category seeds to English.
- Keep the АргонТорт wordmark in all nine languages.
- Add an offline, interface-localized calendar independent of OS locale.
- Replace horizontally scrolling mobile navigation with an accessible hamburger.
- Render composition and raw material requirements as labeled mobile cards.
- Inset dropdown arrows by 5px.

### 1.0.0 — empty expenses and field guidance

- Clearing a zero-allowed numeric field commits zero without blocking other expense edits. Preserve optional unknown density and strict positive/negative validation.
- Added visible, associated hints to all editable fields and four accessible detailed help dialogs, translated into all nine interface languages.
- Explain both directions of the geometry/yield relationship and their explicit, non-scaling effect on ingredients.
