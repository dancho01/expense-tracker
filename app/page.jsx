'use client'
import Link from "next/link";
import {auth} from './firebase'
import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";


export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const[error, setError] = useState('')
  const router = useRouter()
  const provider = new GoogleAuthProvider();

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
      <h1 className="text-4xl font-semibold">Log In</h1>
      <div className="flex flex-col items-center justify-between w-[600px] mt-10 bg-slate-800 rounded-md" >
        {error && <div className='mt-4 bg-red-400 rounded-md px-4 py-2'>{error}</div>}
        <form onSubmit={handleClick} className="w-full flex flex-col items-center ">
          <div className="flex flex-col gap-4 py-16 text-black w-[80%]">
            <input onChange={(e) => setEmail(e.target.value)} className="border px-4 py-2" type="text" placeholder="Email" />
            <input onChange={(e) => setPassword(e.target.value)} className="border px-4 py-2" type="password" placeholder="Password" />
          </div>
          <div className="w-[80%]">
            <button className="border-2 px-3 py-2 rounded-md bg-blue-700 border-blue-700 hover:bg-white hover:text-blue-700 mb-4 w-full">Log in</button>
          </div>
          <div >
            <p>Don't have an account? <Link href='/signup' className="underline cursor-pointer">Sign up here</Link></p>
          </div>
        </form>
        <hr className="w-[80%] my-8"/>
        <div onClick={googleSignIn} className="cursor-pointer flex items-center justify-center border px-3 py-2 rounded-md bg-white text-black border-slate-900 hover:bg-gray-200 mb-4 w-[60%]">
          <FaGoogle size={20}/>&emsp;<span>Login with Google</span>
        </div>
      </div>      
    </div>
  );
}
