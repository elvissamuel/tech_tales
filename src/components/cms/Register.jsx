import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {auth} from '../../firebase-config'
import { createUserWithEmailAndPassword, } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { currentUser } from '../../features/user';


const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loginError, setLoginError] = useState(false)
    const [passwordMismatch, setPasswordMismatch] = useState(false)
    const dispatch = useDispatch()


    const navigate = useNavigate()

    const handleRegister = async (e)=>{
        e.preventDefault()
        if (confirmPassword !== password){
            return setPasswordMismatch(true)
        }
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            dispatch(currentUser(auth.currentUser.email))
            navigate('/')

        } catch (err){
            if (err){
                setLoginError(true)
                console.log(err)
            }
        }
    }


  return (
    <div>
      <form action="" className=' flex flex-col gap-3 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto px-3 md:px-10 py-12 border my-6'>
      <h2 className='text-2xl font-bold text-center'>Register</h2>
      <p className='mb-4'>Do you already have an account? <Link className='text-blue-600 curs\' to={'/login'}>Login here</Link></p>
      {loginError ? <p className='text-sm text-red-500'>Login was unsuccessful, please try again</p> : null}

        <label htmlFor="email">
            Email: 
            <input className='border block outline-none py-1.5 w-full px-3' onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name="email" id="email" />
        </label>
        <label htmlFor="password">
            Password: 
            <input className='border block outline-none py-1.5 w-full px-3' onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="password" id="password" />
        </label>
        <label htmlFor="password">
            Confirm Password: 
            <input className='border block outline-none py-1.5 w-full px-3' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} type="password" name="password" id="password" />
            {passwordMismatch ? <p className='text-red-500 text-sm'>Password does not match</p> : null}
        </label>

        <button className='border mt-4 py-2.5 bg-teal-700 text-sm font-bold text-white'onClick={(e)=>handleRegister(e)}>Register</button>

      </form>
    </div>
  )
}

export default Register
