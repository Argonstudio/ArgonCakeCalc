# AI contributor instructions — ArgonCakeCalc

Documentation author: **ChatGPT (OpenAI)**, written in collaboration with
**Ivan Voitkov**. The project was created by ChatGPT in collaboration with Ivan
Voitkov. Project author: **Ivan Voitkov**, copyright 2026.

- Author website: https://argon-studio.ru/
- Author GitHub: https://github.com/Argonstudio
- Original repository: https://github.com/Argonstudio/ArgonCakeCalc

## Mandatory attribution and license preservation

Preserve Ivan Voitkov's copyright, author credit and original project URL in
source notices, NOTICE, README files and the app's accessible legal attribution.
These are reasonable origin/author notices under GPLv3 §7(b); see
ADDITIONAL_TERMS.md. Do not silently replace the original author/repository with
an AI tool, a fork author, a deployer or another project such as ArgonShop.
You may add modification authors and dates; do not imply endorsement.
Do not replace GPL-3.0-only with a permissive license. Keep OFL font notices and
the historical MIT notice where applicable. Do not add incompatible restrictions.

## Read before editing

Read `docs/AI_GUIDE.md`, `docs/ARCHITECTURE.md`, `docs/CALCULATIONS.md`,
`docs/DATA-FORMAT.md`, `docs/I18N.md` and `docs/TESTING.md`.

1. Run the existing tests before and after changes. Add regression tests for bugs.
2. Keep calculation logic in core/geometry, not duplicated in the UI or PDF.
3. Do not replace exact rational BigInt arithmetic with floating-point money.
4. Do not add epsilon rounding before pack/piece ceilings. True tiny excess must
   still require the next pack/piece.
5. Never overwrite user data with an empty database after a load/migration error.
6. Preserve schema migrations, revision-conflict checks, validation, backup prompts
   and previous-snapshot behavior. Keep the legacy `CakeCalc` data marker and
   IndexedDB name unless an explicit, tested data migration changes them.
7. Keep application code offline and local. No analytics, remote fonts, login,
   translation APIs, recipe uploads or runtime CDN dependencies.
8. Translate only source-code literals. Never translate user-entered text or
   run translated text as code. Escape user values before HTML interpolation.
9. Any new UI/error/PDF literal needs all nine catalogs. Language selection must
   not change existing prices, currency or user names.
10. Rebuild locales and standalone/SW, then run both `--check` commands. Publish
    the complete generated release, not only edited source assets.
11. Test 1440 px and 390 px, long German/French labels, CJK PDFs, errors and both
    color schemes. Do not claim tests you did not execute.
12. Keep AI-facing documentation in English. Keep the English and Russian human
    READMEs accurate and consistent with actual features and limitations.

## Interface invariants (1.0.0 refinements)

- Default to English on first launch, not the browser locale. Preserve saved language choices.
- Seed material categories in English; never automatically rename existing user categories or records.
- Keep the visual wordmark АргонТорт in Cyrillic in all languages (the project/repository name remains ArgonCakeCalc).
- Use the offline Intl-based date picker, not the OS-dependent native calendar.
- Keep mobile navigation collapsed with an accessible hamburger and render composition/procurement as labeled cards using one set of controls.
- Keep select arrows inset 5px and run tests/ui-refinements.test.cjs.

## Numeric input and help invariants

- Empty zero-allowed numeric input is a committed zero, not an invalid draft that freezes the whole product. Preserve empty optional density as unknown.
- Required positive values and negative expenses must still validate strictly. Do not weaken core/import validation.
- Keep every visible editable field associated with a visible localized hint. Keep the four modal topics available with keyboard and touch.
- Run tests/help-expenses.test.cjs for the exact 245 → 255 → 246 → 245 regression, cross-field editing, reload persistence, all-form hint coverage, and unchanged ingredients under geometry-only commands.
