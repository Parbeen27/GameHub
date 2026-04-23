
import { CircleUserRound, LogOut, Logs, Moon, Sun, X} from 'lucide-react'

import { Link, Navigate } from 'react-router-dom'
import SearchToggle from './SearchToggle'
import { useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../Context/AuthContext'


function Navbar() {
  const [ isOpen, setisOpen] = useState(false)
  const { setUser,dark,setDark } = useAuth()
  

  const toggle = () => {
    setDark(!dark)
    localStorage.setItem("dark",dark)
  }

  const menuClose = useRef(null)
  useEffect(()=>{

    function handleOutsideClick(event){
        if(menuClose.current && !menuClose.current.contains(event.target)){
            setisOpen(false)
        }
    }
    document.addEventListener("mousedown",handleOutsideClick)
    return () => {
        document.removeEventListener("mousedown",handleOutsideClick)
    }
  },[menuClose])
  return (
    <nav className='fixed top-0 left-0 w-full z-50  '>
      <div className={dark ? "dark" : ""}>
      <div className=' flex items-center justify-between bg-gray-400 dark:bg-gray-700 text-black dark:text-white p-4 w-full  ' >
        <div className='relative' ref={menuClose}>
          <button className='md:hidden' onClick={() => {
            setisOpen(!isOpen)
          }}>{isOpen?<X/>:<Logs/>}</button>
        {isOpen && (
          <div className='bg-gray-400 dark:bg-gray-700 p-4 mt-4  absolute top-full left-0  z-100 -ml-4 '>
            <div className='flex flex-col gap-6 font-semibold md:hidden'>
          <Link to='/' onClick={() => setisOpen(false)}>Home</Link>
          <Link to='/leaderboard' onClick={() => setisOpen(false)}>Leaderboard</Link>
          <Link to='/user/profilestats' onClick={() => setisOpen(false)}>Stats</Link>
          <Link to='/about' onClick={() => setisOpen(false)}>About</Link>
          <Link to='/user/profile' onClick={() => setisOpen(false)}><CircleUserRound/></Link>
          <button onClick={() => {
            localStorage.removeItem("accessToken")
            setUser(null)
            Navigate("/login")
          }} className='cursor-pointer'><LogOut className=' hover:bg-amber-500 rounded-2xl w-5'/></button>
            </div>
          </div>
        )}
        </div>

        <div className='flex text-xl font-bold gap-2'>
            <Link to='/'>GameHub</Link>
        </div>



        <div className='flex  gap-3 '>
          <SearchToggle/>

          <button onClick={toggle}>{dark ?  <Sun/>:<Moon/> }</button>
          <div className='hidden md:flex gap-6 font-semibold'>

          <Link to='/'>Home</Link>
          <Link to='/leaderboard'>LeaderBoard</Link>
          <Link to='/about'>About</Link>
          <Link to='/user/profile'><CircleUserRound/></Link>
          <button onClick={() => {
            localStorage.removeItem("accessToken")
            setUser(null)
            Navigate("/login")
          }} className='cursor-pointer'><LogOut className=' hover:bg-amber-500 rounded-2xl w-5'/></button>
          </div>

        </div>


    </div>
    </div>
    </nav>

  )
}

export default Navbar