import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Store } from '../../Store'
import { useGetStoreDetailsByIdQuery, useUpdateStoreByIdMutation } from '../../hooks/storeHooks'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { getError } from '../../utils'
import { ApiError } from '../../types/ApiError'
import { countryList } from '../../data'
import { toast } from 'react-toastify'
import { Form } from 'react-router-dom'

function AdminSettings() {
    const {state:{ storeInfo}, dispatch } = useContext(Store)
    
    const { data: stores, isLoading, error }=useGetStoreDetailsByIdQuery(storeInfo?.storeId!)
    const [storeName, setStoreName] = useState('')
    const [storeWeightUnit, setStoreWeightUnit] = useState('')
    const [storeTimeZone, setStoreTimeZone] = useState('')
    const [storeLang, setStoreLang] = useState('')
    const [editGeneral, setEditGeneral] = useState(false)
    const [storeAddress, setStoreAddress] = useState({
        street1:'', street2:'', city:'', province:'', country:'', postalCode:''
    })

    const { mutateAsync: update } = useUpdateStoreByIdMutation(storeInfo?.storeId!)
    const [storeCurrency, setStoreCurrency] = useState('')
    useEffect(() => {
        if(stores){
            if(stores.storeName){
                setStoreName(stores.storeName)
            }
            if(stores.storeAddress){
                setStoreAddress({...stores.storeAddress})
            }
            if(stores.currency){
                setStoreCurrency(stores.currency)
            }
            if(stores.timeZone){
                setStoreTimeZone(stores.timeZone)
            }
            if(stores.languages){
                setStoreLang(stores.languages)
            }
            if(stores.weightUnit){
                setStoreWeightUnit(stores.weightUnit)
            }
        }
    }, [stores])
        const submitHandler = async (e: React.SyntheticEvent) =>{
            console.log('test?')
            e.preventDefault()
            try {
                const data = await update({
                    storeName,
                    timeZone:storeTimeZone,
                    weightUnit:storeWeightUnit,
                    languages:storeLang,
                    storeAddress,
                    currency: storeCurrency
                })
                console.log('storeName: ', storeName)
                if(data.status=='success'){
                    console.log('data: ', data)
                    console.log(data.data)
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
                // return
            } catch (error) {
                console.log('error in catch', error)

                toast.error(getError(error as ApiError))
            }
        }
    
    return isLoading ? (
            <LoadingBox/>
        ): error ? (
            <MessageBox>
                { getError( error as ApiError ) }
            </MessageBox>
        ):
        (
            <div>
                <div className="accordion accordion-flush " id="accordionFlushExample">
                    <div className="accordion-item bg-transparent">
                        <h2 className="border-0 bg-transparent mb-0">
                            <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">General</button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse show" >
                            <div className="accordion-body">
                                <Card className='w-100 my-3'>
                                    <Card.Body className='p-4'>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5>Store Details</h5> 
                                            {
                                                editGeneral ?
                                                <Button variant="primary"size="sm" onClick={()=>setEditGeneral(!editGeneral)}>Cancel</Button>

                                                :
                                                <Button variant="primary"size="sm" onClick={()=>setEditGeneral(!editGeneral)}>edit</Button>
                                            }
                                        </div>
                                        {
                                            !editGeneral ? 
                                        <ul className="list-group list-group">
                                            <li className="list-group-item">
                                                <span  className='fw-semibold text-capitalize'>Store Name: </span>
                                                <br />
                                                {storeName}
                                            </li>
                                            <li className="list-group-item">
                                                <span  className='fw-semibold text-capitalize'>Store Address:</span>
                                                <br />
                                                {
                                                    storeAddress ?
                                                    <div>
                                                        {storeAddress.street1 ? <span>{storeAddress.street1},</span>: null }
                                                        <br />

                                                        {storeAddress.street2 ? <div>{storeAddress.street2}, &nbsp;</div>: null }
                                                        
                                                        {storeAddress.city ? <span>{storeAddress.city}, &nbsp;</span>: null }
                                                        {storeAddress.province ? <span>{storeAddress.province}, &nbsp;</span>: null }
                                                        {storeAddress.postalCode ? <span>{storeAddress.postalCode}, &nbsp;</span>: null }
                                                        {storeAddress.country ? <span>{storeAddress.country}</span>: null }
                                                        {/* {storeAddress.country}, */}
                                                    </div>
                                                    : null
                                                }
                                            </li>
                                            <li className="list-group-item">
                                                <span  className='fw-semibold text-capitalize'>Default weight unit:</span>
                                                <br />
                                                <span>{storeWeightUnit}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <span  className='fw-semibold text-capitalize'>currency:</span>
                                                <br />
                                                <span>{storeCurrency}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <span  className='fw-semibold text-capitalize'>Time zone:</span>
                                                <br />
                                                <span>UTC</span>
                                            </li>
                                            <li className="list-group-item">
                                                <span className='fw-semibold text-capitalize'>Language:</span>
                                                <br />
                                                <span>en</span>
                                            </li>
                                        </ul>
                                        :null
                                        }
                                        {
                                            editGeneral ?
                                        <div>
                                            <Form onSubmit={submitHandler}>

                                                <ul className="list-group list-group">
                                                    <li className="list-group-item store-name">
                                                        <label htmlFor="storeName" className="form-label text-capitalize fw-semibold">Store Name</label>
                                                        <input type="text" 
                                                        className="form-control" id="storeName" value={storeName} 
                                                        onChange={e => setStoreName(e.target.value)} 
                                                            />
                                                    </li>
                                                    <li className="list-group-item store-address">
                                                        <span className='fw-semibold'>Store Address:</span> 
                                                        <div className='mt-2'>
                                                            <label htmlFor="street1" className="form-label text-capitalize ">Street 1</label>
                                                            <input type="text" 
                                                            className="form-control" id="street1" value={storeAddress.street1} 
                                                            onChange={e => setStoreAddress({...storeAddress, street1:e.target.value})} />
                                                        </div>
                                                        <div className='mt-2'>
                                                            <label htmlFor="street2" className="form-label text-capitalize">Street 2</label>
                                                            <input type="text" 
                                                            className="form-control" id="street2" value={storeAddress.street2} 
                                                            onChange={e => setStoreAddress({...storeAddress, street2:e.target.value})} />
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className="col-sm-6">

                                                                <label htmlFor="city" className="form-label text-capitalize">City</label>
                                                                <input type="text" 
                                                                className="form-control" id="city" value={storeAddress.city} 
                                                                onChange={e => setStoreAddress({...storeAddress, city:e.target.value})} />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label htmlFor="province" className="form-label text-capitalize">Province</label>
                                                                <input type="text" 
                                                                className="form-control" id="province" value={storeAddress.province} 
                                                                onChange={e => setStoreAddress({...storeAddress, province:e.target.value})} />
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className="col-sm-6">
                                                                <label htmlFor="country" className="form-label text-capitalize text-capitalize">country</label>
                                                                <input type="text" 
                                                                className="form-control" id="country" value={storeAddress.country} 
                                                                onChange={e => setStoreAddress({...storeAddress, country:e.target.value})} />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label htmlFor="postalCode" className="form-label text-capitalize">postalCode</label>
                                                                <input type="text" 
                                                                className="form-control" id="postalCode" value={storeAddress.postalCode} 
                                                                onChange={e => setStoreAddress({...storeAddress, postalCode:e.target.value})} />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <label htmlFor="storeWeightUnit" className="form-label text-capitalize fw-semibold">Default Weigh Unit</label>
                                                        <input type="text" 
                                                        className="form-control" id="storeWeightUnit" value={storeWeightUnit} 
                                                        onChange={e => setStoreWeightUnit(e.target.value)}/>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <label htmlFor="storeCurrency" className="form-label text-capitalize fw-semibold">Currency</label>
                                                        <select className="form-select" aria-label="Floating label select example" value={storeCurrency} onChange={e => setStoreCurrency(e.target.value)}>
                                                            <option  className='muted'>Select Currency unit</option>
                                                            {
                                                                countryList.map((con)=>{
                                                                    for (const [test, value] of Object.entries(con.currencies)) {
                                                                        console.log(`key:${test}`);
                                                                        return  <option value={test}>{test}-{con.currencies[`${test}`].symbol}-({con.name.common})</option>
                                                                    }
                                                                })
                                                            }
                                                        </select>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <label htmlFor="storeTimeZone" className="form-label text-capitalize fw-semibold">time zone</label>
                                                        <select className="form-select" aria-label="Floating label select example" value={storeTimeZone} onChange={e => setStoreTimeZone(e.target.value)}>
                                                            <option  className='muted'>Select Time Zone</option>
                                                        {
                                                            countryList.map((con)=>
                                                                con.timezones.map((tmzone:string)=>
                                                                    <option value={tmzone}>{tmzone}-({con.name.common})</option>
                                                                )
                                                            )
                                                        }
                                                        </select>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <label htmlFor="storeLang" className="form-label text-capitalize fw-semibold">Language</label>
                                                        <select className="form-select" aria-label="Floating label select example" value={storeLang} onChange={e => setStoreLang(e.target.value)}>
                                                            <option  className='muted'>Select Currency unit</option>
                                                            {
                                                                countryList.map((con)=>{
                                                                    for (const [test, value] of Object.entries(con.languages)) {
                                                                        console.log(`key:${test}`);
                                                                        return  <option value={test}>{value}-({con.name.common})</option>
                                                                    }
                                                                })
                                                            }
                                                        </select>
                                                    </li>
                                                    
                                                </ul>
                                            <div className="d-flex justify-content-end mt-3">
                                                <button className='btn btn-primary btn-md'>Save</button>
                                            </div>
                                            </Form>
                                        </div>
                                        :null
                                        }
                                        
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item bg-transparent">
                        <h2 className="border-0 bg-transparent mb-0">
                            <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">Payment</button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" >
                            <div className="accordion-body">
                                <Card className='w-100 my-3'>
                                    <Card.Body className='p-4'>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5>Payment Gateways</h5>
                                        </div>
                                        <ul className="list-group list-group">
                                            <li className="list-group-item">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>store name: example </span>
                                                    <button>edit</button>
                                                </div>
                                            </li>
                                            <li className="list-group-item">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>store address: example </span>
                                                    <button>edit</button>
                                                </div>
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item bg-transparent">
                        <h2 className="border-0 bg-transparent mb-0">
                            <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">Tax</button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" >
                            <div className="accordion-body">
                                <Card className='w-100 my-3'>
                                    <Card.Body className='p-4'>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5>Tax</h5>
                                            {/* <Button variant="primary"  size="sm">edit</Button> */}
                                        </div>
                                        {/* <hr /> */}
                                        <ul className="list-group list-group">
                                            <li className="list-group-item">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>store name: example </span>
                                                    <button>edit</button>
                                                </div>
                                            </li>
                                            <li className="list-group-item">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>store address: example </span>
                                                    <button>edit</button>
                                                </div>
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item bg-transparent">
                        <h2 className="border-0 bg-transparent mb-0">
                            <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseUsers" aria-expanded="false" aria-controls="flush-collapseUsers">Users</button>
                        </h2>
                        <div id="flush-collapseUsers" className="accordion-collapse collapse" >
                            <div className="accordion-body">
                                <Card className='w-100 my-3'>
                                    <Card.Body className='p-4'>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5>Users</h5>
                                        </div>
                                        <ul className="list-group list-group">
                                            <li className="list-group-item">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>store name: example </span>
                                                    <button>edit</button>
                                                </div>
                                            </li>
                                            <li className="list-group-item">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>store address: example </span>
                                                    <button>edit</button>
                                                </div>
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default AdminSettings

