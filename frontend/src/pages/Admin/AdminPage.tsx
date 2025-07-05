import React, { useContext, useEffect } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, useLocation, useNavigate } from 'react-router-dom'
import AdminProductPage from './AdminProductListPage'
import { Store } from '../../Store'


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
           <h1>this page is base page and does not included store numbers</h1>
        </div>
    )
}

export default AdminPage