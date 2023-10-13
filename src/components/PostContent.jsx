import React from 'react'
import { FaCalendarAlt, FaUserAlt } from 'react-icons/fa'

const PostContent = ({post}) => {
  return (
    <div className='mx-auto mb-12 px-2'>
      <div>
        <div className='h-[400px] md:h-[600px] w-full'>
            <img src={post.image} className='h-full w-full object-cover '  alt="" />
        </div>
        <p className='text-3xl font-extrabold my-3'> {post.title} </p>

        <div className='font-bold flex flex-col gap-2'>
            <div className="flex items-center gap-1">
              <FaCalendarAlt />
              <p>{post.date}</p>
            </div>
            <div className="flex items-center gap-1">
              <FaUserAlt />
              <p>{post.author}</p>
            </div>
        </div>
      </div>
      <div className='mt-4'>
        <p dangerouslySetInnerHTML={{ __html: post.content }} className='text-black text-base inline' />
      </div>
    </div>
  )
}

export default PostContent
