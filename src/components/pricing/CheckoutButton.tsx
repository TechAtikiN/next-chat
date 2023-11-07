'use client'

// named imports
import { useSession } from 'next-auth/react'

function CheckoutButton() {
  const { data: session } = useSession()

  const createCheckoutSession = async () => {
    if (!session) return

    // push a document into firestore db

    // stripe extension on firebase will create a checkout session

    // redirect user to checkout page
  }

  return (
    <button
      onClick={() => createCheckoutSession()}
      className='pricing-btn'
    >
      Sign up
    </button>
  )
}

export default CheckoutButton
