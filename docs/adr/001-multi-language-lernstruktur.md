# ADR-001: Multi-Sprachen-Ordnerstruktur für Lernprojekte

**Status:** Accepted  
**Datum:** 2025

## Kontext
Das LearningByDoing-Repository sammelt praktische Übungen in verschiedenen Programmiersprachen und Technologien.

## Entscheidung
Jede Technologie bekommt einen eigenen Ordner (`python/`, `java/`, `html-css-js/`, `react/`, `sql/`, `typescript/`, `tailwind/`), ergänzt durch ein `LEARNING-SYSTEM/` für Metadaten und Fortschrittsstruktur.

## Abgewogene Alternativen
- **Monolithisches Repo:** Unstrukturiert, schwer navigierbar
- **Separate Repos pro Sprache:** Zu viel Overhead bei kleinen Übungen

## Konsequenzen
**Positiv:**
- Klare Separation der Sprachen und Frameworks
- Einfach erweiterbar um neue Technologien
- Fortschrittstracking via `user_progress.json`

**Negativ:**
- Gemeinsame Abhängigkeitsverwaltung nicht möglich
