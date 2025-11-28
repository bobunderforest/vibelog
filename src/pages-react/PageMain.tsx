import { useCallback } from 'react'
import { RecLogger } from 'ui/RecLogger'
import { saveVibe } from 'modules/db/db'
import type { VibeRecData } from 'types/data'
import { navigate } from 'astro:transitions/client'

export const PageMain = () => {
  const handleCapture = useCallback(async (data: VibeRecData) => {
    await saveVibe(data)
    setTimeout(() => {
      navigate('/feed')
    }, 600)
  }, [])

  return (
    <>
      <RecLogger onCapture={handleCapture} />
    </>
  )
}
