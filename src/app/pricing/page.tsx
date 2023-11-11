// named imports
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth'

// default imports
import PricingCards from '@/components/pricing/PricingCards'

async function Pricing() {
  const session = await getServerSession(authOptions)

  return (
    <div className='my-20 mx-auto'>
      {/* description  */}
      <div className='dark:text-white'>
        <h3 className='text-center text-indigo-400 font-semibold'>Pricing</h3>
        <p className='text-2xl sm:text-4xl text-center font-bold my-2'>The right price for you, whoever you are</p>
        <p className='text-center text-sm px-2 sm:mx-0 sm:text-lg text-indigo-400 my-4'>We&apos;re 99% sure we have a plan to match 100% of your needs </p>
      </div>

      {/* pricing cards */}
      <PricingCards userId={session?.user.id} redirect={true} />
    </div>
  )
}

export default Pricing
