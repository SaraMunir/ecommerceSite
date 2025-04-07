import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Card, CardBody, Container, Form } from 'react-bootstrap'
import { Store } from '../Store'

function CreateProduct(props:any) {
    const {state:{ storeInfo}, dispatch } = useContext(Store)
    const [productTitle, setProductTitle] = useState('')
    const [name, setName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [storeId, setStoreId] = useState('')
    const [imageList, setImageList] = useState<any[]>([])
    const [image, setImage] = useState('')
    const [pricing, setPricing] = useState<number>(0)
    const [inventory, setInventory] = useState(0)
    const [quantitySold, setQuantitySold] = useState(0)
    const [category, setCategory] = useState('')
    const [tags, setTags] = useState<any[]>([])
    useEffect(() => {
        if(storeInfo){
            setStoreId(storeInfo.storeId)
        }
        if(props.product){
            console.log(props.product)
            setProductTitle(props.product.name)
            setName(props.product.name)
            if(props.product.description){
                setProductDescription(props.product.description)
            }
            if(props.product.image){
                setImage(props.product.image)
            }
            if(props.product.imageList){
                setImageList(props.product.imageList)
            }
            if(props.product.price){
                setPricing(props.product.price)
            }
            if(props.product.inventory){
                setInventory(props.product.inventory)
            }
            if(props.product.quantitySold){
                setQuantitySold(props.product.quantitySold)
            }
            if(props.product.category){
                setCategory(props.product.category)
            }
            if(props.product.tags){
                setTags(props.product.tags)
            }
        }
    }, [props.product])
    
    return (
        <Form className='mx-auto'>
            
            <h3>Product</h3>
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
                                <label htmlFor="image" className="form-label text-capitalize fw-semibold">Image</label>
                                <div className='bg-light p-3 border rounded-2'>
                                    <div className='row'>
                                            {
                                                image? 
                                                <div className='col-3'>
                                                    <img className='w-100' src={image} alt="" /> 
                                                </div>
                                                :null
                                            }
                                        <div className="col-9 row">
                                            {
                                                imageList? 
                                                imageList.map(img=>
                                                <div key={img._id} className='col-2'>
                                                    <img className='w-100' src={img.igmUrl} alt="" /> 
                                                </div>
                                                )
                                                :null
                                            }
                                        </div>
                                    </div>
                                    <input type="text" 
                                    className="form-control" id="image" value={image} 
                                    onChange={e => setImage(e.target.value)}/>
                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">Default file input example</label>
                                        <input className="form-control" type="file" id="formFile"/>
                                    </div>
                                </div>
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
            <Card  className='w-100 my-3'>
                <CardBody className='p-4'>
                    <div className="justify-content-between align-items-center mb-2">
                        <h5>Pricing and Inventory</h5>
                        <hr />
                        <ul className="p-0">
                            <li className="list-group-item store-name">
                                {/* <input type="number" name="" id="" /> */}
                                <label htmlFor="pricing" className="form-label text-capitalize fw-semibold">Price</label>
                                <input type="number" className="form-control" id="pricing" value={pricing} onChange={e => setPricing(e.target.value as any)}/>
                            </li>
                            <li className="list-group-item store-name">
                                <label htmlFor="productDescription" className="form-label text-capitalize fw-semibold">Inventory</label>
                                <input type="number" className="form-control" id="pricing" value={inventory} onChange={e => setInventory(e.target.value as any)}/>
                            </li>
                            <li className="list-group-item store-name">
                                <label htmlFor="productDescription" className="form-label text-capitalize fw-semibold">Quantity Sold</label>
                                <input type="number" className="form-control" disabled id="pricing" value={quantitySold!} onChange={e => setQuantitySold(e.target.value as any)}/>
                            </li>
                        </ul>
                    </div>

                </CardBody>
            </Card>
            <Card  className='w-100 my-3'>
                <CardBody className='p-4'>
                    <div className="justify-content-between align-items-center mb-2">
                        <h5>Categories and Tags</h5>
                        <hr />
                        <ul className="p-0">
                            <li className="list-group-item store-name">
                                <label htmlFor="category" className="form-label text-capitalize fw-semibold">category</label>
                                <input type="text" className="form-control" id="category" value={category} onChange={e => setCategory(e.target.value as any)}/>
                            </li>
                            <li className="list-group-item store-name">
                                <label htmlFor="productDescription" className="form-label text-capitalize fw-semibold">Tags</label>
                                <div className="row w-100 my-4">
                                    {
                                        tags?
                                        tags.map(tag=>
                                            <span className="p-2 badge text-bg-secondary col-1 m-2">{tag}</span>
                                        )
                                        :null
                                    }
                                </div>

                                {/* <input type="text" className="form-control" id="pricing" value={tags} onChange={e => setTags([...tags, e.target.value as any])}/> */}
                            </li>
                        </ul> 

                    </div>

                </CardBody>
            </Card>

        </Form>
    )
}

export default CreateProduct

