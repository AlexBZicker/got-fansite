// Constantes partagées par l'app et par les scripts de build (sitemap, icônes). Aucun import : doit rester exécutable par Node.
export const SITE_URL = 'https://got.alexbzicker.fr'
export const AUTHOR = { name: 'AlexBZicker', url: 'https://alexbzicker.fr' }

export const DEFAULT_LANG = 'fr'
export const LANG_ORDER = ['fr', 'en', 'es', 'pt', 'it', 'de', 'nl', 'sv', 'pl', 'cs', 'ru', 'uk', 'tr', 'ar', 'hi', 'vi', 'id', 'zh', 'ja', 'ko']

export const OG_LOCALE: Record<string, string> = {
  fr: 'fr_FR', en: 'en_US', es: 'es_ES', pt: 'pt_BR', it: 'it_IT', de: 'de_DE', nl: 'nl_NL', sv: 'sv_SE', pl: 'pl_PL', cs: 'cs_CZ',
  ru: 'ru_RU', uk: 'uk_UA', tr: 'tr_TR', ar: 'ar_AR', hi: 'hi_IN', vi: 'vi_VN', id: 'id_ID', zh: 'zh_CN', ja: 'ja_JP', ko: 'ko_KR',
}

// Pages (slug identique dans toutes les langues) ; l'accueil est la page sans slug.
export const PAGES = ['history', 'houses', 'characters', 'series', 'books'] as const
export const ERAS = ['origins', 'targaryen', 'rebellion', 'five-kings', 'long-night'] as const
export type Page = (typeof PAGES)[number]
export type Era = (typeof ERAS)[number]

// /  /history/  /en/  /en/history/origins/ … (slash final partout : une seule URL canonique par page)
export const pathFor = (lang: string, ...parts: string[]) => {
  const segs = [lang === DEFAULT_LANG ? '' : lang, ...parts].filter(Boolean)
  return segs.length ? `/${segs.join('/')}/` : '/'
}

// Toutes les pages (sans préfixe de langue), pour le sitemap et les routes.
export const PAGE_PARTS: string[][] = [[], ...PAGES.map((p) => [p]), ...ERAS.map((e) => ['history', e])]
