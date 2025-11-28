import { getVibes } from 'modules/db/db'
import { useEffect, useState } from 'react'
import type { VibeType } from 'types/data'
import { FeedGrid } from 'ui/FeedGrid'
import { FeedItem } from 'ui/FeedItem'

export const PageFeed = () => {
  const [feed, setFeed] = useState<VibeType[] | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const vibes = await getVibes()
      setFeed(vibes)
    }
    fetch()
  }, [])

  if (!feed) return null

  return (
    <FeedGrid>
      {feed.map((vibe, i) => (
        <FeedItem key={i} vibe={vibe} />
      ))}
    </FeedGrid>
  )
}
