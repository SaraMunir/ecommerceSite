import React, { use, useEffect, useState } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useGetProductDetailsByIdQuery } from '../../hooks/newProductHooks';
import { NewProduct } from '../../types/NewProduct';

function StoreProductPage() {
    const [searchParams] = useSearchParams();
    const prodId = searchParams.get('productId');
    const viewType = searchParams.get('viewType');
    const { data: NewProduct, isLoading, error, refetch } = useGetProductDetailsByIdQuery(prodId!)
    const [product, setProduct] = useState({} as NewProduct);
    const exampleProduct: NewProduct = {
        "_id":"68807a6b0467dbc1ec533d8b",
        "name":"Classic T-Shirt",
        "slug":"classic-t-shirt",
        "description":{"short":"A SHort descrip","long":"long description"},"type":"physical","brand":"","vendor":"","sku":"classic_tshirt_123","storeId":"67e80a027a7496cefab3ca0a","barcode":"123643","categories":[],"collections":[],"tags":["testing","another one","lolol"],"media":{"main_image":{"url":"https://i.ibb.co/bjC6znSj/6ed7c98bd138.png","imageId":"688aeb2b1bbb9290aea19606"},
        "gallery":[{"url":"https://i.ibb.co/yFYVxp8Z/63d9e08773cd.jpg","imageId":"688bd55fd0abe4f51430966a","alt_text":""},{"url":"https://i.ibb.co/KxB8XYfW/2bafebed8ba9.png","imageId":"688bd56ad0abe4f5143096a8","alt_text":""}],"video":"","ar_model":"","alt_text":""},"pricing":{"price":24,"sale_price":16,"compare_at_price":45,"cost_per_item":10,"currency":"USD","taxable":true},"inventory":{"track_inventory":false,"stock_quantity":25,"allow_backorder":false,"warehouse_location":""},"createdAt":"2025-07-23T06:00:11.456Z","updatedAt":"2025-09-06T10:15:05.121Z","__v":0,"shipping":{"weight":0,"dimensions":{"length":0,"width":0,"height":0},"free_shipping":false,"shipping_class":"","fulfillment_method":"manual"},"product_id":"PROD-IWZPDEHT","publishing":{"status":"published","visibility":["public"],"publish_at":"2025-09-13T18:00:00.000Z","expire_policy":"onDate","expire_at":"2025-09-17T10:38:00.000Z"},"variantMap":{"isVariant":false,"variants":[],"variantOptions":[],"variantGroupBy":"","images":[]},"categoryList":["6871f8f96592d98b7ea85c07","686f3ae935a2ee994f2b0ccd"]
    };
    useEffect(() => {
        console.log("prodId:", prodId);
        console.log("NewProduct after refetch:", NewProduct);
        if(viewType === 'preview') {
            setProduct(exampleProduct);
        }else{
            if(prodId) {
                console.log("Fetching product details for ID:", prodId);
                // refetch();
                if(NewProduct) {
                    setProduct(NewProduct);
                    console.log("NewProduct", NewProduct);
                    // Update the document title using the browser API
                    // document.title = NewProduct.name + " - My Store";
                    // You can also update other meta tags or perform other side effects here
                    const metaDescription = document.createElement('meta');
                    metaDescription.name = "description";
                    metaDescription.content = NewProduct?.description?.short || '';
                    document.head.appendChild(metaDescription);
                }
            }
        }
    }, [prodId, NewProduct]);

    return (
        <main>
            <title>{product?.name} - My Store</title>
            <meta name="keywords" content={(product?.tags?.join(", ") || product?.name)} />
            {/* <meta name="description" content={product?.description?.short || ''} /> */}
            <div className='container my-3'>
                {
                    viewType === 'preview' ?
                    <h1>Preview - {product?.name}</h1>
                    :
                    isLoading ? 
                    (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error loading product.</div>
                    ) : product ? (
                        <div>
                            <h1>{product.name}</h1>
                            <p>{product.description?.short}</p>
                            {/* Add more product details as needed */}
                        </div>
                    ) : (
                        <div>Product not found.</div>
                    )
                }
            </div>
        </main>
    )
}

export default StoreProductPage