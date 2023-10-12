import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import Axios from 'axios'
import { doc, updateDoc } from 'firebase/firestore';
import { myStore } from '../../firebase-config';
import { useSelector, useDispatch } from 'react-redux';
import { setWasUpdated } from '../../features/wasUpdated';
import Swal from 'sweetalert2';



const EditPost = ({post, getStore, setDisplayEdit}) => {
    const [title, setTitle] = useState(post.title)
    const [author, setAuthor] = useState(post.author)
    const [content, setContent] = useState(post.content)
    const [category, setCategory] = useState(post.category)
    const [image, setImage] = useState()
    const [imageURL, setImageUrl] = useState(post.image)
    const [postDate, setPostDate] = useState(new Date())

    const dispatch = useDispatch()

    const handleImage = (files)=>{
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "ewf7xmbi")
  
        Axios
        .post("https://api.cloudinary.com/v1_1/dws9ykgky/image/upload", formData)
        .then((response)=> {
          console.log(response.data.url)
          const postUrl = response.data.url
          setImageUrl(postUrl)
        })
      }
      const errorAlert = ()=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You can only delete and update posts you created!',
        })
      }

      const handleEditPost = async (id)=>{
        const file = doc(myStore, 'blogpost', id)
        try{
            await updateDoc(file, {
                author: author,
                category: category,
                content: content,
                update: postDate.toLocaleString(),
                image: imageURL,
                title: title,
                wasUpdated: true
            })
            getStore();
            setDisplayEdit('cancel')
        }catch(err){
            errorAlert()
        }
        
      }

  return (
    <div>
      <div className='flex flex-col gap-4 text-black mt-3'>
        <div className='md:flex gap-6 items-center'>
            <div className='w-[80%]'>
                <label htmlFor="title" className='font-semibold'>Title: <input className='border font-normal outline-none px-2 w-[100%] py-2' value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" id="title" /></label>
            </div>
            <div className='w-[80%] mt-4 md:mt-0'>
                <label htmlFor="author" className='font-semibold'> Author: <input className='border outline-none px-2 w-[100%] py-2' value={author} onChange={(e)=>setAuthor(e.target.value)} type="text" name='author' id='author' /> </label>
            </div>
        </div>
    
        <div className='md:flex gap-6 items-center'>
            <div className=' w-[80%]'>
                <label htmlFor="category"> Category: {' '}
                     <select className='border outline-none p-2 w-[100%]' value={category} onInput={(e)=>setCategory(e.target.value)} name="category" id="category">
                        <option value="">Select category</option>
                        <option value="Technology">Technology</option>
                        <option value="Sports">Sports</option>
                        <option value="Food">Food</option>
                        <option value="Fashion">Fashion</option>
                    </select>
                </label>
            </div>
            <div className='w-4/5 mt-4 md:mt-0'>
                <label htmlFor="image"> Image: <input className=' outline-none w-[100%] px-2' onChange={(e)=>{handleImage(e.target.files)}} type="file" name="image" id="image" /></label>
            </div>
        </div>
        <div><label htmlFor="content"> Content: <ReactQuill
                theme="snow" // You can choose other themes as well
                value={content}
                onChange={(e)=>setContent(e)}
                style={{height:'200px', marginBottom: '20px'}}
                  /></label></div>
        <button className='py-1.5 px-3 bg-green-700 text-white mt-12 my-4' onClick={()=>handleEditPost(post.id)}>Update</button>
        {/* <button className='py-1.5 px-3 bg-green-700 text-white my-4' onClick={handleImage()}>Upload Img</button> */}
      </div>
    </div>
  )
}

export default EditPost
