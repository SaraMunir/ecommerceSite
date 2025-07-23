import React, { useContext, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useGetNewProductsQuery, useGetProductListByStoreIdQuery } from '../../hooks/newProductHooks'
import { NewProduct } from '../../types/NewProduct'
import { Store } from '../../Store'


function AdminNewProdListPage() {
    // const { data: newProducts, isLoading, error } = useGetNewProductsQuery()
    const [product, setProduct] = React.useState<NewProduct | null>(null)
    const [allProductList, setAllProductList] = React.useState<NewProduct[]>([])
    // const {state:{ storeInfo}, dispatch } = useContext(Store)
    // const { data: categories } =useGetCategoriesByStoreIdQuery(storeInfo?.storeId!)
    // const { data: newProducts,isLoading, error } = useGetProductListByStoreIdQuery(storeInfo?.storeNumber || "")

      const {state:{ storeInfo} } = useContext(Store)
    
        // const { data: stores }=useGetStoreDetailsByIdQuery(storeInfo?.storeId!)
    
        const { data: newProducts, isLoading, error } =useGetProductListByStoreIdQuery(storeInfo?.storeId!)

    useEffect(() => {
        if (newProducts) {
            setAllProductList(newProducts)
            console.log(newProducts);
            setProduct(newProducts[0] || {})
        }
    }, [newProducts])
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading products</div>

    // Render the list of new products
    if (!allProductList || allProductList.length === 0) {
        return <div>No new products available.</div>
    }
    return (
    <div>
        <h1>Admin New Product List Page</h1>
        <p>This page will display a list of new products for admin management.</p>
        {/* Future implementation will go here */}
        {/* For now, this is just a placeholder */}

        {/* ${storeInfo?.storeNumber} */}
        {isLoading ? <p>Loading products...</p> : null}
        {error ? <p>Error loading products</p> : null}
        <div className='d-flex justify-content-end align-items-center mb-3'>
            <a href={`/Admin/Store/${storeInfo?.storeNumber}/NewProducts/manageProduct/add`} className='btn btn-primary'>Add New Product</a>
        </div>
        
        <ListGroup as="ul" >
            <ListGroup.Item as="li" className='my-1 d-flex justify-content-between align-items-start text-capitalize list-group-item bg-primary-subtle'>
                <div className="col-4 d-flex justify-content-between align-items-center border-end border-2" >
                    <span className='d-flex justify-content-between align-items-center'>
                        <button className='btn btn-link'><i className="far fa-square"></i></button>
                        <strong>Name</strong> 
                    </span>
                    <button className='btn btn-link'><i className="fas fa-sort"></i>
                    </button>
                </div>
                <div className="ms-3 col d-flex justify-content-between align-items-center border-end border-2">
                    <strong>Price</strong> <button className='btn btn-link'><i className="fas fa-sort"></i></button>
                </div>
                <div className="ms-3 col d-flex justify-content-between align-items-center border-end border-2">
                    <strong>type</strong> <button className='btn btn-link'><i className="fas fa-sort"></i></button>
                </div>

                <div className="ms-3 col d-flex justify-content-between align-items-center border-end border-2">
                    <strong>Quantity</strong> <button className='btn btn-link'><i className="fas fa-sort"></i></button>
                </div>
                <div className="ms-3 col d-flex justify-content-between align-items-center border-end border-2">
                    <strong>brand</strong> <button className='btn btn-link'><i className="fas fa-sort"></i></button>
                </div>
                <div className="ms-3 col-1 d-flex justify-content-end align-items-center">
                    edit
                </div>
            </ListGroup.Item>
        </ListGroup>
        <ListGroup>
            {
                allProductList.length > 0 ? (
                    allProductList.map((product) => (
                        <ListGroup.Item as="li" key={product._id} className='my-1 d-flex flex-row justify-content-between align-items-center list-group-item'>
                            <div className="col-4 d-flex justify-content-start align-items-center">
                                <button className='btn btn-link'><i className="far fa-square"></i></button>{product.name}
                            </div>
                            <div className="ms-3 col d-flex justify-content-start align-items-center">
                                {product.pricing?.price ? `$${product.pricing.price.toFixed(2)}` : 'N/A'}
                            </div>
                            <div className="ms-3 col d-flex justify-content-start align-items-center">
                                {product.type}
                            </div>
                            <div className="ms-3 col d-flex justify-content-start align-items-center">
                                {product.inventory?.stock_quantity || 'N/A'}
                            </div>
                            <div className="ms-3 col d-flex justify-content-start align-items-center">
                                {product.brand}
                            </div>
                            <div className="ms-3 col-1 d-flex justify-content-end align-items-center">
                                <a href={`/Admin/Store/${storeInfo?.storeNumber}/NewProducts/manageProduct/edit?prdId=${product._id}`} className='btn btn-link'><i className="fas fa-pencil-alt"></i></a>
                            </div>
                        </ListGroup.Item>
                    ))
                ) : (
                    <p>No new products available.</p>
                )
            }
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
        </ListGroup>
        <div className="card my-2">
            <div className="card-body">
                {
                    product ? (
                        <div>
                <ListGroup.Item as="li" key={product._id}> 
                    <div key={product._id}>
                        <span>{product.name} id: {product._id}</span>
                        <ul>
                            <li>Description: 
                                <ul>
                                    <li>short: {product.description?.short}</li>
                                    <li>long: {product.description?.long}</li>
                                </ul>
                            </li>
                            <li>slug: {product.slug}</li>
                            <li>type: {product.type}</li>
                            <li>brand: {product.brand}</li>
                            <li>categories: {product.categories?.join(', ')}</li>
                            <li>Tags: {product.tags ? product.tags?.join(', ') : 'No tags'}</li>
                            <li>Media: 
                                <ul>
                                    {
                                        
                                        product.media  ?
                                            
                                            <li>
                                                <ul>
                                                    <li>main img: <br />
                                                    <img src={product.media.main_image} alt={product.media.alt_text || 'Product Image'} style={{ width: '100px', height: '100px' }} /></li>
                                                    <li>
                                                        gallery:
                                                        <ul className='row'>
                                                            {product.media.gallery && product.media.gallery.length > 0 ? (
                                                                product.media.gallery.map((image, index) => (
                                                                    <li className='col'  key={index}>
                                                                        <img src={image} alt={`Gallery Image ${index + 1}`} style={{ width: '50px', height: '50px' }} />
                                                                    </li>
                                                                ))
                                                            ) : (
                                                                <li>No gallery images available</li>
                                                            )}
                                                            {
                                                                product.media.video  && (
                                                                    <li>
                                                                        <iframe src={product.media.video} frameBorder="0"></iframe>
                                                                    </li>
                                                                )
                                                            }
                                                        </ul>
                                                    </li>
                                                </ul>
                                                
                                                <p>Main Image: {product.media.main_image}</p>
                                                <p>Gallery: {product.media.gallery.join(', ')}</p>
                                                {   product.media.video && 
                                                <p>Video: {product.media.video}</p>}
                                                {product.media.ar_model && <p>AR Model: {product.media.ar_model}</p>}

                                            </li> 
                                        : 
                                            <li>No media available</li>
                                        
                                    }
                                </ul>
                            </li>
                        </ul>
                        <p>Price: ${product?.pricing?.price}</p>
                        <p>Inventory: {product.inventory?.allow_backorder ? 'Available' : 'Not Available'}</p>
                        <p>Status: {product.status}</p>
                    </div>
                </ListGroup.Item>
                        </div>
                    )
                    :
                    (
                        <p>No new products available.</p>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default AdminNewProdListPage