import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const DEFAULT_DB = {
  dishes: [],
  users: [],
  orders: [],
}

export function getDbPath() {
  return path.resolve(process.cwd(), 'server', 'data', 'db.json')
}

async function ensureDir() {
  const dir = path.dirname(getDbPath())
  await fs.mkdir(dir, { recursive: true })
}

export async function readDb() {
  await ensureDir()
  try {
    const raw = await fs.readFile(getDbPath(), 'utf-8')
    const parsed = JSON.parse(raw)
    return {
      ...DEFAULT_DB,
      ...parsed,
      dishes: Array.isArray(parsed?.dishes) ? parsed.dishes : [],
      users: Array.isArray(parsed?.users) ? parsed.users : [],
      orders: Array.isArray(parsed?.orders) ? parsed.orders : [],
    }
  } catch (e) {
    if (e?.code === 'ENOENT') return DEFAULT_DB
    throw e
  }
}

export async function writeDb(db) {
  await ensureDir()
  const normalized = {
    ...DEFAULT_DB,
    ...db,
    dishes: Array.isArray(db?.dishes) ? db.dishes : [],
    users: Array.isArray(db?.users) ? db.users : [],
    orders: Array.isArray(db?.orders) ? db.orders : [],
  }
  await fs.writeFile(getDbPath(), JSON.stringify(normalized, null, 2), 'utf-8')
}

