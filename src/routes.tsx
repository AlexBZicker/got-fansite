import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import { LANGS } from './i18n'
import { Battles, Beliefs, Books, Characters, Creatures, EraPage, History, Home, Houses, NotFound, Places, Series } from './pages'
import { DEFAULT_LANG, ERAS } from './site'

// Une arborescence complète par langue : / (FR par défaut), /en/, /es/ … ; chaque route est pré-rendue au build.
const pages = (): RouteRecord[] => [
  { index: true, element: <Home /> },
  { path: 'history', element: <History /> },
  ...ERAS.map((e) => ({ path: `history/${e}`, element: <EraPage era={e} /> })),
  { path: 'houses', element: <Houses /> },
  { path: 'characters', element: <Characters /> },
  { path: 'places', element: <Places /> },
  { path: 'battles', element: <Battles /> },
  { path: 'beliefs', element: <Beliefs /> },
  { path: 'creatures', element: <Creatures /> },
  { path: 'series', element: <Series /> },
  { path: 'books', element: <Books /> },
]

export const routes: RouteRecord[] = [
  ...LANGS.map(({ code }) => ({ path: code === DEFAULT_LANG ? '/' : `/${code}`, element: <App lang={code} />, children: pages() })),
  { path: '404', element: <App lang={DEFAULT_LANG}><NotFound /></App> },
  { path: '*', element: <App lang={DEFAULT_LANG}><NotFound /></App> },
]
