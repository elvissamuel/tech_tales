import React from 'react'

const Pagination = ({totalPosts, postPerPage, setCurrentPage, currentPage}) => {
    let pages = []

    for(let i = 1; i <= Math.ceil(totalPosts/postPerPage); i++){
        pages.push(i)
    }
  return (
    <div>
      {pages.map((post, index) => {
        return <button className={`border px-3 py-1 mr-3 my-4 shadow ${post === currentPage ? 'bg-teal-700 text-white' : ''}`} key={index} onClick={()=>setCurrentPage(post)}> {post}</button>
      })}
    </div>
  )
}

export default Pagination
