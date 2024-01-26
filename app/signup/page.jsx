'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import {GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth, db} from '../firebase'
import { useRouter } from 'next/navigation'
import { setDoc, doc } from 'firebase/firestore';
import { FaGoogle } from 'react-icons/fa';

const page = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmed, setConfirmed] = useState('')
    const[error, setError] = useState('')
    const router = useRouter()
    const provider = new GoogleAuthProvider();

    // sign up new users
    const handleClick = async (e) => {
        e.preventDefault()
        if (password !== confirmed) {
          setError("Passwords do not match")
          return
        }
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

    const googleSignIn = async () => {
      setError('')
      try {
        await signInWithPopup(auth, provider)
        router.push('/home')
      } catch (error) {
        setError(error.message)
      }
    }
    

  return (
    <div className="max-w-[1240px] m-auto h-screen flex flex-col items-center p-16">
      <h1 className="text-4xl font-semibold">Sign up</h1>
      <div className="flex flex-col items-center justify-between w-[600px] mt-10 bg-slate-800 rounded-md" >
        {error && <div className='mt-4 bg-red-400 rounded-md px-4 py-2'>{error}</div>}
        <form onSubmit={handleClick} className="w-full flex flex-col items-center ">
          <div className="flex flex-col gap-4 py-16 text-black w-[80%]">
            <input onChange={(e) => setName(e.target.value)} className="border px-4 py-2" type="text" placeholder="Name" />
            <input onChange={(e) => setEmail(e.target.value)} className="border px-4 py-2" type="text" placeholder="Email" />
            <input onChange={(e) => setPassword(e.target.value)} className="border px-4 py-2" type="password" placeholder="Password" />
            <input onChange={(e) => setConfirmed(e.target.value)} className="border px-4 py-2" type="password" placeholder="Confirm Password" />
          </div>
          <div className="w-[80%]">
            <button className="border-2 px-3 py-2 rounded-md bg-blue-700 border-blue-700 hover:bg-white hover:text-blue-700 mb-4 w-full">Sign up</button>
          </div>
          <div>
            <p>Already have an account? <Link href='/' className="underline cursor-pointer">Log in here</Link></p>
          </div>
        </form>
        <hr className="w-[80%] my-8"/>
        <div onClick={googleSignIn} className="cursor-pointer flex items-center justify-center border px-3 py-2 rounded-md bg-white text-black border-slate-900 hover:bg-gray-200 mb-4 w-[60%]">
          <FaGoogle size={20}/>&emsp;<span>Login with Google</span>
        </div>
      </div>
    </div>
  )
}

export default page