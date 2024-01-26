'use client'
import React, { useEffect, useState } from 'react'
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from '../firebase'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const [user, setUser] = useState('')
    const[error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser.email)
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
        <div className='h-[80px] absolute top-0 left-0 w-full'>
            <div className='flex justify-between items-center p-4'>
                <div >
                    <p className='text-lg'>Welcome, {user}</p>
                    <button onClick={handleClick} className='border px-2 py-1 rounded-md bg-slate-800 border-slate-800 hover:bg-slate-900 mb-8 '>Log out</button>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Navbar