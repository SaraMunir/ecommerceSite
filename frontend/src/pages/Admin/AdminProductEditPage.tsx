// import React from 'react'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import ProductForm from '../../components/ProductForm'
import { useGetProductDetailsByIdQuery } from '../../hooks/productHooks'
import { useParams } from 'react-router-dom'

function AdminProductEditPage() {
    let { action } = useParams();

    const { data: product, isLoading, error,refetch }=useGetProductDetailsByIdQuery(action!)
    return isLoading ? (
        <LoadingBox /> )
        : 
        error ? (
            <MessageBox variant='danger'> Product Not Found</MessageBox>
        ) 
        :
        (
            <div>
                {
                    product ?
                    <ProductForm product={product} action={action} refetch={refetch} />
                    : null
                }
            </div>
            // <ProductForm product:{product} />
    )
}

export default AdminProductEditPage