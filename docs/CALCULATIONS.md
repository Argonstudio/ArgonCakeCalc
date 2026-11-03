# Calculation rules and rounding

Documentation author: ChatGPT (OpenAI), with Ivan Voitkov.
Project author © 2026 Ivan Voitkov. Source: https://github.com/Argonstudio/ArgonCakeCalc

## Units and source quantities

1 kg = 1000 g; 1 l = 1000 ml. Conversion first normalizes to g/ml/pcs.
Mass ↔ volume requires positive density in g/ml on the referenced source:
`mass = volume × density`, `volume = mass / density`. Pieces cannot convert to
mass or volume. Recipe density describes its finished output; it is not inferred
by adding incompatible ingredient units.

A material with pack quantity Q and pack price P costs `q / Q × P` for quantity q
converted to its pack unit. A zero price is allowed, a zero pack size is not.
Changing pack price causes dependent recipe/product costs to be recomputed.

## Recipes and expanded materials

The entered recipe output Y is before losses. Net yield:
`Ynet = Y × (1 − loss / 100)`. Allowed loss: 0..99.99%, with a usable positive
output at display precision. Batch cost = sum of input line costs.
Unit cost = batch cost / net yield. Using q units costs `q / Ynet × batch cost`.
All recipe inputs and yields refer to one batch.

Nested recipes form a DAG. Production evaluates costs topologically and expands
quantities in reverse topological order, merging repeated materials. There is
no epsilon rounding at any step. Pack count = exact `ceil(consumed / packQty)`.
Pack count assumes no stock on hand; it is not inventory accounting. The full
price of rounded purchasing packs is NOT substituted for consumed material cost.

## Product costs and sale price

Let M be exact material cost and l the enabled additional loss reserve percent:
`reserve = M / (1 − l/100) − M`, otherwise zero. It is a monetary reserve, not
additional quantities in the expanded material list. Recipe losses are already
in component unit costs; do not count them twice.

Enabled labour, energy and other amounts add to expenses E.
`C = roundHalfUp(M + reserve + E, 2)` is full cost.

- Markup rate r: `price = C × (1 + r / 100)`.
- Target margin r: `price = C / (1 − r / 100)`, r < 100.
- If desired minimum profit D is enabled: `price = max(price, C + D)`.
- Suggested selling price S = `ceil(price, 2)`.
- Profit = S − C; actual markup = profit / C × 100 when C > 0.
- Actual profit margin = profit / S × 100 when S > 0.
- Cost/kg = C / finished grams × 1000, only if mass is known.
- Cost/portion = C / positive integer portions.

Undefined percentages/mass-based metrics display a dash, not an invented zero.
Financial rounding consistently uses 2 places, including JPY, for costing
precision. Currency selection is a label/format choice, never FX conversion.

## Scaling

Changing a yield field alone does not scale composition. The explicit command
uses factor `f = newYield / oldYield`, in the same output unit. For a recipe,
yield before loss scales and the loss percentage stays unchanged.

Per-line rules: proportional × f; fixed unchanged; pieces × f then exact ceil;
surface × area factor. On yield-based scaling, the surface factor is f^(2/3)
and dimensions use cbrt(f), calculated approximately with Number.

For round forms: f = (newDiameter/oldDiameter)^2 × (newHeight/oldHeight).
All tiers scale by the same diameter and height ratios. Surface scaling uses
exposed top area plus sidewalls of all tiers; bottom is excluded. For centered
tiers without overhangs, exposed horizontal area equals the bottom disk area.
This is a coating estimate, not an arbitrary decoration or underside model.
Saved quantities round half-up to 6 places and dimensions to 3. Portions round
up. Labour/other fixed costs are not automatically scaled.

## Cake geometry

Round tier volume = πd²h/4; square tier volume = a²h. Estimated weight = volume ×
entered average cake density. Tier numbering starts at the bottom. Heights add;
step-back is horizontal space on each side. The silhouette uses the same scale
on both axes and is not a 3D model. Target tier count and current tier count are
separate. Changing fitting parameters does not change manual tiers until Fit.
A fit uses at least 1 cm for the top tier and rejects impossible target weights.

Geometry is approximate. It does not calculate supports, structure, food safety,
recipe-specific aeration, taxes or stock. Taking yield from geometry changes
yield, not ingredient quantities; scaling composition is a separate action.
