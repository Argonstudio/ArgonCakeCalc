# Data format 2 and compatibility

Documentation author: ChatGPT (OpenAI), with Ivan Voitkov.
Project author © 2026 Ivan Voitkov — https://github.com/Argonstudio/ArgonCakeCalc

## Root

`app: "CakeCalc"`, `formatVersion: 2`, arrays `materials`, `recipes`, `products`,
`categories`, object `settings`, optional `exportedAt`.
The legacy `app` marker and IDB name are intentional compatibility identifiers,
not the public product name/version. Do not globally search-and-replace them.

Quantities, prices, percentages and densities are finite decimal strings without
exponent notation, at most 12 fractional digits. IDs are unique across entities;
component line IDs are unique within each composition. Strings/arrays/objects,
references, units, ranges and cycles are validated before import replaces data.

## Materials

`id, name, description, category, price, packQty, unit, density, priceUpdated`.
Pack price is nonnegative; pack quantity positive. Units: `g, kg, ml, l, pcs`.
Density is empty or positive g/ml. Date must be a real `YYYY-MM-DD`. Category
must exist in the database's nonempty category list.

## Recipes

`id, name, description, instructions, outputQty, outputUnit, loss, density,
components`. Output quantity is BEFORE process losses; usable yield is derived.
Loss is 0..99.99%. Recipe components reference materials or existing recipes;
self-reference through any number of levels is rejected.

A component: `id, type, ref, qty, unit, role, scaling`.
Types: `material`, `recipe`; roles: `ingredient, cake, filling, cream, soak,
coating, decor, packaging, consumable, other`; scaling: `proportional, surface,
fixed, pieces`. Quantity is positive and units must be compatible with the source
or convertible using that source's density. User text is data, never executable.

## Products

`id, name, category, description, instructions, outputQty, outputUnit, density,
portions, components, cake, pricing`. Product output is the entered finished
yield. Portions are positive integers; category is free text.

Cake: `shape: round|square`, `count`, optional `targetCount`, `height`, `margin`,
`density`, `layers`, `tiers`. Each tier has `size` and `height`. Counts are
integers 1..14; actual `count` MUST equal `tiers.length`. `targetCount` is a
separate fitting plan and may differ. Layers are a positive integer. Dimensions
are positive and at most 1000 cm; step-back is 0..500 cm. A tier wider than the
one below is representable, but the UI warns about supports.

Pricing: `mode: markup|margin`, `rate`, `loss`, `lossEnabled`, `labor`, `energy`,
`other`, `desiredProfit`, `profitEnabled`. The three expense objects each have
boolean `enabled` and nonnegative `amount`; toggles must be real booleans.
Money/quantity inputs generally max at 10^9; other field-specific bounds are
specified in core validation. Zero prices are allowed; zero outputs are not.

## Settings

Currency: USD, EUR, RUB, NOK, CNY, JPY, GBP, CHF, CAD, AUD, KZT, BYN or UAH.
Number locale: en-US, ru-RU, fr-FR, de-DE, nb-NO, es-ES, it-IT, zh-CN or ja-JP.
These belong to the saved database. UI language is a small separate localStorage
preference, `argon-cakecalc-language`, not exported as recipe data.
Currencies do not cause conversion between exchange rates.

## IndexedDB and migration

Database `CakeCalc`, structural version 1, object store `snapshots`, keys current
and previous. Snapshot: `{revision, updatedAt, data}`. Both states are written
atomically with a revision comparison. Internal caches/DOM/revisions are not
exported to user JSON. Import replaces a whole database, not a merge, and has a
20 MB file limit. Existing data is downloaded before confirmed replacement.

Format 1 is migrated with a pure cloned transformation: old `cake.count` was a
plan, so move it to `targetCount`, set actual `count = tiers.length`, set format
2, then validate. Old format-2 backups are accepted unchanged. Future unknown
versions are rejected. Corrupt format-2 count mismatches are not silently fixed.
On open, a migrated IDB snapshot is saved through the revision-aware queue.
A load/migration error must never be replaced with an empty database.
