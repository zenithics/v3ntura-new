'use client'

import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export const StripeProvider: React.FC<{
  clientSecret: string
  children: React.ReactNode
}> = ({ clientSecret, children }) => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#000000',
            borderRadius: '6px',
          },
        },
      }}
    >
      {children}
    </Elements>
  )
}
