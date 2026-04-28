import { useEffect, useMemo, useState } from 'react'
import {
  createAdminUser,
  createDish,
  deleteAdminUser,
  deleteDish,
  getToken,
  listAdmins,
  listDishes,
  listOrders,
  login,
  resetAdminPassword,
  setToken,
  updateDish,
  uploadImage,
} from './api'
import { Container } from '../components/Container'
import { Button } from '../components/Button'

const CATEGORIES = [
  { id: 'desi', label: 'Desi' },
  { id: 'fast', label: 'Fast Food' },
  { id: 'drinks', label: 'Drinks' },
]

function emptyForm() {
  return {
    name: '',
    desc: '',
    price: '',
    category: 'desi',
    imageUrl: '',
  }
}

export function AdminPage() {
  const [token, setTokenState] = useState(() => getToken())
  const [tab, setTab] = useState('dishes')
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [dishes, setDishes] = useState([])
  const [admins, setAdmins] = useState([])
  const [orders, setOrders] = useState([])
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' })
  const [reset, setReset] = useState({ id: '', password: '' })
  const [editingId, setEditingId] = useState('')
  const [form, setForm] = useState(() => emptyForm())

  const editing = useMemo(
    () => dishes.find((d) => d.id === editingId) || null,
    [dishes, editingId],
  )

  async function refresh() {
    const data = await listDishes()
    setDishes(Array.isArray(data?.dishes) ? data.dishes : [])
  }

  async function refreshAdmins() {
    const data = await listAdmins()
    setAdmins(Array.isArray(data?.users) ? data.users : [])
  }

  async function refreshOrders() {
    const data = await listOrders()
    setOrders(Array.isArray(data?.orders) ? data.orders : [])
  }

  useEffect(() => {
    if (!token) return
    const timer = setTimeout(() => {
      refresh().catch(() => {})
      refreshAdmins().catch(() => {})
      refreshOrders().catch(() => {})
    }, 0)
    return () => clearTimeout(timer)
  }, [token])

  async function onLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await login(username, password)
      setToken(data.token)
      setTokenState(data.token)
      setPassword('')
    } catch {
      setError('Wrong username/password')
    } finally {
      setLoading(false)
    }
  }

  function onLogout() {
    setToken('')
    setTokenState('')
    setDishes([])
    setAdmins([])
    setOrders([])
    setEditingId('')
    setForm(emptyForm())
    setTab('dishes')
  }

  function startEdit(dish) {
    setEditingId(dish.id)
    setForm({
      name: dish.name || '',
      desc: dish.desc || '',
      price: dish.price || '',
      category: dish.category || 'desi',
      imageUrl: dish.imageUrl || '',
    })
  }

  function startNew() {
    setEditingId('')
    setForm(emptyForm())
  }

  async function onPickImage(file) {
    if (!file) return
    setError('')
    setLoading(true)
    try {
      const data = await uploadImage(file)
      setForm((f) => ({ ...f, imageUrl: data.url }))
    } catch {
      setError('Image upload failed')
    } finally {
      setLoading(false)
    }
  }

  async function onSave(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (editingId) {
        await updateDish(editingId, form)
      } else {
        await createDish(form)
      }
      await refresh()
      startNew()
    } catch {
      setError('Save failed')
    } finally {
      setLoading(false)
    }
  }

  async function onDelete(id) {
    setError('')
    setLoading(true)
    try {
      await deleteDish(id)
      await refresh()
      if (editingId === id) startNew()
    } catch {
      setError('Delete failed')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-dvh bg-night-950 py-16">
        <Container className="max-w-xl">
          <div className="rounded-3xl bg-white/6 p-7 shadow-soft ring-1 ring-white/10">
            <p className="text-xs font-semibold tracking-[0.22em] text-gold-200/75">
              ADMIN LOGIN
            </p>
            <p className="mt-4 font-display text-3xl font-semibold text-pearl-50">
              Sign in
            </p>
            <p className="mt-2 text-sm text-pearl-100/75">
              Use your admin username + password.
            </p>

            <form className="mt-6 grid gap-3" onSubmit={onLogin}>
              <input
                className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                autoComplete="username"
                required
              />
              <input
                className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                required
              />
              {error ? (
                <p className="text-sm font-semibold text-red-300">{error}</p>
              ) : null}
              <Button as="button" type="submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Login'}
              </Button>
            </form>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-night-950 py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-gold-200/75">
              ADMIN PANEL
            </p>
            <p className="mt-2 font-display text-3xl font-semibold text-pearl-50">Admin</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              as="button"
              variant={tab === 'dishes' ? 'primary' : 'secondary'}
              onClick={() => setTab('dishes')}
            >
              Dishes
            </Button>
            <Button
              as="button"
              variant={tab === 'admins' ? 'primary' : 'secondary'}
              onClick={() => setTab('admins')}
            >
              Admins
            </Button>
            <Button
              as="button"
              variant={tab === 'orders' ? 'primary' : 'secondary'}
              onClick={() => setTab('orders')}
            >
              Orders
            </Button>
            <Button as="button" variant="secondary" onClick={() => refresh()} disabled={loading}>
              Refresh
            </Button>
            <Button as="button" variant="secondary" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>

        {tab === 'admins' ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white/6 p-6 shadow-soft ring-1 ring-white/10">
                <p className="text-sm font-semibold text-pearl-50">Add admin</p>
                <div className="mt-4 grid gap-3">
                  <input
                    className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                    value={newAdmin.username}
                    onChange={(e) =>
                      setNewAdmin((s) => ({ ...s, username: e.target.value }))
                    }
                    placeholder="Username"
                  />
                  <input
                    className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) =>
                      setNewAdmin((s) => ({ ...s, password: e.target.value }))
                    }
                    placeholder="Password"
                  />
                  <Button
                    as="button"
                    disabled={loading || !newAdmin.username || !newAdmin.password}
                    onClick={async () => {
                      setError('')
                      setLoading(true)
                      try {
                        await createAdminUser(newAdmin)
                        setNewAdmin({ username: '', password: '' })
                        await refreshAdmins()
                      } catch {
                        setError('Create admin failed')
                      } finally {
                        setLoading(false)
                      }
                    }}
                  >
                    Create admin
                  </Button>
                </div>

                <div className="mt-8 h-px w-full bg-white/10" />

                <p className="mt-6 text-sm font-semibold text-pearl-50">Reset password</p>
                <div className="mt-4 grid gap-3">
                  <select
                    className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                    value={reset.id}
                    onChange={(e) => setReset((s) => ({ ...s, id: e.target.value }))}
                  >
                    <option value="">Select admin</option>
                    {admins.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.username}
                      </option>
                    ))}
                  </select>
                  <input
                    className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                    type="password"
                    value={reset.password}
                    onChange={(e) =>
                      setReset((s) => ({ ...s, password: e.target.value }))
                    }
                    placeholder="New password"
                  />
                  <Button
                    as="button"
                    variant="secondary"
                    disabled={loading || !reset.id || !reset.password}
                    onClick={async () => {
                      setError('')
                      setLoading(true)
                      try {
                        await resetAdminPassword(reset.id, reset.password)
                        setReset({ id: '', password: '' })
                      } catch {
                        setError('Reset failed')
                      } finally {
                        setLoading(false)
                      }
                    }}
                  >
                    Reset password
                  </Button>
                </div>

                {error ? (
                  <p className="mt-3 text-sm font-semibold text-red-300">{error}</p>
                ) : null}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white/6 p-6 shadow-soft ring-1 ring-white/10">
                <p className="text-sm font-semibold text-pearl-50">
                  Admin users ({admins.length})
                </p>
                <div className="mt-4 grid gap-3">
                  {admins.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-night-900/45 p-4 ring-1 ring-white/10"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-pearl-50">{a.username}</p>
                        <p className="text-xs text-pearl-100/70">{a.id}</p>
                      </div>
                      <Button
                        as="button"
                        variant="secondary"
                        onClick={async () => {
                          setError('')
                          setLoading(true)
                          try {
                            await deleteAdminUser(a.id)
                            await refreshAdmins()
                          } catch {
                            setError('Delete failed (maybe last admin)')
                          } finally {
                            setLoading(false)
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                  {!admins.length ? (
                    <p className="text-sm text-pearl-100/70">
                      No admin users found. Server will bootstrap one from `.env`.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : tab === 'orders' ? (
          <div className="mt-8 rounded-3xl bg-white/6 p-6 shadow-soft ring-1 ring-white/10">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-pearl-50">Customer orders ({orders.length})</p>
              <Button as="button" variant="secondary" onClick={() => refreshOrders()} disabled={loading}>
                Refresh orders
              </Button>
            </div>
            <div className="mt-4 grid gap-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl bg-night-900/45 p-4 ring-1 ring-white/10"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-pearl-50">{order.invoiceNumber}</p>
                    <p className="text-xs text-pearl-100/70">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-pearl-100/85">
                    {order.customer?.name} • {order.customer?.phone}
                  </p>
                  <p className="text-xs text-pearl-100/70">{order.customer?.email}</p>
                  <p className="text-xs text-pearl-100/70">{order.customer?.address}</p>
                  <div className="mt-3 rounded-xl bg-night-950/45 p-3">
                    {order.items?.map((item) => (
                      <p key={`${order.id}-${item.name}`} className="text-xs text-pearl-100/80">
                        {item.name} x{item.quantity} - Rs {item.lineTotal}
                      </p>
                    ))}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-gold-200">Total: Rs {order.total}</p>
                </div>
              ))}
              {!orders.length ? (
                <p className="text-sm text-pearl-100/70">No orders yet.</p>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white/6 p-6 shadow-soft ring-1 ring-white/10">
              <p className="text-sm font-semibold text-pearl-50">
                {editing ? 'Edit dish' : 'Add new dish'}
              </p>
              <form className="mt-4 grid gap-3" onSubmit={onSave}>
                <input
                  className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Dish name"
                  required
                />
                <input
                  className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                  value={form.desc}
                  onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                  placeholder="Description"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="Price (e.g. Rs 650)"
                  />
                  <select
                    className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-2xl bg-night-900/45 p-4 ring-1 ring-white/10">
                  <p className="text-xs font-semibold tracking-[0.18em] text-pearl-100/70">
                    IMAGE
                  </p>
                  <div className="mt-3 grid gap-3">
                    <input
                      className="block w-full text-sm text-pearl-100/80 file:mr-4 file:rounded-xl file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-pearl-50 hover:file:bg-white/15"
                      type="file"
                      accept="image/*"
                      onChange={(e) => onPickImage(e.target.files?.[0])}
                    />
                    <input
                      className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                      value={form.imageUrl}
                      onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                      placeholder="Or paste image URL (optional)"
                    />
                    {form.imageUrl ? (
                      <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                        <img
                          src={form.imageUrl}
                          alt="Preview"
                          className="h-40 w-full object-cover"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>

                {error ? (
                  <p className="text-sm font-semibold text-red-300">{error}</p>
                ) : null}

                <div className="mt-1 flex gap-2">
                  <Button as="button" type="submit" disabled={loading}>
                    {loading ? 'Saving…' : 'Save'}
                  </Button>
                  <Button as="button" variant="secondary" type="button" onClick={startNew}>
                    Clear
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white/6 p-6 shadow-soft ring-1 ring-white/10">
              <p className="text-sm font-semibold text-pearl-50">
                Existing dishes ({dishes.length})
              </p>
              <div className="mt-4 grid gap-3">
                {dishes.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-night-900/45 p-4 ring-1 ring-white/10"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="h-12 w-16 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
                        {d.imageUrl ? (
                          <img
                            src={d.imageUrl}
                            alt={d.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-pearl-50">{d.name}</p>
                        <p className="truncate text-xs text-pearl-100/70">
                          {d.category} • {d.price || '—'}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <Button
                        as="button"
                        variant="secondary"
                        onClick={() => startEdit(d)}
                      >
                        Edit
                      </Button>
                      <Button as="button" variant="secondary" onClick={() => onDelete(d.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}

                {!dishes.length ? (
                  <p className="text-sm text-pearl-100/70">No dishes yet. Add one from the form.</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        )}
      </Container>
    </div>
  )
}

