import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { myStore } from '../../firebase-config';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux';
import { add } from '../../features/db';
import EditPost from './EditPost';
import Swal from 'sweetalert2'


const Dashboard = () => {
  const [postStore, setPostStore] = useState()
  const [displayEdit, setDisplayEdit] = useState()
  const dispatch = useDispatch()

  const storeCollection = collection(myStore, 'blogpost')

    const getStore = async ()=>{
      try{
      const data = await getDocs(storeCollection)
      const filteredData = data.docs.map((doc)=>({...doc.data(), id: doc.id}))
      dispatch(add(filteredData))
      setPostStore(filteredData)
      } catch(err){
        console.error(err)
      }
    }

    const errorAlert = ()=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You can only delete and update posts you created!',
      })
    }

    const confirmDelete = (e)=>{
      Swal.fire({
        title: 'Do you want to delete this article?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          handleDeletePost(e)
          // Swal.fire('Deleted!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }

    const handleDeletePost = async (id)=>{
      const file = doc(myStore, 'blogpost', id)
      try{
        await deleteDoc(file)
        getStore();
      } catch(err){
        if(err){
          errorAlert()
        }
      }
      
    }
  
    useEffect(()=>{
      getStore();
    }, [])
  
    useEffect(() => {
      console.log('new db:', postStore);
    }, [postStore]);


  return (
    <div>
      <div className='my-10'>
        <div className='flex justify-end'>
            <Link to={'/newpost'}>
            <button className='py-1.5 px-3 mt-3 mb-4 border bg-green-700 text-white text-sm'>Create Post</button>
            </Link>
        </div>

        {postStore ? <div>
            {postStore.map((post, index)=>(
                <div key={index}>
                    <div className='flex justify-between px-1 md:px-6 border py-3'>
                        <p className='font-semibold text-sm md:text-base'>{post.title}</p>
                        
                        <div className='text-sm md:text-sm shrink-0'>
                            <button className='border py-1 px-3' onClick={()=>setDisplayEdit(index)}>Edit</button>
                            <button className='border py-1 px-3' onClick={()=>confirmDelete(post.id)}>Delete</button>
                            { displayEdit === index && <button className='border bg-red-600 text-white py-1 px-2 md:px-3' onClick={()=>setDisplayEdit('cancel')}>Cancel</button>}
                        </div>
                    </div>
                    { displayEdit === index ?  <EditPost post={post} getStore={getStore} setDisplayEdit={setDisplayEdit} /> : displayEdit === 'cancel' ? null : null}

                </div>
            ))}
        </div> : <p className='text-xl font-semibold m-auto text-center mt-8'>Loading....</p>}
      </div>
    </div>
  )
}

export default Dashboard
