import React from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../Components/user/Home/Navbar'

function AppLayout() {
  return (
    <>
      <div className='min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white'>
        <Navbar/>
      <Outlet/>
      </div>
    </>
  )
}

export default AppLayout