// Génère public/sitemap.xml (avec hreflang), robots.txt et manifest.webmanifest. Exécuté avant chaque build.
import { writeFileSync } from 'node:fs'
import { DEFAULT_LANG, LANG_ORDER, PAGE_PARTS, SITE_URL, pathFor } from '../src/site.ts'

const pub = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const today = new Date().toISOString().slice(0, 10)
const loc = (l, p) => SITE_URL + pathFor(l, ...p)

const urls = LANG_ORDER.flatMap((lang) =>
  PAGE_PARTS.map((parts) => {
    const alts = [...LANG_ORDER.map((l) => [l, loc(l, parts)]), ['x-default', loc(DEFAULT_LANG, parts)]]
      .map(([h, u]) => `    <xhtml:link rel="alternate" hreflang="${h}" href="${u}"/>`)
      .join('\n')
    return `  <url>\n    <loc>${loc(lang, parts)}</loc>\n    <lastmod>${today}</lastmod>\n${alts}\n  </url>`
  }),
)
writeFileSync(`${pub}sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`)

writeFileSync(`${pub}robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

writeFileSync(`${pub}manifest.webmanifest`, JSON.stringify({
  name: 'Les Sept Couronnes — Fan site Game of Thrones',
  short_name: 'Sept Couronnes',
  description: "Fan site non officiel de l'univers Game of Thrones.",
  lang: DEFAULT_LANG,
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#0d0d0f',
  theme_color: '#0d0d0f',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2) + '\n')
console.log(`sitemap: ${urls.length} URL, robots.txt, manifest.webmanifest`)
