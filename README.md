# ArgonCakeCalc

**Know your real cost before you quote the cake.**

> **Website:** **ТУТ ССЫЛКА НА САЙТ**  
> **License payment:** **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**

[Русский](README.ru.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Norsk](README.nb.md) · [Español](README.es.md) · [Italiano](README.it.md) · [简体中文](README.zh.md) · [日本語](README.ja.md)

ArgonCakeCalc is a program that helps confectioners. Its main features: create recipes, save ingredient lists, design products, including multi-tier cakes (with visualization), and instantly get the cost and profit calculation. Created recipes and products can be downloaded as PDF. The program works locally, with no installation and no internet connection.

There is no account, no subscription and no cloud database. Your recipes and prices stay in the browser on your device.

## Quick start

The program is a single file. Nothing needs to be installed.

1. Open the [ArgonCakeCalc GitHub repository](https://github.com/Argonstudio/ArgonCakeCalc) and go to the file [`ArgonCakeCalc.html`](ArgonCakeCalc.html).
2. On the file page, click the download icon (**Download raw file**) and save the file to a folder where it will stay.
3. Open the saved file in a modern browser on a computer, tablet or smartphone.

The file contains the application, all translations, styles and PDF fonts, so it works without an internet connection after download.

Prefer not to download anything? Use the website: **ТУТ ССЫЛКА НА САЙТ**. On a stable HTTPS address the application can also prepare itself for offline use after the first load.

The interface opens in English. You can switch the language inside the application: Russian, French, German, Norwegian Bokmål, Spanish, Italian, Simplified Chinese or Japanese.

> [!WARNING]
> **Your data is stored in the browser, not inside the HTML file.** If you move or rename the file, switch to another browser, clear browser data or work in private mode, you may lose access to your recipes and prices. Keep the file in one place, always open it in the same browser, and export a JSON backup regularly. Details are in [Your data and backups](#your-data-and-backups).

## What the application does

- **Materials.** Keep a catalogue of ingredients, decorations, packaging and other supplies. For each item, enter the package price, package quantity, unit, category and, if needed, density. Grams, kilograms, millilitres and litres are supported. Mass and volume are converted only when a density is known; pieces are never silently converted into weight.
- **Recipes and components.** Create recipes with a yield, preparation loss, instructions and ingredient lines. An ingredient can be a material or another recipe, so a filling can use a cream and the cream can use a syrup. Nested recipes are expanded into raw materials, and shared components are merged into one clear list for purchasing. When a material price changes, all recipes and products that depend on it are recalculated automatically.
- **Product builder.** Combine sponges, fillings, creams, syrups, coatings, decorations and packaging into a finished product. Save products, duplicate them as templates and compare alternative selling prices without changing the saved calculation.
- **Full cost.** Add labour, electricity, delivery-related expenses, packaging, other costs and a loss allowance, then set a markup or a target profit margin and, if needed, a minimum profit. The calculation charges only for the part of a package that is actually used, while the shopping list rounds packages up.
- **Scaling.** Recalculate a recipe by the target yield, or by the diameter and height of a round cake. Each ingredient line can scale proportionally, by surface area, stay fixed or round up to whole pieces. Cake geometry is an estimation aid, not a structural or food-safety calculation.
- **PDF, shopping list and backup.** Export a PDF with ingredients, raw materials, instructions, cost, suggested price and dimensions. Download a shopping list for production or to share with the person preparing the order. Save a full JSON backup to move your data between browsers or devices.

## Your first calculation

When you open the program for the first time, you can start with an empty workspace or with a fictional demo. The demo shows the workflow quickly, but its prices are examples, not real market prices.

1. Add the package prices you actually pay.
2. Create a recipe and enter its yield and losses.
3. Assemble a product and set its dimensions or number of portions.
4. Add labour, electricity, packaging and other expenses.
5. Compare the selling price by markup and by target margin.
6. Export a PDF and a shopping list, then save a JSON backup.

## How prices are calculated

- Yield after loss = entered yield × remaining percentage after loss.
- Price by markup = full cost × (1 + markup % ÷ 100).
- Price by target margin = full cost ÷ (1 − margin % ÷ 100).
- The suggested selling price is rounded up to the precision of the selected currency.
- Calculations are exact: intermediate results are not rounded early.
- Nested recipes are expanded into raw-material quantities.
- For the shopping list, packages are rounded up. For the cost, only the fraction actually used is counted.
- Choosing a currency changes the label and the precision only. There is no exchange-rate conversion.

Formulas and assumptions are described in [calculation rules](docs/CALCULATIONS.md).

## Your data and backups

Materials, recipes, products and settings are stored in the browser's IndexedDB, separately for each site address or file location. The interface language is stored as a small local setting. There is no account, analytics, hidden cloud synchronisation or server-side recipe database, and nothing is uploaded without your action.

Export JSON backups regularly, and always before moving or renaming the HTML file. Clearing browser data, private browsing, a changed site address, a moved file or a lost device can make local data inaccessible. Browser storage for a local file (`file://`) can behave differently between browsers; a stable HTTPS address is more reliable for daily work. The browser's persistent-storage permission is not a substitute for a backup.

## Limitations

PDF files are created on your device, without a print dialog or a server upload. Latin, Cyrillic, Chinese and Japanese text is supported; the Chinese and Japanese fonts make the file larger. Unsupported emoji and rare characters may appear as `?` in a PDF.

The program does not include inventory management, tax accounting, exchange-rate conversion, orders, cloud accounts, multi-device synchronisation or structural cake-safety calculations. Check the numbers yourself before relying on them in production or in customer pricing.

## License, trial and payment

ArgonCakeCalc is distributed under the **ArgonCakeCalc Commercial Source-Available License, version 1.0**. The source code is visible for review, but public visibility does not grant permission to redistribute, sublicense or publish modified versions for third parties.

Before payment, you may download and use the full application free of charge for **one (1) month** to evaluate its features and suitability. The application is available immediately; there is no activation key or account approval.

After successful payment, the non-exclusive license is deemed granted immediately. You choose the license amount from $1 or the equivalent amount shown by the payment provider, see it before confirmation and decide voluntarily. Any amount selected by you, including an amount larger than you later expected, is treated as intentional and is not refundable merely because you changed your mind or no longer want to use the program.

After the license is granted, a refund is considered only for a duplicate charge, a payment-system technical error or another case expressly required by applicable law. Send a request to `voit.ne@gmail.com` with the payment date, amount, payer e-mail and Robokassa transaction ID.

The Software is provided **“AS IS”**. The developer does not warrant that it will meet your expectations, business processes or particular business purpose. To the maximum extent permitted by law, the developer is not liable for damage to your business, revenue, profit, data, reputation or operations. You are responsible for evaluating the program and deciding whether it is suitable for your work.

Read [LICENSE](LICENSE), [NOTICE](NOTICE), [ADDITIONAL_TERMS.md](ADDITIONAL_TERMS.md) and [third-party notices](THIRD_PARTY.md).

## Seller and support

- **Seller / copyright holder:** self-employed individual Ivan Anatolyevich Voitkov
- **Tax identification number:** 862203800782
- **Product:** ArgonCakeCalc
- **Service:** a non-exclusive right to use the software under the commercial license
- **Support and claims:** `voit.ne@gmail.com`
- **Payment page:** **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**
- **Website:** **ТУТ ССЫЛКА НА САЙТ**

Payment is a license fee, not a donation. The full Russian compliance block for Robokassa and regulatory authorities is in [docs/ROBOKASSA.md](docs/ROBOKASSA.md).

## Author

**Ivan Voitkov** · [author website](https://argon-studio.ru/) · [GitHub](https://github.com/Argonstudio) · [project repository](https://github.com/Argonstudio/ArgonCakeCalc)

The project was created by ChatGPT (OpenAI) in collaboration with Ivan Voitkov. Ivan Voitkov remains the named project author.

---

For developers and contributors: [DEVELOPMENT.md](DEVELOPMENT.md) (English only).
