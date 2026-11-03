# Development and customization guide

[![Tests](https://github.com/Argonstudio/ArgonCakeCalc/actions/workflows/ci.yml/badge.svg)](https://github.com/Argonstudio/ArgonCakeCalc/actions/workflows/ci.yml)

This guide is for developers and for people who customize their own copy of ArgonCakeCalc, including with an AI coding assistant. It is written in English only.

**If you just want to use the program, you do not need this guide.** Download the single file `ArgonCakeCalc.html` and open it in a browser, as described in the [README](README.md).

ArgonCakeCalc is distributed under a commercial **source-available** license: the source code is public for review, but that does not grant permission to redistribute it or to publish modified versions for third parties. See [Licensing and attribution](#licensing-and-attribution) before you change or share anything.

## Repository overview

- `ArgonCakeCalc.html` — generated one-file distribution for end users. Do not edit it manually: the next build overwrites manual changes.
- `index.html` — application shell and page structure.
- `assets/` — JavaScript modules, styles, fonts and application logic.
- `locales/` — translation catalogues.
- `manifest.webmanifest`, `sw.js` and `tools/sw-template.js` — installability and hosted offline support.
- `tools/` — locale, standalone-file and service-worker build tools.
- `tests/` — unit, browser, portability and build checks.
- `docs/` — architecture, calculation, publishing and testing notes.
- `shop/` — the static Robokassa information and payment page.

For a normal change, edit the source files, rebuild the generated outputs, run the tests and inspect the result in a browser.

## Ways to run the application

- **Standalone file.** Open `ArgonCakeCalc.html` directly in a browser. It contains the application, translations, styles, PDF fonts and the local data layer. Browser storage for `file://` can vary between browsers.
- **Static hosting.** The application can be hosted as a static site, for example on GitHub Pages. On a stable HTTPS host the service worker can prepare the application for offline use after the initial resources have loaded.
- **Local preview server.** For development, serve the repository root with any static server:

  ```sh
  python -m http.server 8093
  # open http://localhost:8093/
  ```

  Python is used here only to serve static files. It is not an application backend, and the application has no runtime backend or external API.

Test the one-file distribution as well by opening `ArgonCakeCalc.html` directly.

## Build and test workflow

From the repository root:

```sh
python tools/build-locales.py
python tools/build-standalone.py
npm test
python tests/build.test.py
```

In CI and before committing generated files, use the consistency checks:

```sh
python tools/build-locales.py --check
python tools/build-standalone.py --check
```

The build regenerates `ArgonCakeCalc.html` and `sw.js`. Always rebuild after changing sources, translations or embedded assets: a stale `ArgonCakeCalc.html` does not contain your changes.

## Localization

Add or update a catalogue in `locales/`, then run `python tools/build-locales.py`. Keep message keys consistent with the other catalogues, test the language in the application and rebuild the standalone file. The default interface language is English; the language selector lets users switch to the other available localizations.

## Calculation engine

Money and quantities are calculated with exact rational arithmetic; intermediate divisions are not rounded prematurely. Suggested selling prices are rounded upward to the selected currency precision. Purchasing quantities round packages upward, while consumed cost stays fractional. The full list of formulas and assumptions is in `docs/CALCULATIONS.md`.

## Data and compatibility

The application stores working data locally in the browser (IndexedDB), plus the interface language as a small local preference. Changes to storage keys, serialized records or the import/export format can affect existing user data. Add migration logic and regression tests before changing those structures. Do not send recipes, prices or backups to a new remote service without an explicit product and privacy decision.

## AI-assisted development

An AI coding assistant can help with feature requests, bug fixes, translations, UI improvements and documentation. Give it this repository and ask it to read `AGENTS.md`, this guide and the relevant documents in `docs/` before editing.

A useful request describes:

1. the user problem and the expected result;
2. the affected screen, language or calculation;
3. whether backward compatibility with existing saved data is required;
4. the acceptance criteria and examples;
5. which files may be changed.

Ask the assistant to preserve the local-first architecture, avoid external runtime dependencies, keep user data in the browser, update translations and tests, and explain any migration or privacy impact. Never accept an unreviewed change to financial calculations, storage migrations, licensing text or payment pages.

## Licensing and attribution

Read [`LICENSE`](LICENSE), [`ADDITIONAL_TERMS.md`](ADDITIONAL_TERMS.md), [`NOTICE`](NOTICE) and [`COPYING`](COPYING) before sharing anything or changing the licensing model. The source-available commercial license, attribution requirement, author information and payment terms are part of the repository contract. The license does not allow publishing modified versions for third parties. Do not replace the license, payment wording or legal identity data through an automated edit without reviewing the legal consequences.

## Checking your changes

Changes are for your own use of the program; the license does not allow publishing modified versions for third parties. Before you rely on a modified copy:

1. Rebuild the generated files and run the full checks (see [Build and test workflow](#build-and-test-workflow)).
2. Open the rebuilt `ArgonCakeCalc.html` directly in a browser and confirm that it works offline.
3. Check every interface language you use, and the calculations your change touches, against known examples.
4. Export a JSON backup from your existing data first, then confirm that it still imports into the modified copy.
