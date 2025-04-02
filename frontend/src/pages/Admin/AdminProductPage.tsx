import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductDetailsByIdQuery } from '../../hooks/productHooks';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { Card, CardBody, Col, Form, Row } from 'react-bootstrap';
import ProductForm from '../../components/ProductForm';

function AdminProductPage() {
    let { action } = useParams();

    const { data: product, isLoading, error }=useGetProductDetailsByIdQuery(action!)
    //   useEffect(() => {
    //     if(product){
    //         setProductTitle(product.name)
    //         setProductDescription(product.description)
    //     }
  
    //   }, [product])
      
return(
    action =="Create" ?
    <ProductForm />
    :
        isLoading ? (
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
                    <ProductForm product={product} />
                    : null
                }
            </div>
            // <ProductForm product:{product} />
        )
        
        // (
        //     <section>
        //         <Form className='mx-auto'>
        //             <h3>Add Product</h3>
        //             <Card className='w-100 my-3'>
        //                 <CardBody className='p-4'>
        //                     <div className="justify-content-between align-items-center mb-2">
        //                         <h5>Product Details</h5>
        //                         <hr />
        //                         <ul className="p-0">
        //                             <li className="list-group-item store-name">
        //                                 <label htmlFor="productTitle" className="form-label text-capitalize fw-semibold">Title</label>

        //                                 <input type="text" 
        //                                 className="form-control" id="productTitle" value={productTitle} 
        //                                 onChange={e => setProductTitle(e.target.value)}/>
        //                             </li>
        //                             <li className="list-group-item store-name">
        //                                 <label htmlFor="productDescription" className="form-label text-capitalize fw-semibold">Description</label>
        //                                 <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={productDescription} 
        //                                 onChange={e => setProductDescription(e.target.value)}></textarea>
        //                             </li>
        //                         </ul> 
        //                         {/* {
        //                             editGeneral ?
        //                             <Button variant="primary"size="sm" onClick={()=>setEditGeneral(!editGeneral)}>Cancel</Button>

        //                             :
        //                             <Button variant="primary"size="sm" onClick={()=>setEditGeneral(!editGeneral)}>edit</Button>
        //                         } */}
        //                     </div>
        //                 </CardBody>
        //             </Card>
        //         </Form>
        //     {
        //         product ? 
        //         <Row>
        //             <Col md={6}>
        //                 <img src={product.image} alt=""  className='w-100'/>
        //             </Col>
        //             <Col md={6}>
        //                 <title>{product!.name}</title>
        //                 <h1>{product!.name}</h1>
        //                 <div>
        //                 </div>
        //             </Col>
        //         </Row>
        //         :
        //         <></>
        //     }
        //     </section>
        // )

    )


}

export default AdminProductPage