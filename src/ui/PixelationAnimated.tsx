import { useEffect, useRef, useState } from 'react'
import { PixelatedImage } from './PixelatedImage'
import { ease } from 'utils/easings'

type Props = {
  duration?: number
  targetPixelation?: number
  src: string
  className?: string
  onPixelationFinished?: (imageDataUrl: string) => void
}

export const PixelationAnimated = ({
  duration = 1000,
  targetPixelation = 0.985,
  src,
  className,
  onPixelationFinished,
}: Props) => {
  const pixelateRef = useRef<any | null>(null)
  const [pixelatedAmount, setPixelatedAmount] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const renderPixelation = () => {
      const currTime = Date.now()
      const prog = ease.easeOutCubic(
        Math.min(1, (currTime - startTime) / duration),
      )
      setPixelatedAmount(prog * targetPixelation)
      if (prog < 1) {
        requestAnimationFrame(renderPixelation)
      } else {
        const pixelatedDataUrl = pixelateRef?.current.canvas.toDataURL()
        onPixelationFinished?.(pixelatedDataUrl)
      }
    }
    renderPixelation()
  }, [])

  return (
    <PixelatedImage
      pixelateRef={pixelateRef}
      amount={pixelatedAmount}
      src={src}
      className={className}
    />
  )
}
