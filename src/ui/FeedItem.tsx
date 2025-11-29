import type { VibeType } from 'types/data'
import { formatDate } from 'utils/formatDate'

type Props = {
  vibe: VibeType
}

export const FeedItem = ({ vibe }: Props) => {
  return (
    <div
      className={
        'relative overflow-hidden rounded-[40px] border border-border p-[4px]'
      }
    >
      <div className={'relative h-full w-full overflow-hidden rounded-[36px]'}>
        <img
          className={
            'absolute top-0 left-0 block h-full w-full transform-[scaleX(-1)] object-cover'
          }
          src={vibe.imageDataUrl}
          alt=""
        />

        <div
          className={
            'absolute top-0 left-0 flex h-full w-full items-center justify-center text-[12vw] leading-none tablet-m:text-[16vw] tablet-s:text-[25vw] mobile-m:text-[50vw]'
          }
        >
          <div>{vibe.emoji}</div>
        </div>

        <div
          className={
            'absolute bottom-[5%] left-0 w-full text-center font-bold text-background text-shadow-[0_0_10px_rgba(0,0,0,0.75)]'
          }
        >
          {formatDate(vibe.date)}
        </div>
      </div>

      <div className={'w-full pb-[100%]'} />
    </div>
  )
}
