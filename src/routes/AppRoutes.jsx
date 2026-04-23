import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

import RoleGuard from './RoleGuard'
import { routes } from './routeConfig'
import { layoutMap } from '../layouts/LayoutMap'

export default function AppRoutes() {
    
  return (
    <Routes>
        {routes.map((route, index) => {
            if(route.public){
                return (
                    <Route key={index} path={route.path} element={<route.element/>}/>
                )
            }

            return (
                <Route key={index} element={<RoleGuard allowedRoles={route.roles} />}>
                    <Route element={layoutMap[route.layout] || <Outlet/>}>
                    <Route path={route.path} element={<route.element/>} />
                    </Route>
                </Route>
            )
        })}
    </Routes>
  )
}
