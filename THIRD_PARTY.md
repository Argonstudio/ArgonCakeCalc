# Third-party notices

## PDF Latin/Cyrillic font

`assets/pdf-font.js` contains CakeCalc Sans, a renamed subset of Liberation Sans.
SIL Open Font License 1.1. The original copyright, license and reserved-font-name
notices are included in the asset and in `docs/FONT-LICENSE.txt`.
The GPL license for application code does not replace the font's OFL license.

## PDF Chinese/Japanese font

`assets/pdf-font-cjk.js` contains Argon Cake CJK, derived from Noto Sans SC Regular
by subsetting BMP characters and converting outlines to TrueType for the local
PDF writer. The original font copyright is © 2014–2021 Adobe; Noto is the Adobe/Google
font project. The original copyright notice is preserved in the asset, embedded
font metadata and `docs/NOTO-OFL.txt`. SIL Open Font License 1.1. The derived family is renamed
Argon Cake CJK. The font is embedded, not fetched from Google or any CDN.
It supports 30,445 BMP characters; emoji and unsupported supplementary characters
are not guaranteed and are replaced with a question mark in PDF.

## Translation preparation

Translations are machine-assisted, with ChatGPT terminology and formula review.
Static UI strings were translated during release preparation; no recipe,
ingredient, price or user database was sent to a translation service.
All committed catalogs are bundled locally. Running, rebuilding and testing the
release do not need any translation service or API. Native-speaker review is
welcome; the translations are not professionally certified.

## Earlier project name

The predecessor CakeCalc carried an MIT notice. That historical notice is
retained in `docs/HISTORICAL-MIT.txt`; previously granted rights are not revoked.
The current application code is released as GPL-3.0-only with the permitted
attribution-preservation term in `ADDITIONAL_TERMS.md`.
