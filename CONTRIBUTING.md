# Contributing

Project author: Ivan Voitkov, © 2026. https://argon-studio.ru/  
Original source: https://github.com/Argonstudio/ArgonCakeCalc  
Documentation author: ChatGPT (OpenAI), in collaboration with Ivan Voitkov.
The project itself was created jointly by ChatGPT and Ivan Voitkov.

Please open an issue describing a reproducible problem before proposing a large
change. Keep fixes focused and add a regression test. Use fictional fixtures, not
customer recipes or personal data. Follow AGENTS.md and docs/AI_GUIDE.md even if
you are not using an AI assistant.

Code contributions are under the project's ArgonCakeCalc Commercial Source-Available License 1.0 license with its permitted
§7(b) attribution-preservation term. Preserve Ivan Voitkov's author credit,
copyright and original repository URL; add your own change credit rather than
replacing origin. Retain third-party font notices. Do not contribute material
you lack the rights to distribute.

For translations, edit `locales/<code>.json`, keep the same keys as Russian,
review costing/scaling terminology and upward rounding, then run both build
tools and tests. Do not add a runtime translation API. Language switching must
not translate saved ingredient names or change currency/price amounts.

Run `npm test`, `npm run test:oracle`, `npm run check` and browser tests when
applicable. Runtime does not need npm; devDependencies are for tests only.
See docs/TESTING.md for complete commands. Native-language review is particularly
welcome. Do not describe machine-assisted translations as professionally certified.
