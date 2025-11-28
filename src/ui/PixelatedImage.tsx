import { useEffect, useRef, useState } from 'react'
import { Pixelate } from 'utils/pixelate'

type Props = {
  pixelateRef?: React.RefObject<any | null>
  src: string
  amount: number
  className?: string
}

export const PixelatedImage = ({
  pixelateRef,
  src,
  amount,
  className,
}: Props) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const [pixelate, setPixelate] = useState<any>(null)

  useEffect(() => {
    if (!imageRef.current) return
    const pixelate = new Pixelate(imageRef.current, { amount })
    setPixelate(pixelate)
    if (pixelateRef) {
      pixelateRef.current = pixelate
    }
  }, [])

  useEffect(() => {
    if (!pixelate) return
    pixelate.setAmount(amount).render()
  }, [amount])

  return <img ref={imageRef} src={src} alt="" className={className} />
}
