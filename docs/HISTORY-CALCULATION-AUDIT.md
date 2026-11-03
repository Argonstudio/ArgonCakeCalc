# Retained calculation audit and fixes

Documentation author: ChatGPT (OpenAI), with Ivan Voitkov.
Project author © 2026 Ivan Voitkov — https://github.com/Argonstudio/ArgonCakeCalc

The predecessor CakeCalc 1.0.0 used 12-place fixed-point intermediate division.
A review supplied by the project author reported an extra procurement pack.
ChatGPT independently reproduced it and found an additional piece-scaling bug.
These were fixed in CakeCalc 1.0.1. ArgonCakeCalc 1.0.0 retains those fixes;
the new public version/name does not undo the audit.

## Procurement reproduction

Material: one 6 g pack, price 60. Recipe: 6 g material, usable yield 6 g.
Product uses the recipe three times: 4 g, 1 g and 1 g.
Old propagated quantity: 6.000000000006 g, so ceil required 2 packs.
Correct exact result: 6 g, cost 60, 1 pack. The result was verified in the actual
UI and downloaded PDF, not just a unit calculation.

Rounding the ratio to 9 decimal places before ceil was rejected: a true
6.000000001 g consumption in a 6 g pack can be incorrectly rounded down to one
pack. The fix uses exact rational BigInts, retaining true excess even at 1e-12 g.

## Piece scaling reproduction

Six pieces for a yield of 6, scaled to yield 4: exact 6 × 4/6 = 4 pieces.
An intermediate rounded 0.666666666667 factor produced 5 after ceil in the old
implementation. Exact fractions now give 4. A real 4.000000001 still rounds to 5.
Diameter 3 → 2 with nine pieces similarly gives exactly 4, not 5.

Regressions include 700 g divided into 400+200+100 uses, density conversions,
3000 repeated component lines at a high stress-test price, half-cent boundaries,
exact repeating unit costs and genuine micro-excess.

## Independent check

A separate Python fractions.Fraction implementation uses independently written
formulas and recursive expansion, while production uses iterative DAG evaluation.
The Node bridge returns actual numerator/denominator results only; expected
values are not taken from production. 200 deterministic random databases,
2400 recipes and 600 products yield 34,745 exact comparisons for units, losses,
costs, profit/margins, per-kg/per-portion, expanded quantities and pack ceilings.
All match. This is substantial evidence within those fixtures, not certification
that every possible input, browser or approximation is error-free.
