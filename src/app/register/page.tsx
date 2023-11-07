// named imports
import PricingCards from '@/components/pricing/PricingCards'
import { getServerSession } from 'next-auth'

async function Register() {
  const session = await getServerSession()

  return (
    <div className='my-16 mx-auto'>
      <p className='text-center text-4xl text-indigo-400 font-bold'>
        Let&apos;s handle your membership {session?.user?.name?.split(' ')[0]}!
      </p>

      <PricingCards redirect={false} />
    </div>
  )
}

export default Register