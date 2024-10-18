'use client'

import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useAuth } from '../context/AuthContext'
import { auth } from '../firebase'

const PublicRoute = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    console.log('jr', auth)

    if (auth?.currentUser) {
      console.log('rj')
      router.push('/home') // or wherever you want to redirect authenticated users
    }
  }, [auth, router])

  if (!auth) {
    // Auth is still initializing
    return <div>Loading...</div>
  }

  // User is not authenticated, render the public route
  return children
}

export default PublicRoute
