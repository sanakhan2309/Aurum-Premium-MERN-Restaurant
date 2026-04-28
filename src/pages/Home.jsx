import { Chef } from '../components/sections/Chef'
import { Contact } from '../components/sections/Contact'
import { Hero } from '../components/sections/Hero'
import { Menu } from '../components/sections/Menu'
import { Reservation } from '../components/sections/Reservation'
import { Story } from '../components/sections/Story'

export function Home() {
  return (
    <>
      <Hero />
      <Menu />
      <Story />
      <Chef />
      <Reservation />
      <Contact />
    </>
  )
}
