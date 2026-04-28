import { Button } from '../Button'
import { Container } from '../Container'

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen scroll-mt-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=2200&q=80"
          alt="Appetizing gourmet food spread"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_20%_20%,rgba(231,183,60,0.20),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(110,231,183,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/50 via-night-950/75 to-night-950" />
      </div>

      <Container className="flex min-h-screen items-center py-16 sm:py-20">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-gold-200/85 shadow-ring ring-1 ring-white/10">
              LUXURY • MOODY • DESI + FAST FOOD
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tightish text-pearl-50 sm:text-6xl">
              Charcoal vibes.
              <span className="text-gold-200"> Gold glow.</span>
              <br />
              Real desi food.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-pearl-100/80">
              Biryani, karahi, BBQ — plus burgers and wraps — served in a luxury
              moody space with deep navy/charcoal tones.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#reservation">Reserve now</Button>
              <Button href="#menu" variant="secondary">
                Explore menu
              </Button>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
              {[
                { k: 'Biryani', v: 'House special' },
                { k: 'Karahi', v: 'Hot & fresh' },
                { k: 'Fast Food', v: 'Premium taste' },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-3xl bg-white/8 p-4 shadow-ring ring-1 ring-white/10"
                >
                  <p className="font-display text-2xl font-semibold text-pearl-50">
                    {s.k}
                  </p>
                  <p className="mt-1 text-xs font-medium tracking-wide text-pearl-100/75">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid gap-4">
              {[
                {
                  t: 'Chicken Biryani',
                  d: 'Aromatic rice • raita included',
                  img: 'https://images.unsplash.com/photo-1559528896-c5310744cce8?auto=format&fit=crop&w=1400&q=80',
                },
                {
                  t: 'Beef Karahi',
                  d: 'Ginger • tomato • green chili',
                  img: 'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?auto=format&fit=crop&w=1400&q=80',
                },
              ].map((c) => (
                <div
                  key={c.t}
                  className="group relative overflow-hidden rounded-[28px] bg-white/6 shadow-soft ring-1 ring-white/10"
                >
                  <img
                    src={c.img}
                    alt={c.t}
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/25 to-transparent" />
                  <div className="relative p-5">
                    <p className="font-display text-xl font-semibold text-pearl-50">
                      {c.t}
                    </p>
                    <p className="mt-1 text-sm text-pearl-100/75">{c.d}</p>
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
