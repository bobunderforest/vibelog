type Props = {
  children: React.ReactNode
}

export const FeedGrid = ({ children }: Props) => {
  return (
    <div
      className={
        'grid grid-cols-4 justify-between gap-x-[10px] gap-y-[10px] px-[20px] pb-[100px] tablet-m:grid-cols-3 tablet-s:grid-cols-2 mobile-m:grid-cols-1'
      }
    >
      {children}
    </div>
  )
}
