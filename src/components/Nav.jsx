import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import {auth} from '../firebase-config'
import { currentUser } from '../features/user';
import Swal from 'sweetalert2';


const Nav = () => {
    const user = useSelector((state)=>state.user.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = async (e)=>{
        e.preventDefault()
        try{
            await signOut(auth)
            dispatch(currentUser(''))
            Swal.fire('You logged out successfully!')
            navigate('/')

        } catch (err){
            if (err){
                Swal.fire('Error in logging out!')
            }
        }
    }
  return (
    <div className=''>
      <div>
        <ul className="flex items-center justify-between py-4 px-6 border mb-2 bg-blue-950 text-white">
            <div className="flex items-center gap-10">
                <Link to={'/'}>
                    <p className='font-barlow font-bold text-2xl'>Tech<span className='text-teal-500'>Tales </span></p>
                </Link>
                <Link className='hidden md:block ' to={'/'}>
                    <li>Home</li>
                </Link>
                <li  className='hidden md:block'>Category</li>
            </div>

            {user ? <div> <p>{user}</p>
                <Link className='border px-3 py-1 text-sm' to={'/admin'}> Admin</Link> <button className='border px-3 py-1 text-sm' onClick={(e)=>handleLogout(e)}>Logout</button>
            </div> : 
            <Link to={'/login'}>
                <li>Login</li>
            </Link>}
        </ul>
      </div>
    </div>
  )
}

export default Nav
