'use client'

// named imports
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { onSnapshot } from 'firebase/firestore'
import { subscriptionRef } from '../../converters/Subscription'
import { useSubscriptionStore } from '@/store/store'

function SubscriptionProvider({ children }: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const setSubscription = useSubscriptionStore((state) => state.setSubscription)

  useEffect(() => {
    if (!session) return

    return onSnapshot(subscriptionRef(session?.user.id), (snapshot) => {
      if (snapshot.empty) {
        setSubscription(null) // set no subscription
        return
      } else {
        setSubscription(snapshot.docs[0].data()) // set subscription
      }
    },
      (error) => {
        console.log(error)
      })

  }, [session, setSubscription])

  return (
    <>{children}</>
  )
}

export default SubscriptionProvider