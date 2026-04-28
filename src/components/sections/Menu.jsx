import { useEffect, useMemo, useState } from 'react'
import { Button } from '../Button'
import { Container } from '../Container'
import { SectionHeading } from './SectionHeading'

const MENU = [
  {
    id: 'main-course',
    label: 'Main Course',
    items: [
      {
        name: 'Biryani',
        desc: 'Aromatic rice, tender chicken, raita',
        price: 'Rs 650',
        image:
          'https://images.unsplash.com/photo-1559528896-c5310744cce8?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Karahi',
        desc: 'Tomato, ginger, green chili — hot & fresh',
        price: 'Rs 1200',
        image:
          'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Nihari',
        desc: 'Slow cooked, warm spices, fresh garnish',
        price: 'Rs 720',
        image:
          'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
  {
    id: 'appetizers',
    label: 'Appetizers',
    items: [
      {
        name: 'Seekh Kebab',
        desc: 'Smoky grilled kebabs with mint chutney',
        price: 'Rs 540',
        image:
          'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Reshmi Kebab',
        desc: 'Creamy chicken kebab, charcoal finish',
        price: 'Rs 620',
        image:
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Chicken Tikka Bites',
        desc: 'Tender tikka cubes with house masala',
        price: 'Rs 580',
        image:
          'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    items: [
      {
        name: 'Gulab Jamun',
        desc: 'Warm syrup-soaked dumplings',
        price: 'Rs 290',
        image:
          'https://images.unsplash.com/photo-1605197161470-5d7a06fcb7d8?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Shahi Kheer',
        desc: 'Creamy rice pudding with nuts',
        price: 'Rs 340',
        image:
          'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=1200&q=80',
      },
      {
        name: 'Chocolate Lava Cake',
        desc: 'Warm center with vanilla cream',
        price: 'Rs 450',
        image:
          'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
]

function parsePrice(value) {
  const amount = Number(String(value || '').replace(/[^\d]/g, ''))
  return Number.isFinite(amount) ? amount : 0
}

function formatCurrency(amount) {
  return `Rs ${Number(amount || 0).toLocaleString()}`
}

function getInvoiceDocumentHtml(invoice) {
  if (!invoice) return ''
  const itemRows = (invoice.items || [])
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${formatCurrency(item.unitPrice)}</td>
          <td style="text-align:right;">${formatCurrency(item.lineTotal)}</td>
        </tr>
      `,
    )
    .join('')

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Invoice ${invoice.invoiceNumber}</title>
        <style>
          :root {
            --ink: #0f172a;
            --muted: #64748b;
            --line: #e2e8f0;
            --soft: #f8fafc;
            --brand: #b88a2f;
            --brand-dark: #1f2937;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: "Inter", "Segoe UI", Arial, sans-serif;
            color: var(--ink);
            background: #eef2f7;
            padding: 28px;
          }
          .sheet {
            max-width: 880px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #dbe3ef;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 18px 50px rgba(15, 23, 42, 0.10);
          }
          .topbar {
            background: linear-gradient(120deg, #111827 0%, #1f2937 60%, #374151 100%);
            color: #f8fafc;
            padding: 26px 30px;
            display: flex;
            justify-content: space-between;
            gap: 18px;
          }
          .brand {
            letter-spacing: 0.08em;
            font-size: 11px;
            text-transform: uppercase;
            color: #fcd889;
            font-weight: 700;
          }
          h1 {
            margin: 8px 0 0;
            font-size: 29px;
            line-height: 1.1;
            font-weight: 800;
          }
          .invoice-meta {
            text-align: right;
            font-size: 12px;
            color: #d6deea;
            line-height: 1.6;
          }
          .invoice-meta strong {
            color: #ffffff;
            font-size: 18px;
            letter-spacing: 0.03em;
          }
          .body {
            padding: 24px 30px 30px;
          }
          .section-title {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.11em;
            color: var(--muted);
            margin: 0 0 10px;
            font-weight: 700;
          }
          .card {
            border: 1px solid var(--line);
            border-radius: 14px;
            padding: 14px 16px;
            margin-bottom: 18px;
            background: #fff;
          }
          .customer {
            font-size: 13px;
            line-height: 1.6;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid var(--line);
            border-radius: 12px;
            overflow: hidden;
          }
          th, td {
            border-bottom: 1px solid var(--line);
            padding: 12px 10px;
            font-size: 13px;
            text-align: left;
          }
          th {
            background: var(--soft);
            color: #1e293b;
            font-weight: 700;
            letter-spacing: 0.01em;
          }
          tbody tr:nth-child(even) { background: #fcfdff; }
          tbody tr:last-child td { border-bottom: 0; }
          .totals {
            margin-left: auto;
            max-width: 330px;
            margin-top: 16px;
            border: 1px solid var(--line);
            border-radius: 12px;
            padding: 12px 14px;
            background: #fbfdff;
          }
          .row {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            font-size: 13px;
            color: #1e293b;
          }
          .row:first-child { margin-top: 0; }
          .total {
            font-weight: 800;
            color: #0f172a;
            border-top: 1px dashed #c9d4e5;
            padding-top: 10px;
            margin-top: 10px;
            font-size: 14px;
          }
          .foot {
            margin-top: 18px;
            display: flex;
            justify-content: space-between;
            gap: 14px;
            color: var(--muted);
            font-size: 12px;
          }
          @media print {
            body { background: #fff; padding: 0; }
            .sheet { box-shadow: none; border: none; border-radius: 0; }
          }
        </style>
      </head>
      <body>
        <div class="sheet">
          <div class="topbar">
            <div>
              <div class="brand">Aurum Restaurant</div>
              <h1>Tax Invoice</h1>
            </div>
            <div class="invoice-meta">
              <div><strong>${invoice.invoiceNumber}</strong></div>
              <div>${new Date(invoice.createdAt).toLocaleString()}</div>
              <div>Order ID: ${invoice.orderId || ''}</div>
            </div>
          </div>
          <div class="body">
            <div class="card">
              <p class="section-title">Bill To</p>
              <div class="customer">
                <strong>${invoice.customer?.name || ''}</strong><br/>
                ${invoice.customer?.phone || ''}<br/>
                ${invoice.customer?.email || ''}<br/>
                ${invoice.customer?.address || ''}
              </div>
            </div>

            <table>
              <thead>
                <tr><th>Item</th><th>Qty</th><th>Unit Price</th><th style="text-align:right;">Line Total</th></tr>
              </thead>
              <tbody>${itemRows}</tbody>
            </table>

            <div class="totals">
              <div class="row"><span>Subtotal</span><span>${formatCurrency(invoice.subtotal)}</span></div>
              <div class="row"><span>Delivery Fee</span><span>${formatCurrency(invoice.deliveryFee)}</span></div>
              <div class="row total"><span>Grand Total</span><span>${formatCurrency(invoice.total)}</span></div>
            </div>

            <div class="foot">
              <span>Thank you for ordering with Aurum.</span>
              <span>Powered by Aurum Kitchen</span>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

export function Menu() {
  const [active, setActive] = useState('main-course')
  const [remoteGroups, setRemoteGroups] = useState(null)
  const [selectedDish, setSelectedDish] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [orderItems, setOrderItems] = useState([])
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })
  const [orderLoading, setOrderLoading] = useState(false)
  const [orderError, setOrderError] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(null)
  const [checkoutStep, setCheckoutStep] = useState(1)

  useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        const res = await fetch('/api/dishes')
        if (!res.ok) return
        const data = await res.json()
        const dishes = Array.isArray(data?.dishes) ? data.dishes : []
        if (!dishes.length) return

        const byCat = new Map()
        for (const d of dishes) {
          const cat = d.category || 'main-course'
          if (!byCat.has(cat)) byCat.set(cat, [])
          byCat.get(cat).push({
            name: d.name,
            desc: d.desc,
            price: d.price,
            image: d.imageUrl || '/images/food.svg',
          })
        }

        const labelById = {
          'main-course': 'Main Course',
          appetizers: 'Appetizers',
          desserts: 'Desserts',
        }

        const groups = Array.from(byCat.entries()).map(([id, items]) => ({
          id,
          label: labelById[id] || id,
          items,
        }))

        if (!cancelled) setRemoteGroups(groups)
      } catch {
        // ignore (fallback to static menu)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const groups = remoteGroups?.length ? remoteGroups : MENU

  const activeGroup = useMemo(
    () => groups.find((g) => g.id === active) ?? groups[0],
    [active, groups],
  )

  const orderTotal = useMemo(
    () =>
      orderItems.reduce(
        (sum, item) => sum + parsePrice(item.price) * Number(item.quantity || 1),
        0,
      ),
    [orderItems],
  )

  function addToOrder() {
    if (!selectedDish) return
    const qty = Math.max(1, Number(quantity || 1))
    setOrderItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.name === selectedDish.name)
      if (existingIdx === -1) {
        return [...prev, { ...selectedDish, quantity: qty }]
      }
      return prev.map((item, idx) =>
        idx === existingIdx ? { ...item, quantity: item.quantity + qty } : item,
      )
    })
    setSelectedDish(null)
    setQuantity(1)
    setCheckoutStep(2)
  }

  function removeOrderItem(name) {
    setOrderItems((prev) => {
      const next = prev.filter((item) => item.name !== name)
      if (!next.length) setCheckoutStep(1)
      return next
    })
  }

  function goToCustomerStep() {
    if (!orderItems.length) {
      setOrderError('Please add at least one item first.')
      return
    }
    setOrderError('')
    setCheckoutStep(2)
  }

  function goToConfirmStep() {
    if (!orderItems.length) {
      setOrderError('Please add at least one item first.')
      setCheckoutStep(1)
      return
    }
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      setOrderError('Please fill name, email, phone and address.')
      return
    }
    setOrderError('')
    setCheckoutStep(3)
  }

  async function placeOrder() {
    setOrderError('')
    setOrderSuccess(null)
    if (!orderItems.length) {
      setOrderError('Please add at least one item.')
      return
    }
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      setOrderError('Please fill name, email, phone and address.')
      return
    }

    setOrderLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          items: orderItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || 'order_failed')
      }
      setOrderSuccess(data)
      setOrderItems([])
      setCustomer({ name: '', email: '', phone: '', address: '' })
      setCheckoutStep(1)
    } catch {
      setOrderError('Order place nahi ho saka. Please try again.')
    } finally {
      setOrderLoading(false)
    }
  }

  function printInvoice() {
    const invoice = orderSuccess?.invoice
    if (!invoice) return
    const popup = window.open('', '_blank', 'width=900,height=700')
    if (!popup) return
    popup.document.open()
    popup.document.write(getInvoiceDocumentHtml(invoice))
    popup.document.close()
    popup.focus()
    popup.print()
  }

  return (
    <section id="menu" className="min-h-screen scroll-mt-20 py-16 sm:py-24">
      <SectionHeading
        eyebrow="MENU"
        title="Curated menu with premium presentation"
        description="Main Course, Appetizers, aur Desserts ko modern cards mein explore karo."
      />

      <Container className="mt-10">
        <div className="flex flex-wrap items-center gap-2">
          {groups.map((g) => {
            const isActive = g.id === active
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setActive(g.id)}
                className={[
                  'rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-night-950',
                  isActive
                    ? 'bg-gold-400 text-night-950 shadow-soft hover:bg-gold-300'
                    : 'bg-white/10 text-pearl-100 hover:bg-white/16',
                ].join(' ')}
              >
                {g.label}
              </button>
            )
          })}
        </div>

        <div className="mt-6 rounded-3xl bg-white/6 p-4 shadow-ring ring-1 ring-white/10 sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-display text-2xl font-semibold text-pearl-50">
              {activeGroup.label}
            </p>
            <p className="text-xs font-semibold tracking-[0.18em] text-pearl-100/60">
              PRICES IN PKR
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {activeGroup.items.map((i) => (
              <button
                key={i.name}
                type="button"
                onClick={() => {
                  setSelectedDish(i)
                  setQuantity(1)
                }}
                className="group relative overflow-hidden rounded-2xl bg-white/10 p-0 text-left shadow-soft ring-1 ring-white/20 backdrop-blur-md transition duration-300 hover:scale-[1.02] hover:bg-white/15"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={i.image}
                    alt={i.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/45 to-transparent" />
                </div>
                <div className="relative p-5">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-display text-xl font-semibold text-pearl-50">
                      {i.name}
                    </p>
                    <p className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-pearl-50">
                      {i.price}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-pearl-100/80">{i.desc}</p>
                  <p className="mt-4 text-xs font-semibold tracking-[0.18em] text-gold-200/80">
                    CLICK TO VIEW & ORDER
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white/7 p-5 shadow-ring ring-1 ring-white/10 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-2xl font-semibold text-pearl-50">Checkout</p>
            <p className="text-sm font-semibold text-pearl-100/80">
              Total: <span className="text-gold-200">Rs {orderTotal}</span>
            </p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { id: 1, label: 'Step 1: Add Items' },
              { id: 2, label: 'Step 2: Customer Info' },
              { id: 3, label: 'Step 3: Confirm' },
            ].map((step) => (
              <div
                key={step.id}
                className={[
                  'rounded-xl px-3 py-2 text-center text-xs font-semibold ring-1',
                  checkoutStep === step.id
                    ? 'bg-gold-300/20 text-gold-200 ring-gold-300/35'
                    : 'bg-white/5 text-pearl-100/70 ring-white/10',
                ].join(' ')}
              >
                {step.label}
              </div>
            ))}
          </div>

          {checkoutStep === 1 ? (
            <>
              {!orderItems.length ? (
                <p className="mt-4 text-sm text-pearl-100/70">
                  Kisi dish card par click karke order add karo.
                </p>
              ) : (
                <div className="mt-4 grid gap-3">
                  {orderItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-night-900/45 p-4 ring-1 ring-white/10"
                    >
                      <div>
                        <p className="font-semibold text-pearl-50">{item.name}</p>
                        <p className="text-xs text-pearl-100/70">
                          {item.price} x {item.quantity}
                        </p>
                      </div>
                      <Button
                        as="button"
                        type="button"
                        variant="secondary"
                        onClick={() => removeOrderItem(item.name)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
                <Button as="button" type="button" onClick={goToCustomerStep}>
                  Next: Customer Info
                </Button>
                <Button
                  as="button"
                  type="button"
                  variant="secondary"
                  onClick={() => setOrderItems([])}
                  disabled={!orderItems.length}
                >
                  Clear Items
                </Button>
              </div>
            </>
          ) : null}

          {checkoutStep === 2 ? (
            <>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <input
                  className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                  placeholder="Your full name"
                  value={customer.name}
                  onChange={(e) => setCustomer((s) => ({ ...s, name: e.target.value }))}
                />
                <input
                  className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                  placeholder="Email"
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer((s) => ({ ...s, email: e.target.value }))}
                />
                <input
                  className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                  placeholder="Phone number"
                  value={customer.phone}
                  onChange={(e) => setCustomer((s) => ({ ...s, phone: e.target.value }))}
                />
                <input
                  className="w-full rounded-2xl bg-night-900/60 px-4 py-3 text-pearl-50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-gold-300/70"
                  placeholder="Delivery address"
                  value={customer.address}
                  onChange={(e) => setCustomer((s) => ({ ...s, address: e.target.value }))}
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button as="button" type="button" variant="secondary" onClick={() => setCheckoutStep(1)}>
                  Back
                </Button>
                <Button as="button" type="button" onClick={goToConfirmStep}>
                  Next: Confirm
                </Button>
              </div>
            </>
          ) : null}

          {checkoutStep === 3 ? (
            <>
              <div className="mt-4 rounded-2xl bg-night-900/45 p-4 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-pearl-50">Confirm your order</p>
                <p className="mt-2 text-xs text-pearl-100/70">
                  {customer.name} • {customer.phone} • {customer.email}
                </p>
                <p className="mt-1 text-xs text-pearl-100/70">{customer.address}</p>
                <div className="mt-3 grid gap-2">
                  {orderItems.map((item) => (
                    <p key={`confirm-${item.name}`} className="text-xs text-pearl-100/80">
                      {item.name} x {item.quantity} - {item.price}
                    </p>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button as="button" type="button" variant="secondary" onClick={() => setCheckoutStep(2)}>
                  Back
                </Button>
                <Button as="button" type="button" onClick={placeOrder} disabled={orderLoading}>
                  {orderLoading ? 'Placing order...' : 'Place Order'}
                </Button>
              </div>
            </>
          ) : null}

          {orderError ? <p className="mt-4 text-sm font-semibold text-red-300">{orderError}</p> : null}
          {orderSuccess ? (
            <div className="mt-4 rounded-2xl bg-emerald-400/10 p-4 ring-1 ring-emerald-300/25">
              <p className="text-sm font-semibold text-emerald-200">Order confirmed successfully</p>
              <div className="mt-3 rounded-2xl bg-night-950/55 p-4 ring-1 ring-white/10">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-gold-200/85">INVOICE</p>
                    <p className="mt-1 font-display text-2xl font-semibold text-pearl-50">
                      {orderSuccess.invoice?.invoiceNumber}
                    </p>
                    <p className="mt-1 text-xs text-pearl-100/70">
                      {orderSuccess.invoice?.createdAt
                        ? new Date(orderSuccess.invoice.createdAt).toLocaleString()
                        : ''}
                    </p>
                  </div>
                  <div className="text-right text-xs text-pearl-100/80">
                    <p>{orderSuccess.invoice?.customer?.name}</p>
                    <p>{orderSuccess.invoice?.customer?.phone}</p>
                    <p>{orderSuccess.invoice?.customer?.email}</p>
                    <p>{orderSuccess.invoice?.customer?.address}</p>
                  </div>
                </div>
                <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-white/10">
                  <table className="w-full min-w-[520px] text-left text-xs text-pearl-100/85">
                    <thead className="bg-white/5 text-pearl-50">
                      <tr>
                        <th className="px-3 py-2">Item</th>
                        <th className="px-3 py-2">Qty</th>
                        <th className="px-3 py-2">Unit Price</th>
                        <th className="px-3 py-2 text-right">Line Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(orderSuccess.invoice?.items || []).map((item) => (
                        <tr key={`invoice-${item.name}`} className="border-t border-white/10">
                          <td className="px-3 py-2">{item.name}</td>
                          <td className="px-3 py-2">{item.quantity}</td>
                          <td className="px-3 py-2">{formatCurrency(item.unitPrice)}</td>
                          <td className="px-3 py-2 text-right">{formatCurrency(item.lineTotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 ml-auto w-full max-w-xs space-y-1 text-sm text-pearl-100/85">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(orderSuccess.invoice?.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delivery</span>
                    <span>{formatCurrency(orderSuccess.invoice?.deliveryFee)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/15 pt-2 font-semibold text-pearl-50">
                    <span>Grand Total</span>
                    <span>{formatCurrency(orderSuccess.invoice?.total)}</span>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button as="button" type="button" onClick={printInvoice}>
                    Print / Download PDF
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Container>

      {selectedDish ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-night-950/85 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-night-900 ring-1 ring-white/15">
            <div className="relative h-72 w-full sm:h-80">
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/35 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedDish(null)}
                className="absolute right-4 top-4 rounded-full bg-night-950/80 px-3 py-1 text-sm font-semibold text-pearl-50 ring-1 ring-white/20"
              >
                Close
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-display text-3xl font-semibold text-pearl-50">
                  {selectedDish.name}
                </p>
                <p className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-pearl-50">
                  {selectedDish.price}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-pearl-100/80">{selectedDish.desc}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold text-pearl-100/80">Quantity:</p>
                <div className="inline-flex items-center rounded-full bg-white/10 p-1 ring-1 ring-white/15">
                  <button
                    type="button"
                    className="rounded-full px-3 py-1 text-sm font-semibold text-pearl-50 hover:bg-white/10"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold text-pearl-50">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="rounded-full px-3 py-1 text-sm font-semibold text-pearl-50 hover:bg-white/10"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
                <Button as="button" type="button" onClick={addToOrder}>
                  Add To Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
