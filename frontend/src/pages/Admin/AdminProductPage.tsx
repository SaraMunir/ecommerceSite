// import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import AdminProductCreatePage from './AdminProductCreatePage';

import AdminProductEditPage from './AdminProductEditPage';

function AdminProductPage() {
    let { action } = useParams();
return(
    action =="Create" ?
    <AdminProductCreatePage />
    :
    <AdminProductEditPage />
    )
}

export default AdminProductPage