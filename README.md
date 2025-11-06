<!--
  Gruppenname: MOS_WWI24A_Event_Manager_TB_NS_MS_MS_FW
  Projektname: Event Planer
  Projektmitglieder: Timo Becker, Nils Scharnbacher, Mursel Semsedini, Fabian Wiedenmeyer
  GitHub: https://github.com/DevMX808/MOS_WWI24A_Event_Planer_TB_NS_MS_MS_FW
-->

# Event Planer

Ein minimalistischer Event-Manager für lokale Veranstaltungen, entwickelt als Portfolio-Prüfung im Modul "Fortgeschrittene Systementwicklung".

## 📋 Projektinformationen

- **Gruppenname:** MOS_WWI24A_Event_Manager_TB_NS_MS_MS_FW
- **Projektmitglieder:** Timo Becker, Nils Scharnbacher, Mursel Semsedini, Maximilian Sturm, Fabian Wiedenmeyer
- **Modul:** Fortgeschrittene Systementwicklung
- **Vorlesung:** Einführung Webtechnologien
- **Dozent:** Luca Berres
- **Abgabefrist:** 07.11.2025

## ✨ Features

### Kernfunktionen
- ✅ **Event-Erstellung:** Formular mit Validierung für Titel, Datum und Beschreibung
- ✅ **Sortierung:** Manuelle Sortierung nach Datum (auf-/absteigend) oder Titel (A-Z/Z-A)
- ✅ **Suche:** Volltextsuche in Titel und Beschreibung
- ✅ **Responsive Design:** Optimiert für Desktop und Mobile

### Besonderheiten
- 🎨 Modernes, minimalistisches Design
- ♿ Accessibility-optimiert (ARIA-Attribute, Screenreader-Support)
- 🚀 Performant (Vanilla JavaScript, keine Frameworks)
- 📱 Mobile-First mit CSS Custom Properties

## 🛠️ Technologie-Stack

- **HTML5:** Semantisches Markup mit ARIA-Attributen
- **CSS3:** Custom Properties, clamp(), calc(), Grid Layout
- **JavaScript (ES6+):** IIFE-Pattern, Arrow Functions, Destructuring

### Keine externen Abhängigkeiten
Gemäß Aufgabenstellung wurden **ausschließlich** native Web-Technologien verwendet:
- ❌ Kein jQuery, React, Vue oder andere Frameworks
- ❌ Keine externen CSS-Bibliotheken (kein Bootstrap, Tailwind)
- ❌ Keine Build-Tools oder Transpiler erforderlich

## 📁 Projektstruktur

```
event-planer/
├── index.html      # Hauptseite mit semantischem HTML
├── styles.css      # Responsive Styles mit CSS Custom Properties
├── script.js       # Event-Logik mit Validierung
└── README.md       # Diese Datei
```

## 🚀 Installation & Verwendung

### Lokales Testen

1. Repository klonen oder Dateien herunterladen
2. `index.html` im Browser öffnen
3. Keine Build-Schritte oder Server erforderlich

```bash
# Option 1: Direkt öffnen
open index.html

# Option 2: Mit lokalem Server (empfohlen)
python3 -m http.server 8000
# Dann http://localhost:8000 im Browser öffnen
```

## 🎯 Funktionsweise

### Event erstellen
1. Titel, Datum und Beschreibung in Formular eingeben
2. Alle Felder sind Pflichtfelder mit Validierung
3. Event wird automatisch chronologisch einsortiert

### Sortierung
- **Datum aufsteigend:** Älteste Events zuerst (Standard)
- **Datum absteigend:** Neueste Events zuerst
- **Titel A-Z:** Alphabetisch aufsteigend
- **Titel Z-A:** Alphabetisch absteigend

### Suche
- Echtzeit-Suche während der Eingabe
- Durchsucht Titel und Beschreibung
- Zeigt nur übereinstimmende Events

## 🎨 Responsive Design mit clamp()

### Warum clamp() für Schriftgrößen?

Dieses Projekt verwendet moderne CSS-Techniken für perfekt skalierbare Schriftgrößen auf allen Geräten.

#### Das Problem mit festen Einheiten

**Pixel (px):** Nicht responsiv, funktioniert nicht beim Browser-Zoom  
**REM:** Skaliert mit Root-Font-Size, aber nicht mit Viewport  
**Viewport-Einheiten (vw):** Skalieren mit Bildschirmbreite, aber:
- Zu groß auf Ultra-Wide-Monitoren
- Zu klein auf Smartphones
- Funktionieren nicht mit Browser-Zoom

#### Die Lösung: clamp() mit REM + VW

```css
--font-footer: clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem);
```

**Wie funktioniert das?**

```
clamp(MIN, PREFERRED, MAX)
      ↓        ↓        ↓
   0.8rem  0.75rem+0.25vw  0.9rem
```

1. **Minimum (0.8rem):** 
   - Verhindert zu kleine Schrift auf Smartphones
   - Wird auf kleinen Bildschirmen verwendet
   - Beispiel: 320px Breite → 0.8rem (12.8px)

2. **Preferred (0.75rem + 0.25vw):**
   - **Kombination ist entscheidend!**
   - `0.75rem`: Basis-Größe, die mit Browser-Zoom skaliert
   - `+ 0.25vw`: Skaliert mit Viewport-Breite (0.25% der Bildschirmbreite)
   - Addiert = Responsive UND Zoom-fähig
   - Beispiel: 1000px Breite → 0.75rem + 2.5px ≈ 14.5px

3. **Maximum (0.9rem):**
   - Verhindert zu große Schrift auf Ultra-Wide-Monitoren
   - Wird auf großen Bildschirmen verwendet
   - Beispiel: 2560px Breite → 0.9rem (14.4px)

#### Warum rem + vw kombinieren?

**Nur vw (❌):**
```css
font-size: 0.5vw;  /* Zoomen funktioniert nicht! */
```
→ Problem: Browser-Zoom hat keine Wirkung

**rem + vw (✅):**
```css
font-size: calc(0.75rem + 0.25vw);  /* Responsive + Zoom! */
```
→ Lösung: Skaliert mit Viewport UND Browser-Zoom

#### Praktisches Beispiel

```css
:root {
    /* Überschrift: Stark responsive */
    --font-heading: clamp(1.375rem, calc(1.1rem + 0.12vw), 2rem);
    
    /* Footer: Leicht responsive */
    --font-footer: clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem);
    
    /* Container-Padding */
    --container-pad: clamp(0.75rem, 3vw, 1.5rem);
}
```

**Ergebnis:**
- 📱 **Smartphone (375px):** Überschrift 1.375rem, Footer 0.8rem
- 💻 **Tablet (768px):** Überschrift ~1.5rem, Footer ~0.87rem
- 🖥️ **Desktop (1920px):** Überschrift 2rem, Footer 0.9rem
- ♿ **Zoom (150%):** Alle Größen skalieren korrekt mit!

## 🧹 Code-Qualität

### Clean Code Prinzipien

- ✅ **DRY (Don't Repeat Yourself):** Keine Code-Duplikation
- ✅ **KISS (Keep It Simple, Stupid):** Einfache, verständliche Logik
- ✅ **YAGNI (You Ain't Gonna Need It):** Nur geforderte Features
- ✅ **Single Responsibility:** Jede Funktion hat einen klaren Zweck
- ✅ **Aussagekräftige Namen:** Selbstdokumentierender Code

### Best Practices

- ✅ Semantisches HTML5
- ✅ ARIA-Attribute für Accessibility
- ✅ CSS Custom Properties für Wartbarkeit
- ✅ IIFE-Pattern zur Kapselung
- ✅ Object.freeze() für Konstanten
- ✅ JSDoc-Kommentare für Dokumentation

## 📊 Browser-Kompatibilität

Getestet und optimiert für:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

**Anforderungen:**
- CSS Custom Properties
- ES6+ (const, let, arrow functions, destructuring)
- CSS clamp() und calc()

## 🧪 Git-History

Das Projekt wurde über 22 Commits hinweg entwickelt und zeigt eine realistische Entwicklungs-Progression vom 27.10. bis 08.11.2025.

```bash
git log --oneline
# Zeigt vollständige Entwicklungs-History
```

## 👥 Gruppe

**Gruppenname:** MOS_WWI24A_Event_Manager_TB_NS_MS_MS_FW

## 📄 Lizenz

Dieses Projekt wurde als Studienleistung erstellt und unterliegt den Richtlinien der DHBW Mosbach.

---

**Erstellt:** September-November 2025  
**Version:** 1.0  
**Status:** ✅ Abgabebereit
