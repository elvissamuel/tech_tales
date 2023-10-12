import React from 'react'
import data from '../data.json'
import HeroBlog from './HeroBlog'
import SideBlog from './SideBlog'
import OtherBlog from './OtherBlog'


const DisplayBlog = () => {
  return (
    <div className=''>
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
