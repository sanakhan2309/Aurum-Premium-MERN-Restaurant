import { Container } from '../Container'
import { SectionHeading } from './SectionHeading'

const cards = [
  {
    title: 'Fresh masala daily',
    desc: 'Grinding, roasting, blending — flavor stays loud and clean.',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Smoke & grill',
    desc: 'BBQ that hits: juicy, smoky, and perfectly charred.',
    img: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Fast food done right',
    desc: 'Burgers, wraps, fries — crisp, saucy, fresh.',
    img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1400&q=80',
  },
]

export function Story() {
  return (
    <section id="story" className="min-h-screen scroll-mt-20 py-16 sm:py-24">
      <SectionHeading
        eyebrow="OUR STORY"
        title="Luxury vibes. Desi soul."
        description="Moody charcoal background, gold accents, and real food that looks (and tastes) premium."
      />

      <Container className="mt-8">
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-3xl bg-white/6 shadow-soft ring-1 ring-white/10"
            >
              <img
                src={c.img}
                alt={c.title}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/30 to-transparent" />
              <div className="relative p-6">
                <p className="font-display text-xl font-semibold text-pearl-50">
                  {c.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-pearl-100/75">
                  {c.desc}
                </p>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                <p className="mt-4 text-xs font-semibold tracking-[0.22em] text-gold-200/70">
                  AURUM SIGNATURE
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
