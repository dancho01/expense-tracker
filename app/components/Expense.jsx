import React, { useEffect, useState } from 'react'
import { onSnapshot, deleteDoc, doc, updateDoc, arrayUnion} from "firebase/firestore"; 
import { db, auth} from '../firebase';
import {onAuthStateChanged} from "firebase/auth";
import {RiCloseCircleLine} from 'react-icons/ri'


const Expense = () => {

  const [items, setItems] = useState([]);
  const [item, setItem] = useState('')
  const [cost, setCost] = useState('')
  const [total, setTotal] = useState(0)
  const [user, setUser] = useState('')

  const userEmail = doc(db, 'users',`${user?.email}`)

  console.log(items) // undefined
  console.log(user)

  // updates items to DB
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await updateDoc(userEmail, {
        items: arrayUnion({
          name: item,
          price: cost,
        })
      })
    } catch (error) {
      alert(error.message)
    }
    setItem('')
    setCost('')
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
    })
  }, [])

  // read data
  useEffect(() => {
    onSnapshot(userEmail, (doc) => {
      setItems(doc.data()?.items);
      const totalPrice = doc.data()?.items.reduce(
        (sum, item) => sum + parseFloat(item.price), 0);
      setTotal(totalPrice);
    });
  }, [user?.email])

  // delete from client side, and then pass in updated list
  const deleteItem = async (index) => {
    const result = items.filter((item, i) => i !== index)
    await updateDoc(userEmail, {
      items: result
    });
  }

  return (
    <div>
      <h1 className='text-4xl p-16 text-center font-semibold'>Expense Tracker</h1>
      <div className='w-[800px] flex flex-col items-center bg-slate-800 rounded-md'>
        <div className='p-8'>
          <form onSubmit={handleClick} className='flex gap-8'>
            <div className='text-black'>
              <input value={item} onChange={(e) => setItem(e.target.value)} className='px-4 py-2' type="text" placeholder='Enter item' />
            </div>
            <div className='text-black'>
              <input value={cost} onChange={(e) => setCost(e.target.value)} className='px-4 py-2 ' type="text" placeholder='Enter $' />
            </div>
            <button className='border border-slate-900 bg-slate-900 px-2 py-2 hover:bg-slate-800'>Add item</button>
          </form>
        </div>

        {items?.map((currItem, index) => (
          <div key={index} className='flex justify-between items-center w-[90%] bg-slate-900 px-8 py-2 my-2 rounded-md'>
            <div className='flex justify-between w-[90%] '>
              <div className='capitalize'>{currItem.name}</div>
              <div>${currItem.price}</div>
            </div >
            <RiCloseCircleLine size={20} onClick={() => deleteItem(index)} className='cursor-pointer' />
          </div>
        ))}
        <div className='w-[75%] flex justify-end px-8 py-2 my-2'>
            <div>Total Cost:&emsp;${total}</div>
        </div>

      </div>
    </div>
  )
}

export default Expense