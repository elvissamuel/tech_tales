import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import {auth} from '../firebase-config'
import { currentUser } from '../features/user';


const Nav = () => {
    const user = useSelector((state)=>state.user.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = async (e)=>{
        e.preventDefault()
        try{
            await signOut(auth)
            dispatch(currentUser(''))
            navigate('/')

        } catch (err){
            if (err){
                // setLoginError(true)
                console.log(err)
            }
        }
    }
  return (
    <div className=''>
      <div>
        <ul className="flex justify-between py-4 px-6 border mb-2 bg-blue-950 text-white">
            <div className="flex gap-10">
                <Link to={'/'}>
                    <li>Home</li>
                </Link>
                <li>Category</li>
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
