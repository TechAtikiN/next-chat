'use client'

// named imports
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase'

function CheckoutButton() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

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
    <button
      onClick={() => createCheckoutSession()}
      className='pricing-btn'
    >
      {loading ? 'Loading...' : 'Sign Up'}
    </button>
  )
}

export default CheckoutButton
