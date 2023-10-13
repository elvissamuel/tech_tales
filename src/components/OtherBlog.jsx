import React, { useState } from 'react'
import data from '../data.json'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'
import { FaCalendar, FaReact, FaUser } from 'react-icons/fa';


const OtherBlog = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(5)

  

  const db = useSelector((state)=> state.db.value)
  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPosts = db.slice(firstPostIndex, lastPostIndex)
    
  return (
    <div className=' w-[100%] md:w-full'>
      {currentPosts.length > 0 && <h2 className='text-xl md:text-3xl font-extrabold mt-10'>Other Blog Posts</h2>}

      {currentPosts.map((post, index) => (
        <div key={index}>
            <Link to={`/post/${post.id}`}>
              <div className='md:flex md:mb-0  my-5 bg-slate-50 cursor-pointer mb-12'>
                  <div className='bg-cover bg-center object-contain relative mx-auto w-[100%] md:w-[370px] h-[230px] flex items-end' style={{backgroundImage: `url(${post.image})`, }}>
                      <div className='bg-slate-700 w-full p-4 py-8 bg-opacity-50'>
                        <span className='px-3 py-1 bg-red-500 text-white text-sm'>{post.category}</span>
                        
                      </div>
                  </div>
                  <div className='w-full md:w-[70%] pt-5 mx-auto px-4'>
                      <p className='font-extrabold text-lg md:text-2xl mb-2'>{post.title}</p>
                      <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 180) }} className='text-black text-base inline' />

                      <div className='mt-8 text-sm font-semibold'>
                        <div className='flex items-center gap-1'>
                        <FaUser /> 
                          <p>{post.author}</p>
                        </div>

                        <div className='flex items-center gap-1'>
                          <FaCalendar />
                          <p>{post.date}</p>
                        </div>
                        {post.wasUpdated ? <p className='text-black text-sm'>Updated: {post.update}</p> : null }
                      </div>
                  </div>
              </div>
            </Link>
        </div>
      ))}
      <Pagination totalPosts={db.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  )
}

export default OtherBlog
