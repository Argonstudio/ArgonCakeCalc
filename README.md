# ArgonCakeCalc

[English](README.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Norsk bokmål](README.nb.md) · [Español](README.es.md) · [Italiano](README.it.md) · [简体中文](README.zh.md) · [日本語](README.ja.md)

**Know your real cost before you quote a price to a customer.**

> **Live demo:** [https://argonstudio.github.io/ArgonCakeCalc/](https://argonstudio.github.io/ArgonCakeCalc/)  
> **License payment:** **ROBOKASSA PAYMENT LINK TO BE ADDED**

ArgonCakeCalc is a costing tool for confectioners. Create recipes, maintain ingredient and supply lists, assemble finished products — including multi-tier cakes with a visual preview — and calculate costs and profit as you work. Export recipes and finished products to PDF.

You choose the license price. The minimum price for a perpetual license is **$1 (USD 1.00)**. You can download and test the full application before paying. See [License, trial and payment](#license-trial-and-payment).

**Indicative local-currency equivalents for $1:** €0.89 (EUR), kr 9.25 (NOK), ¥6.67 (CNY), or ¥158 (JPY). These are approximate reference-rate conversions checked on 3 November 2026. The payment provider may show a different amount because of its exchange rate, rounding or fees; always check the amount shown before confirming payment.

There is no registration, subscription or cloud database. Your recipes and prices stay in your browser on your device. The application can run locally without installation or an internet connection.

## Quick start

The application is distributed as a single HTML file. Nothing needs to be installed.

1. Open the [ArgonCakeCalc GitHub repository](https://github.com/Argonstudio/ArgonCakeCalc) and go to [`ArgonCakeCalc.html`](ArgonCakeCalc.html).
2. On the file page, click the download icon (**Download raw file**) and save the file in a folder where you intend to keep it.
3. Open the saved file in a modern browser on your computer, tablet or smartphone.

The HTML file contains the application, all interface translations, styles and fonts used for PDF export. After downloading, it can work without an internet connection.

Prefer not to download anything? Open the website: [ArgonCakeCalc website](https://argonstudio.github.io/ArgonCakeCalc/shop/). On a stable HTTPS address, the application can also prepare itself for offline use after the first load.

The interface opens in English. You can switch to Russian, French, German, Norwegian Bokmål, Spanish, Italian, Simplified Chinese or Japanese directly in the application.

For developers: the program can be modified and rebuilt. See [DEVELOPMENT.md](DEVELOPMENT.md) (English only). An AI coding assistant can help you explore the code and make changes.

> [!WARNING]
> **Your data is stored in the browser, not inside the HTML file.** If you move or rename the file, switch browsers, clear browser data or use private browsing, you may lose access to your recipes and prices. Keep the file in one place, always open it in the same browser, and export a JSON backup regularly. See [Your data and backups](#your-data-and-backups).

## What the application does

- **Materials.** Maintain a catalogue of ingredients, decorations, packaging and consumables. For each item, enter the package price, quantity per package, unit, category and, when needed, density. Grams, kilograms, millilitres and litres are supported. Mass and volume are converted only when a density is known; pieces are never automatically converted into weight.
- **Recipes and components.** Create recipes with a yield, preparation losses, instructions and ingredient lines. A component can be a material or another recipe: a filling can include a cream, and a cream can include a syrup. Nested recipes are expanded into their underlying materials, while repeated components are combined into one clear shopping list. When a material price changes, all dependent recipes and products are recalculated automatically.
- **Product builder.** Assemble a finished product from cake layers, fillings, creams, soaks, coatings, decorations and packaging. Save products, duplicate them as templates and compare alternative selling prices without changing the saved calculation.
- **Full cost.** Add labour, electricity, delivery expenses, packaging, other costs and a loss allowance. Then set a markup or target profit margin and, if needed, a minimum profit. Only the portion of a package actually used is included in the cost; package quantities in the shopping list are rounded up.
- **Scaling.** Recalculate a recipe for a target yield or for the diameter and height of a round cake. Each ingredient line can scale proportionally, by surface area, remain fixed or be rounded up to whole pieces. Cake geometry is an auxiliary estimate, not an engineering calculation of structural strength or food safety.
- **PDF, shopping list and backup.** Export a PDF containing ingredients, raw materials, instructions, cost, suggested price and dimensions. Download a shopping list for production or to share with the person preparing an order. Save a complete JSON backup to move your data between browsers or devices.

## Your first calculation

On first launch, you can start with an empty workspace or load a fictional demo. The demo quickly explains the workflow, but its prices are illustrative and do not represent actual market prices.

1. Add the purchase prices you actually pay.
2. Create a recipe and enter its yield and losses.
3. Assemble a product and set its dimensions or number of portions.
4. Add labour, electricity, packaging and other expenses.
5. Compare the selling price calculated by markup and by target margin.
6. Export a PDF and shopping list, then save a JSON backup.

## How prices are calculated

- Yield after losses = entered yield × the percentage remaining after losses.
- Price by markup = full cost × (1 + markup % ÷ 100).
- Price by target margin = full cost ÷ (1 − margin % ÷ 100).
- The suggested price is rounded up to the precision of the selected currency.
- Calculations are precise: intermediate results are not rounded in advance.
- Nested recipes are expanded into the quantities of their underlying materials.
- In the shopping list, package quantities are rounded up; in the cost calculation, only the portion actually used is counted.
- Selecting a currency changes its symbol and precision only. No exchange-rate conversion is performed.

Formulas and assumptions are documented in [the calculation rules](docs/CALCULATIONS.md).

## Your data and backups

Materials, recipes, products and settings are stored in the browser's IndexedDB, separately for each website address or file location. The interface language is stored in a small local setting. There is no account, analytics, hidden cloud synchronisation or server-side recipe database. Nothing is sent anywhere without an action you take.

Export JSON backups regularly, and always do so before moving or renaming the HTML file. Clearing browser data, private browsing, changing the website address, moving the file or losing the device can make the local database inaccessible. Storage for a local file (`file://`) may behave differently in different browsers; for regular use, a stable HTTPS address is more reliable. Enabling persistent browser storage does not replace backups.

## Limitations

PDF files are generated on your device, without opening a print dialog or uploading anything to a server. Latin, Cyrillic, Chinese and Japanese text is supported. The Chinese and Japanese fonts increase the application file size. Unsupported emoji and rare characters may appear as `?` in PDF files.

The application does not include inventory management, tax accounting, exchange-rate conversion, order management, cloud accounts, synchronisation between devices or engineering calculations of cake safety. Check the results yourself before using them in production or quoting a price to a customer.

## License, trial and payment

ArgonCakeCalc is distributed under the **ArgonCakeCalc Commercial Source-Available License, version 1.0**. The source code is publicly available for inspection, but public visibility does not grant permission to redistribute, transfer or publish modified versions for third parties. You may modify the application for your own personal use.

Before paying, you may download and use the full application free of charge for **one (1) month** to evaluate its features and decide whether it suits your needs. The application is available immediately; no activation key or account confirmation is required.

After successful payment, the non-exclusive license is deemed granted immediately. You choose the license amount, starting at **$1 (USD 1.00)** or the equivalent amount shown by the payment provider. You can see the amount before confirming and make the decision voluntarily. Any amount you select, including an amount higher than you later expected, is treated as intentional and is not refundable merely because you change your mind or stop using the application.

Indicative equivalents for the $1 minimum, based on reference rates checked on 3 November 2026: **€0.89 (EUR), kr 9.25 (NOK), ¥6.67 (CNY), ¥158 (JPY)**. These figures are not a payment quote. The provider's displayed amount and terms apply at checkout.

After the license has been granted, a refund is considered only in the event of a duplicate charge, a payment-system technical error or another case expressly required by applicable law. Send requests to `voit.ne@gmail.com`, including the payment date, amount, payer's e-mail address and Robokassa transaction ID.

The application is provided **“AS IS”**. The developer does not guarantee that it will meet particular expectations, business processes or a user's intended purpose and, to the maximum extent permitted by law, is not liable for damage to a business, revenue, profit, data, reputation or operations. You are responsible for checking the application and deciding whether it is suitable for your needs.

Read [LICENSE](LICENSE), [NOTICE](NOTICE), [ADDITIONAL_TERMS.md](ADDITIONAL_TERMS.md) and [third-party component licences](THIRD_PARTY.md).

## Seller and support

- **Seller / copyright holder:** self-employed individual Ivan Anatolyevich Voitkov
- **Tax identification number (INN):** 862203800782
- **Software product:** ArgonCakeCalc
- **Payment purpose:** granting a non-exclusive right to use the application under a commercial license
- **Support and enquiries:** `voit.ne@gmail.com`
- **Payment page:** **ROBOKASSA PAYMENT LINK TO BE ADDED**
- **Service website:** https://argonstudio.github.io/ArgonCakeCalc/shop/

Payment is a license fee, not a donation. The full information block for Robokassa and regulatory authorities is in [docs/ROBOKASSA.md](docs/ROBOKASSA.md).

## Author

**Ivan Voitkov** · [author's website](https://argon-studio.ru/) · [GitHub](https://github.com/Argonstudio) · [project repository](https://github.com/Argonstudio/ArgonCakeCalc)

ChatGPT (OpenAI) is a co-author. My thanks to the developers of this remarkable tool.
