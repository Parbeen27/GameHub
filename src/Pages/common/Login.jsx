
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"
import { Bounce, toast } from "react-toastify"
import { motion } from "motion/react"
import api from "../../services/api"


function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [form,setform] = useState({
    // username:'',
    // email:'',
    identifier : "",
    password:''
  })  
  const handleChange = (e) => {
    setform({...form,[e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await api.post(
        "/api/auth/login",form,{
          withCredentials: true
        }
      )
        setUser({
          role: res.data.role,
          email: res.data.email,
          id: res.data.id
        })
      localStorage.setItem("accessToken",res.data.accessToken)
      localStorage.setItem("role", res.data.role);
      
  
      const role = res.data.role
      
      if(role === "admin") navigate("/admin/dashboard")
      else if(role === "analyst") navigate("/analyst/dashboard")
      else navigate("/")

      toast.success("LoggedIn Successfully",{
        position: "top-right",
        autoClose: 500,
        theme: "colored",
        transition: Bounce
      })
    } catch (err) {
      console.error(err.response?.data.message || err.message);
      toast.error(err.response?.data.message || err.message,{
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        transition: Bounce
      })
    }
  }


  return (
    <div className="realtive grid grid-rows-1 md:grid-cols-2  md:mt-0 place-items-center h-full md:h-screen overflow-hidden">

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

        className='absolute md:relative left-0 top-0 w-full  flex justify-center mt-20 md:mt-0'>
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/22a4cfd7-42eb-49ab-939a-0314c4777e33/dg43mzo-a17eee10-0e90-4b4a-b309-e56d9491f5ba.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi8yMmE0Y2ZkNy00MmViLTQ5YWItOTM5YS0wMzE0YzQ3NzdlMzMvZGc0M216by1hMTdlZWUxMC0wZTkwLTRiNGEtYjMwOS1lNTZkOTQ5MWY1YmEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Z4T1dt_EBNwFNlsddQoI1AZTA6j19AIpIAxLe2ybgbE" alt=""
        className="h-50 md:h-full"/>
      </motion.div>

        <div className='relative z-10 place-items-center mt-50 md:mt-0'>

      <h1 className="font-bold text-2xl mb-2">Sign In</h1>

        <form className="flex flex-col md:w-100" onSubmit={handleSubmit}>

          <input name="identifier" type="text" placeholder=" Username or Email..."   
           onChange={handleChange}  autoFocus required  className="border-2 rounded-2xl p-2"/>

          <input name="password" type="password" placeholder="Password..."
           onChange={handleChange} required className="border-2 rounded-2xl mt-5 p-2"/>

          <Link to={""} className="text-blue-900 ms-40 mt-1 text-sm">Forgot Password</Link>

          <button type="submit" className="bg-blue-600 mt-2 p-2 rounded-2xl cursor-pointer active:scale-95 font-bold text-xl">LogIn</button>

          <p className="ms-25 text-sm md:ml-40 md:mt-10">Login by</p>

          <div className="flex justify-around ">
            <a href=""><img src="https://www.pngall.com/wp-content/uploads/13/Google-Logo-PNG-Images.png" className="h-8 md:h-10"/></a>

            <a href=""><img src="https://static.vecteezy.com/system/resources/thumbnails/023/986/516/small/facebook-logo-facebook-logo-transparent-facebook-icon-transparent-free-free-png.png" className="h-8 md:h-10"/></a>
          </div>

          <p className="mt-2 text-sm ml-8 md:ml-30 md:mt-5">Don`t have an account <Link to={"/signup"} className="text-blue-900">Sign Up</Link></p>

        </form>

      </div>

    </div>
  )
}


export default Login
