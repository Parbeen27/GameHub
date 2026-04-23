import React from 'react'
import { Link } from 'react-router-dom'
import Blastoise from '../../assets/SignUpImage.png'
import { useState } from 'react'
import { motion } from 'motion/react'
import { Bounce, toast } from 'react-toastify'
import axios from 'axios'
import {api} from "../../services/api"
function SignUp() {
    const [form, setform] = useState({
        username: '',
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await api.post(
                "/api/auth/register",
                form
            )
            
            toast.success("User Registered",{
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
                transition: Bounce
            })
            
        } catch (err) {
            console.error(err.response?.data || err.message);
            toast.error(err.response?.data.message || err.message,{
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
                transition: Bounce
            })
            
        }
        
    }
  return (
    <div className='relative grid grid-rows-1 md:grid-cols-2  md:mt-0 place-items-center h-full md:h-screen overflow-hidden'>
        <motion.div 
        initial={{
          x:"0",
          scale: 0.5,
          opacity: 0
        }}
        animate={{
          x: 0,
          scale: 1.5,
          opacity: [0,0.5,1]
        }}
        transition={{
          duration: 2,
         
          times: [0,0.5,1]
        }}
        className='absolute md:relative left-0 top-0 w-full  flex justify-center mt-20 md:mt-10'>
            <img src={Blastoise} alt='not'
             className='h-50 md:h-full'/>
        </motion.div>
        <div className='relative z-10 place-items-center mt-50 md:mt-0'>

            <h1 className='font-bold text-2xl'>SignUp</h1>

            <form className='mt-2 flex flex-col ' onSubmit={handleSubmit}>
                <input name="username" type='text' placeholder=' Name...' required   onChange={handleChange}  className='border-2 rounded-2xl p-2'/>
                <input name="email" type='email' placeholder=' Email...' required onChange={handleChange} className='border-2 rounded-2xl p-2 mt-4'/>
                <input name="password" type='password' placeholder=' Password...' required onChange={handleChange} className='border-2 rounded-2xl p-2 mt-4'/>
                <p className='text-sm mt-2'>By signing you are agreeing to <a href='' className='text-blue-500'>Terms and Conditions</a></p>
                <button type='submit' className='bg-blue-600 p-2 mt-2 rounded-2xl cursor-pointer active:scale-95'>Create Account</button>
                <p className='mt-2 ms-10'>Already have an account <Link to={"/Login"} className='text-blue-500'>Login</Link></p>
            </form>

        </div>
    </div>
  )
}

export default SignUp
