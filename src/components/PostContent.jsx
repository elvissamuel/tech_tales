import React from 'react'

const PostContent = ({post}) => {
  return (
    <div className='mx-auto mb-12 px-2'>
      <div>
        <div className='h-[400px] w-full'>
            <img src={post.image} className='h-full w-full object-cover '  alt="" />
        </div>
        <p className='text-3xl font-extrabold my-3'> {post.title} </p>

        <div className='font-bold'>
            <p>Posted: {post.date}</p>
            <p>By: {post.author}</p>
        </div>
      </div>
      <div className='mt-4'>
        <p dangerouslySetInnerHTML={{ __html: post.content }} className='text-black text-base inline' />
      </div>
    </div>
  )
}

export default PostContent
