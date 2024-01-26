'use client'
import Link from "next/link";
import {auth} from './firebase'
import {signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const[error, setError] = useState('')
  const router = useRouter()

  const handleClick = async (e) => {
      e.preventDefault()
      setError('')
      try {
          await signInWithEmailAndPassword(auth, email, password)
          router.push('/home')
      } catch (error) {
          setError(error.message)
      }
  }

  return (
    <div className="max-w-[1240px] m-auto h-screen flex flex-col items-center p-16">
      <h1 className="text-4xl font-semibold">Log In Page</h1>
      <form onSubmit={handleClick} className="flex flex-col items-center justify-between w-[600px] mt-10 bg-slate-800 rounded-md" >
        {error && <div className='mt-4 bg-red-400 rounded-md px-4 py-2'>{error}</div>}
        <div className="flex flex-col gap-4 py-16 text-black w-[80%]">
          <input onChange={(e) => setEmail(e.target.value)} className="border px-4 py-2" type="text" placeholder="Email" />
          <input onChange={(e) => setPassword(e.target.value)} className="border px-4 py-2" type="password" placeholder="Password" />
        </div>
        <div>
          <button className="border px-3 py-2 rounded-md bg-slate-900 border-slate-900 hover:bg-slate-800 mb-8">Log in</button>
        </div>
        <div className="mb-4">
          <p>Not a user? <Link href='/signup' className="underline cursor-pointer">Sign up here</Link></p>
        </div>

      </form>
    </div>
  );
}
