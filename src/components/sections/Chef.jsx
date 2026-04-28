import { Container } from '../Container'
import { SectionHeading } from './SectionHeading'

export function Chef() {
  return (
    <section id="chef" className="min-h-screen scroll-mt-20 py-16 sm:py-24">
      <SectionHeading
        eyebrow="KITCHEN"
        title="Karahi, BBQ, and classics — with premium plating"
        description="We keep it bold, balanced, and consistent — har dafa same taste."
      />

      <Container className="mt-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl bg-white/6 shadow-soft ring-1 ring-white/10">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=80"
                alt="Chef at work"
                className="h-80 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/30 to-transparent" />
              <div className="relative p-6">
                <p className="text-xs font-semibold tracking-[0.28em] text-gold-200/75">
                  CHEF'S NOTE
                </p>
                <p className="mt-3 font-display text-2xl font-semibold text-pearl-50">
                  “Fresh flame, clean masala.”
                </p>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/75">
                  Karahi live feel, BBQ smoke, and fast food comfort — sab ka quality premium.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  k: 'Biryani',
                  v: 'Aromatic rice, perfect spice balance.',
                  img: 'https://images.unsplash.com/photo-1559528896-c5310744cce8?auto=format&fit=crop&w=1200&q=80',
                },
                {
                  k: 'Karahi',
                  v: 'Fresh wok, ginger-tomato punch.',
                  img: 'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?auto=format&fit=crop&w=1200&q=80',
                },
                {
                  k: 'BBQ',
                  v: 'Smoky char, juicy bite.',
                  img: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80',
                },
                {
                  k: 'Fast Food',
                  v: 'Crisp, saucy, and satisfying.',
                  img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
                },
              ].map((f) => (
                <div
                  key={f.k}
                  className="group relative overflow-hidden rounded-3xl bg-white/6 shadow-soft ring-1 ring-white/10"
                >
                  <img
                    src={f.img}
                    alt={f.k}
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/35 to-transparent" />
                  <div className="relative p-6">
                    <p className="text-xs font-semibold tracking-[0.24em] text-gold-200/75">
                      {f.k}
                    </p>
                    <p className="mt-2 font-display text-xl font-semibold text-pearl-50">
                      {f.v}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
