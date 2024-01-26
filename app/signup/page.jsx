'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase'
import { useRouter } from 'next/navigation'
import { setDoc, doc } from 'firebase/firestore';

const page = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[error, setError] = useState('')
    const router = useRouter()

    // sign up new users
    const handleClick = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            router.push('/home')
            await setDoc(doc(db, 'users', email), {
              username: name,
              items: []
            })
        } catch (error) {
            setError(error.message)
        }
    }
    

  return (
    <div className="max-w-[1240px] m-auto h-screen flex flex-col items-center p-16">
      <h1 className="text-4xl font-semibold">Sign up Page</h1>
      <form onSubmit={handleClick} className="flex flex-col items-center justify-between w-[600px] mt-10 bg-slate-800 rounded-md" >
        {error && <div className='mt-4 bg-red-400 rounded-md px-4 py-2'>{error}</div>}
        <div className="flex flex-col gap-4 py-16 text-black w-[80%]">
          <input onChange={(e) => setName(e.target.value)} className="border px-4 py-2" type="text" placeholder="Name" />
          <input onChange={(e) => setEmail(e.target.value)} className="border px-4 py-2" type="text" placeholder="Email" />
          <input onChange={(e) => setPassword(e.target.value)} className="border px-4 py-2" type="password" placeholder="Password" />
        </div>
        <div>
          <button className="border px-3 py-2 rounded-md bg-slate-900 border-slate-900 hover:bg-slate-800 mb-8">Sign up</button>
        </div>
        <div className="mb-4">
          <p>Already a user? <Link href='/' className="underline cursor-pointer">Log in here</Link></p>
        </div>
      </form>
    </div>
  )
}

export default page