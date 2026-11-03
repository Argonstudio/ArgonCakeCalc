# ArgonCakeCalc

[English](README.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Norsk bokmål](README.nb.md) · [Español](README.es.md) · [Italiano](README.it.md) · [简体中文](README.zh.md) · [日本語](README.ja.md)

**Kennen Sie Ihre tatsächlichen Kosten, bevor Sie einem Kunden einen Preis nennen.**

> **Live-Demo:** [https://argonstudio.github.io/ArgonCakeCalc/](https://argonstudio.github.io/ArgonCakeCalc/)  
> **Lizenzzahlung:** **ROBOKASSA-ZAHLUNGSLINK WIRD NOCH HINZUGEFÜGT**

ArgonCakeCalc ist ein Kalkulationsprogramm für Konditoren. Erstellen Sie Rezepte, pflegen Sie Zutaten- und Materiallisten, stellen Sie fertige Produkte zusammen – auch mehrstöckige Torten mit visueller Vorschau – und berechnen Sie unmittelbar Kosten und Gewinn. Rezepte und fertige Produkte können als PDF exportiert werden.

Den Lizenzpreis bestimmen Sie selbst. Der Mindestpreis für eine unbefristete Lizenz beträgt **1 USD (ca. 0,89 EUR)**. Sie können die vollständige Anwendung vor dem Kauf herunterladen und testen. Weitere Informationen finden Sie im Abschnitt [Lizenz, Testphase und Zahlung](#lizenz-testphase-und-zahlung).

**Ungefähre Umrechnung von 1 USD:** 0,89 EUR. Dies ist ein ungefährer Gegenwert auf Grundlage der am 3. November 2026 geprüften Referenzkurse. Der Zahlungsanbieter kann aufgrund eigener Wechselkurse, Rundungen oder Gebühren einen anderen Betrag anzeigen. Prüfen Sie daher immer den vor der Zahlungsbestätigung angezeigten Betrag.

Es sind keine Registrierung, kein Abonnement und keine Cloud-Datenbank erforderlich. Ihre Rezepte und Preise bleiben im Browser auf Ihrem Gerät. Die Anwendung läuft lokal, ohne Installation und ohne Internetverbindung.

## Schnellstart

Die Anwendung besteht aus einer einzigen HTML-Datei. Eine Installation ist nicht erforderlich.

1. Öffnen Sie das [ArgonCakeCalc-Repository auf GitHub](https://github.com/Argonstudio/ArgonCakeCalc) und wechseln Sie zur Datei [`ArgonCakeCalc.html`](ArgonCakeCalc.html).
2. Klicken Sie auf der Dateiseite auf das Download-Symbol (**Download raw file**) und speichern Sie die Datei in einem Ordner, in dem sie dauerhaft bleiben soll.
3. Öffnen Sie die gespeicherte Datei in einem aktuellen Browser auf Ihrem Computer, Tablet oder Smartphone.

Die Datei enthält die Anwendung, alle Übersetzungen der Benutzeroberfläche, die Formatvorlagen und die für den PDF-Export benötigten Schriftarten. Nach dem Herunterladen funktioniert sie auch ohne Internetverbindung.

Sie möchten nichts herunterladen? Öffnen Sie die Website: [ArgonCakeCalc-Website](https://argonstudio.github.io/ArgonCakeCalc/shop/). Unter einer stabilen HTTPS-Adresse kann sich die Anwendung nach dem ersten Laden ebenfalls auf die Offline-Nutzung vorbereiten.

Die Benutzeroberfläche öffnet sich auf Englisch. In der Anwendung können Sie direkt zwischen Russisch, Französisch, Deutsch, Norwegisch (Bokmål), Spanisch, Italienisch, vereinfachtem Chinesisch und Japanisch wechseln.

Für Entwickler: Das Programm kann angepasst und neu erstellt werden. Weitere Informationen finden Sie in [DEVELOPMENT.md](DEVELOPMENT.md) (nur auf Englisch). Ein KI-Programmierassistent kann Sie beim Erkunden des Codes und bei Änderungen unterstützen.

> [!WARNING]
> **Ihre Daten werden im Browser gespeichert, nicht in der HTML-Datei.** Wenn Sie die Datei verschieben oder umbenennen, den Browser wechseln, Browserdaten löschen oder den privaten Modus verwenden, können Sie den Zugriff auf Ihre Rezepte und Preise verlieren. Bewahren Sie die Datei am selben Ort auf, öffnen Sie sie immer im selben Browser und exportieren Sie regelmäßig eine JSON-Sicherung. Weitere Informationen finden Sie unter [Ihre Daten und Sicherungskopien](#ihre-daten-und-sicherungskopien).

## Funktionen

- **Materialien.** Verwalten Sie einen Katalog mit Zutaten, Dekorationen, Verpackungen und Verbrauchsmaterialien. Geben Sie für jeden Eintrag den Packungspreis, die Packungsmenge, die Maßeinheit, die Kategorie und bei Bedarf die Dichte an. Gramm, Kilogramm, Milliliter und Liter werden unterstützt. Masse und Volumen werden nur bei bekannter Dichte ineinander umgerechnet; Stückzahlen werden niemals automatisch in Gewicht umgerechnet.
- **Rezepte und Komponenten.** Erstellen Sie Rezepte mit Ausbeute, Zubereitungsverlusten, Anleitung und Zutatenpositionen. Eine Komponente kann ein Material oder ein anderes Rezept sein: Eine Füllung kann eine Creme enthalten, und eine Creme kann einen Sirup enthalten. Verschachtelte Rezepte werden bis zu den Ausgangsmaterialien aufgelöst; gleiche Komponenten werden zu einer übersichtlichen Einkaufsliste zusammengefasst. Ändert sich der Preis eines Materials, werden alle davon abhängigen Rezepte und Produkte automatisch neu berechnet.
- **Produkteditor.** Stellen Sie ein Produkt aus Böden, Füllungen, Cremes, Tränken, Überzügen, Dekorationen und Verpackungen zusammen. Speichern Sie Produkte, duplizieren Sie sie als Vorlagen und vergleichen Sie alternative Verkaufspreise, ohne die gespeicherte Kalkulation zu verändern.
- **Vollständige Kosten.** Fügen Sie Arbeitszeit, Strom, Lieferkosten, Verpackung, sonstige Ausgaben und eine Verlustreserve hinzu. Legen Sie anschließend einen Aufschlag oder eine Zielgewinnmarge sowie bei Bedarf einen Mindestgewinn fest. In die Kosten fließt nur der tatsächlich verbrauchte Anteil einer Packung ein; die Packungsmengen auf der Einkaufsliste werden aufgerundet.
- **Skalierung.** Berechnen Sie ein Rezept für eine gewünschte Ausbeute oder anhand von Durchmesser und Höhe einer runden Torte neu. Jede Zutatenposition kann proportional oder nach Fläche skaliert, unverändert übernommen oder auf ganze Stückzahlen aufgerundet werden. Die Tortengeometrie ist eine Hilfsschätzung und keine technische Berechnung der Tragfähigkeit oder Lebensmittelsicherheit.
- **PDF, Einkaufsliste und Sicherung.** Exportieren Sie ein PDF mit Zutaten, Rohstoffen, Anleitung, Kosten, empfohlenem Preis und Abmessungen. Laden Sie eine Einkaufsliste für die Produktion herunter oder geben Sie sie an die Person weiter, die den Auftrag vorbereitet. Speichern Sie eine vollständige JSON-Sicherung, um Ihre Daten zwischen Browsern oder Geräten zu übertragen.

## Erste Kalkulation

Beim ersten Start können Sie mit einem leeren Arbeitsbereich oder mit einer fiktiven Demo beginnen. Die Demo zeigt den Arbeitsablauf schnell, ihre Preise sind jedoch Beispielwerte und entsprechen nicht den tatsächlichen Marktpreisen.

1. Tragen Sie Ihre tatsächlichen Einkaufspreise ein.
2. Erstellen Sie ein Rezept und geben Sie Ausbeute und Verluste an.
3. Stellen Sie ein Produkt zusammen und legen Sie Abmessungen oder Portionszahl fest.
4. Fügen Sie Arbeitszeit, Strom, Verpackung und sonstige Kosten hinzu.
5. Vergleichen Sie den Verkaufspreis nach Aufschlag und nach Zielmarge.
6. Exportieren Sie ein PDF und eine Einkaufsliste und speichern Sie anschließend eine JSON-Sicherung.

## Preisberechnung

- Ausbeute nach Verlusten = eingegebene Ausbeute × verbleibender Prozentsatz nach Verlusten.
- Preis mit Aufschlag = Gesamtkosten × (1 + Aufschlag % ÷ 100).
- Preis nach Zielmarge = Gesamtkosten ÷ (1 − Marge % ÷ 100).
- Der empfohlene Preis wird entsprechend der Genauigkeit der ausgewählten Währung aufgerundet.
- Die Berechnungen sind präzise: Zwischenergebnisse werden nicht vorzeitig gerundet.
- Verschachtelte Rezepte werden in die Mengen der Ausgangsmaterialien aufgelöst.
- Auf der Einkaufsliste werden Packungen aufgerundet; in den Kosten wird nur der tatsächlich verbrauchte Anteil berücksichtigt.
- Die Auswahl einer Währung ändert nur Währungssymbol und Genauigkeit. Eine Umrechnung anhand von Wechselkursen findet nicht statt.

Formeln und Annahmen sind in den [Berechnungsregeln](docs/CALCULATIONS.md) beschrieben.

## Ihre Daten und Sicherungskopien

Materialien, Rezepte, Produkte und Einstellungen werden in der IndexedDB des Browsers gespeichert – getrennt für jede Website-Adresse oder jeden Dateispeicherort. Die Sprache der Benutzeroberfläche wird in einer kleinen lokalen Einstellung gespeichert. Es gibt kein Konto, keine Analysefunktionen, keine verborgene Cloud-Synchronisierung und keine serverseitige Rezeptdatenbank. Ohne Ihre Aktion werden keine Daten übertragen.

Exportieren Sie regelmäßig JSON-Sicherungen und unbedingt, bevor Sie die HTML-Datei verschieben oder umbenennen. Das Löschen von Browserdaten, privates Surfen, eine geänderte Website-Adresse, das Verschieben der Datei oder der Verlust des Geräts können den Zugriff auf die lokale Datenbank verhindern. Der Speicher für lokale Dateien (`file://`) kann sich je nach Browser unterschiedlich verhalten; für die regelmäßige Nutzung ist eine stabile HTTPS-Adresse zuverlässiger. Die Erlaubnis zur dauerhaften Speicherung im Browser ersetzt keine Sicherungskopie.

## Einschränkungen

PDF-Dateien werden auf Ihrem Gerät erstellt, ohne Druckdialog und ohne Übertragung an einen Server. Lateinische, kyrillische, chinesische und japanische Schriftzeichen werden unterstützt. Die chinesischen und japanischen Schriftarten vergrößern die Anwendungsdatei. Nicht unterstützte Emojis und seltene Zeichen können in PDFs als `?` erscheinen.

Die Anwendung bietet keine Lagerverwaltung, kein Steuermodul, keine Wechselkursumrechnung, keine Auftragsverwaltung, keine Cloud-Konten, keine Synchronisierung zwischen Geräten und keine technische Berechnung der strukturellen Tortensicherheit. Prüfen Sie die Ergebnisse selbst, bevor Sie sie in der Produktion oder bei der Preisangabe für Kunden verwenden.

## Lizenz, Testphase und Zahlung

ArgonCakeCalc wird unter der **ArgonCakeCalc Commercial Source-Available License, Version 1.0** veröffentlicht. Der Quellcode ist öffentlich einsehbar, doch die öffentliche Verfügbarkeit erlaubt nicht, veränderte Versionen an Dritte weiterzugeben, zu übertragen oder zu veröffentlichen. Für den persönlichen Gebrauch dürfen Sie das Programm anpassen.

Vor der Zahlung können Sie die vollständige Anwendung **einen (1) Monat** lang kostenlos herunterladen und nutzen, um die Funktionen und die Eignung für Ihre Aufgaben zu prüfen. Die Anwendung ist sofort verfügbar; ein Aktivierungsschlüssel oder eine Kontobestätigung ist nicht erforderlich.

Nach erfolgreicher Zahlung gilt die nicht ausschließliche Lizenz sofort als erteilt. Sie bestimmen den Lizenzbetrag selbst, beginnend bei **1 USD (ca. 0,89 EUR)** oder dem entsprechenden Betrag, den der Zahlungsanbieter anzeigt. Der Betrag wird vor der Bestätigung angezeigt; die Entscheidung treffen Sie freiwillig. Jeder von Ihnen gewählte Betrag, auch wenn er höher ausfällt als später erwartet, gilt als bewusst gewählt und wird nicht allein deshalb erstattet, weil Sie Ihre Meinung ändern oder das Programm nicht mehr nutzen möchten.

Der Euro-Gegenwert ist ein Richtwert auf Basis der am 3. November 2026 geprüften Referenzkurse. Maßgeblich ist der Betrag, den der Zahlungsanbieter beim Bezahlvorgang anzeigt.

Nach Erteilung der Lizenz wird eine Rückerstattung nur bei einer doppelten Abbuchung, einem technischen Fehler des Zahlungssystems oder in einem anderen gesetzlich ausdrücklich vorgesehenen Fall geprüft. Senden Sie Ihre Anfrage an `voit.ne@gmail.com` und geben Sie Zahlungsdatum, Betrag, E-Mail-Adresse des Zahlenden und die Robokassa-Transaktions-ID an.

Die Anwendung wird **„WIE BESEHEN“ (AS IS)** bereitgestellt. Der Entwickler garantiert nicht, dass sie bestimmte Erwartungen, Geschäftsprozesse oder den vom Nutzer vorgesehenen Zweck erfüllt, und haftet im gesetzlich maximal zulässigen Umfang nicht für Schäden an Unternehmen, Umsatz, Gewinn, Daten, Ruf oder Geschäftsvorgängen. Der Nutzer ist selbst dafür verantwortlich, die Anwendung zu prüfen und ihre Eignung zu beurteilen.

Lesen Sie [LICENSE](LICENSE), [NOTICE](NOTICE), [ADDITIONAL_TERMS.md](ADDITIONAL_TERMS.md) und die [Lizenzen der Drittanbieter-Komponenten](THIRD_PARTY.md).

## Verkäufer und Support

- **Verkäufer / Rechteinhaber:** selbstständig tätiger Einzelunternehmer Ivan Anatolyevich Voitkov
- **Steueridentifikationsnummer (INN):** 862203800782
- **Softwareprodukt:** ArgonCakeCalc
- **Zahlungszweck:** Einräumung eines nicht ausschließlichen Nutzungsrechts an der Software im Rahmen einer kommerziellen Lizenz
- **Support und Anfragen:** `voit.ne@gmail.com`
- **Zahlungsseite:** **ROBOKASSA-ZAHLUNGSLINK WIRD NOCH HINZUGEFÜGT**
- **Dienst-Website:** https://argonstudio.github.io/ArgonCakeCalc/shop/

Die Zahlung ist eine Lizenzgebühr und keine Spende. Der vollständige Informationsblock für Robokassa und Aufsichtsbehörden befindet sich in [docs/ROBOKASSA.md](docs/ROBOKASSA.md).

## Autor

**Ivan Voitkov** · [Website des Autors](https://argon-studio.ru/) · [GitHub](https://github.com/Argonstudio) · [Projekt-Repository](https://github.com/Argonstudio/ArgonCakeCalc)

ChatGPT (OpenAI) ist Mitautor. Mein Dank gilt den Entwicklern dieses bemerkenswerten Werkzeugs.
