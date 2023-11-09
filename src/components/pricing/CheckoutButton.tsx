'use client'

// named imports
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useSubscriptionStore } from '@/store/store'

// default imports
import LoadingSpinner from '../global/LoadingSpinner'
import ManageAccountButton from '../global/ManageAccountButton'

function CheckoutButton({ userId }: { userId: string | undefined }) {
  const [loading, setLoading] = useState(false)
  const subscription = useSubscriptionStore((state) => state.subscription)
  const { data: session } = useSession()

  const isLoadingSubscription = subscription === undefined

  const isSubscribed = subscription?.status === 'active' && subscription?.role === 'pro'

  const createCheckoutSession = async () => {
    if (!session) return

    // push a document into firestore db
    setLoading(true)

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: 'price_1OA77jSEesrm7P0Hx90Q8Q2a',
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    )

    // stripe extension on firebase will create a checkout session
    return onSnapshot(docRef, snap => {
      const data = snap.data()
      const url = data?.url
      const error = data?.error

      if (error) {
        // show error to your customer
        // inspect your cloud function logs in the firebase console
        alert(`An error occured: ${error.message}`)
        setLoading(false)
      }

      if (url) {
        // redirect to checkout page
        window.location.assign(url)
        setLoading(false)
      }

    })

    // redirect user to checkout page
  }

  return (
    <div
      className='pricing-btn font-semibold'
    >
      {isSubscribed ? (
        <ManageAccountButton userId={userId} />
      ) :
        isLoadingSubscription || loading ?
          (<LoadingSpinner />)
          : (
            <button onClick={() => createCheckoutSession()}>Sign Up</button>
          )}
    </div>
  )
}

export default CheckoutButton
