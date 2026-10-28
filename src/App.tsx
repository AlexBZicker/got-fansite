import type { ReactNode } from 'react'
import { NavLink, Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom'
import { I18nProvider, LANGS, useI18n } from '@/i18n'
import { DEFAULT_LANG, PAGES, pathFor } from '@/site'

const TITLE_KEY = { history: 'histoire', houses: 'maisons', characters: 'personnages', series: 'series', books: 'livres' } as const

// Cadre commun à toutes les pages : lien d'évitement, menu, sélecteur de langue, pied de page.
function Shell({ children }: { children: ReactNode }) {
  const { lang, L } = useI18n()
  const { ui } = L
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const link = ({ isActive }: { isActive: boolean }) =>
    `text-xs tracking-wider uppercase hover:underline md:text-sm ${isActive ? 'font-bold text-primary underline underline-offset-8' : 'text-primary/80'}`

  // Même page dans une autre langue : on retire le préfixe de langue courant puis on le remplace.
  const switchLang = (to: string) => {
    const rest = pathname.split('/').filter(Boolean)
    if (lang !== DEFAULT_LANG) rest.shift()
    navigate(pathFor(to, ...rest))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-20 focus:bg-background focus:p-3 focus:text-primary">{ui.skipToContent}</a>
      <nav className="sticky top-0 z-10 overflow-x-auto border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-4 py-3 whitespace-nowrap">
          <NavLink to={pathFor(lang)} end className="font-bold tracking-widest text-primary uppercase md:text-lg">{ui.siteTitle}</NavLink>
          {PAGES.map((p) => (
            <NavLink key={p} to={pathFor(lang, p)} className={link}>{ui.nav[TITLE_KEY[p]]}</NavLink>
          ))}
          <select
            aria-label={ui.language}
            value={lang}
            onChange={(e) => switchLang(e.target.value)}
            className="ms-auto rounded-md border bg-card px-2 py-1 text-xs text-primary"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
        </div>
      </nav>

      <main id="main">{children}</main>

      <footer className="mt-12 space-y-1 border-t px-4 py-6 text-center text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()}{' '}
          <a href="https://alexbzicker.fr" target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">
            AlexBZicker
          </a>{' '}
          — {ui.rights}
        </p>
        <p>{ui.disclaimer}</p>
        <p>{ui.images}</p>
      </footer>
      <ScrollRestoration />
    </div>
  )
}

export default function App({ lang, children }: { lang: string; children?: ReactNode }) {
  return (
    <I18nProvider lang={lang}>
      <Shell>{children ?? <Outlet />}</Shell>
    </I18nProvider>
  )
}
