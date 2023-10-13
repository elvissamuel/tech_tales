import React from 'react'
import data from '../data.json'
import HeroBlog from './HeroBlog'
import SideBlog from './SideBlog'
import OtherBlog from './OtherBlog'
import { useSelector } from 'react-redux'
import Footer from './Footer'


const DisplayBlog = () => {
  const db = useSelector((state)=>state.db.value)
  return (
    <div className=''>
              {db.length == 0 ? <p className='text-center mt-10 text-2xl font-semibold'>Loading....</p> : null}

        <div className='md:flex gap-4 '>
            <div className='w-full h-full'>
              <HeroBlog />
            </div>
            <div className='md:w-1/2 h-full'>
              <SideBlog />
            </div>
        </div>
        <div className='mb-12'>
            <OtherBlog />
        </div>
    </div>
  )
}

export default DisplayBlog
