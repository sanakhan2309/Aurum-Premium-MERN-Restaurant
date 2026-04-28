import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

export function MainLayout({ children }) {
  return (
    <div id="top" className="min-h-dvh bg-night-950">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
