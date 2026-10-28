import { createContext, useContext, type ReactNode } from 'react'
import fr from './locales/fr.json'
import { DEFAULT_LANG, LANG_ORDER } from './site'

export type Locale = typeof fr

// Toutes les langues présentes dans src/locales/*.json sont chargées ; ajouter un fichier suffit (+ son code dans site.ts).
const files = import.meta.glob<Locale>('./locales/*.json', { eager: true, import: 'default' })
export const locales: Record<string, Locale> = Object.fromEntries(
  Object.entries(files).map(([p, l]) => [p.match(/\/(\w+)\.json$/)![1], l]),
)

export const LANGS = LANG_ORDER.filter((c) => locales[c]).map((c) => ({ code: c, name: locales[c].meta.name }))

const Ctx = createContext<{ lang: string; L: Locale }>({ lang: DEFAULT_LANG, L: fr })
export const useI18n = () => useContext(Ctx)

export function I18nProvider({ lang, children }: { lang: string; children: ReactNode }) {
  return <Ctx.Provider value={{ lang, L: locales[lang] ?? fr }}>{children}</Ctx.Provider>
}
