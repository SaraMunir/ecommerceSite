import React, { useContext, useEffect } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, useLocation, useNavigate } from 'react-router-dom'
import AdminProductPage from './AdminProductListPage'
import { Store } from '../../Store'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/Admin' element={<AdminPage />}>
            <Route path='/Admin/Products' element={<AdminProductPage />} />
        </Route>
    )
  )
function AdminPage() {
    const navigate = useNavigate()
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/Admin'
    const { state, dispatch } = useContext(Store)
    const { userAdminInfo } = state

    // useEffect(()=>{
    // if(!userAdminInfo){
    //     navigate('/Admin/signin')
    // }
    // }, [navigate, redirect, userAdminInfo])

    return (
        <div>
            Admin
        </div>
    )
}

export default AdminPage