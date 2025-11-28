import { uid } from 'uid'
import { openDB, type IDBPDatabase } from 'idb'
import type {
  VibeRecordType,
  ImageRecordType,
  VibeType,
  VibeRecData,
} from 'types/data'

const KEY_VIBES = 'vibes'
const KEY_IMAGES = 'images'

type DBSchema = {
  [KEY_VIBES]: {
    key: string
    value: VibeRecordType
  }
  [KEY_IMAGES]: {
    key: string
    value: ImageRecordType
  }
}

export type DBType = IDBPDatabase<DBSchema>

let db: DBType

export const initDB = async () => {
  if (!db) {
    db = await openDB<DBSchema>('mydb', 1, {
      upgrade(db) {
        db.createObjectStore(KEY_VIBES, { keyPath: 'id', autoIncrement: false })
        db.createObjectStore(KEY_IMAGES, {
          keyPath: 'id',
          autoIncrement: false,
        })
      },
    })
  }
  return db
}

export const getVibes = async (): Promise<VibeType[]> => {
  if (!db) await initDB()

  const vibeRecords = await db.getAll(KEY_VIBES)

  const vibes = await Promise.all(
    vibeRecords.map(async (vibe) => {
      const imageRecord = await db.get(KEY_IMAGES, vibe.imageId)
      return {
        ...vibe,
        imageDataUrl: imageRecord?.imageDataUrl || '',
      }
    }),
  )

  const vibesSorted = vibes.sort((a, b) => b.date - a.date)

  return vibesSorted
}

export const saveVibe = async ({ emoji, imageDataUrl }: VibeRecData) => {
  if (!db) await initDB()
  const date = Date.now()
  const vibeId = uid()
  const imageId = uid()
  await db.put(KEY_VIBES, { id: vibeId, imageId, date, emoji })
  await db.put(KEY_IMAGES, { id: imageId, imageDataUrl })
}
