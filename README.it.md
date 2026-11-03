# ArgonCakeCalc

[English](README.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Norsk bokmål](README.nb.md) · [Español](README.es.md) · [Italiano](README.it.md) · [简体中文](README.zh.md) · [日本語](README.ja.md)

**Conosci il costo reale prima di comunicare un prezzo al cliente.**

> **Demo online:** [https://argonstudio.github.io/ArgonCakeCalc/](https://argonstudio.github.io/ArgonCakeCalc/)  
> **Pagamento della licenza:** **LINK DI PAGAMENTO ROBOKASSA DA AGGIUNGERE**

ArgonCakeCalc è uno strumento per il calcolo dei costi destinato a pasticceri e professionisti della produzione dolciaria. Crea ricette, gestisci elenchi di ingredienti e materiali, assembla prodotti finiti — comprese torte a più piani con visualizzazione — e calcola subito costi e profitto. Le ricette e i prodotti creati possono essere esportati in PDF.

Il prezzo della licenza lo decidi tu. Il prezzo minimo per una licenza perpetua è **1 USD (circa 0,89 EUR)**. Puoi scaricare e provare l'applicazione completa prima di pagare. Consulta la sezione [Licenza, prova e pagamento](#licenza-prova-e-pagamento).

**Equivalente locale indicativo di 1 USD:** 0,89 EUR. È una conversione approssimativa basata sui tassi di riferimento verificati il 3 novembre 2026. Il fornitore del pagamento potrebbe mostrare un importo diverso a causa del proprio tasso di cambio, degli arrotondamenti o delle commissioni. Controlla sempre l'importo mostrato prima di confermare il pagamento.

Non servono registrazione, abbonamento o database cloud. Le tue ricette e i tuoi prezzi rimangono nel browser del tuo dispositivo. L'applicazione funziona localmente, senza installazione e senza connessione Internet.

## Avvio rapido

L'applicazione è composta da un unico file HTML. Non è necessario installare nulla.

1. Apri il [repository ArgonCakeCalc su GitHub](https://github.com/Argonstudio/ArgonCakeCalc) e vai al file [`ArgonCakeCalc.html`](ArgonCakeCalc.html).
2. Nella pagina del file, fai clic sull'icona di download (**Download raw file**) e salva il file in una cartella in cui rimarrà stabilmente.
3. Apri il file salvato con un browser moderno su computer, tablet o smartphone.

Il file contiene l'applicazione, tutte le traduzioni dell'interfaccia, gli stili e i caratteri utilizzati per i PDF. Dopo il download può funzionare senza connessione Internet.

Preferisci non scaricare nulla? Apri il sito: [sito web di ArgonCakeCalc](https://argonstudio.github.io/ArgonCakeCalc/shop/). Con un indirizzo HTTPS stabile, dopo il primo caricamento l'applicazione può anche prepararsi a funzionare offline.

L'interfaccia si apre in inglese. Puoi cambiare lingua direttamente nell'applicazione scegliendo russo, francese, tedesco, norvegese bokmål, spagnolo, italiano, cinese semplificato o giapponese.

Per gli sviluppatori: il programma può essere modificato e ricompilato. Consulta [DEVELOPMENT.md](DEVELOPMENT.md) (solo in inglese). Un assistente di programmazione basato sull'IA può aiutarti a esplorare il codice e apportare modifiche.

> [!WARNING]
> **I dati vengono salvati nel browser, non nel file HTML.** Se sposti o rinomini il file, cambi browser, cancelli i dati del browser o usi la navigazione privata, potresti perdere l'accesso alle ricette e ai prezzi. Conserva il file sempre nello stesso posto, aprilo con lo stesso browser ed esporta regolarmente una copia di sicurezza JSON. Consulta [I tuoi dati e le copie di sicurezza](#i-tuoi-dati-e-le-copie-di-sicurezza).

## Funzionalità

- **Materiali.** Gestisci un catalogo di ingredienti, decorazioni, confezioni e materiali di consumo. Per ogni voce indica il prezzo della confezione, la quantità contenuta, l'unità di misura, la categoria e, se necessario, la densità. Sono supportati grammi, chilogrammi, millilitri e litri. Massa e volume vengono convertiti solo quando la densità è nota; i pezzi non vengono mai convertiti automaticamente in peso.
- **Ricette e componenti.** Crea ricette con resa, perdite durante la preparazione, istruzioni e righe degli ingredienti. Un componente può essere un materiale o un'altra ricetta: un ripieno può includere una crema e una crema può includere uno sciroppo. Le ricette nidificate vengono scomposte fino ai materiali di base e i componenti uguali vengono raggruppati in un unico elenco della spesa. Quando cambia il prezzo di un materiale, tutte le ricette e i prodotti che ne dipendono vengono ricalcolati automaticamente.
- **Compositore di prodotti.** Assembla un prodotto finito con basi, ripieni, creme, bagne, coperture, decorazioni e confezioni. Salva i prodotti, duplicali come modelli e confronta prezzi di vendita alternativi senza modificare il calcolo salvato.
- **Costo completo.** Aggiungi manodopera, elettricità, spese di consegna, confezioni, altri costi e una riserva per le perdite. Imposta quindi un ricarico o un margine di profitto obiettivo e, se necessario, un profitto minimo. Nel costo viene conteggiata solo la parte della confezione effettivamente utilizzata; nell'elenco della spesa le confezioni vengono arrotondate per eccesso.
- **Ridimensionamento.** Ricalcola una ricetta in base alla resa desiderata oppure al diametro e all'altezza di una torta rotonda. Ogni riga degli ingredienti può essere scalata proporzionalmente, in base alla superficie, mantenuta fissa oppure arrotondata a pezzi interi. La geometria della torta è una stima di supporto, non un calcolo tecnico della resistenza strutturale o della sicurezza alimentare.
- **PDF, lista della spesa e backup.** Esporta un PDF con ingredienti, materie prime, istruzioni, costo, prezzo consigliato e dimensioni. Scarica una lista della spesa per la produzione o da condividere con chi prepara l'ordine. Salva un backup JSON completo per trasferire i dati tra browser o dispositivi.

## Il tuo primo calcolo

Al primo avvio puoi iniziare con uno spazio di lavoro vuoto oppure caricare una demo fittizia. La demo mostra rapidamente il flusso di lavoro, ma i suoi prezzi sono esempi e non rappresentano i prezzi reali di mercato.

1. Inserisci i prezzi di acquisto che paghi realmente.
2. Crea una ricetta e indica resa e perdite.
3. Assembla un prodotto e imposta le dimensioni o il numero di porzioni.
4. Aggiungi manodopera, elettricità, confezioni e altre spese.
5. Confronta il prezzo di vendita calcolato con il ricarico e con il margine obiettivo.
6. Esporta un PDF e una lista della spesa, quindi salva un backup JSON.

## Come vengono calcolati i prezzi

- Resa dopo le perdite = resa inserita × percentuale rimanente dopo le perdite.
- Prezzo con ricarico = costo completo × (1 + ricarico % ÷ 100).
- Prezzo con margine obiettivo = costo completo ÷ (1 − margine % ÷ 100).
- Il prezzo consigliato viene arrotondato per eccesso in base alla precisione della valuta selezionata.
- I calcoli sono precisi: i risultati intermedi non vengono arrotondati in anticipo.
- Le ricette nidificate vengono scomposte nelle quantità dei materiali di base.
- Nell'elenco della spesa le confezioni vengono arrotondate per eccesso; nel costo viene conteggiata solo la frazione effettivamente utilizzata.
- La scelta della valuta modifica solo il simbolo e la precisione. Non viene eseguita alcuna conversione al tasso di cambio.

Le formule e le ipotesi sono descritte nelle [regole di calcolo](docs/CALCULATIONS.md).

## I tuoi dati e le copie di sicurezza

Materiali, ricette, prodotti e impostazioni vengono salvati nell'IndexedDB del browser, separatamente per ogni indirizzo del sito o posizione del file. La lingua dell'interfaccia viene salvata in una piccola impostazione locale. Non ci sono account, analisi, sincronizzazione cloud nascosta né database delle ricette su un server. Nulla viene inviato senza una tua azione.

Esporta regolarmente copie JSON e fallo sempre prima di spostare o rinominare il file HTML. La cancellazione dei dati del browser, la navigazione privata, la modifica dell'indirizzo del sito, lo spostamento del file o la perdita del dispositivo possono rendere inaccessibile il database locale. L'archiviazione per i file locali (`file://`) può comportarsi diversamente nei vari browser; per l'uso quotidiano è più affidabile un indirizzo HTTPS stabile. L'autorizzazione all'archiviazione persistente del browser non sostituisce un backup.

## Limitazioni

I PDF vengono creati sul tuo dispositivo, senza finestra di stampa e senza invio a un server. Sono supportati i caratteri latini, cirillici, cinesi e giapponesi. I caratteri per cinese e giapponese aumentano le dimensioni del file dell'applicazione. Emoji non supportati e caratteri rari possono apparire come `?` nei PDF.

L'applicazione non include gestione del magazzino, modulo fiscale, conversione delle valute, gestione degli ordini, account cloud, sincronizzazione tra dispositivi o calcoli tecnici sulla sicurezza strutturale della torta. Verifica personalmente i risultati prima di utilizzarli nella produzione o di comunicare un prezzo a un cliente.

## Licenza, prova e pagamento

ArgonCakeCalc è distribuito con la **ArgonCakeCalc Commercial Source-Available License, versione 1.0**. Il codice sorgente è accessibile pubblicamente per la consultazione, ma la sua visibilità non concede il diritto di ridistribuire, trasferire o pubblicare versioni modificate per terzi. Puoi modificare il programma per uso personale.

Prima di pagare, puoi scaricare e utilizzare gratuitamente l'applicazione completa per **un (1) mese**, così da valutarne le funzionalità e l'idoneità alle tue esigenze. L'applicazione è disponibile immediatamente; non sono richiesti una chiave di attivazione o la conferma di un account.

Dopo il pagamento andato a buon fine, la licenza non esclusiva si considera concessa immediatamente. Scegli tu l'importo della licenza, a partire da **1 USD (circa 0,89 EUR)** o dall'equivalente mostrato dal fornitore del pagamento. Puoi vedere l'importo prima della conferma e decidi volontariamente. Qualsiasi importo scelto, anche se superiore a quello che ti aspettavi in seguito, è considerato intenzionale e non viene rimborsato solo perché cambi idea o smetti di utilizzare il programma.

L'equivalente di 0,89 EUR è indicativo e si basa sui tassi di riferimento verificati il 3 novembre 2026. Fa fede l'importo mostrato dal fornitore al momento del pagamento.

Dopo la concessione della licenza, un rimborso viene preso in considerazione solo in caso di addebito duplicato, errore tecnico del sistema di pagamento o altro caso espressamente previsto dalla legge applicabile. Invia la richiesta a `voit.ne@gmail.com`, indicando data del pagamento, importo, e-mail del pagatore e ID della transazione Robokassa.

Il programma viene fornito **«COSÌ COM'È» (AS IS)**. Lo sviluppatore non garantisce che soddisfi aspettative specifiche, processi aziendali o lo scopo previsto dall'utente e, nella massima misura consentita dalla legge, non è responsabile di danni all'attività, ai ricavi, ai profitti, ai dati, alla reputazione o alle operazioni. L'utente è responsabile della verifica del programma e della decisione sulla sua idoneità.

Leggi [LICENSE](LICENSE), [NOTICE](NOTICE), [ADDITIONAL_TERMS.md](ADDITIONAL_TERMS.md) e le [licenze dei componenti di terze parti](THIRD_PARTY.md).

## Venditore e assistenza

- **Venditore / titolare dei diritti:** lavoratore autonomo Ivan Anatolyevich Voitkov
- **Codice identificativo fiscale (INN):** 862203800782
- **Prodotto software:** ArgonCakeCalc
- **Oggetto del pagamento:** concessione del diritto non esclusivo di utilizzare il programma con licenza commerciale
- **Assistenza e richieste:** `voit.ne@gmail.com`
- **Pagina di pagamento:** **LINK DI PAGAMENTO ROBOKASSA DA AGGIUNGERE**
- **Sito del servizio:** https://argonstudio.github.io/ArgonCakeCalc/shop/

Il pagamento è un corrispettivo per la licenza, non una donazione. Il blocco informativo completo per Robokassa e le autorità di controllo si trova in [docs/ROBOKASSA.md](docs/ROBOKASSA.md).

## Autore

**Ivan Voitkov** · [sito dell’autore](https://argon-studio.ru/) · [GitHub](https://github.com/Argonstudio) · [repository del progetto](https://github.com/Argonstudio/ArgonCakeCalc)

ChatGPT (OpenAI) è coautore. Ringrazio gli sviluppatori di questo straordinario strumento.
