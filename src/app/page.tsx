// named imports
import Footer from '@/components/global/Footer'
import Features from '@/components/landing/Features'
import Hero from '@/components/landing/Hero'

export default async function Home() {
  return (
    <div className=''>
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}
