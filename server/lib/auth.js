import jwt from 'jsonwebtoken'
import process from 'node:process'

export function getJwtSecret() {
  return process.env.JWT_SECRET || 'dev-secret-change-me'
}

export function signToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' })
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : ''
  if (!token) return res.status(401).json({ error: 'missing_token' })

  try {
    const decoded = jwt.verify(token, getJwtSecret())
    req.user = decoded
    return next()
  } catch {
    return res.status(401).json({ error: 'invalid_token' })
  }
}

