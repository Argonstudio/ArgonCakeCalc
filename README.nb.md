# ArgonCakeCalc

**Kjenn den virkelige kostnaden før du oppgir kakeprisen.**

> **Nettsted:** **ТУТ ССЫЛКА НА САЙТ**  
> **Lisensbetaling:** **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**

[English](README.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Italiano](README.it.md) · [简体中文](README.zh.md) · [日本語](README.ja.md)

ArgonCakeCalc er et program som hjelper konditorer. Hovedfunksjoner: lage oppskrifter, lagre ingredienslister, bygge produkter, blant annet kaker i flere etasjer (med visualisering), og få beregnet selvkost og fortjeneste med en gang. Oppskrifter og produkter du har laget, kan lastes ned som PDF. Programmet fungerer lokalt, uten installasjon og uten internett.

Du trenger ingen konto, ingen abonnement og ingen skybasert database. Oppskriftene og prisene dine blir værende i nettleseren på enheten din.

## Kom i gang

Programmet er én enkelt fil. Du trenger ikke å installere noe.

1. Åpne [ArgonCakeCalc-repositoryet på GitHub](https://github.com/Argonstudio/ArgonCakeCalc) og gå til filen [`ArgonCakeCalc.html`](ArgonCakeCalc.html).
2. Klikk på nedlastingsikonet (**Download raw file**) på filsiden og lagre filen i en mappe der den kan bli liggende.
3. Åpne den lagrede filen i en moderne nettleser på datamaskin, nettbrett eller smarttelefon.

Filen inneholder allerede programmet, alle oversettelsene, stilene og PDF-skriftene, så den fungerer uten internett etter nedlasting.

Vil du ikke laste ned noe? Åpne nettstedet: **ТУТ ССЫЛКА НА САЙТ**. På en stabil HTTPS-adresse kan programmet også klargjøre seg for bruk uten nett etter første innlasting.

Grensesnittet åpnes på engelsk. Du kan bytte språk direkte i programmet: russisk, fransk, tysk, norsk bokmål, spansk, italiensk, forenklet kinesisk eller japansk.

> [!WARNING]
> **Dataene lagres i nettleseren, ikke inne i HTML-filen.** Hvis du flytter eller gir nytt navn til filen, bytter nettleser, sletter nettleserdata eller arbeider i privat modus, kan du miste tilgangen til oppskrifter og priser. Behold filen på ett sted, åpne den alltid i samme nettleser, og eksporter jevnlig en JSON-kopi. Detaljer finner du i avsnittet [Dine data og sikkerhetskopier](#dine-data-og-sikkerhetskopier).

## Hva programmet kan

- **Materialer.** Før et katalog over ingredienser, dekor, emballasje og forbruksvarer. For hver vare kan du angi pakningspris, mengde per pakning, enhet, kategori og eventuelt tetthet. Gram, kilogram, milliliter og liter støttes. Masse og volum regnes bare om til hverandre når tettheten er kjent, og stykker blir aldri automatisk omgjort til vekt.
- **Oppskrifter og komponenter.** Lag oppskrifter med utbytte, tilberedningstap, fremgangsmåte og ingredienslinjer. En komponent kan være et materiale eller en annen oppskrift: en fylling kan inneholde en krem, og kremen en sirup. Nestede oppskrifter brytes ned til råvarer, og like komponenter slås sammen til én oversiktlig innkjøpsliste. Når prisen på et materiale endres, beregnes alle oppskrifter og produkter som avhenger av det, på nytt automatisk.
- **Produktbygger.** Sett sammen et produkt av bunner, fyll, kremer, sirup, overtrekk, dekor og emballasje. Lagre produkter, dupliser dem som maler og sammenlign ulike salgspriser uten å endre den lagrede kalkylen.
- **Full selvkost.** Legg til arbeid, strøm, leveringskostnader, emballasje, andre kostnader og en reserve for svinn, og angi deretter påslag eller målmargin og om nødvendig en minste fortjeneste. Selvkosten tar bare med den delen av en pakning som faktisk er brukt, mens innkjøpslisten runder pakninger opp.
- **Skalering.** Regn om en oppskrift etter ønsket utbytte, eller etter diameter og høyde på en rund kake. Hver ingredienslinje kan skaleres proporsjonalt eller etter areal, være fast eller rundes opp til hele stykker. Kakegeometrien er et anslag og ikke en konstruksjons- eller matsikkerhetsberegning.
- **PDF, innkjøpsliste og sikkerhetskopi.** Eksporter en PDF med ingredienser, råvarer, fremgangsmåte, selvkost, anbefalt pris og mål. Last ned en innkjøpsliste til produksjonen eller for å gi den til den som forbereder bestillingen. Lagre en fullstendig JSON-kopi for å flytte data mellom nettlesere eller enheter.

## Din første beregning

Ved første oppstart kan du begynne med et tomt arbeidsområde eller en fiktiv demo. Demoen viser raskt arbeidsgangen, men prisene er eksempler og ikke faktiske markedspriser.

1. Legg inn de innkjøpsprisene du faktisk betaler.
2. Lag en oppskrift og angi utbytte og tap.
3. Sett sammen et produkt og angi mål eller antall porsjoner.
4. Legg til arbeid, strøm, emballasje og andre kostnader.
5. Sammenlign salgsprisen etter påslag og etter målmargin.
6. Eksporter en PDF og en innkjøpsliste, og lagre deretter en JSON-kopi.

## Slik beregnes prisene

- Utbytte etter tap = oppgitt utbytte × gjenværende prosent etter tap.
- Pris etter påslag = full selvkost × (1 + påslag % ÷ 100).
- Pris etter målmargin = full selvkost ÷ (1 − margin % ÷ 100).
- Anbefalt salgspris rundes opp til presisjonen i valgt valuta.
- Beregningene er nøyaktige: mellomresultater avrundes ikke for tidlig.
- Nestede oppskrifter brytes ned til mengder av råvarer.
- I innkjøpslisten rundes pakninger opp, mens selvkosten bare regner med den delen som faktisk er brukt.
- Valg av valuta endrer bare betegnelse og presisjon. Det er ingen omregning etter valutakurs.

Formler og forutsetninger er beskrevet i [beregningsreglene](docs/CALCULATIONS.md).

## Dine data og sikkerhetskopier

Materialer, oppskrifter, produkter og innstillinger lagres i nettleserens IndexedDB, separat for hver nettadresse eller filplassering. Grensesnittspråket lagres som en liten lokal innstilling. Det finnes ingen konto, analyse, skjult skysynkronisering eller serverbasert oppskriftsdatabase, og ingenting sendes uten at du selv gjør det.

Eksporter JSON-kopier jevnlig, og alltid før du flytter eller gir nytt navn til HTML-filen. Sletting av nettleserdata, privat modus, endret nettadresse, en flyttet fil eller tap av enheten kan gjøre den lokale databasen utilgjengelig. Lagring for en lokal fil (`file://`) kan oppføre seg ulikt i ulike nettlesere; for daglig bruk er en stabil HTTPS-adresse mer pålitelig. Nettleserens tillatelse til vedvarende lagring erstatter ikke en sikkerhetskopi.

## Begrensninger

PDF-en lages på enheten din, uten utskriftsdialog og uten opplasting til en server. Latinske, kyrilliske, kinesiske og japanske tegn støttes; de kinesiske og japanske skriftene gjør filen større. Emoji som ikke støttes, og sjeldne tegn kan vises som `?` i PDF-en.

Programmet har ikke lagerstyring, skattemodul, valutakurser, bestillinger, skykontoer, synkronisering mellom enheter eller konstruksjonsberegning av kakers sikkerhet. Kontroller resultatet selv før du bruker det i produksjon eller til prissetting overfor kunder.

## Lisens, prøveperiode og betaling

ArgonCakeCalc distribueres under **ArgonCakeCalc Commercial Source-Available License, versjon 1.0**. Kildekoden er åpen for gjennomsyn, men at den er offentlig synlig, gir ikke rett til å videredistribuere, underlisensiere eller publisere endrede versjoner for tredjeparter.

Før betaling kan du laste ned og bruke hele programmet gratis i **én (1) måned** for å vurdere funksjonene og om det passer for oppgavene dine. Programmet er tilgjengelig umiddelbart; aktiveringsnøkkel eller kontogodkjenning er ikke nødvendig.

Etter vellykket betaling anses den ikke-eksklusive lisensen som innvilget umiddelbart. Beløpet, fra 1 USD eller tilsvarende beløp som betalingsleverandøren viser, velger du selv, du ser det før bekreftelse, og du bestemmer frivillig. Ethvert valgt beløp, også et som er større enn du senere hadde regnet med, anses som bevisst valgt og refunderes ikke bare fordi du har ombestemt deg eller ikke lenger vil bruke programmet.

Etter at lisensen er innvilget, vurderes refusjon bare ved dobbel belastning, teknisk feil i betalingssystemet eller et annet tilfelle som loven uttrykkelig krever. Send henvendelsen til `voit.ne@gmail.com` med betalingsdato, beløp, betalerens e-postadresse og Robokassa-transaksjons-ID.

Programmet leveres **«som det er» (AS IS)**. Utvikleren garanterer ikke at det oppfyller dine konkrete forventninger, forretningsprosesser eller formål, og er i størst mulig utstrekning etter loven ikke ansvarlig for skade på virksomhet, omsetning, fortjeneste, data, omdømme eller drift. Du vurderer selv programmet og avgjør om det passer for arbeidet ditt.

Les [LICENSE](LICENSE), [NOTICE](NOTICE), [ADDITIONAL_TERMS.md](ADDITIONAL_TERMS.md) og [lisensene til tredjepartskomponenter](THIRD_PARTY.md).

## Selger og støtte

- **Selger / rettighetshaver:** selvstendig næringsdrivende Ivan Anatoljevitsj Voitkov
- **Skatte-ID:** 862203800782
- **Produkt:** ArgonCakeCalc
- **Betalingen gjelder:** ikke-eksklusiv bruksrett til programmet
- **Støtte og krav:** `voit.ne@gmail.com`
- **Betalingsside:** **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**
- **Nettsted:** **ТУТ ССЫЛКА НА САЙТ**

Betalingen er en lisensavgift, ikke en donasjon. Den fullstendige informasjonen for Robokassa og myndigheter finnes i [docs/ROBOKASSA.md](docs/ROBOKASSA.md).

## Forfatter

**Ivan Voitkov** · [forfatterens nettsted](https://argon-studio.ru/) · [GitHub](https://github.com/Argonstudio) · [repository](https://github.com/Argonstudio/ArgonCakeCalc)

Prosjektet er laget av ChatGPT (OpenAI) i samarbeid med Ivan Voitkov. Ivan Voitkov er fortsatt oppgitt som prosjektets forfatter.

---

For utviklere og bidragsytere: [DEVELOPMENT.md](DEVELOPMENT.md) (kun på engelsk).
