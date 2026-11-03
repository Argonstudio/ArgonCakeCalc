# ArgonCakeCalc

[English](README.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Norsk bokmål](README.nb.md) · [Español](README.es.md) · [Italiano](README.it.md) · [简体中文](README.zh.md) · [日本語](README.ja.md)

**Kjenn de faktiske kostnadene før du oppgir en pris til kunden.**

> **Dire demo:** [https://argonstudio.github.io/ArgonCakeCalc/](https://argonstudio.github.io/ArgonCakeCalc/)  
> **Lisensbetaling:** **LENKE TIL ROBOKASSA-BETALING LEGGES TIL SENERE**

ArgonCakeCalc er et kalkuleringsverktøy for konditorer. Opprett oppskrifter, hold oversikt over ingrediens- og utstyrslister, sett sammen ferdige produkter – også kaker med flere etasjer og visuell forhåndsvisning – og beregn kostnader og fortjeneste underveis. Oppskrifter og ferdige produkter kan eksporteres som PDF.

Du bestemmer selv lisensprisen. Minsteprisen for en evigvarende lisens er **1 USD (9,24 NOK etter gjeldende valutakurs)**. Du kan laste ned og teste hele programmet før du betaler. Se delen [Lisens, prøveperiode og betaling](#lisens-prøveperiode-og-betaling).

NOK-beløpet i parentes er beregnet ut fra referansekurser kontrollert 3. november 2026. Betalingsleverandøren kan vise et annet beløp på grunn av egen valutakurs, avrunding eller gebyrer. Kontroller alltid beløpet som vises før du bekrefter betalingen.

Du trenger ingen registrering, abonnement eller skybasert database. Oppskriftene og prisene dine blir værende i nettleseren på enheten din. Programmet kjører lokalt, uten installasjon og uten internettilkobling.

## Hurtigstart

Programmet består av én HTML-fil. Det er ikke nødvendig å installere noe.

1. Åpne [ArgonCakeCalc-repositoriet på GitHub](https://github.com/Argonstudio/ArgonCakeCalc), og gå til filen [`ArgonCakeCalc.html`](ArgonCakeCalc.html).
2. Klikk på nedlastingsikonet (**Download raw file**) på filsiden, og lagre filen i en mappe der den skal ligge fast.
3. Åpne den lagrede filen i en moderne nettleser på datamaskinen, nettbrettet eller smarttelefonen.

Filen inneholder programmet, alle oversettelsene av grensesnittet, stilarkene og skriftene som brukes i PDF-filer. Etter nedlasting kan den fungere uten internettilkobling.

Vil du helst slippe å laste ned noe? Åpne nettstedet: [ArgonCakeCalc-nettstedet](https://argonstudio.github.io/ArgonCakeCalc/shop/). På en stabil HTTPS-adresse kan programmet også klargjøres for bruk uten nett etter første innlasting.

Grensesnittet åpnes på engelsk. Du kan bytte til russisk, fransk, tysk, norsk bokmål, spansk, italiensk, forenklet kinesisk eller japansk direkte i programmet.

For utviklere: Programmet kan tilpasses og bygges på nytt. Se [DEVELOPMENT.md](DEVELOPMENT.md) (bare på engelsk). En AI-kodeassistent kan hjelpe deg med å utforske koden og gjøre endringer.

> [!WARNING]
> **Dataene lagres i nettleseren, ikke i HTML-filen.** Hvis du flytter eller gir filen nytt navn, bytter nettleser, sletter nettleserdata eller bruker privat modus, kan du miste tilgangen til oppskriftene og prisene dine. Oppbevar filen på ett fast sted, åpne den alltid i samme nettleser, og eksporter en JSON-sikkerhetskopi regelmessig. Se delen [Dataene dine og sikkerhetskopier](#dataene-dine-og-sikkerhetskopier).

## Hva programmet kan gjøre

- **Materialer.** Hold oversikt over ingredienser, dekor, emballasje og forbruksvarer. For hver vare angir du pakkepris, mengde i pakken, måleenhet, kategori og eventuelt tetthet. Gram, kilogram, milliliter og liter støttes. Masse og volum konverteres bare når tettheten er kjent; stykk konverteres aldri automatisk til vekt.
- **Oppskrifter og komponenter.** Opprett oppskrifter med utbytte, svinn under tilberedning, instruksjoner og ingredienslinjer. En komponent kan være et materiale eller en annen oppskrift: Et fyll kan inneholde en krem, og kremen kan inneholde en sirup. Oppskrifter som er bygget inn i hverandre, brytes ned til råmaterialene, og like komponenter samles i én oversiktlig handleliste. Når prisen på et materiale endres, beregnes alle tilknyttede oppskrifter og produkter automatisk på nytt.
- **Produktbygger.** Sett sammen et ferdig produkt av kakebunner, fyll, kremer, dynking, trekk, dekor og emballasje. Lagre produkter, dupliser dem som maler, og sammenlign alternative salgspriser uten å endre den lagrede kalkylen.
- **Full kostnad.** Legg til arbeid, strøm, leveringskostnader, emballasje, andre utgifter og en reserve for svinn. Angi deretter et påslag eller en ønsket fortjenestemargin og eventuelt en minste fortjeneste. Bare den delen av en pakke som faktisk brukes, tas med i kostnaden; antall pakker på handlelisten rundes opp.
- **Skalering.** Beregn en oppskrift på nytt ut fra ønsket mengde eller diameter og høyde på en rund kake. Hver ingredienslinje kan skaleres proporsjonalt, etter areal, holdes fast eller rundes opp til hele stykk. Kakens geometri er et hjelpemiddel for overslag, ikke en teknisk beregning av bæreevne eller matsikkerhet.
- **PDF, handleliste og sikkerhetskopi.** Eksporter en PDF med ingredienser, råvarer, instruksjoner, kostnad, anbefalt pris og mål. Last ned en handleliste til produksjonen eller del den med personen som forbereder bestillingen. Lagre en fullstendig JSON-sikkerhetskopi for å flytte data mellom nettlesere eller enheter.

## Din første beregning

Ved første oppstart kan du begynne med et tomt arbeidsområde eller bruke en fiktiv demo. Demoen viser arbeidsflyten raskt, men prisene er eksempler og gjenspeiler ikke faktiske markedspriser.

1. Legg inn de faktiske innkjøpsprisene dine.
2. Opprett en oppskrift, og angi utbytte og svinn.
3. Sett sammen et produkt, og angi mål eller antall porsjoner.
4. Legg til arbeid, strøm, emballasje og andre kostnader.
5. Sammenlign salgsprisen beregnet med påslag og ønsket margin.
6. Eksporter PDF og handleliste, og lagre deretter en JSON-sikkerhetskopi.

## Slik beregnes prisene

- Utbytte etter svinn = angitt utbytte × prosentandelen som er igjen etter svinn.
- Pris med påslag = full kostnad × (1 + påslag % ÷ 100).
- Pris etter ønsket margin = full kostnad ÷ (1 − margin % ÷ 100).
- Anbefalt pris rundes opp til presisjonen for den valgte valutaen.
- Beregningene er nøyaktige: mellomresultater rundes ikke av på forhånd.
- Oppskrifter som inngår i andre oppskrifter, brytes ned til mengdene av de opprinnelige materialene.
- På handlelisten rundes pakker opp; i kostnaden tas bare den delen som faktisk er brukt, med.
- Valg av valuta endrer bare valutasymbol og presisjon. Det utføres ingen valutakonvertering.

Formlene og forutsetningene er beskrevet i [beregningsreglene](docs/CALCULATIONS.md).

## Dataene dine og sikkerhetskopier

Materialer, oppskrifter, produkter og innstillinger lagres i nettleserens IndexedDB, separat for hver nettstedsadresse eller filplassering. Språket i grensesnittet lagres i en liten lokal innstilling. Det finnes ingen konto, analysefunksjoner, skjult skysynkronisering eller oppskriftsdatabase på en server. Ingenting sendes noe sted uten at du selv gjør noe.

Eksporter JSON-sikkerhetskopier regelmessig, og alltid før du flytter eller gir HTML-filen nytt navn. Sletting av nettleserdata, privat nettlesing, endring av nettstedsadresse, flytting av filen eller tap av enheten kan gjøre den lokale databasen utilgjengelig. Lagring for lokale filer (`file://`) kan fungere forskjellig i ulike nettlesere; en stabil HTTPS-adresse er mer pålitelig ved regelmessig bruk. Tillatelse til varig lagring i nettleseren erstatter ikke sikkerhetskopier.

## Begrensninger

PDF-filer opprettes på enheten din, uten utskriftsdialog og uten opplasting til en server. Latinske og kyrilliske tegn samt kinesisk og japansk støttes. Skriftene for kinesisk og japansk gjør programfilen større. Emoji og sjeldne tegn som ikke støttes, kan vises som `?` i PDF-filer.

Programmet har ikke lagerstyring, skattefunksjoner, valutakonvertering, ordrehåndtering, skykontoer, synkronisering mellom enheter eller tekniske beregninger av kakens strukturelle sikkerhet. Kontroller resultatet selv før du bruker det i produksjonen eller oppgir en pris til kunden.

## Lisens, prøveperiode og betaling

ArgonCakeCalc distribueres under **ArgonCakeCalc Commercial Source-Available License, versjon 1.0**. Kildekoden er offentlig tilgjengelig for innsyn, men offentlig tilgang gir ikke tillatelse til å distribuere, overføre eller publisere endrede versjoner for tredjeparter. Du kan endre programmet til personlig bruk.

Før betaling kan du laste ned og bruke hele programmet gratis i **én (1) måned** for å vurdere funksjonene og om det passer til dine behov. Programmet er tilgjengelig umiddelbart; aktiveringsnøkkel eller kontobekreftelse er ikke nødvendig.

Etter vellykket betaling anses den ikke-eksklusive lisensen som tildelt umiddelbart. Du velger selv lisensbeløpet, fra **1 USD (9,24 NOK etter gjeldende valutakurs)** eller tilsvarende beløp som betalingsleverandøren viser. Beløpet vises før du bekrefter, og du tar beslutningen frivillig. Ethvert beløp du velger, også et beløp som er høyere enn du senere hadde forventet, regnes som bevisst valgt og refunderes ikke bare fordi du ombestemmer deg eller slutter å bruke programmet.

NOK-beløpet i parentes er beregnet ut fra referansekurser kontrollert 3. november 2026. Beløpet som betalingsleverandøren viser ved betaling, er det som gjelder.

Etter at lisensen er gitt, vurderes refusjon bare ved dobbeltbelastning, teknisk feil i betalingssystemet eller et annet tilfelle som uttrykkelig følger av gjeldende lov. Send henvendelsen til `voit.ne@gmail.com`, og oppgi betalingsdato, beløp, betalerens e-postadresse og Robokassa-transaksjons-ID.

Programmet leveres **«SOM DET ER» (AS IS)**. Utvikleren garanterer ikke at det oppfyller bestemte forventninger, forretningsprosesser eller brukerens tiltenkte formål, og er i den grad loven tillater det, ikke ansvarlig for skade på virksomhet, omsetning, fortjeneste, data, omdømme eller drift. Brukeren er selv ansvarlig for å kontrollere programmet og avgjøre om det passer til egne behov.

Les [LICENSE](LICENSE), [NOTICE](NOTICE), [ADDITIONAL_TERMS.md](ADDITIONAL_TERMS.md) og [lisensene for tredjepartskomponenter](THIRD_PARTY.md).

## Selger og brukerstøtte

- **Selger / rettighetshaver:** selvstendig næringsdrivende Ivan Anatolyevich Voitkov
- **Skatteidentifikasjonsnummer (INN):** 862203800782
- **Programvareprodukt:** ArgonCakeCalc
- **Betalingsformål:** tildeling av en ikke-eksklusiv rett til å bruke programvaren under en kommersiell lisens
- **Brukerstøtte og henvendelser:** `voit.ne@gmail.com`
- **Betalingsside:** **LENKE TIL ROBOKASSA-BETALING LEGGES TIL SENERE**
- **Tjenestens nettsted:** https://argonstudio.github.io/ArgonCakeCalc/shop/

Betalingen er en lisensavgift, ikke en donasjon. Den fullstendige informasjonen for Robokassa og tilsynsmyndigheter finnes i [docs/ROBOKASSA.md](docs/ROBOKASSA.md).

## Forfatter

**Ivan Voitkov** · [forfatterens nettsted](https://argon-studio.ru/) · [GitHub](https://github.com/Argonstudio) · [prosjektets repositorium](https://github.com/Argonstudio/ArgonCakeCalc)

ChatGPT (OpenAI) er medforfatter. Takk til utviklerne av dette bemerkelsesverdige verktøyet.
