# ArgonCakeCalc

**Conosci il costo reale prima di comunicare il prezzo della torta.**

> **Sito web:** **ТУТ ССЫЛКА НА САЙТ**  
> **Pagamento della licenza:** **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**

[English](README.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Norsk](README.nb.md) · [Español](README.es.md) · [简体中文](README.zh.md) · [日本語](README.ja.md)

ArgonCakeCalc è un programma che aiuta i pasticceri. Funzioni principali: creare ricette, salvare elenchi di ingredienti, progettare prodotti, comprese torte a più piani (con visualizzazione), e ottenere subito il calcolo del costo e del profitto. Le ricette e i prodotti creati possono essere scaricati in PDF. Il programma funziona in locale, senza installazione e senza internet.

Non servono account, abbonamento né database cloud. Le tue ricette e i tuoi prezzi restano nel browser del tuo dispositivo.

## Avvio rapido

Il programma è un unico file. Non c’è nulla da installare.

1. Apri il [repository ArgonCakeCalc su GitHub](https://github.com/Argonstudio/ArgonCakeCalc) e vai al file [`ArgonCakeCalc.html`](ArgonCakeCalc.html).
2. Nella pagina del file, clicca sull’icona di download (**Download raw file**) e salva il file in una cartella in cui resterà in modo permanente.
3. Apri il file salvato in un browser moderno, su computer, tablet o smartphone.

Il file contiene già il programma, tutte le traduzioni, gli stili e i font per il PDF, quindi dopo il download funziona senza internet.

Preferisci non scaricare nulla? Apri il sito: **ТУТ ССЫЛКА НА САЙТ**. Su un indirizzo HTTPS stabile l’applicazione può inoltre prepararsi al funzionamento offline dopo il primo caricamento.

L’interfaccia si apre in inglese. Puoi cambiare lingua direttamente nel programma: russo, francese, tedesco, norvegese bokmål, spagnolo, italiano, cinese semplificato o giapponese.

> [!WARNING]
> **I dati sono salvati nel browser, non dentro il file HTML.** Se sposti o rinomini il file, cambi browser, cancelli i dati del browser o lavori in modalità privata, potresti perdere l’accesso a ricette e prezzi. Tieni il file sempre nello stesso posto, aprilo sempre nello stesso browser ed esporta regolarmente una copia JSON. I dettagli sono nella sezione [I tuoi dati e le copie di backup](#i-tuoi-dati-e-le-copie-di-backup).

## Cosa fa il programma

- **Materiali.** Tieni un catalogo di ingredienti, decorazioni, confezioni e materiali di consumo. Per ogni voce indica il prezzo della confezione, la quantità per confezione, l’unità di misura, la categoria e, se serve, la densità. Sono supportati grammi, chilogrammi, millilitri e litri. Massa e volume vengono convertiti l’uno nell’altro solo quando la densità è nota, e i pezzi non vengono mai convertiti automaticamente in peso.
- **Ricette e componenti.** Crea ricette con resa, perdite di preparazione, istruzioni e righe di composizione. Un componente può essere un materiale o un’altra ricetta: un ripieno può includere una crema e la crema uno sciroppo. Le ricette annidate vengono scomposte fino alle materie prime, e i componenti uguali vengono riuniti in un’unica lista della spesa chiara. Quando cambia il prezzo di un materiale, tutte le ricette e i prodotti che ne dipendono vengono ricalcolati automaticamente.
- **Costruttore di prodotti.** Componi un prodotto con pan di spagna, ripieni, creme, sciroppi, coperture, decorazioni e confezioni. Salva i prodotti, duplicali come modelli e confronta diversi prezzi di vendita senza modificare il calcolo salvato.
- **Costo completo.** Aggiungi manodopera, elettricità, spese di consegna, confezioni, altre spese e una riserva per le perdite, poi imposta un ricarico o un margine obiettivo e, se necessario, un profitto minimo. Il costo include solo la parte di confezione effettivamente usata, mentre la lista della spesa arrotonda le confezioni per eccesso.
- **Ridimensionamento.** Ricalcola una ricetta in base alla resa desiderata o al diametro e all’altezza di una torta rotonda. Ogni riga di composizione può scalare in modo proporzionale, in base alla superficie, restare fissa o essere arrotondata a pezzi interi. La geometria della torta è una stima di supporto, non un calcolo strutturale né di sicurezza alimentare.
- **PDF, lista della spesa e backup.** Esporta un PDF con ingredienti, materie prime, istruzioni, costo, prezzo consigliato e dimensioni. Scarica una lista della spesa per la produzione o per passarla a chi prepara l’ordine. Salva una copia JSON completa per trasferire i dati tra browser o dispositivi.

## Il primo calcolo

Al primo avvio puoi iniziare con uno spazio di lavoro vuoto o con una demo fittizia. La demo mostra rapidamente come si lavora, ma i suoi prezzi sono di esempio e non rappresentano i prezzi reali di mercato.

1. Aggiungi i prezzi di acquisto che paghi davvero.
2. Crea una ricetta e indica resa e perdite.
3. Componi un prodotto e imposta dimensioni o numero di porzioni.
4. Aggiungi manodopera, elettricità, confezioni e altre spese.
5. Confronta il prezzo di vendita per ricarico e per margine obiettivo.
6. Esporta un PDF e una lista della spesa, poi salva una copia JSON.

## Come si calcolano i prezzi

- Resa dopo le perdite = resa inserita × percentuale rimanente dopo le perdite.
- Prezzo per ricarico = costo completo × (1 + ricarico % ÷ 100).
- Prezzo per margine obiettivo = costo completo ÷ (1 − margine % ÷ 100).
- Il prezzo di vendita consigliato viene arrotondato per eccesso alla precisione della valuta scelta.
- I calcoli sono esatti: i risultati intermedi non vengono arrotondati in anticipo.
- Le ricette annidate vengono scomposte in quantità di materie prime.
- Nella lista della spesa le confezioni sono arrotondate per eccesso; nel costo viene conteggiata solo la frazione effettivamente consumata.
- La scelta della valuta cambia solo il simbolo e la precisione. Non c’è conversione al tasso di cambio.

Formule e presupposti sono descritti nelle [regole di calcolo](docs/CALCULATIONS.md).

## I tuoi dati e le copie di backup

Materiali, ricette, prodotti e impostazioni sono salvati in IndexedDB del browser, separatamente per ogni indirizzo del sito o posizione del file. La lingua dell’interfaccia è salvata come una piccola impostazione locale. Non esistono account, analisi d’uso, sincronizzazione cloud nascosta né un database di ricette su server, e nulla viene inviato senza una tua azione.

Esporta regolarmente copie JSON, e sempre prima di spostare o rinominare il file HTML. Cancellare i dati del browser, la modalità privata, un indirizzo del sito diverso, lo spostamento del file o la perdita del dispositivo possono rendere inaccessibile il database locale. L’archiviazione per un file locale (`file://`) può comportarsi in modo diverso a seconda del browser; per il lavoro quotidiano è più affidabile un indirizzo HTTPS stabile. Il permesso di archiviazione persistente del browser non sostituisce una copia di backup.

## Limitazioni

Il PDF viene creato sul tuo dispositivo, senza finestra di stampa e senza caricamento su un server. Sono supportati caratteri latini, cirillici, cinesi e giapponesi; i font cinesi e giapponesi aumentano le dimensioni del file. Le emoji non supportate e i caratteri rari possono comparire come `?` nel PDF.

Il programma non include gestione del magazzino, modulo fiscale, tassi di cambio, ordini, account cloud, sincronizzazione tra dispositivi né calcolo della sicurezza strutturale delle torte. Prima di usarlo in produzione o per fissare il prezzo a un cliente, verifica tu stesso il risultato.

## Licenza, prova e pagamento

ArgonCakeCalc è distribuito con la **ArgonCakeCalc Commercial Source-Available License, versione 1.0**. Il codice sorgente è aperto alla consultazione, ma la visibilità pubblica non dà il diritto di ridistribuire, concedere in sublicenza o pubblicare versioni modificate per terzi.

Prima del pagamento puoi scaricare e usare gratuitamente il programma completo per **un (1) mese**, per verificarne le funzioni e l’idoneità alle tue attività. Il programma è disponibile subito; non servono chiave di attivazione né approvazione dell’account.

Dopo un pagamento riuscito, la licenza non esclusiva si considera concessa immediatamente. L’importo, a partire da 1 $ o dall’equivalente mostrato dal fornitore di pagamento, lo scegli tu, lo vedi prima della conferma e decidi volontariamente. Qualsiasi importo scelto, anche superiore a quello che ti aspettavi in seguito, è considerato consapevole e non viene rimborsato solo perché hai cambiato idea o non vuoi più usare il programma.

Dopo la concessione della licenza, il rimborso viene preso in considerazione solo in caso di addebito doppio, errore tecnico del sistema di pagamento o altro caso espressamente previsto dalla legge. Invia la richiesta a `voit.ne@gmail.com` indicando data del pagamento, importo, e-mail del pagante e identificativo dell’operazione Robokassa.

Il programma è fornito **«così com’è» (AS IS)**. Lo sviluppatore non garantisce che soddisfi le tue aspettative specifiche, i tuoi processi aziendali o il tuo scopo e, nella misura massima consentita dalla legge, non risponde dei danni alla tua attività, ai ricavi, ai profitti, ai dati, alla reputazione o alle operazioni. Sei tu a verificare il programma e a decidere se è adatto al tuo lavoro.

Leggi [LICENSE](LICENSE), [NOTICE](NOTICE), [ADDITIONAL_TERMS.md](ADDITIONAL_TERMS.md) e [le licenze dei componenti di terze parti](THIRD_PARTY.md).

## Venditore e supporto

- **Venditore / titolare dei diritti:** lavoratore autonomo Ivan Anatolievich Voitkov
- **Codice fiscale russo:** 862203800782
- **Prodotto:** ArgonCakeCalc
- **Oggetto del pagamento:** diritto non esclusivo di usare il software con licenza commerciale
- **Supporto e reclami:** `voit.ne@gmail.com`
- **Pagina di pagamento:** **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**
- **Sito:** **ТУТ ССЫЛКА НА САЙТ**

Il pagamento è un corrispettivo di licenza, non una donazione. Il blocco completo per Robokassa e le autorità è in [docs/ROBOKASSA.md](docs/ROBOKASSA.md).

## Autore

**Ivan Voitkov** · [sito dell’autore](https://argon-studio.ru/) · [GitHub](https://github.com/Argonstudio) · [repository](https://github.com/Argonstudio/ArgonCakeCalc)

Il progetto è stato creato da ChatGPT (OpenAI) in collaborazione con Ivan Voitkov. Ivan Voitkov resta l’autore indicato del progetto.

---

Per sviluppatori e collaboratori: [DEVELOPMENT.md](DEVELOPMENT.md) (solo in inglese).
