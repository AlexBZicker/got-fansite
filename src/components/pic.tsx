import { useState } from 'react'
import { cn } from '@/lib/utils'

// Emplacement image : affiche le fichier s'il existe dans public/images, sinon un cadre avec son nom.
export const slug = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')

export function Pic({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [ok, setOk] = useState(true)
  return (
    <div className={cn('relative flex items-center justify-center overflow-hidden rounded-md border border-dashed border-border p-1 text-center font-mono text-[10px] break-all text-muted-foreground', className)}>
      {ok ? <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} className="absolute inset-0 size-full object-cover object-top" /> : null}
      {ok ? null : src.replace(/^\//, '')}
    </div>
  )
}
