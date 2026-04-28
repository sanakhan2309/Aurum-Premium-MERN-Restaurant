import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'node:path'
import process from 'node:process'
import fs from 'node:fs/promises'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import nodemailer from 'nodemailer'

import { readDb, writeDb } from './lib/db.js'
import { requireAuth, signToken } from './lib/auth.js'

const app = express()
app.disable('x-powered-by')

app.use(cors())
app.use(express.json({ limit: '2mb' }))

const uploadsDir = path.resolve(process.cwd(), 'uploads')
await fs.mkdir(uploadsDir, { recursive: true })

app.use('/uploads', express.static(uploadsDir, { maxAge: '7d', etag: true }))

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase() || '.bin'
    cb(null, `${Date.now()}-${nanoid(10)}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
})

let mailTransportPromise
async function getMailTransport() {
  if (mailTransportPromise) return mailTransportPromise
  mailTransportPromise = (async () => {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE || 'false') === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    }
    const testAccount = await nodemailer.createTestAccount()
    return nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
  })()
  return mailTransportPromise
}

function parseAmount(price) {
  const n = Number(String(price || '').replace(/[^\d]/g, ''))
  return Number.isFinite(n) ? n : 0
}

function buildInvoice(order) {
  const lines = [
    `Invoice: ${order.invoiceNumber}`,
    `Order ID: ${order.id}`,
    `Date: ${new Date(order.createdAt).toLocaleString()}`,
    '',
    `Customer: ${order.customer.name}`,
    `Email: ${order.customer.email}`,
    `Phone: ${order.customer.phone}`,
    `Address: ${order.customer.address}`,
    '',
    'Items:',
    ...order.items.map(
      (item) =>
        `- ${item.name} x${item.quantity} @ Rs ${item.unitPrice} = Rs ${item.lineTotal}`,
    ),
    '',
    `Subtotal: Rs ${order.subtotal}`,
    `Delivery: Rs ${order.deliveryFee}`,
    `Total: Rs ${order.total}`,
  ]
  return lines.join('\n')
}

async function sendOrderConfirmation(order) {
  const transport = await getMailTransport()
  const from = process.env.ORDER_FROM_EMAIL || 'Aurum Restaurant <no-reply@aurum.local>'
  const invoiceText = buildInvoice(order)
  const info = await transport.sendMail({
    from,
    to: order.customer.email,
    subject: `Order Confirmed - ${order.invoiceNumber}`,
    text: `Assalam o Alaikum ${order.customer.name},\n\nYour order is confirmed.\n\n${invoiceText}\n\nThank you for choosing Aurum.`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #0f172a;">
        <h2>Order Confirmed</h2>
        <p>Assalam o Alaikum <strong>${order.customer.name}</strong>, your order is confirmed.</p>
        <h3>Invoice ${order.invoiceNumber}</h3>
        <pre style="background:#f8fafc;padding:12px;border-radius:8px;white-space:pre-wrap;">${invoiceText}</pre>
      </div>
    `,
  })
  return nodemailer.getTestMessageUrl(info) || null
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

async function ensureBootstrapAdmin() {
  const username = String(process.env.ADMIN_USERNAME || 'admin').trim()
  const password = String(process.env.ADMIN_PASSWORD || 'admin')
  if (!username || !password) return

  const db = await readDb()
  if (db.users.length) return

  const passwordHash = await bcrypt.hash(password, 10)
  db.users.push({
    id: nanoid(12),
    username,
    passwordHash,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
  await writeDb(db)
}

await ensureBootstrapAdmin()

app.post('/api/auth/login', async (req, res) => {
  const username = String(req.body?.username || '').trim()
  const password = String(req.body?.password || '')

  if (!username || !password) return res.status(400).json({ error: 'missing_fields' })

  const db = await readDb()
  const user = db.users.find((u) => u.username.toLowerCase() === username.toLowerCase())
  if (!user) return res.status(401).json({ error: 'invalid_credentials' })

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'invalid_credentials' })

  return res.json({
    token: signToken({ role: 'admin', userId: user.id, username: user.username }),
    user: { id: user.id, username: user.username },
  })
})

app.get('/api/admin/users', requireAuth, async (_req, res) => {
  const db = await readDb()
  const users = db.users.map((u) => ({
    id: u.id,
    username: u.username,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }))
  res.json({ users })
})

app.post('/api/admin/users', requireAuth, async (req, res) => {
  const username = String(req.body?.username || '').trim()
  const password = String(req.body?.password || '')
  if (!username || !password) return res.status(400).json({ error: 'missing_fields' })

  const db = await readDb()
  const exists = db.users.some((u) => u.username.toLowerCase() === username.toLowerCase())
  if (exists) return res.status(409).json({ error: 'username_taken' })

  const passwordHash = await bcrypt.hash(password, 10)
  const user = {
    id: nanoid(12),
    username,
    passwordHash,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  db.users.push(user)
  await writeDb(db)
  res.status(201).json({ user: { id: user.id, username: user.username } })
})

app.put('/api/admin/users/:id/password', requireAuth, async (req, res) => {
  const { id } = req.params
  const password = String(req.body?.password || '')
  if (!password) return res.status(400).json({ error: 'missing_fields' })

  const db = await readDb()
  const idx = db.users.findIndex((u) => u.id === id)
  if (idx === -1) return res.status(404).json({ error: 'not_found' })

  db.users[idx] = {
    ...db.users[idx],
    passwordHash: await bcrypt.hash(password, 10),
    updatedAt: Date.now(),
  }
  await writeDb(db)
  res.json({ ok: true })
})

app.delete('/api/admin/users/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const db = await readDb()
  const before = db.users.length
  db.users = db.users.filter((u) => u.id !== id)
  if (db.users.length === before) return res.status(404).json({ error: 'not_found' })
  if (!db.users.length) return res.status(400).json({ error: 'cannot_delete_last_admin' })
  await writeDb(db)
  res.json({ ok: true })
})

app.get('/api/dishes', async (_req, res) => {
  const db = await readDb()
  res.json({ dishes: db.dishes })
})

app.post('/api/dishes', requireAuth, async (req, res) => {
  const body = req.body || {}
  const dish = {
    id: nanoid(12),
    name: String(body.name || '').trim(),
    desc: String(body.desc || '').trim(),
    price: String(body.price || '').trim(),
    category: String(body.category || 'desi').trim(),
    imageUrl: String(body.imageUrl || '').trim(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  if (!dish.name) return res.status(400).json({ error: 'name_required' })

  const db = await readDb()
  db.dishes.unshift(dish)
  await writeDb(db)
  res.status(201).json({ dish })
})

app.put('/api/dishes/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const body = req.body || {}
  const db = await readDb()
  const idx = db.dishes.findIndex((d) => d.id === id)
  if (idx === -1) return res.status(404).json({ error: 'not_found' })

  const prev = db.dishes[idx]
  const next = {
    ...prev,
    name: body.name != null ? String(body.name).trim() : prev.name,
    desc: body.desc != null ? String(body.desc).trim() : prev.desc,
    price: body.price != null ? String(body.price).trim() : prev.price,
    category: body.category != null ? String(body.category).trim() : prev.category,
    imageUrl: body.imageUrl != null ? String(body.imageUrl).trim() : prev.imageUrl,
    updatedAt: Date.now(),
  }

  if (!next.name) return res.status(400).json({ error: 'name_required' })

  db.dishes[idx] = next
  await writeDb(db)
  res.json({ dish: next })
})

app.delete('/api/dishes/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const db = await readDb()
  const before = db.dishes.length
  db.dishes = db.dishes.filter((d) => d.id !== id)
  if (db.dishes.length === before) return res.status(404).json({ error: 'not_found' })
  await writeDb(db)
  res.json({ ok: true })
})

app.post('/api/uploads', requireAuth, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'file_required' })
  res.status(201).json({ url: `/uploads/${req.file.filename}` })
})

app.get('/api/admin/orders', requireAuth, async (_req, res) => {
  const db = await readDb()
  const orders = [...db.orders].sort((a, b) => b.createdAt - a.createdAt)
  res.json({ orders })
})

app.post('/api/orders', async (req, res) => {
  const body = req.body || {}
  const customer = {
    name: String(body.customer?.name || '').trim(),
    email: String(body.customer?.email || '').trim(),
    phone: String(body.customer?.phone || '').trim(),
    address: String(body.customer?.address || '').trim(),
  }
  const incomingItems = Array.isArray(body.items) ? body.items : []
  if (!customer.name || !customer.email || !customer.phone || !customer.address) {
    return res.status(400).json({ error: 'customer_required' })
  }
  if (!incomingItems.length) return res.status(400).json({ error: 'items_required' })

  const items = incomingItems
    .map((item) => {
      const quantity = Math.max(1, Number(item.quantity || 1))
      const unitPrice = parseAmount(item.price)
      return {
        name: String(item.name || '').trim(),
        quantity,
        unitPrice,
        lineTotal: quantity * unitPrice,
      }
    })
    .filter((item) => item.name)

  if (!items.length) return res.status(400).json({ error: 'items_required' })

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0)
  const deliveryFee = subtotal >= 2000 ? 0 : 200
  const total = subtotal + deliveryFee
  const invoiceNumber = `INV-${new Date().getFullYear()}-${nanoid(6).toUpperCase()}`
  const order = {
    id: nanoid(12),
    invoiceNumber,
    customer,
    items,
    subtotal,
    deliveryFee,
    total,
    status: 'placed',
    createdAt: Date.now(),
  }

  const db = await readDb()
  db.orders.unshift(order)
  await writeDb(db)

  let emailPreviewUrl = null
  try {
    emailPreviewUrl = await sendOrderConfirmation(order)
  } catch {
    // Order is stored even if email provider is unavailable.
  }

  return res.status(201).json({
    order: {
      id: order.id,
      invoiceNumber: order.invoiceNumber,
      total: order.total,
      createdAt: order.createdAt,
    },
    invoice: {
      invoiceNumber: order.invoiceNumber,
      orderId: order.id,
      createdAt: order.createdAt,
      customer: order.customer,
      items: order.items,
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      total: order.total,
    },
    emailPreviewUrl,
  })
})

// Serve built frontend in production
const distDir = path.resolve(process.cwd(), 'dist')
app.use(express.static(distDir))
app.get(/^(?!\/api\/)(?!\/uploads\/).*/, async (req, res, next) => {
  try {
    return res.sendFile(path.join(distDir, 'index.html'))
  } catch {
    return next()
  }
})

const port = Number(process.env.PORT || 3001)
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

