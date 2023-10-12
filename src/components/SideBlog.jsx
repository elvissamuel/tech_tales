import React from 'react'
import data from '../data.json'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Link } from 'react-router-dom'


const SideBlog = () => {
    const db = useSelector((state)=>state.db.value)
  return (
    <div>
      {db.slice(1, 3).map((post, index)=>{
        return <div key={index}>
          <Link to={`/post/${post.id}`}>
            <div className='bg-cover bg-center object-contain w-full h-[200px] mb-5 border flex items-end pb-1 pl-3' style={{backgroundImage: `url(${post.image})`, }}>
            
              <div className=''>
                  <span className='px-4 py-2 bg-red-500 text-white text-sm'>{post.category}</span>
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
