import { Head } from 'vite-react-ssg'
import { LANGS, useI18n } from '@/i18n'
import { AUTHOR, DEFAULT_LANG, OG_LOCALE, SITE_URL, pathFor } from '@/site'

type Crumb = { name: string; parts: string[] }

// Balises <head> d'une page : title, description, canonical, hreflang, Open Graph, Twitter, JSON-LD.
export function Seo({ title, description, parts, crumbs = [], type = 'website', noindex = false }: {
  title: string
  description: string
  parts: string[]
  crumbs?: Crumb[]
  type?: 'website' | 'article'
  noindex?: boolean
}) {
  const { lang, L } = useI18n()
  const abs = (l: string, p: string[]) => SITE_URL + pathFor(l, ...p)
  const url = abs(lang, parts)
  const image = `${SITE_URL}/og-image.png`
  const author = { '@type': 'Person', name: AUTHOR.name, url: AUTHOR.url }
  const site = { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: L.ui.siteTitle, url: abs(DEFAULT_LANG, []), inLanguage: LANGS.map((l) => l.code) }
  const trail = [{ name: L.ui.home, parts: [] }, ...crumbs]

  const ld: object[] = parts.length === 0
    ? [{ '@context': 'https://schema.org', ...site, description, author, publisher: author }]
    : [
        {
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'CollectionPage',
          headline: title,
          description,
          url,
          inLanguage: lang,
          image,
          author,
          publisher: author,
          isPartOf: site,
          mainEntityOfPage: url,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(lang, c.parts) })),
        },
      ]

  return (
    <Head>
      <html lang={lang} dir={L.meta.dir} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={AUTHOR.name} />
      <meta name="robots" content={noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'} />
      <link rel="canonical" href={url} />
      {LANGS.map((l) => <link key={l.code} rel="alternate" hrefLang={l.code} href={abs(l.code, parts)} />)}
      <link rel="alternate" hrefLang="x-default" href={abs(DEFAULT_LANG, parts)} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={L.ui.siteTitle} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={OG_LOCALE[lang]} />
      {LANGS.filter((l) => l.code !== lang).map((l) => <meta key={l.code} property="og:locale:alternate" content={OG_LOCALE[l.code]} />)}
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={L.ui.ogAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={L.ui.ogAlt} />

      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </Head>
  )
}
