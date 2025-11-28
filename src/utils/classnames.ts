import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      breakpoint: [
        'desktop-m',
        'desktop-s',
        'tablet-m',
        'tablet-s',
        'mobile-m',
        'mobile-s',
      ],
    },
    classGroups: {
      'font-size': [
        { text: ['regular', 'control', 'title-1', 'title-2', 'title-3'] },
      ],
    },
  },
})

export const cns = (...classes: ClassValue[]) => twMerge(clsx(...classes))
