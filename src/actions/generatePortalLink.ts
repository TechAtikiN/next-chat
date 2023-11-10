"use server"

// mamed imports
import { adminDb } from '../../firebase-admin'
import { headers } from "next/headers"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

// default imports
import Stripe from "stripe"
import { authOptions } from '../../auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const generatePortalLink = async (userId: string| undefined ) => {
  const host = headers().get("host")

  // if (userId) return console.error("No user id found")
  const returnUrl = 
    process.env.NODE_ENV === "development" ?
      `http://${host}/register` :
      `https://${host}/register`
  
  // get the customer record from firestore
  if (userId) {
    const doc = await adminDb.collection("customers").doc(userId as string).get()

    // if no customer record found, return error
  if (!doc.data) return console.error("No customer record found for user", userId)

  // get the stripe id from the customer record
  const stripeId = doc.data()!.stripeId

  // billing portal session
  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: stripeId,
    return_url: returnUrl
  })

  redirect(stripeSession.url)
  }

  
}

export default generatePortalLink