# Implementierungsanweisung

## 1. Interaktive Playgrounds (HTML, CSS, JS, Python, TypeScript, Java, SQL, React)
- Öffne die jeweilige Playground-HTML-Datei im Browser oder mit Live Server in VS Code.
- Wähle eine Aufgabe aus, schreibe deinen Code in den Editor.
- Klicke auf "Ausführen" (bzw. "Überprüfen" bei Java), um Feedback zu erhalten.
- Klicke auf "Lösung anzeigen", wenn du nicht weiterkommst.
- Klicke auf "Nächste Aufgabe", um weiterzulernen.
- Aktiviere den Fokusmodus für ablenkungsfreies Lernen.

## 2. Eigene Aufgaben/Module ergänzen
- Die Aufgaben sind im jeweiligen Playground als JavaScript-Array (`const tasks = [...]`) hinterlegt.
- Um neue Aufgaben hinzuzufügen, ergänze das Array nach dem bestehenden Muster (title, description, info, solution, ggf. check).
- Für SQL, TypeScript, Python, Java, React: Jede Aufgabe besteht aus Titel, Beschreibung, Info-Box, Lösung und (wo möglich) automatischer Überprüfung.

## 3. Python-Lernumgebung (Terminal)
- Starte das Skript:
  ```
  python LEARNING-SYSTEM/python-modules/01-python-basics/learning_environment.py
  ```
- Folge den Anweisungen im Terminal.

## 4. Fehlerbehebung
- Bei Fehlern prüfe die Konsolenausgabe und folge den Hinweisen.
- Bei Problemen mit den Playgrounds: Browser-Konsole öffnen (F12) und Fehlermeldungen prüfen.

## 5. Erweiterungsideen
- Weitere Aufgaben und Playgrounds können nach dem bestehenden Muster ergänzt werden.
- Für neue Technologien einfach ein neues Playground-HTML nach dem Vorbild der bestehenden anlegen.

## 6. Java & TypeScript Templates
- Die Templates findest du unter:
  - `java/basics/01_java_basics.java`
  - `typescript/basics/01_typescript_basics.ts`
- Vorgehen:
  - Öffne das jeweilige Template in deiner IDE
  - Lies die Info-Boxen und Aufgabenstellung
  - Schreibe deine Lösung direkt in die vorgesehenen Bereiche
  - Arbeite die Aufgaben von oben nach unten durch
- Die Templates sind didaktisch aufgebaut und decken alle prüfungsrelevanten Grundlagen ab.

## 7. SQL Template
- Das Template findest du unter:
  - `sql/basics/01_sql_basics.sql`
- Vorgehen:
  - Öffne das Template in deinem SQL-Editor oder einer Datenbank-IDE
  - Lies die Info-Boxen und Aufgabenstellung
  - Schreibe deine Lösung direkt in die vorgesehenen Bereiche
  - Arbeite die Aufgaben von oben nach unten durch
- Das Template ist didaktisch aufgebaut und deckt alle prüfungsrelevanten Grundlagen ab.

## Barrierefreiheit & Design

- Farbkontraste und Fokus-Indikatoren wurden für alle Playgrounds erhöht.
- ARIA-Labels und Rollen für Screenreader ergänzt.
- Alle Buttons und Editoren sind per Tastatur erreichbar und bedienbar.
- Layout ist responsiv und für Mobilgeräte optimiert.
- Buttons und Schriftgrößen wurden vergrößert.

## Automatisierte Playground-Validierung

- Jede Aufgabe wird automatisch geprüft (Check-Funktion pro Aufgabe).
- Feedback erfolgt sofort, inkl. motivierender Rückmeldungen und Tipps.
- Fehler werden farblich hervorgehoben.
- Lösungen und Fortschritt jederzeit sichtbar.

## Screenshots & Beispiele

Screenshots der Playgrounds können im Ordner `docs/screenshots/` abgelegt und in die README eingebunden werden. Beispiel:

> ![SQL Playground Screenshot](./docs/screenshots/sql-playground.png)

Die Playgrounds bieten:
- Sofortiges, motivierendes Feedback (z.B. " Richtig! Super gemacht!" oder " Noch nicht ganz richtig. Tipp: Lies die Info-Box!")
- Barrierefreiheit durch hohe Kontraste, Fokus-Indikatoren, ARIA-Labels, Tastaturbedienung und responsives Layout

## Ausblick: Java im Browser & Modularisierung

- Java-Ausführung im Browser (z.B. mit TeaVM) ist geplant.
- Playground-Logik wird als Modul/NPM-Paket vorbereitet. 