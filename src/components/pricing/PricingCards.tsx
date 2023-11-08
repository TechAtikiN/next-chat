// named imports
import { CheckIcon } from 'lucide-react'

// default imports
import Link from 'next/link'
import CheckoutButton from './CheckoutButton'

const tiers = [
  {
    name: "Starter",
    id: null,
    href: "#",
    priceMonthly: null,
    description: "Get chatting with our free plan and explore",
    features: [
      "20 Message Chat limit in Chats",
      "2 Participants per Chat",
      "3 Chat Rooms limit",
      "Supports 2 languages",
      "48-hour support response time"
    ]
  },
  {
    name: "Pro",
    id: "pro",
    href: "#",
    priceMonthly: "$10.00",
    description: "Unlock unlimited features with our Pro plan.",
    features: [
      "Unlimited Messages in Chats",
      "Unlimited Participants per Chat",
      "Unlimited Chat Rooms",
      "Supports upto 10 languages",
      "24-hour support response time",
      "Early access to new features"
    ]
  },
]

function PricingCards({ redirect }: { redirect: boolean }) {
  return (
    <div
      className='grid grid-cols-1 sm:grid-cols-2 gap-x-0 sm:gap-x-10 gap-y-10 my-20'>
      {tiers.map((tier) => (
        <div
          className='ml-7 sm:ml-0 text-black dark:bg-slate-900 dark:text-white dark:hover:bg-slate-900/70
             border-2 border-gray-300 dark:border-gray-700 dark:hover:border-indigo-400 hover:border-indigo-400 flex flex-col py-5 px-8 rounded-3xl w-80'
          key={tier.name}
        >
          <div>
            <h3 className='text-2xl font-semibold'>{tier.name}</h3>
            <p className='dark:text-gray-300 my-2'>{tier.description}</p>
          </div>
          {tier.priceMonthly ? (
            <div className='flex items-center my-4'>
              <span className='text-4xl font-bold'>{tier.priceMonthly}</span>
              <span className='text-gray-300 text-sm ml-1'>/month</span>
            </div>
          ) : (
            <div className='flex items-center my-4'>
              <span className='text-4xl font-semibold'>Free</span>
            </div>
          )}

          <ul className='flex flex-col h-48 space-y-2 my-4 mt-6 dark:text-gray-300 text-gray-700'>
            {tier.features.map((feature) => (
              <li key={feature}>
                <CheckIcon className='inline-block mr-2' size={16} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {redirect ? (
            <Link
              href='/register'
              className='pricing-btn'
            >
              Get started today
            </Link>
          ) : (
            tier.id && <CheckoutButton />
          )}

        </div>
      ))}
    </div>
  )
}

export default PricingCards
