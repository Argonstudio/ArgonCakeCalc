# AI development guide

**Documentation author:** ChatGPT (OpenAI), with Ivan Voitkov.  
**Project creation:** ChatGPT (OpenAI) in collaboration with Ivan Voitkov.  
**Project author:** Ivan Voitkov, © 2026.  
**Website:** https://argon-studio.ru/  
**Author GitHub:** https://github.com/Argonstudio  
**Original project:** https://github.com/Argonstudio/ArgonCakeCalc

## Purpose and non-goals

ArgonCakeCalc 1.0.0 is a finished local, offline-first pastry costing application,
not a backend service. A static host only serves files. The user's materials,
recipes, products and prices stay in that browser's IndexedDB.
There are no accounts, subscriptions, external runtime APIs or mandatory runtime
packages. Do not add them incidentally while solving an unrelated issue.

Inventory, invoices, orders, tax rules, exchange rates, engineering safety,
cloud sync and multi-user collaboration are outside this release.

## Attribution and legal context

Before changing notices, read LICENSE, NOTICE, ADDITIONAL_TERMS.md and
THIRD_PARTY.md. Code is ArgonCakeCalc Commercial Source-Available License 1.0; a reasonable attribution-preservation term
is specified under section 7 of the Commercial Source-Available License. Preserve the name **Ivan Voitkov** and
**https://github.com/Argonstudio/ArgonCakeCalc** as the original author/source.
Also retain the author website. You can add your modification credit and fork URL
without erasing origin. This is not a prohibition on forks or a claim that Ivan
Voitkov endorses modifications. Font licenses are OFL and must stay separate.
Documentation credit to ChatGPT does not replace Ivan Voitkov as project author.

## Calculation invariants

- `Dec` is a reduced rational `p/q` of BigInt values, q > 0. Input decimals have
  at most 12 fractional digits. `toString()` rounds display to 12 places but
  must not mutate the rational value.
- Material cost is the consumed fraction of the purchased pack. A purchase-list
  pack ceiling is not the material cost and must not inflate it.
- Recipe costs use all inputs; recipe loss reduces usable yield. Nested recipe
  unit cost uses that net yield. Recipe density belongs to its usable output.
- A product's extra-loss option is a monetary reserve, not a quantity expansion.
- Full cost is explicitly rounded half-up to two places. Suggested selling price
  is explicitly rounded upward to two places. Preserve those boundaries.
- Exact aggregate quantities go into pack ceilings. Never use a blanket epsilon
  to hide intermediate errors. Six grams exactly require one six-gram pack;
  6.000000000001 grams require two.
- Quantities saved by scaling round to 6 decimals, dimensions to 3. Number-based
  roots, π and geometry remain approximations; do not market them as engineering.
- Avoid recursive dependency evaluation; production uses iterative DAG ordering
  and rejects cycles.

## Storage invariants

The public name is ArgonCakeCalc, version 1.0.0. The legacy JSON app identifier,
IndexedDB name and snapshot store remain `CakeCalc` for compatibility. Data
format 2 is independent of the public version and IDB structural version 1.
The previous CakeCalc calculation fixes are retained, not rolled back.

A valid draft may become the current database only after whole-database
validation. Invalid input remains visible while the last valid calculation
survives. Writes compare revisions and update current/previous atomically.
On conflict or quota failure, show unsaved state and allow JSON download.
Never silently reset a failed database load.

## Internationalization invariants

Nine supported interfaces: en, ru, fr, de, nb, es, it, zh, ja. Norwegian means
Bokmål, Chinese means Simplified Chinese. The UI preference lives in localStorage;
number locale and currency belong to the database. Changing UI language reloads
the app after flushing valid edits, without changing saved financial settings.

`T()` receives source literals only. `T.l` translates a template's static chunks;
interpolated values are untouched. Therefore user names, descriptions and
instructions are not accidentally translated. It is NOT an HTML escaping
function: call `esc` on user values wherever HTML is generated.

Catalog source keys are Russian literal fragments, not database values. All
catalogs have the same keys. Contributions are committed as JSON and compiled
into a local asset. No runtime translation requests are permitted.

## Safe workflow

1. Reproduce the problem with the current source and a minimal fixture.
2. Add a test expressing the expected behavior independently from the bug.
3. Make the smallest architectural change. No formula duplication in views.
4. Run core, geometry, regression, locale and independent-oracle tests.
5. For UI/storage/translation changes, run browser, storage, portable, language,
   migration and update tests on a static localhost origin.
6. Inspect actual rendered pages and PDFs. A successful screenshot command is
   not visual inspection. Test long labels and unsupported PDF characters.
7. Rebuild locales and standalone/SW. Run `--check`. Update docs and changelog.
8. State executed tests and remaining limits accurately; do not claim native
   linguistic certification or cross-browser results not actually checked.

No AI contributor is authorized by these instructions alone to publish a GitHub
release, deploy to production, change licenses, access user databases or upload
recipes. The human author controls repository publication and deployment.

### 1.0.0 UI refinements

First launch defaults to English, independent of navigator.language. Existing saved interface choices and user records are preserved. New category seeds use English. Keep the wordmark АргонТорт in Cyrillic in all locales. The date picker uses Intl with the selected UI locale, independent of the OS/browser calendar. Mobile navigation is a collapsible hamburger; composition and procurement tables become labeled cards at 720px and below without duplicate editable controls. Run tests/ui-refinements.test.cjs after changes.

### Empty numeric input and help

The UI normalizes an empty numeric draft value to the string 0 before validation, except optional density where empty means unknown. Zero-allowed fields, including every pricing amount and percentage, remain valid immediately and cannot block sibling expenses. On blur an empty committed zero is shown as 0. Required positive fields still reject zero; negative expenses remain invalid. Keep decimal parsing, core validation and imported JSON strict; do not change Dec or silently repair corrupt backups. Help text must match the explicit geometry commands: fitting dimensions does not change yield or ingredients; taking yield from geometry changes only yield, not ingredient quantities or total costs.
