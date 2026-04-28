import { Button } from './Button'
import { Container } from './Container'
import { LogoMark } from './LogoMark'

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Story', href: '#story' },
  { label: 'Chef', href: '#chef' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night-950/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="group inline-flex items-center gap-3">
          <span className="grid place-items-center rounded-full bg-white/10 shadow-ring transition group-hover:shadow-soft">
            <LogoMark className="m-2 text-pearl-50" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-tightish text-pearl-50">
              Aurum
            </span>
            <span className="block text-xs font-medium text-pearl-100/70">
              Desi & Fast Food
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-pearl-100/80 transition hover:text-pearl-50"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            href="#reservation"
            className="hidden sm:inline-flex"
          >
            Reserve
          </Button>
          <Button href="#menu">Explore Menu</Button>
        </div>
      </Container>
    </header>
  )
}
