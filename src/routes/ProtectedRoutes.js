'use client'

import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { auth } from '../firebase'

const ProtectedRoute = ({ children }) => {
  console.log('mj')
  const router = useRouter()

  useEffect(() => {
    console.log('jg')

    if (!auth.currentUser) {
      console.log('rj')

      // Redirect to login page if user is not authenticated
      router.push('/login')
    }
  }, [auth, router])

  // If auth is undefined (still initializing), show a loading state
  if (auth === undefined) {
    return <div>Loading...</div>
  }

  console.log('object', auth.currentUser)

  // Only render children if user is authenticated
  return auth.currentUser ? children : null
}

export default ProtectedRoute
