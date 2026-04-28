import { Button } from '../Button'
import { Container } from '../Container'

export function Reservation() {
  return (
    <section id="reservation" className="py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-white/6 p-8 shadow-soft ring-1 ring-white/10 sm:p-10">
          <img
            src="/images/dining.svg"
            alt="Dining room"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/75 to-night-950/20" />

          <div className="relative grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.28em] text-gold-200/75">
                RESERVATIONS
              </p>
              <p className="mt-4 font-display text-3xl font-semibold tracking-tightish text-pearl-50 sm:text-4xl">
                Book a table — luxury & moody vibes.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-pearl-100/75">
                Family dinner, friends hangout, ya date night — we’ve got the vibe.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button as="a" href="#contact">
                  Request reservation
                </Button>
                <Button as="a" href="#menu" variant="secondary">
                  Browse menu
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-3 rounded-3xl bg-night-900/55 p-5 shadow-ring ring-1 ring-white/10">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                    <p className="text-xs font-semibold text-pearl-100/70">Guests</p>
                    <p className="mt-1 font-semibold text-pearl-50">2–10</p>
                  </div>
                  <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                    <p className="text-xs font-semibold text-pearl-100/70">Seatings</p>
                    <p className="mt-1 font-semibold text-pearl-50">1pm – 12am</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                  <p className="text-xs font-semibold tracking-[0.22em] text-gold-200/75">
                    TODAY
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold text-pearl-50">
                    Biryani + Karahi combo deals
                  </p>
                  <p className="mt-2 text-sm text-pearl-100/75">
                    Ask our staff for current offers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
