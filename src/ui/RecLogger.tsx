import { loadModels } from 'modules/face-api/loadModles'
import { prepareVideoRecognition } from 'modules/face-api/prepareVideoRecognition'
import { startVideoRecording } from 'modules/video/startVideoRecording'
import { statusIcons, type EmojiType } from 'modules/face-api/statusIcons'
import { captureVideoFrameByRatio } from 'modules/video/captureVideoFrame'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FullScreenWrapper } from './FullScreenWrapper'
import { cns } from 'utils/classnames'
import { PixelationAnimated } from './PixelationAnimated'
import type { VibeRecData } from 'types/data'

const ASPECT_W = 3
const ASPECT_H = 4

type Props = {
  onCapture: (data: VibeRecData) => void
}

export const RecLogger = ({ onCapture }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [detectedEmoji, setEmoji] = useState<EmojiType>(statusIcons['default'])
  const [isCaptured, setCaptured] = useState(false)
  const [capturedFrame, setCapturedFrame] = useState<string | null>(null)
  const [stopVideoRecognizing, setStop] = useState<(() => void) | null>(null)

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    const init = async () => {
      await loadModels()
      const { stop } = prepareVideoRecognition(videoEl, setEmoji)
      setStop(stop)
      startVideoRecording(videoEl)
    }

    init()
  }, [])

  const handleCapture = useCallback(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    stopVideoRecognizing?.()
    const frame = captureVideoFrameByRatio(videoEl, ASPECT_W / ASPECT_H)

    setCapturedFrame(frame.dataUri)
    setCaptured(true)
  }, [])

  const handleCaptureFinished = useCallback(
    (imageDataUrl: string) => {
      onCapture?.({
        emoji: detectedEmoji.emoji,
        imageDataUrl,
      })
    },
    [detectedEmoji],
  )

  return (
    <FullScreenWrapper aspectW={ASPECT_W} aspectH={ASPECT_H}>
      <div
        className={
          'relative h-full w-full rounded-[40px] border-2 border-border p-[4px]'
        }
      >
        {!isCaptured && (
          <video
            className={
              'absolute top-0 left-0 block h-full w-full rounded-[38px] object-cover p-[4px]'
            }
            ref={videoRef}
            id="video"
            muted
            autoPlay
          ></video>
        )}

        {isCaptured && capturedFrame && (
          <div className={'pixelate relative h-full w-full'}>
            <PixelationAnimated
              src={capturedFrame}
              onPixelationFinished={handleCaptureFinished}
              className={
                'absolute top-0 left-0 block h-full w-full overflow-hidden rounded-[38px] object-cover'
              }
            />
          </div>
        )}
      </div>

      <div
        style={
          {
            '--emojiheight1': 'min(10vh,25vw)',
            '--emojiheight2': 'min(30vh,50vw)',
          } as any
        }
        className={cns(
          'absolute top-[-5vh] left-0 w-full text-center text-(length:--emojiheight1) leading-none',
          'transition-top delay-200 duration-600 ease-out-cubic',
          isCaptured &&
            'top-[calc(50%-var(--emojiheight2)*0.5)] text-(length:--emojiheight2) leading-none',
        )}
      >
        {detectedEmoji.emoji}
      </div>

      {!isCaptured && (
        <div
          className={
            'absolute bottom-[-20px] left-0 flex w-full justify-center'
          }
        >
          <div
            className={
              'relative top-[20px] block w-fit cursor-pointer p-[20px] text-[80px] leading-none text-shadow-[0_10px_35px_rgba(0,0,0,1)] mobile-m:p-[20px]'
            }
            onClick={handleCapture}
          >
            📸
          </div>
        </div>
      )}
    </FullScreenWrapper>
  )
}
