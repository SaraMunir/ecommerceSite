import React, { Fragment, useContext, useEffect } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import AdminProdForm from './AdminProdForm';
import { useGetProductDetailsByIdQuery, useGetProductListByStoreIdQuery } from '../../../hooks/newProductHooks';
import { Store } from '../../../Store';
import { NewProduct } from '../../../types/NewProduct';
import AdminProductDispPage from './AdminProductDispPage';

function AdminProductManagePage() {
    let { action } = useParams();    
    const [productDetail, setProductDetail] = React.useState<NewProduct | null>({} as NewProduct);

    const {state:{ storeInfo } } = useContext(Store)
    const [searchParams] = useSearchParams();
    const prodId = searchParams.get('prdId');
    
    // const { data: NewProduct, isLoading, error,refetch }=useGetProductDetailsByIdQuery(prodId!)
    // useEffect(() => {
    //     if (isLoading) {
    //         console.log('Loading product details...');
    //     } else if (error) {
    //         console.error('Error fetching product details:', error);
    //     } else {
    //         console.log('Product details fetched successfully:', NewProduct);
    //         if (NewProduct) {
    //             // Map Product to NewProduct type
    //             const mappedProduct: NewProduct = {
    //                 ...NewProduct,
    //                 slug: NewProduct.slug ?? '',
    //                 type: NewProduct.type ?? '',
    //                 sku: NewProduct.sku ?? '',
    //                 categories: NewProduct.categories ?? [],
    //                 pricing: NewProduct.pricing ?? {},
    //                 description: NewProduct.description as unknown as NewProduct['description'], // Ensure correct type
    //                 inventory: typeof NewProduct.inventory === 'object'
    //                     ? NewProduct.inventory
    //                     : {
    //                         track_inventory: false,
    //                         stock_quantity: typeof NewProduct.inventory === 'number' ? NewProduct.inventory : 0,
    //                         allow_backorder: false,
    //                         warehouse_location: ''
    //                     }
    //             };
    //             setProductDetail(mappedProduct);
    //         }
    //     }
    // }, [NewProduct])

  return (
    <div>
        <div className="">
            {/* {
                NewProduct ?
                <div>{NewProduct.name}</div>
                : <p>No product details available</p>
            } */}
                { action === 'add' && <p>Add a new product</p> }
                { action === 'edit' && <p>Edit an existing product</p> }
                {
                    action === 'add' ?
                    <Fragment>
                        <h3>Add New Product</h3>
                        <AdminProdForm action={{ action }} product={{}} storeInfo={storeInfo}/>
                    </Fragment>
                    :
                    <AdminProductDispPage action={{ action }} prodId={prodId!} storeInfo={storeInfo}/>

                    // <AdminProdForm action={{ action }} productId={prodId!} storeInfo={storeInfo?.storeId!}/>
                }
        </div>
    </div>
  )
}

export default AdminProductManagePage