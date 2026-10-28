# Les Sept Couronnes

Fan site non officiel de l'univers *Game of Thrones* : histoire de Westeros (5 ères, 40 événements), grandes maisons, personnages, séries et livres. Disponible en 20 langues.

**https://got.alexbzicker.fr**

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui · [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg) (pré-rendu statique de chaque page et de chaque langue pour le SEO).

## Développement

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # sitemap + pré-rendu des 221 pages dans dist/
npm run icons      # régénère favicon, icônes PWA et image Open Graph (public/)
```

## Organisation

- `src/locales/<langue>.json` : tous les textes, un fichier par langue (`fr` par défaut). Ajouter une langue = ajouter un fichier et son code dans `src/site.ts`.
- `src/data.ts` : noms propres, acteurs et images (non traduits).
- `src/site.ts` : URL du site, langues, pages ; partagé avec les scripts de build.
- `src/pages.tsx`, `src/routes.tsx`, `src/seo.tsx` : pages, routes par langue et balises SEO (canonical, hreflang, Open Graph, JSON-LD).
- `scripts/` : génération du sitemap, du manifest, du robots.txt et des icônes.
- `public/images/` : logo, blasons, affiches et portraits (voir les fichiers `CREDITS` pour les sources et licences).

## Images et licences

Les images viennent de Wikipédia / Wikimedia Commons (licences libres, auteurs indiqués dans `public/images/CREDITS*.md` et `public/images/persos/CREDITS.md`). *Game of Thrones* est une marque de ses ayants droit ; ce site n'a aucun lien avec HBO ni George R. R. Martin.

© AlexBZicker — [alexbzicker.fr](https://alexbzicker.fr)
