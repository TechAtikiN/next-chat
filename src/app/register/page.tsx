// named imports
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth'

// default imports
import PricingCards from '@/components/pricing/PricingCards'

async function Register() {
  const session = await getServerSession(authOptions)
  console.log(session?.user.id)
  return (
    <div className='my-16 mx-auto'>
      <p className='text-center text-4xl text-indigo-400 font-bold'>
        Let&apos;s handle your membership {session?.user?.name?.split(' ')[0]}!
      </p>

      <PricingCards userId={session?.user.id} redirect={false} />
    </div>
  )
}

export default Register