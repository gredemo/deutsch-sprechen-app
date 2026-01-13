# Deutsch Sprechen App

En app för att hjälpa elever att öva muntlig tyska genom glosor och hjälpfraser.

## Funktioner

- ✅ Tre nivåer: Leicht, Mittel, Schwer
- ✅ Slumpmässig ordvisning (inga repetitioner per omgång)
- ✅ 2-3 hjälpfraser per ord
- ✅ Ordmoln med använda ord
- ✅ Skogsfärger som tema
- ✅ Tema: Resor

## Installation

```bash
# Installera dependencies
npm install

# Starta utvecklingsserver
npm run dev

# Bygg för produktion
npm run build
```

## Deployment till Vercel

1. Pusha koden till GitHub
2. Gå till [Vercel](https://vercel.com)
3. Importera ditt GitHub repository
4. Vercel detekterar automatiskt Vite-projektet
5. Klicka "Deploy"

## Projektstruktur

```
src/
  ├── App.jsx              # Huvudkomponent
  ├── App.css              # Global styling
  ├── main.jsx             # Entry point
  ├── components/
  │   ├── LevelSelection.jsx
  │   ├── LevelSelection.css
  │   ├── ExerciseView.jsx
  │   └── ExerciseView.css
  └── data/
      └── themes.js        # Teman och glosor
```

## Lägga till nya teman

Redigera `src/data/themes.js` och lägg till nya teman med samma struktur som `travelTheme`.

## Nästa steg

- [ ] Spara valda teman i localStorage
- [ ] Lägg till fler teman
- [ ] Timer-funktion
- [ ] Exportera ordlista som PDF
