# QA scope

Documentation author: ChatGPT (OpenAI), in collaboration with Ivan Voitkov.
Project author © 2026 Ivan Voitkov — https://github.com/Argonstudio/ArgonCakeCalc

The release uses the exact-rational calculation fixes audited in the predecessor,
not the fixed-12-place intermediate division that produced extra packs/pieces.
Calculation and locale suites pass locally; the independent Fraction oracle has
34,745 exact matches. The language browser suite passes all 90 locale/route/width
combinations. Full regression, storage, standalone, migration and SW-update
scripts are included; release execution results are recorded in RELEASE_NOTES.md.

See TESTING.md for commands and precise test responsibilities. See
HISTORY-CALCULATION-AUDIT.md for reproduced rounding failures and why an epsilon
patch was rejected. A test count does not equal exhaustive mathematical proof,
professional linguistic certification or cross-browser certification.

Known scope limits: Number-based approximate geometry; unsupported PDF emoji or
supplementary characters; browser-dependent local-file IndexedDB; no protection
against a user clearing browser storage; no taxes/inventory/structural safety;
no automatic FX conversion. All currencies use hundredth-based costing.
