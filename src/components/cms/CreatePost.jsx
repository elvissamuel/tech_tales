import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { useSelector, useDispatch } from 'react-redux';
import {add} from '../../features/db'
import { useNavigate } from 'react-router-dom';
import { myStore, auth } from '../../firebase-config';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore'
import Axios from 'axios'
import EditPost from './EditPost';

const CreatePost = () => {

    const db = useSelector((state) => state.db.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const storeCollection = collection(myStore, 'blogpost')

    const [title, setTitle] = useState()
    const [author, setAuthor] = useState()
    const [content, setContent] = useState()
    const [category, setCategory] = useState()
    const [image, setImage] = useState()
    const [imageURL, setImageUrl] = useState()
    const [postDate, setPostDate] = useState(new Date())

    const handleSubmit = ()=>{
        const newDB = [{title, category, author, date: postDate.toLocaleString(), image, content }, ...db]
        dispatch(add(newDB))
        console.log('mydb: ', db)
        setTitle('')
        setAuthor('')
        setCategory('')
        setContent('')
        navigate('/admin')
    }

    const handleDeletePost = async (id)=>{
      const file = doc(myStore, 'blogpost', id)
      await deleteDoc(file)
    }

    const updateStore = async ()=>{
      await addDoc(storeCollection, {
        author: author,
        category: category,
        content: content,
        date: postDate.toLocaleString(),
        image: imageURL,
        title: title,
        wasUpdated: false,
        userId: auth?.currentUser?.uid,
      })
      navigate('/admin')
    }

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



  return (
    <div className='my-4'>
      <div className='flex flex-col gap-4 text-black'>
        <div className='md:flex gap-6 items-center'>
            <div className='w-[80%]'>
                <label htmlFor="title">Title: <input className='border outline-none px-2 w-[100%] py-2' value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" id="title" /></label>
            </div>
            <div className='w-[80%] mt-4 md:mt-0'>
                <label htmlFor="author"> Author: <input className='border outline-none px-2 w-[100%] py-2' value={author} onChange={(e)=>setAuthor(e.target.value)} type="text" name='author' id='author' /> </label>
            </div>
        </div>
    
        <div className='md:flex gap-6 items-center'>
            <div className='w-[80%]'>
                <label htmlFor="category"> Category: {' '}
                     <select className='border outline-none px-2 py-2 w-[100%]' value={category} onInput={(e)=>setCategory(e.target.value)} name="category" id="category">
                        <option value="">Select category</option>
                        <option value="Technology">Technology</option>
                        <option value="Sports">Sports</option>
                        <option value="Food">Food</option>
                        <option value="Fashion">Fashion</option>
                    </select>
                </label>
            </div>
            <div className='w-4/5 mt-4 md:mt-0'>
                <label htmlFor="image"> Image: <input className=' outline-none px-2 w-full' onChange={(e)=>{handleImage(e.target.files)}} type="file" name="image" id="image" /></label>
            </div>
        </div>
        <div><label htmlFor="content"> Content: <ReactQuill
                theme="snow" // You can choose other themes as well
                value={content}
                onChange={(e)=>setContent(e)}
                style={{height:'200px', marginBottom: '20px'}}
                  /></label></div>
        <button className='py-1.5 px-3 bg-green-700 text-white mt-10 md:mt-4' onClick={()=>updateStore()}>Submit</button>
        <button className='py-1.5 px-3 bg-transparent text-black border border-green-700 mb-4' onClick={()=>navigate('/admin')}>Cancel</button>
      </div>
    </div>
  )
}

export default CreatePost
