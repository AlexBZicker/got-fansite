import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Pic, slug } from '@/components/pic'
import { livres, maisons, persos, series, sources } from '@/data'
import { useI18n } from '@/i18n'
import { Seo } from '@/seo'
import { ERAS, PAGES, pathFor, type Era, type Page } from '@/site'

const grid = 'grid gap-3 sm:grid-cols-2 lg:grid-cols-3'
const wrap = 'mx-auto w-full max-w-6xl px-4'
const h1 = 'text-3xl font-bold tracking-wide text-primary md:text-5xl'
const ALL = '__all__'

type House = { seat: string; words: string; desc: string }
type Serie = { tag: string; desc: string }
type Book = { title: string; tag: string; desc: string }
type EraData = { name: string; period: string; intro: string; events: { t: string; d: string }[] }

const TITLE_KEY = { history: 'histoire', houses: 'maisons', characters: 'personnages', series: 'series', books: 'livres' } as const

function usePage(page: Page) {
  const { lang, L } = useI18n()
  const name = L.ui.titles[TITLE_KEY[page]]
  return { lang, L, name, seo: L.seo[page], crumbs: [{ name, parts: [page] }] }
}

function Crumbs({ items }: { items: { name: string; parts: string[] }[] }) {
  const { lang, L } = useI18n()
  const all = [{ name: L.ui.home, parts: [] as string[] }, ...items]
  return (
    <nav aria-label={L.ui.breadcrumb} className="mb-4 text-sm text-muted-foreground">
      <ol className="flex flex-wrap gap-x-2">
        {all.map((c, i) => (
          <li key={c.name} className="flex gap-2">
            {i < all.length - 1 ? <Link to={pathFor(lang, ...c.parts)} className="text-primary hover:underline">{c.name}</Link> : <span aria-current="page">{c.name}</span>}
            {i < all.length - 1 ? <span aria-hidden>›</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function PageBody({ page, children }: { page: Page; children: ReactNode }) {
  const { name, seo, crumbs } = usePage(page)
  return (
    <>
      <Seo title={seo.title} description={seo.description} parts={[page]} crumbs={crumbs} />
      <div className={`${wrap} pt-8 pb-4 md:pt-12`}>
        <Crumbs items={crumbs} />
        <h1 className={h1}>{name}</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground md:text-lg">{seo.description}</p>
        <div className="mt-8">{children}</div>
      </div>
    </>
  )
}

export function Home() {
  const { lang, L } = useI18n()
  const { ui, seo } = L
  return (
    <>
      <Seo title={seo.home.title} description={seo.home.description} parts={[]} />
      <div className="bg-[radial-gradient(ellipse_at_top,#2a2418,transparent_70%)] px-4 py-10 text-center md:py-16">
        <Pic src="/images/logo.png" alt="Game of Thrones" className="mx-auto mb-4 aspect-[8/1] w-64 border-none md:w-96 [&_img]:object-contain [&_img]:brightness-0 [&_img]:invert" />
        <h1 className="text-3xl font-bold tracking-widest text-primary uppercase sm:text-5xl md:text-6xl">{ui.siteTitle}</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">{ui.tagline}</p>
        <span className="mt-3 inline-block rounded-full border border-orange-500/60 bg-orange-500/15 px-3 py-1 text-sm font-bold tracking-wide text-orange-400">
          {ui.spoiler}
        </span>
      </div>

      <section className={`${wrap} pt-8`}>
        <div className={grid}>
          {PAGES.map((p) => (
            <Link key={p} to={pathFor(lang, p)} className="group block">
              <Card className="h-full py-0 transition-colors group-hover:border-primary">
                <CardContent className="p-5">
                  <h2 className="text-xl font-semibold text-primary">{ui.titles[TITLE_KEY[p]]}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{seo[p].description}</p>
                  <p className="mt-3 text-sm font-semibold text-primary">{ui.discover} →</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${wrap} pt-10`}>
        <h2 className="mb-3 border-b pb-2 text-xl font-semibold text-primary">{ui.titles.sources}</h2>
        <ul className="list-disc ps-5 text-sm text-muted-foreground">
          {sources.map(([t, u]) => (
            <li key={u}><a href={u} className="text-primary underline" target="_blank" rel="noreferrer">{t}</a></li>
          ))}
        </ul>
      </section>
    </>
  )
}

export function History() {
  const { lang, L, crumbs, seo } = usePage('history')
  const eras = L.history.eras as Record<string, EraData>
  return (
    <>
      <Seo title={seo.title} description={seo.description} parts={['history']} crumbs={crumbs} />
      <div className={`${wrap} pt-8 pb-4 md:pt-12`}>
        <Crumbs items={crumbs} />
        <h1 className={h1}>{L.ui.titles.histoire}</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground md:text-lg">{L.history.intro}</p>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2">
          {ERAS.map((e, i) => (
            <li key={e}>
              <Link to={pathFor(lang, 'history', e)} className="group block h-full">
                <Card className="h-full py-0 transition-colors group-hover:border-primary">
                  <CardContent className="p-5">
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">{L.ui.era} {i + 1} · {eras[e].period}</p>
                    <h2 className="mt-1 text-xl font-semibold text-primary">{eras[e].name}</h2>
                    <p className="mt-2 text-sm">{eras[e].intro}</p>
                    <p className="mt-3 text-sm font-semibold text-primary">{eras[e].events.length} {L.ui.events} →</p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}

export function EraPage({ era }: { era: Era }) {
  const { lang, L } = useI18n()
  const eras = L.history.eras as Record<string, EraData>
  const d = eras[era]
  const i = ERAS.indexOf(era)
  const prev = ERAS[i - 1]
  const next = ERAS[i + 1]
  const crumbs = [
    { name: L.ui.titles.histoire, parts: ['history'] },
    { name: d.name, parts: ['history', era] },
  ]
  const nav = 'text-sm font-semibold text-primary hover:underline'
  return (
    <>
      <Seo title={`${d.name} — ${L.ui.titles.histoire} | ${L.ui.siteTitle}`} description={d.intro} parts={['history', era]} crumbs={crumbs} type="article" />
      <article className={`${wrap} pt-8 pb-4 md:pt-12`}>
        <Crumbs items={crumbs} />
        <p className="text-xs tracking-wide text-muted-foreground uppercase">{L.ui.era} {i + 1} · {d.period}</p>
        <h1 className={h1}>{d.name}</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground md:text-lg">{d.intro}</p>
        <ol className="mt-8 ms-2 border-s-2 border-primary">
          {d.events.map(({ t, d: text }) => (
            <li key={t} className="relative pb-6 ps-5 before:absolute before:top-2 before:-start-[7px] before:size-3 before:rounded-full before:bg-primary">
              <h2 className="text-lg font-semibold text-primary">{t}</h2>
              <p className="mt-1">{text}</p>
            </li>
          ))}
        </ol>
        <nav className="mt-6 flex flex-wrap justify-between gap-3 border-t pt-4" aria-label={L.ui.titles.histoire}>
          {prev ? <Link to={pathFor(lang, 'history', prev)} className={nav} rel="prev">← {L.ui.prevEra} : {eras[prev].name}</Link> : <span />}
          <Link to={pathFor(lang, 'history')} className={nav}>{L.ui.allEras}</Link>
          {next ? <Link to={pathFor(lang, 'history', next)} className={nav} rel="next">{L.ui.nextEra} : {eras[next].name} →</Link> : <span />}
        </nav>
      </article>
    </>
  )
}

export function Houses() {
  const { L } = useI18n()
  const houses = L.houses as Record<string, House>
  return (
    <PageBody page="houses">
      <div className={grid}>
        {maisons.map((nom) => {
          const h = houses[slug(nom)]
          return (
            <Card key={nom} className="py-0">
              <CardContent className="flex gap-3 p-4">
                <Pic src={`/images/maisons/${slug(nom)}.jpg`} alt={nom} className="aspect-square w-20 shrink-0" />
                <div className="min-w-0">
                  <h2 className="font-semibold text-primary">{nom}</h2>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">{h.seat}</p>
                  <p className="mt-1 text-sm italic">{h.words}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </PageBody>
  )
}

export function Characters() {
  const { L } = useI18n()
  const { ui } = L
  const chars = L.chars as Record<string, string>
  const [filtre, setFiltre] = useState(ALL)
  // Les libellés de maison sont des clés FR dans data.ts ; seuls deux termes se traduisent.
  const lab = (m: string) => m.replace('Garde de Nuit', ui.nightWatch).replace('Prêtresse rouge', ui.redPriestess)
  const filtres = [ALL, ...new Set(persos.map((p) => p.maison))]
  const liste = persos.filter((p) => filtre === ALL || p.maison === filtre)
  return (
    <PageBody page="characters">
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        {filtres.map((f) => (
          <Button key={f} size="sm" variant={f === filtre ? 'default' : 'outline'} className="rounded-full" onClick={() => setFiltre(f)}>
            {f === ALL ? ui.all : lab(f)}
          </Button>
        ))}
      </div>
      <div className={grid}>
        {liste.map((p) => (
          <Card key={p.nom} className="py-0">
            <CardContent className="flex gap-3 p-4">
              <Pic src={`/images/persos/${slug(p.nom)}.jpg`} alt={p.nom} className="aspect-[3/4] w-20 shrink-0" />
              <div className="min-w-0">
                <h2 className="font-semibold text-primary">{p.nom}</h2>
                <Badge variant="secondary" className="my-1 h-auto whitespace-normal">{lab(p.maison)}</Badge>
                <p className="text-xs text-muted-foreground">{p.acteur}</p>
                <p className="mt-1 text-sm">{chars[slug(p.nom)]}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageBody>
  )
}

export function Series() {
  const { L } = useI18n()
  const serieTxt = L.series as Record<string, Serie>
  return (
    <PageBody page="series">
      <div className={grid}>
        {series.map((s) => (
          <Card key={s.titre} className="py-0 text-center">
            <CardContent className="p-4">
              <Pic src={`/images/series/${s.img}.jpg`} alt={s.titre} className="mb-3 aspect-video w-full [&_img]:object-contain [&_img]:p-4" />
              <h2 className="font-semibold text-primary">{s.titre}</h2>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">{serieTxt[s.img].tag}</p>
              <p className="mt-2 text-sm">{serieTxt[s.img].desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageBody>
  )
}

export function Books() {
  const { L } = useI18n()
  const books = L.books as Record<string, Book>
  return (
    <PageBody page="books">
      <div className="grid gap-3 sm:grid-cols-2">
        {livres.map((id) => (
          <Card key={id} className="py-0">
            <CardContent className="p-4">
              <h2 className="font-semibold text-primary">{books[id].title}</h2>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">{books[id].tag}</p>
              <p className="mt-2 text-sm">{books[id].desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageBody>
  )
}

export function NotFound() {
  const { lang, L } = useI18n()
  return (
    <>
      <Seo title={`${L.ui.notFoundTitle} | ${L.ui.siteTitle}`} description={L.ui.notFoundText} parts={['404']} noindex />
      <div className={`${wrap} py-20 text-center`}>
        <h1 className={h1}>{L.ui.notFoundTitle}</h1>
        <p className="mt-3 text-muted-foreground">{L.ui.notFoundText}</p>
        <Link to={pathFor(lang)} className="mt-6 inline-block font-semibold text-primary hover:underline">{L.ui.backHome}</Link>
      </div>
    </>
  )
}
