# element 83

site for **element 83** — a small indie game studio brewing quiet, unsettling games with the godot engine.

## stack

- vite + react + typescript
- tailwind css (custom dark palette, no ui kit)
- lucide-react for icons
- google fonts: nunito (headings/body) + la belle aurore (cursive accents)

## scripts

```bash
npm install
npm run dev       # local dev server
npm run build     # production build
npm run preview   # preview built site
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```

## structure

- `src/pages/` — home, games, about, contact
- `src/components/` — nav, footer, splash, overlay (scanlines + grain), cube logo
- `src/lib/useReveal.ts` — small intersection-observer hook for section entrances
- `src/index.css` — theme, overlays, glitch + button styles

made with godot.
