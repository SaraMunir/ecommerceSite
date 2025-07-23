import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Card, CardBody, Container, Form } from 'react-bootstrap'
import { Store } from '../Store'
import { useGetCategoriesByStoreIdQuery } from '../hooks/categoryHooks'
import { Category } from '../types/Category'
import { useParams } from 'react-router-dom'
import { useCreateProductMutation, useUpdateProductByIdMutation } from '../hooks/productHooks'
import { v4 as uuidv4 } from 'uuid'
import { title } from 'process'


function CreateProduct(props:any) {
    let { action } = useParams();
    // const { v4: uuidv4 } = require('uuid');
    // console.log('uuidv4: ',uuidv4)
    // let test=uuidv4()
    // console.log('test: ',test)

    const {state:{ storeInfo}, dispatch } = useContext(Store)
    const { data: categories } =useGetCategoriesByStoreIdQuery(storeInfo?.storeId!)
    const [productTitle, setProductTitle] = useState('')
    const [name, setName] = useState('')
    const [productId, setProductId] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [storeId, setStoreId] = useState('')
    const [imageList, setImageList] = useState<any[]>([])
    const [image, setImage] = useState('')
    const [ addImages, setAddImages] = useState('')
    const [weight, setWeight] = useState(0)
    const [pricing, setPricing] = useState<number>(0)
    const [inventory, setInventory] = useState(0)
    const [quantitySold, setQuantitySold] = useState(0)
    const [category, setCategory] = useState('')
    const [tags, setTags] = useState<any[]>([])
    const [tagInput, setTagInput] = useState('')
    const [hasVariants, setHasVariants] = useState(false)
    const [variesBy, setVariesBy] = useState('')
    const [status, setStatus] = useState('draft')
    const [shipping, setShipping] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const addTags =()=>{
        if(tagInput){
            setTags([...tags, tagInput]); 
            setTagInput('')
        }
    }
    const removeTag = (idx: number)=>{
        let newFilter= tags.filter(test=>  test != tags[idx])
        console.log('newfilter:', newFilter)
        setTags(newFilter)
    }
    const addNewImages =()=>{
        if(addImages){
            let imageObj = {
                igmUrl: addImages,
                _id:uuidv4() 
            }
            setImageList([...imageList, imageObj]); 
            setAddImages('')
        }
    }
    const { mutateAsync: update } = useUpdateProductByIdMutation(productId!)
    const { mutateAsync: create } = useCreateProductMutation()
    
    useEffect(() => {
        if(storeInfo){
            setStoreId(storeInfo.storeId)
        }
        if(props.product){
            console.log(props.product)
            setProductTitle(props.product.name)
            setName(props.product.name)
            if(props.product._id){
                setProductId(props.product._id)
            }
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
            if(props.product.weight){
                setWeight(props.product.weight)
            }
            if(props.product.hasVariants){
                setHasVariants(props.product.hasVariants)
            }
            if(props.product.variesBy){
                setVariesBy(props.product.variesBy)
            }
            if(props.product.status){
                setStatus(props.product.status)
            }
            if(props.product.shipping){
                setShipping(props.product.shipping)
            }
        }
    }, [props.product])
    
    const saveProduct = async(e: React.SyntheticEvent)=>{
        e.preventDefault()
        try {
            const data:any = await update({
                name,
                image,
                imageList,
                category,
                tags,
                price:pricing,
                inventory,
                quantitySold,
                description: productDescription,
                weight,
                hasVariants,
                variesBy,
                storeId,
                status,
                shipping
            })
            console.log('data:', data)
            if(data.status == 'success'){
                console.log('data: ', data)
                console.log(data.data)
                props.refetch()
                return
            }else{
                console.log('data: ', data)
                let exceptionErr
                if(data.error.code== 11000){
                    for (const [key, value] of Object.entries(data.error.errorResponse.keyPattern)) {
                        console.log(`key:${key}`);
                        console.log(`value: ${data.error.errorResponse.keyPattern[key]}`);
                    }
                }
                console.log('message: ', exceptionErr)
                dispatch({ type: 'GET_ERROR', payload: {exceptionErr} })
            }
        } catch (error) {
            
        }
    }
    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };
    const addProduct = async(e:React.SyntheticEvent)=>{
        e.preventDefault()

        try {
            const data:any = await create({
                name,
                image,
                imageList,
                category,
                tags,
                price:pricing,
                inventory,
                quantitySold,
                description: productDescription,
                weight,
                hasVariants,
                variesBy,
                storeId,
                status,
                shipping
            })
            console.log('data:', data)
            if(data.status == 'success'){
                console.log('data: ', data)
                console.log(data.data)
                // props.refetch()
                return
            }else{
                console.log('data: ', data)
                let exceptionErr
                if(data.error.code== 11000){
                    for (const [key, value] of Object.entries(data.error.errorResponse.keyPattern)) {
                        console.log(`key:${key}`);
                        console.log(`value: ${data.error.errorResponse.keyPattern[key]}`);
                    }
                }
                console.log('message: ', exceptionErr)
                dispatch({ type: 'GET_ERROR', payload: {exceptionErr} })
            }
        } catch (error) {
            console.log('error:', error)
        }
        // let test= new mongoose.Types.ObjectId()
    }
    return (
        <div className='mx-auto position-relative'>
            productId: {productId}
            
            <h3>Product</h3>
            <div className="row">
                <div className="col-md-8">
                    <Card  className='w-100 my-3'>
                        <CardBody className='p-4'>
                            <div className="justify-content-between align-items-center mb-2">
                                <h5>Product Details</h5>
                                <hr />
                                <ul className="p-0">
                                    <li className="list-group-item store-name">
                                        <label htmlFor="productTitle" className="form-label text-capitalize fw-semibold">Title</label>
                                        <input type="text" 
                                        className="form-control" id="productTitle" value={name} 
                                        onChange={e => setName(e.target.value)}/>
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
                                                <div className="col-9 ">
                                                    image List
                                                    <div className="row">
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
                                            </div>

                                            <input type="text" 
                                            className="form-control" id="image" value={image} 
                                            onChange={e => setImage(e.target.value)}/>

                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" placeholder="add image url" aria-label="image url" aria-describedby="button-addon2" value={addImages} 
                                                onChange={e => setAddImages(e.target.value)}/>
                                                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={addNewImages}>Add Image</button>
                                            </div>
                                            <div>

                                            </div>
                                            <div>
                                                {
                                                files.length > 0 ?
                                                <div className='row'>
                                                    {
                                                        files.map((file, index) => (
                                                            <div key={index} className="col mb-2 ">
                                                                <strong>File {index + 1}:</strong> {file.name}
                                                                <div className='position-relative'>
                                                                    <button className='badge bg-danger position-absolute top-0 right-0 translate-middle' onClick={() => removeFile(index)} >X</button>
                                                                    <img src={URL.createObjectURL(file)} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                : null
                                                }
                                            </div>
                                                
                                            
                                            <div className="mb-3">
                                                to be developed
                                                <label htmlFor="formFile" className="form-label">Default file input example</label>
                                                <input className="form-control" type="file" id="formFile" onChange={e => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        setFiles([...files, e.target.files[0]]);
                                                    }
                                                }} />
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
                                        <label htmlFor="inventory" className="form-label text-capitalize fw-semibold">Inventory</label>
                                        <input type="number" className="form-control" id="inventory" value={inventory} onChange={e => setInventory(e.target.value as any)}/>
                                    </li>
                                    <li className="list-group-item store-name">
                                        <label htmlFor="weight" className="form-label text-capitalize fw-semibold">weight</label>
                                        <input type="number" className="form-control" id="weight" value={weight} onChange={e => setWeight(e.target.value as any)}/>
                                    </li>
                                    <li className="list-group-item store-name">
                                        <label htmlFor="quantitySold" className="form-label text-capitalize fw-semibold">Quantity Sold</label>
                                        <input type="number" className="form-control" disabled id="quantitySold" value={quantitySold!} onChange={e => setQuantitySold(e.target.value as any)}/>
                                    </li>
                                </ul>
                            </div>

                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-4">

                    <Card  className='w-100 my-3'>
                        <CardBody className='p-4'>
                            <div className="justify-content-between align-items-center mb-2">
                                <h5>Status: {status}</h5>
                                <hr />
                                <ul className="p-0">
                                <li className="list-group-item store-name">
                                        <select className="form-select" aria-label="Default select example" value={status} onChange={e => setStatus(e.target.value as any)}>
                                            <option  value="draft">draft</option>
                                            <option  value="published">published</option>
                                            <option  value="inactive">inactive</option>
                                        </select>
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
                                        selected: {category}
                                        <select className="form-select" aria-label="Default select example" value={category} onChange={e => setCategory(e.target.value as any)}>

                                            {
                                                categories ?
                                                categories.map((category: Category)=>

                                                    <option key={'prod-cat-key'+category._id} value={category._id}>{category.name}</option>
                                                )
                                                : null
                                            }

                                            
                                            {/* <option value="2">Two</option>
                                            <option value="3">Three</option> */}
                                        </select>
                                    </li>
                                    <li className="list-group-item store-name">
                                        <label htmlFor="productDescription" className="form-label text-capitalize fw-semibold">Tags</label>
                                        <div className="w-100 my-4 mx-0">
                                            {
                                                tags?
                                                tags.map((tag,idx)=>
                                                    <div key={'tags-'+idx} className="p-2 bg-primary m-2 rounded-3 d-inline-block position-relative text-light">{tag}
                                                        <button className='position-absolute badge rounded-pill text-bg-danger text-light' style={{
                                                        top:"-10px",
                                                        right:"-10px"
                                                        
                                                    }}  onClick={()=>removeTag(idx)}><i className="fas fa-times"></i></button>
                                                    
                                                    </div>
                                                )
                                                :null
                                            }
                                            <button type="button" className="p-3 btn-primary m-2 rounded-3 d-inline-block" data-bs-toggle="modal" data-bs-target="#addNewTag">
                                            Add tags  &nbsp;
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        {/* <input type="text" className="form-control" id="pricing" value={tags} onChange={e => setTags([...tags, e.target.value as any])}/> */}
                                    </li>
                                </ul> 

                            </div>

                        </CardBody>
                    </Card>
                </div>
            </div>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="addNewTag" tabIndex={-1} aria-labelledby="addNewTagLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addNewTagLabel">Add New Tag</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                            <div className="modal-body">
                                <label htmlFor="productDescription" className="form-label text-capitalize fw-semibold">New tag</label>
                                <input type="text" className="form-control" id="pricing" value={tagInput} onChange={e => setTagInput(e.target.value as any)}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                {tagInput?
                                <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={()=>addTags()}>Add Tag</button>
                                :
                                <button type="button" data-bs-dismiss="modal" className="btn btn-primary" disabled>Add Tag</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    action=="Create" ?
                        <div className="d-flex position-fixed bottom-0 end-0 pb-5 pe-5">
                            {
                                name ? 
                                <button className='btn btn-primary me-2' onClick={addProduct}>create</button>
                                : 
                                <button className='btn btn-primary me-2' disabled>create</button>
                                
                            }
                            {/* <button className='btn btn-primary me-2' onClick={addProduct}>create</button> */}
                            <button className='btn btn-primary me-2'>cancel </button>
                        </div>
                    :
                        <div className="d-flex position-fixed bottom-0 end-0 pb-5 pe-5">
                            <button className='btn btn-primary me-2' onClick={saveProduct}>save</button>
                            <button className='btn btn-primary me-2'>cancel</button>
                            <button className='btn btn-danger text-light'>delete</button>
                        </div>
                }
        </div>
    )
}

export default CreateProduct

//   {
//     "url": "https://cdn.example.com/products/classic-tshirt/main.jpg",
//     "alt_text": "Front view of a classic white t-shirt",
//     "type": "product_main",
//     "product_id": "64eabc1234a1a2b3c4d5e6f7",
//     "metadata": {
//       "position": 1,
//       "resolution": "1200x1600",
//       "file_size_kb": 350,
//       "tags": ["main", "default"],
//       "caption": "Main product image"
//     }