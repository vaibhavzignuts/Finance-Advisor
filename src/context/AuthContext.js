'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'

import { auth } from '../firebase'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    try {
      console.log('Attempting to sign out...')
      await signOut(auth)
      console.log('Sign out successful')
      router.push('/login')
    } catch (error) {
      console.error('Error during sign out:', error)

      // Optionally, show an error notification to the user
    }
  }

  const value = {
    user,
    login,
    signup,
    logout
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
