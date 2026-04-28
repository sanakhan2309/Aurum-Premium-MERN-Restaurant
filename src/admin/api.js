const TOKEN_KEY = 'aurum_admin_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function setToken(token) {
  if (!token) localStorage.removeItem(TOKEN_KEY)
  else localStorage.setItem(TOKEN_KEY, token)
}

async function request(path, { method = 'GET', body, isForm } = {}) {
  const headers = {}
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let payload
  if (body != null) {
    if (isForm) {
      payload = body
    } else {
      headers['Content-Type'] = 'application/json'
      payload = JSON.stringify(body)
    }
  }

  const res = await fetch(path, { method, headers, body: payload })
  const contentType = res.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await res.json() : null
  if (!res.ok) {
    const err = new Error('Request failed')
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

export function login(username, password) {
  return request('/api/auth/login', { method: 'POST', body: { username, password } })
}

export function listDishes() {
  return request('/api/dishes')
}

export function createDish(dish) {
  return request('/api/dishes', { method: 'POST', body: dish })
}

export function updateDish(id, dish) {
  return request(`/api/dishes/${id}`, { method: 'PUT', body: dish })
}

export function deleteDish(id) {
  return request(`/api/dishes/${id}`, { method: 'DELETE' })
}

export function uploadImage(file) {
  const form = new FormData()
  form.append('image', file)
  return request('/api/uploads', { method: 'POST', body: form, isForm: true })
}

export function listAdmins() {
  return request('/api/admin/users')
}

export function createAdminUser({ username, password }) {
  return request('/api/admin/users', { method: 'POST', body: { username, password } })
}

export function resetAdminPassword(id, password) {
  return request(`/api/admin/users/${id}/password`, { method: 'PUT', body: { password } })
}

export function deleteAdminUser(id) {
  return request(`/api/admin/users/${id}`, { method: 'DELETE' })
}

export function listOrders() {
  return request('/api/admin/orders')
}

