'use client'
import React, { useEffect, useState } from 'react'
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from '../firebase'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar';
import Expense from '../components/Expense';
import Link from 'next/link';

const page = () => {

  const [user, setUser] = useState('')
  const[error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])

  const handleClick = async () => {
    setError(error.message)
    try {
      await signOut(auth)
      router.push('/')

    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
    {user ? (<div className="max-w-[1240px] m-auto h-screen flex flex-col items-center p-16">
      <Navbar />
      <Expense />
    </div>) : (<div className='max-w-[1240px] m-auto h-screen flex flex-col items-center p-16 text-xl justify-center'>
      You must be logged in to view this page.
      <Link className='border px-4 py-1 m-4 border-slate-900 bg-slate-900 hover:bg-slate-800' href='/'>Go back</Link>
    </div>)}
    </>
  )
}

export default page