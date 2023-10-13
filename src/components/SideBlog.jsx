import React from 'react'
import data from '../data.json'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Link } from 'react-router-dom'


const SideBlog = () => {
    const db = useSelector((state)=>state.db.value)
  return (
    <div className='h-[80vh] flex gap-1 flex-col '>
      {db.slice(1, 4).map((post, index)=>{
        return <div className='h-full'  key={index}>
          <Link to={`/post/${post.id}`}>
            <div className='bg-cover bg-center object-contain w-full h-full mb-5 border flex items-end' style={{backgroundImage: `url(${post.image})`, }}>
            
              <div className='bg-slate-700 bg-opacity-50 w-full p-3'>
                  <span className='px-3 py-1 bg-red-500 text-white text-sm'>{post.category}</span>
                  <p className='text-ll font-bold text-white mt-4'>{post.title}</p>
                  <p className='text-xs text-white'>Posted: {post.date}</p>
                  {post.wasUpdated ? <p className='text-xs text-white'>Updated: {post.update}</p> : null}
              </div>
            </div>
          </Link>
        </div>
      })}
    </div>
  )
}

export default SideBlog
