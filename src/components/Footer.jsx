import { Container } from './Container'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night-950">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-pearl-50">
              Aurum
            </p>
            <p className="mt-2 max-w-sm text-sm text-pearl-100/75">
              Luxury, moody vibes — desi classics and fast food favorites.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-medium text-pearl-50">Hours</p>
              <ul className="mt-2 space-y-1 text-pearl-100/75">
                <li>Mon–Thu: 1pm – 12am</li>
                <li>Fri–Sun: 1pm – 1am</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-pearl-50">Location</p>
              <ul className="mt-2 space-y-1 text-pearl-100/75">
                <li>120 Silk Street</li>
                <li>Downtown District</li>
              </ul>
            </div>
          </div>

          <div className="text-sm">
            <p className="font-medium text-pearl-50">Contact</p>
            <div className="mt-2 space-y-1 text-pearl-100/75">
              <p>
                <a className="hover:text-gold-200" href="tel:+10000000000">
                  +1 (000) 000-0000
                </a>
              </p>
              <p>
                <a className="hover:text-gold-200" href="mailto:hello@aurum.restaurant">
                  hello@aurum.restaurant
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-pearl-100/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Aurum. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
