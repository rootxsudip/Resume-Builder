import React from 'react'
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom';
import {Admin,ManageTemplate,Users} from "../pages/Admin/index"
import Layout from '../pages/Admin/components/Layout'
export default function AdminLayout() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout/>}>
                <Route path='' element={<Admin/>}/>
                <Route path='templates' element={<ManageTemplate/>}/>
                <Route path='users' element={<Users/>}/>
            </Route>
        ))
  return (
    <RouterProvider router={router}/>
  )
}
