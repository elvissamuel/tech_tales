import React, { useEffect, useState } from 'react'
import data from '../data.json'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { myStore } from '../firebase-config'
import { getDocs, collection, addDoc } from 'firebase/firestore'
import DOMPurify from 'dompurify';
import { useDispatch } from 'react-redux'
import { add } from '../features/db'
import { Link } from 'react-router-dom'
import { FaCalendar, FaUser } from 'react-icons/fa'


const HeroBlog = () => {
  const dispatch = useDispatch()
  const storeCollection = collection(myStore, 'blogpost')

  const getStore = async ()=>{
    try{
    const data = await getDocs(storeCollection)
    const filteredData = data.docs.map((doc)=>({...doc.data(), id: doc.id}))
    dispatch(add(filteredData))
    } catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    getStore();
  }, [])

  const db = useSelector((state) => state.db.value)
  
  return (
    <div>
        {db?.length > 0 ? <div>
          <Link to={`/post/${db[0].id}`}>

          <div className='bg-cover bg-center object-contain w-full h-[80vh] flex items-end  cursor-pointer' style={{backgroundImage: `url(${db[0].image})`, }}>
            
              <div className='bg-slate-700 bg-opacity-50 p-7 pb-10 w-full'>
                  <span className='px-4 py-2 bg-red-500 text-white text-lg'>{db[0].category}</span>
                  <p className='text-2xl font-bold text-white mt-4'>{db[0]?.title}</p>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-1'>
                      <FaUser color='white' />
                      <p className='text-white text-sm '>{db[0].author}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <FaCalendar color='white' />
                      <span className='text-white text-sm '>Posted: {db[0].date} </span>
                    </div>
                    {db[0].wasUpdated ? <p className='text-white text-sm block'>Updated: {db[0].update}</p> : null}

                  </div>
              </div>

          </div>
          </Link>

        </div> : null}
    </div>
  )
}

export default HeroBlog
