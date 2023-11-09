'use client'

// named imports
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { onSnapshot } from 'firebase/firestore'
import { subscriptionRef } from '../../../converters/Subscription'

function SubscriptionProvider() {
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) return

    return onSnapshot(subscriptionRef(session?.user.id), (snapshot) => {
      if (snapshot.empty) {
        console.log('User has no subscription.')
        // set no subscription
        return
      } else {
        console.log('User has a subscription.')
        // set subscription
      }
    })
  }, [session])


  return (
    <div>Subscription</div>
  )
}

export default SubscriptionProvider