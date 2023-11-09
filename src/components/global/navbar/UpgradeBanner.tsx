'use client'

import { Button } from "@/components/ui/button"
import { useSubscriptionStore } from "@/store/store"
import { useRouter } from "next/navigation"

function UpgradeBanner() {
  const router = useRouter()
  const subscription = useSubscriptionStore((state) => state.subscription)
  const isPro = subscription?.role === 'pro'

  if (subscription === undefined || isPro) return null

  return (
    <Button
      className='w-full rounded-none bg-gradient-to-r from-purple-500 via-sky-600 to-purple-600 text-center
      text-white px-5 py-2 hover:from-blue-600 hover:to-purple-700 hover:shadow-md hover:opacity-75 transition-all
      '
      onClick={() => router.push('/register')}
    >
      Upgrade to Pro to unlock more features
    </Button>
  )
}

export default UpgradeBanner
