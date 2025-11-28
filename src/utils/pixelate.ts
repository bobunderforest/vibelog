import { isBrowser } from './isBrowser'

export let Pixelate: any

const loadPixelate = async () => {
  Pixelate = (await import('pixelate')).default
}

if (isBrowser) {
  loadPixelate()
}
