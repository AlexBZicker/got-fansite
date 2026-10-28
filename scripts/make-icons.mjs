// Génère favicon (svg/png/ico), icônes PWA et image Open Graph dans public/. Usage : npm run icons
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import sharp from 'sharp'

const pub = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
mkdirSync(pub, { recursive: true })
const GOLD = '#d4a63c'
const BG = '#0d0d0f'

// Couronne à cinq pointes sur fond sombre. `pad` réduit le dessin pour les icônes « maskable ».
const crown = (pad = 0, round = true) => {
  const s = 1 - pad * 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" ${round ? 'rx="14"' : ''} fill="${BG}"/>
  <g transform="translate(${32 - 32 * s} ${34 - 32 * s}) scale(${s})">
    <path d="M10 43 6 20l14 11 12-17 12 17 14-11-4 23z" fill="${GOLD}"/>
    <rect x="10" y="46" width="44" height="7" rx="2" fill="${GOLD}"/>
    <circle cx="6" cy="19" r="3" fill="${GOLD}"/><circle cx="32" cy="12" r="3" fill="${GOLD}"/><circle cx="58" cy="19" r="3" fill="${GOLD}"/>
  </g>
</svg>`
}
writeFileSync(`${pub}favicon.svg`, crown())

const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()
const out = {
  'favicon-32x32.png': await png(crown(), 32),
  'apple-touch-icon.png': await png(crown(0, false), 180),
  'icon-192.png': await png(crown(), 192),
  'icon-512.png': await png(crown(), 512),
  'icon-maskable-512.png': await png(crown(0.12, false), 512),
}
for (const [f, b] of Object.entries(out)) writeFileSync(pub + f, b)

// favicon.ico : conteneur ICO avec des PNG (32 et 48 px), valide depuis Windows Vista.
const sizes = [32, 48]
const imgs = await Promise.all(sizes.map((s) => png(crown(), s)))
const head = Buffer.alloc(6 + 16 * imgs.length)
head.writeUInt16LE(1, 2); head.writeUInt16LE(imgs.length, 4)
let offset = head.length
imgs.forEach((b, i) => {
  const o = 6 + 16 * i
  head[o] = sizes[i]; head[o + 1] = sizes[i]; head.writeUInt16LE(1, o + 4); head.writeUInt16LE(32, o + 6)
  head.writeUInt32LE(b.length, o + 8); head.writeUInt32LE(offset, o + 12)
  offset += b.length
})
writeFileSync(`${pub}favicon.ico`, Buffer.concat([head, ...imgs]))

// Image Open Graph 1200x630 : logo blanc + titre doré sur fond dégradé.
const logo = await sharp(readFileSync(`${pub}images/logo.png`)).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
for (let i = 0; i < logo.data.length; i += 4) logo.data[i] = logo.data[i + 1] = logo.data[i + 2] = 255
const logoPng = await sharp(logo.data, { raw: logo.info }).resize({ width: 760 }).png().toBuffer()
const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><radialGradient id="g" cx="50%" cy="0%" r="90%"><stop offset="0" stop-color="#3a2f18"/><stop offset="1" stop-color="${BG}"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="24" y="24" width="1152" height="582" fill="none" stroke="${GOLD}" stroke-opacity=".45" stroke-width="2"/>
  <text x="600" y="400" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="68" font-weight="700" letter-spacing="8" fill="${GOLD}">LES SEPT COURONNES</text>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="#cfc9bb">Fan site Game of Thrones · 20 langues</text>
  <text x="600" y="560" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="26" letter-spacing="4" fill="${GOLD}" fill-opacity=".8">got.alexbzicker.fr</text>
</svg>`
await sharp(Buffer.from(bg)).composite([{ input: logoPng, top: 130, left: 220 }]).png().toFile(`${pub}og-image.png`)
console.log('icônes + og-image générés dans public/')
