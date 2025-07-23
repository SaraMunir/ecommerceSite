import React, { useEffect } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useGetProductDetailsByIdQuery } from '../../../hooks/newProductHooks';
import { Store } from '../../../Store';
import { NewProduct } from '../../../types/NewProduct';
import AdminProdForm from './AdminProdForm';


function AdminProductDispPage(props: any) {
    const [searchParams] = useSearchParams();
    const prodId = searchParams.get('prdId');
    const { data: NewProduct, isLoading, error,refetch }=useGetProductDetailsByIdQuery(prodId!)

    return (
        <div>
            <h3>Product Details</h3>
            <AdminProdForm action={ { ...props.action } } product={NewProduct} storeInfo={props.storeInfo?.storeId!}/>

        </div>
    )
}

export default AdminProductDispPage