# ArgonCakeCalc

**Know your cost before you quote the cake.**

[![Tests](https://github.com/Argonstudio/ArgonCakeCalc/actions/workflows/ci.yml/badge.svg)](https://github.com/Argonstudio/ArgonCakeCalc/actions/workflows/ci.yml) · [![Live app](https://img.shields.io/badge/live_app-TODO-246b70)](#try-it)

> **Live website:** **ТУТ ССЫЛКА НА САЙТ**  
> **License payment:** **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**

[Русский](README.ru.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Norsk](README.nb.md) · [Español](README.es.md) · [Italiano](README.it.md) · [简体中文](README.zh.md) · [日本語](README.ja.md)

[Информация для Robokassa и контролирующих органов](docs/ROBOKASSA.md#информация-для-robokassa-и-контролирующих-органов)

ArgonCakeCalc is a private, offline-first workspace for confectioners. Enter your purchase prices once, build nested recipes, scale a cake, see the true cost, prepare a shopping list and export a clean PDF — without an account or a cloud database.

## Why try it?

- **From ingredient to selling price:** materials, recipes, products, labour, energy, losses and target margin in one flow.
- **A calm local workspace:** your recipes and prices stay in the browser on your device.
- **Fast first result:** start with demo data or an empty workspace and build a calculation in minutes.
- **Useful exports:** recipe/product PDFs, JSON backups and shareable shopping lists.
- **Works for real workshops:** gram, kilogram, millilitre, litre and piece-based materials; nested components; cake scaling by yield or round-form dimensions.
- **Nine interface languages:** English, Russian, French, German, Norwegian, Spanish, Italian, Simplified Chinese and Japanese.

## Try it

### Live website

Open **ТУТ ССЫЛКА НА САЙТ** when the hosted site is published. The app is static and can run on GitHub Pages or another HTTPS host. GitHub Pages publishes static HTML, CSS and JavaScript directly from a repository.

### One-file offline build

Download [`ArgonCakeCalc.html`](ArgonCakeCalc.html) and open it in a modern browser. It includes the interface, styles and PDF fonts. Export a JSON backup before moving or renaming the file; browser storage for `file://` varies between browsers.

### From source

```sh
python -m http.server 8093
# open http://localhost:8093
```

No Node.js, Python or framework is needed for everyday use. The commands above are only for local development.

## A typical workflow

1. Add materials with pack price, quantity and unit.
2. Build recipes from materials and other recipes.
3. Assemble a product from sponges, fillings, cream, decorations and packaging.
4. Scale the product by yield or round-form diameter and height.
5. Add labour, energy, other expenses, loss allowance and a target margin.
6. Export a PDF for the customer or a shopping list for production.

The demo workspace is fictional. It never represents current market prices.

## Privacy and backups

Working data is stored in IndexedDB on the current browser origin. There is no account, analytics, silent cloud sync or external runtime API. Export JSON backups regularly: clearing browser data, private browsing, changing the site address or losing the device can make local data inaccessible.

## License and payment

ArgonCakeCalc is distributed under the **ArgonCakeCalc Commercial Source-Available License, version 1.0**. The source is visible for review, but public visibility does not grant permission to use, compile for distribution, sublicense or redistribute the software without a valid paid license.

The license fee is **pay what you can from $1** (or the equivalent amount shown by the payment provider). Pay through **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**. Keep the payment receipt or provider confirmation. The license and mandatory consumer rights govern use, support and legally required claims.

Read [LICENSE](LICENSE), [NOTICE](NOTICE), [ADDITIONAL_TERMS.md](ADDITIONAL_TERMS.md) and [third-party notices](THIRD_PARTY.md) before redistribution or modification.

## Author

**Ivan Voitkov** · [author website](https://argon-studio.ru/) · [GitHub](https://github.com/Argonstudio) · [project repository](https://github.com/Argonstudio/ArgonCakeCalc)

The project was created by ChatGPT (OpenAI) in collaboration with Ivan Voitkov. Ivan Voitkov remains the named project author.

## Support and legal information

Support, payment questions and legally required claims: `voit.ne@gmail.com`.

**Продавец / правообладатель:** self-employed individual Иван Войтков / Войтков Иван Анатольевич  
**ИНН:** 862203800782  
**Программный продукт:** ArgonCakeCalc  
**Предмет оплаты:** предоставление неисключительного права использования программного обеспечения по коммерческой лицензии  
**Страница оплаты:** `ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA`  
**Рабочий сайт:** `ТУТ ССЫЛКА НА САЙТ`  
**Support and claims:** `voit.ne@gmail.com`

### Trial, license grant and refund policy

Before payment, you may download and use the full version of ArgonCakeCalc free of charge for **one (1) month** to evaluate its functionality and fitness for your purposes. The program is available immediately; payment is not required to download or open it during the trial.

After successful payment, the non-exclusive license is deemed granted immediately. No activation key, account approval or additional delivery is required. You choose the payment amount from $1 or the equivalent amount shown by the provider, see it before confirmation and make the payment voluntarily. Any amount selected by you, including an amount higher than you later expected, is treated as intentional and is not refundable solely because you changed your mind or no longer want to use the Software.

After the license is granted, a refund is considered only for a duplicate charge, a payment-system technical error, or another case expressly required by applicable law. Send requests to `voit.ne@gmail.com` with the payment date, amount, payer e-mail and Robokassa transaction ID.

The Software is provided **“AS IS”**. The developer does not warrant that it will meet your expectations, business processes or particular business purpose and, to the maximum extent permitted by law, is not liable for any damage to your business, revenue, profit, data, reputation or operations. You are responsible for testing the Software and deciding whether it is suitable for your purposes.

Оплата является лицензионным платежом, а не пожертвованием. Полный русский блок
для Robokassa находится в [docs/ROBOKASSA.md](docs/ROBOKASSA.md).
