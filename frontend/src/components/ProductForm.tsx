import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, Container, Form } from 'react-bootstrap'
import { Store } from '../Store'

function CreateProduct(props:any) {
    const {state:{ storeInfo}, dispatch } = useContext(Store)

        const [productTitle, setProductTitle] = useState('')
        const [name, setName] = useState('')
        const [productDescription, setProductDescription] = useState('')
        const [storeId, setStoreId] = useState('')
        const [images, setImages] = useState<any[]>([])
        const [image, setImage] = useState('')
    useEffect(() => {
        if(storeInfo){
            setStoreId(storeInfo.storeId)
        }
        if(props.product){
            setProductTitle(props.product.name)
            setName(props.product.name)
            if(props.product.description){
                setProductDescription(props.product.description)
            }
            if(props.product.images){
                setImages(props.product.images)
            }
            if(props.product.image){
                setImages([...images, {igmUrl: props.product.image}])
            }
        }
  
    }, [props.product])
    
    return (
        <Form className='mx-auto'>
            
            <h3>Add Product</h3>
            <Card  className='w-100 my-3'>
                <CardBody className='p-4'>
                    <div className="justify-content-between align-items-center mb-2">
                        <h5>Product Details</h5>
                        <hr />
                        <ul className="p-0">
                            <li className="list-group-item store-name">
                                <label htmlFor="productTitle" className="form-label text-capitalize fw-semibold">Title</label>
                                <input type="text" 
                                className="form-control" id="productTitle" value={productTitle} 
                                onChange={e => setProductTitle(e.target.value)}/>
                            </li>
                            <li className="list-group-item store-name">
                                <label htmlFor="productDescription" className="form-label text-capitalize fw-semibold">Description</label>
                                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={productDescription} 
                                onChange={e => setProductDescription(e.target.value)}></textarea>
                            </li>
                            <li className="list-group-item store-name">
                                <label htmlFor="productDescription" className="form-label text-capitalize fw-semibold">Description</label>
                                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={productDescription} 
                                onChange={e => setProductDescription(e.target.value)}></textarea>
                            </li>
                        </ul> 
                        {/* {
                            editGeneral ?
                            <Button variant="primary"size="sm" onClick={()=>setEditGeneral(!editGeneral)}>Cancel</Button>

                            :
                            <Button variant="primary"size="sm" onClick={()=>setEditGeneral(!editGeneral)}>edit</Button>
                        } */}
                    </div>

                </CardBody>
            </Card>

        </Form>
    )
}

export default CreateProduct

