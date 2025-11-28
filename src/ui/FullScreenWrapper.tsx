type Props = {
  children: React.ReactNode
  aspectW: number
  aspectH: number
}

export const FullScreenWrapper = ({ children, aspectW, aspectH }: Props) => {
  return (
    <div
      className={
        'relative flex h-[calc(95vh-var(--header-height))] w-full flex-col items-center justify-center'
      }
      style={
        {
          '--ar-w': aspectW,
          '--ar-h': aspectH,
        } as any
      }
    >
      <div
        className={
          'relative aspect-[calc(var(--ar-w)/var(--ar-h))] w-[min(calc(90vw-80px),calc((95vh-var(--header-height)-80px)*(var(--ar-w)/var(--ar-h))))] flex-[0_1_auto]'
        }
      >
        {children}
      </div>
    </div>
  )
}
