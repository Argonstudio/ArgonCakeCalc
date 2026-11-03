# ArgonCakeCalc

**Kennen Sie Ihre echten Kosten, bevor Sie den Kuchenpreis nennen.**

> **Website:** **ТУТ ССЫЛКА НА САЙТ**  
> **Lizenzzahlung:** **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**

[English](README.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Norsk](README.nb.md) · [Español](README.es.md) · [Italiano](README.it.md) · [简体中文](README.zh.md) · [日本語](README.ja.md)

ArgonCakeCalc ist ein Programm, das Konditoren hilft. Die wichtigsten Funktionen: Rezepte erstellen, Zutatenlisten speichern, Produkte zusammenstellen – auch mehrstöckige Torten (mit Visualisierung) – und sofort die Kalkulation von Selbstkosten und Gewinn erhalten. Erstellte Rezepte und Produkte lassen sich als PDF herunterladen. Das Programm arbeitet lokal, ohne Installation und ohne Internet.

Ein Konto, ein Abonnement oder eine Cloud-Datenbank sind nicht nötig. Ihre Rezepte und Preise bleiben im Browser auf Ihrem Gerät.

## Schnellstart

Das Programm besteht aus einer einzigen Datei. Es muss nichts installiert werden.

1. Öffnen Sie das [ArgonCakeCalc-Repository auf GitHub](https://github.com/Argonstudio/ArgonCakeCalc) und gehen Sie zur Datei [`ArgonCakeCalc.html`](ArgonCakeCalc.html).
2. Klicken Sie auf der Dateiseite auf das Download-Symbol (**Download raw file**) und speichern Sie die Datei in einem Ordner, in dem sie dauerhaft bleibt.
3. Öffnen Sie die gespeicherte Datei in einem modernen Browser auf einem Computer, Tablet oder Smartphone.

Die Datei enthält bereits das Programm, alle Übersetzungen, Styles und die PDF-Schriften und funktioniert nach dem Download daher ohne Internet.

Sie möchten nichts herunterladen? Öffnen Sie die Website: **ТУТ ССЫЛКА НА САЙТ**. Unter einer stabilen HTTPS-Adresse kann sich die Anwendung nach dem ersten Laden außerdem auf die Offline-Nutzung vorbereiten.

Die Oberfläche startet auf Englisch. Die Sprache lässt sich direkt im Programm umstellen: Russisch, Französisch, Deutsch, Norwegisch (Bokmål), Spanisch, Italienisch, vereinfachtes Chinesisch oder Japanisch.

> [!WARNING]
> **Die Daten werden im Browser gespeichert, nicht in der HTML-Datei.** Wenn Sie die Datei verschieben oder umbenennen, den Browser wechseln, Browserdaten löschen oder im privaten Modus arbeiten, kann der Zugriff auf Rezepte und Preise verloren gehen. Lassen Sie die Datei an einem Ort, öffnen Sie sie immer im selben Browser und exportieren Sie regelmäßig eine JSON-Sicherung. Einzelheiten finden Sie im Abschnitt [Ihre Daten und Sicherungen](#ihre-daten-und-sicherungen).

## Was das Programm kann

- **Materialien.** Führen Sie einen Katalog für Zutaten, Dekoration, Verpackung und Verbrauchsmaterial. Für jeden Eintrag geben Sie Packungspreis, Menge pro Packung, Einheit, Kategorie und bei Bedarf die Dichte an. Unterstützt werden Gramm, Kilogramm, Milliliter und Liter. Masse und Volumen werden nur umgerechnet, wenn die Dichte bekannt ist; Stückzahlen werden nie automatisch in Gewicht umgewandelt.
- **Rezepte und Komponenten.** Erstellen Sie Rezepte mit Ausbeute, Zubereitungsverlust, Anleitung und Zutatenzeilen. Eine Komponente kann ein Material oder ein anderes Rezept sein: Eine Füllung kann eine Creme enthalten, die Creme einen Sirup. Verschachtelte Rezepte werden bis auf die Rohstoffe aufgelöst, und gleiche Komponenten werden zu einer übersichtlichen Einkaufsliste zusammengeführt. Ändert sich der Preis eines Materials, werden alle davon abhängigen Rezepte und Produkte automatisch neu berechnet.
- **Produkt-Builder.** Stellen Sie ein Produkt aus Böden, Füllungen, Cremes, Tränken, Überzügen, Dekoration und Verpackung zusammen. Speichern Sie Produkte, duplizieren Sie sie als Vorlagen und vergleichen Sie verschiedene Verkaufspreise, ohne die gespeicherte Kalkulation zu ändern.
- **Vollständige Selbstkosten.** Fügen Sie Arbeit, Strom, Lieferkosten, Verpackung, sonstige Kosten und eine Verlustreserve hinzu, legen Sie dann einen Aufschlag oder eine Zielmarge und bei Bedarf einen Mindestgewinn fest. In die Selbstkosten fließt nur der tatsächlich verbrauchte Teil einer Packung ein; in der Einkaufsliste werden Packungen aufgerundet.
- **Skalierung.** Rechnen Sie ein Rezept nach der gewünschten Ausbeute oder nach Durchmesser und Höhe einer runden Torte um. Jede Zutatenzeile kann proportional, nach Fläche skalieren, fest bleiben oder auf ganze Stücke aufgerundet werden. Die Tortengeometrie ist eine Schätzhilfe und keine statische Berechnung und keine Lebensmittelsicherheitsberechnung.
- **PDF, Einkaufsliste und Sicherung.** Exportieren Sie ein PDF mit Zutaten, Rohstoffen, Anleitung, Selbstkosten, empfohlenem Preis und Maßen. Laden Sie eine Einkaufsliste für die Produktion herunter oder geben Sie sie an die Person weiter, die die Bestellung vorbereitet. Speichern Sie eine vollständige JSON-Sicherung, um Ihre Daten zwischen Browsern oder Geräten zu übertragen.

## Die erste Kalkulation

Beim ersten Start können Sie mit einem leeren Arbeitsbereich oder mit einer fiktiven Demo beginnen. Die Demo zeigt den Ablauf schnell, ihre Preise sind aber Beispielwerte und keine realen Marktpreise.

1. Tragen Sie die tatsächlichen Einkaufspreise ein.
2. Erstellen Sie ein Rezept und geben Sie Ausbeute und Verluste an.
3. Stellen Sie ein Produkt zusammen und legen Sie Maße oder Portionszahl fest.
4. Fügen Sie Arbeit, Strom, Verpackung und sonstige Kosten hinzu.
5. Vergleichen Sie den Verkaufspreis nach Aufschlag und nach Zielmarge.
6. Exportieren Sie ein PDF und eine Einkaufsliste und speichern Sie anschließend eine JSON-Sicherung.

## So werden Preise berechnet

- Ausbeute nach Verlust = eingegebene Ausbeute × verbleibender Prozentsatz nach Verlust.
- Preis nach Aufschlag = vollständige Selbstkosten × (1 + Aufschlag % ÷ 100).
- Preis nach Zielmarge = vollständige Selbstkosten ÷ (1 − Marge % ÷ 100).
- Der empfohlene Verkaufspreis wird auf die Genauigkeit der gewählten Währung aufgerundet.
- Die Berechnungen sind exakt: Zwischenergebnisse werden nicht vorzeitig gerundet.
- Verschachtelte Rezepte werden in Rohstoffmengen aufgelöst.
- In der Einkaufsliste werden Packungen aufgerundet, in den Selbstkosten wird nur der tatsächlich verbrauchte Anteil berücksichtigt.
- Die Währungsauswahl ändert nur Bezeichnung und Genauigkeit. Eine Umrechnung nach Wechselkurs gibt es nicht.

Formeln und Annahmen sind in den [Berechnungsregeln](docs/CALCULATIONS.md) beschrieben.

## Ihre Daten und Sicherungen

Materialien, Rezepte, Produkte und Einstellungen werden in der IndexedDB des Browsers gespeichert – getrennt für jede Website-Adresse bzw. jeden Dateispeicherort. Die Oberflächensprache wird als kleine lokale Einstellung gespeichert. Es gibt kein Konto, keine Analyse, keine versteckte Cloud-Synchronisierung und keine serverseitige Rezeptdatenbank; ohne Ihr Zutun wird nichts übertragen.

Exportieren Sie regelmäßig JSON-Sicherungen, und unbedingt vor dem Verschieben oder Umbenennen der HTML-Datei. Das Löschen von Browserdaten, der private Modus, eine geänderte Website-Adresse, eine verschobene Datei oder der Verlust des Geräts können den Zugriff auf die lokale Datenbank verhindern. Der Speicher für eine lokale Datei (`file://`) kann sich in verschiedenen Browsern unterschiedlich verhalten; für die tägliche Arbeit ist eine stabile HTTPS-Adresse zuverlässiger. Die Berechtigung für dauerhaften Speicher im Browser ersetzt keine Sicherung.

## Einschränkungen

Das PDF wird auf Ihrem Gerät erzeugt, ohne Druckdialog und ohne Upload auf einen Server. Lateinische, kyrillische, chinesische und japanische Zeichen werden unterstützt; die chinesischen und japanischen Schriften vergrößern die Datei. Nicht unterstützte Emoji und seltene Zeichen können im PDF als `?` erscheinen.

Das Programm enthält keine Lagerverwaltung, kein Steuermodul, keine Wechselkurse, keine Bestellungen, keine Cloud-Konten, keine Synchronisierung zwischen Geräten und keine statische Sicherheitsberechnung für Torten. Prüfen Sie das Ergebnis selbst, bevor Sie es in der Produktion oder für die Preisgestaltung gegenüber Kunden verwenden.

## Lizenz, Testzeitraum und Zahlung

ArgonCakeCalc wird unter der **ArgonCakeCalc Commercial Source-Available License, Version 1.0** vertrieben. Der Quellcode ist zur Einsicht offen, doch die öffentliche Sichtbarkeit berechtigt nicht zur Weitergabe, Unterlizenzierung oder Veröffentlichung geänderter Versionen für Dritte.

Vor der Zahlung können Sie die vollständige Anwendung **einen (1) Monat** lang kostenlos herunterladen und nutzen, um Funktionen und Eignung für Ihre Aufgaben zu prüfen. Das Programm ist sofort verfügbar; ein Aktivierungsschlüssel oder eine Kontobestätigung ist nicht erforderlich.

Nach erfolgreicher Zahlung gilt die nicht ausschließliche Lizenz als sofort erteilt. Den Betrag ab 1 $ oder dem vom Zahlungsanbieter angezeigten Gegenwert wählen Sie selbst, Sie sehen ihn vor der Bestätigung und entscheiden freiwillig. Jeder gewählte Betrag, auch ein höherer, als Sie später erwartet haben, gilt als bewusst gewählt und wird nicht allein deshalb erstattet, weil Sie Ihre Meinung geändert haben oder das Programm nicht mehr nutzen möchten.

Nach Erteilung der Lizenz wird eine Rückerstattung nur bei einer doppelten Abbuchung, einem technischen Fehler des Zahlungssystems oder in einem anderen ausdrücklich gesetzlich vorgesehenen Fall geprüft. Senden Sie Ihre Anfrage an `voit.ne@gmail.com` mit Zahlungsdatum, Betrag, E-Mail-Adresse des Zahlenden und Robokassa-Transaktionskennung.

Das Programm wird **„wie besehen“ (AS IS)** bereitgestellt. Der Entwickler übernimmt keine Gewähr dafür, dass es Ihren konkreten Erwartungen, Geschäftsprozessen oder Ihrem Verwendungszweck entspricht, und haftet im gesetzlich größtmöglichen Umfang nicht für Schäden an Ihrem Geschäft, Umsatz, Gewinn, Ihren Daten, Ihrem Ruf oder Ihrem Betrieb. Sie prüfen das Programm selbst und entscheiden, ob es für Ihre Arbeit geeignet ist.

Lesen Sie [LICENSE](LICENSE), [NOTICE](NOTICE), [ADDITIONAL_TERMS.md](ADDITIONAL_TERMS.md) und [die Lizenzen von Drittkomponenten](THIRD_PARTY.md).

## Verkäufer und Support

- **Verkäufer / Rechteinhaber:** selbstständiger Unternehmer Ivan Anatoljewitsch Voitkow
- **Steuer-ID:** 862203800782
- **Produkt:** ArgonCakeCalc
- **Gegenstand:** nicht ausschließliche Nutzungslizenz für die Software
- **Support und Ansprüche:** `voit.ne@gmail.com`
- **Zahlungsseite:** **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**
- **Website:** **ТУТ ССЫЛКА НА САЙТ**

Die Zahlung ist eine Lizenzgebühr und keine Spende. Der vollständige Block für Robokassa und Behörden steht in [docs/ROBOKASSA.md](docs/ROBOKASSA.md).

## Autor

**Ivan Voitkov** · [Website](https://argon-studio.ru/) · [GitHub](https://github.com/Argonstudio) · [Repository](https://github.com/Argonstudio/ArgonCakeCalc)

Das Projekt wurde von ChatGPT (OpenAI) gemeinsam mit Ivan Voitkov erstellt. Ivan Voitkov bleibt der genannte Autor des Projekts.

---

Für Entwickler und Mitwirkende: [DEVELOPMENT.md](DEVELOPMENT.md) (nur auf Englisch).
