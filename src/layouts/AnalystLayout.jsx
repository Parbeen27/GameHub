import React from 'react'

import { Outlet } from 'react-router-dom'
import AnalystDashboard from '../Pages/analyst/AnalystDashboard'
import AnalystSidebar from '../Components/analytics/AnalystSidebar'
import AnalystTopbar from '../Components/analytics/AnalystTopbar'

export default function ({children}) {
  return (
    <>
    
    <div className='flex'>
          <AnalystSidebar/>
        <div className='flex-1 bg-gray-100 min-h-screen'>
          <div className='md:hidden'>
            <AnalystTopbar/>
          </div>
        <Outlet/>
        </div>
        </div>
    </>
  )
}
