import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './routes'

// vite-react-ssg : rendu client en dev, pré-rendu HTML de chaque route au build.
export const createRoot = ViteReactSSG({ routes })
