import { Container } from '../Container'
import { SectionHeading } from './SectionHeading'

export function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="CONTACT"
        title="Location & details"
        description="Call, WhatsApp, or email — we reply fast."
      />

      <Container className="mt-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="grid gap-4 rounded-3xl bg-white/6 p-6 shadow-soft ring-1 ring-white/10 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-night-900/45 p-5 ring-1 ring-white/10">
                  <p className="text-xs font-semibold tracking-[0.22em] text-gold-200/75">
                    ADDRESS
                  </p>
                  <p className="mt-3 font-semibold text-pearl-50">120 Silk Street</p>
                  <p className="text-sm text-pearl-100/75">Downtown District</p>
                </div>
                <div className="rounded-2xl bg-night-900/45 p-5 ring-1 ring-white/10">
                  <p className="text-xs font-semibold tracking-[0.22em] text-gold-200/75">
                    PHONE
                  </p>
                  <a
                    className="mt-3 block font-semibold text-pearl-50 hover:text-gold-200"
                    href="tel:+10000000000"
                  >
                    +1 (000) 000-0000
                  </a>
                  <p className="text-sm text-pearl-100/75">Daily 10am – 12am</p>
                </div>
              </div>

              <div className="rounded-2xl bg-night-900/45 p-5 ring-1 ring-white/10">
                <p className="text-xs font-semibold tracking-[0.22em] text-gold-200/75">EMAIL</p>
                <a
                  className="mt-3 block font-semibold text-pearl-50 hover:text-gold-200"
                  href="mailto:hello@aurum.restaurant"
                >
                  hello@aurum.restaurant
                </a>
                <p className="mt-2 text-sm text-pearl-100/75">
                  Events / private dining available.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl bg-white/6 p-7 shadow-soft ring-1 ring-white/10">
              <img
                src="/images/dessert.svg"
                alt="Dessert"
                className="absolute inset-0 h-full w-full object-cover opacity-35"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/70 to-night-950/20" />
              <div className="relative">
                <p className="text-xs font-semibold tracking-[0.24em] text-gold-200/75">
                  MOODY LUXURY
                </p>
                <p className="mt-4 font-display text-2xl font-semibold text-pearl-50">
                  Charcoal black + gold glow
                </p>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/75">
                  Low light, premium ambience, and food that looks as good as it tastes.
                </p>

                <div className="mt-8 h-px w-full bg-white/10" />

                <p className="mt-6 text-xs font-semibold tracking-[0.24em] text-gold-200/75">
                  PARKING
                </p>
                <p className="mt-3 text-sm text-pearl-100/75">
                  Street parking + valet on weekends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
