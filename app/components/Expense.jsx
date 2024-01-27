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
  const [category, setCategory] = useState('groceries')

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
          category: category,
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
      setItems(doc.data()?.items);  // reads items into array
      const totalPrice = doc.data()?.items.reduce(
        (sum, item) => sum + parseFloat(item.price), 0);
      setTotal(totalPrice); // calculate total price from the items
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
          <form onSubmit={handleClick} className='grid grid-cols-2 gap-8 items-center'>
            <div className='text-black'>
              <input value={item} onChange={(e) => setItem(e.target.value)} className='px-4 py-2' autoFocus type="text" placeholder='Enter item' />
            </div>
            <div className='text-black'>
              <input value={cost} onChange={(e) => setCost(e.target.value)} className='px-4 py-2 ' type="text" placeholder='Enter $' />
            </div>
            <div>
            <label className='text-lg'>Category: </label>
              <select 
                className='text-black' 
                onChange={(e) => setCategory(e.target.value)}>
                <option value={"groceries"} >Groceries</option>
                <option value={'clothes'} >Clothes</option>
                <option value={'utilities'} >Utilities</option>
                <option value={'entertainment'} >Entertainment</option>
                <option value={'other'}>Other</option>
              </select>
            </div>
            <button className='border border-slate-900 bg-slate-900 px-2 py-2 hover:bg-slate-800 rounded-md'>Add item</button>
          </form>
        </div>

        {items?.map((currItem, index) => (
         
          <div key={index} className={currItem.category === 'groceries' ? "flex justify-between items-center w-[90%] bg-green-700 px-8 py-2 my-2 rounded-md"
                : currItem.category === 'clothes' ? 'flex justify-between items-center w-[90%] bg-purple-700 px-8 py-2 my-2 rounded-md'
                : currItem.category === 'utilities' ? 'flex justify-between items-center w-[90%] bg-blue-700 px-8 py-2 my-2 rounded-md'
                : currItem.category === 'entertainment' ? 'flex justify-between items-center w-[90%] bg-red-700 px-8 py-2 my-2 rounded-md'
                : 'flex justify-between items-center w-[90%] bg-yellow-700 px-8 py-2 my-2 rounded-md'}>
            <div className='grid grid-cols-3 w-full'>
              <div className='capitalize font-semibold'>{currItem.name} </div> 
              <div className='capitalize text-sm'>({currItem.category})</div>
              <div className='font-semibold'>${currItem.price}</div>
            </div >
            <RiCloseCircleLine size={20} onClick={() => deleteItem(index)} className='cursor-pointer' />
          </div>
  
        ))}
        <div className='w-[40%] flex justify-end px-8 py-2 my-2'>
            <div>Total Cost:&emsp;${total}</div>
        </div>

      </div>
    </div>
  )
}

export default Expense