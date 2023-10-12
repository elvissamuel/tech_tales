import React, { useState } from 'react'
import data from '../data.json'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'


const OtherBlog = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(2)

  

  const db = useSelector((state)=> state.db.value)
  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPosts = db.slice(firstPostIndex, lastPostIndex)
    
  return (
    <div className=' w-[90%] md:w-full'>
      <h2 className='text-xl font-bold mt-6'>Other Blog Posts</h2>

      {currentPosts.map((post, index) => (
        <div key={index}>
            <Link to={`/post/${post.id}`}>
              <div className='md:flex md:mb-0 gap-3 items-center my-3 bg-slate-50 cursor-pointer mb-12'>
                  <div className='relative mx-auto w-[100%] md:w-[300px] h-[150px]'>
                      <span className='px-4 py-2 bg-red-500 text-white text-sm absolute bottom-10 left-2'>{post.category}</span>
                      <p className='text-white text-xs absolute bottom-6 left-2'>Posted: {post.date}</p>
                      {post.wasUpdated ? <p className='text-white text-xs absolute bottom-2 left-2'>Updated: {post.update}</p> : null }
                      <img className='w-full h-full object-cover' src={post.image} alt="blog_img" />
                  </div>
                  <div className='w-full md:w-[70%] mx-auto'>
                      <p className='font-bold text-lg mb-2'>{post.title}</p>
                      <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 180) }} className='text-black text-sm inline' />
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
