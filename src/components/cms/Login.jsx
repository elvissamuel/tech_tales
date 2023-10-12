import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {auth, googleProvider} from '../../firebase-config'
import googleIcon from '../../assets/googleIcon.png'
import { useDispatch } from 'react-redux';
import { currentUser } from '../../features/user';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const dispatch = useDispatch()


  const navigate = useNavigate()

  const handleLogin = async (e)=>{
    e.preventDefault()
    try{
        await signInWithEmailAndPassword(auth, email, password)
        dispatch(currentUser(auth.currentUser.email))
        navigate('/')

    } catch (err){
        if (err){
            setLoginError(true)
            console.log(err)
        }
    }
}

const googleSignin = async (e)=>{
  e.preventDefault()
  try{
      await signInWithPopup(auth, googleProvider)
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
      <h2 className='text-2xl font-bold text-center'>Login</h2>
      {loginError ? <p className='text-red-500 text-sm'>Login was unsuccessful, please try again!</p> : null}
      <p className='mb-4'>Don't have an account yet? <Link className='text-blue-600 cursor-pointer' to={'/register'}>Sign up</Link></p>

        <label htmlFor="email">
            Email: 
            <input className='border block outline-none py-1.5 w-full text-black px-3' onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name="email" id="email" />
        </label>
        <label htmlFor="password">
            Password: 
            <input className='border block outline-none text-black py-1.5 w-full px-3' onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="password" id="password" />
        </label>

        <button className='border mt-4 py-2.5 bg-teal-700 text-sm font-bold text-white' onClick={(e)=>handleLogin(e)}>Login</button>
        <button className='border border-teal-700 shadow-md relative mb-4 py-2.5 bg-transparent text-sm font-bold text-black' onClick={(e)=>googleSignin(e)}> <img src={googleIcon} className='absolute left-1/4' alt="" /> Sign in with Google</button>

      </form>
    </div>
  )
}

export default Login
