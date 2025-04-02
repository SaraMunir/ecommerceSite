import React, { useContext, useEffect, useState } from 'react'
import { useChangeStoreByIdMutation, useCreateStoreMutation, useGetStoresQuery } from '../../hooks/storeHooks'
import { Form, Link, Links, useNavigate } from 'react-router-dom'
import { Store } from '../../Store'
import { Button, FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap'
import MessageBox from '../../components/MessageBox'
import { getError } from '../../utils'
import LoadingBox from '../../components/LoadingBox'
import { ApiError } from '../../types/ApiError'
import { countryList } from '../../data'

function AdminStorePage() {
        const navigate = useNavigate()
    
    const { data: stores, isLoading, error, refetch} = useGetStoresQuery()
    const { state:{ storeInfo, userAdminInfo}, dispatch } = useContext(Store)
    const [ latestStoreNumber, setLatestStoreNumber ] = useState(0) 
    const [ storeName, setStoreName ] = useState('') 
    const [ storeOwner, setStoreOwner ] = useState('') 
    const [ currentActiveStore, setCurrentActiveStore ] = useState(0) 
    const [ storeStatus, setStoreStatus ] = useState('draft') 
    const [ currency, setCurrency] = useState('')
    const [ storeTimeZone, setStoreTimeZone] = useState('')
    const [ storeLang, setStoreLang] = useState('')
    const [ storeAddress, setStoreAddress] = useState({
        street1:'', street2:'', city:'', province:'', country:'', postalCode:''
    })
    const [selectStoreNumber, setSelectStoreNumber] = useState(0)
    const [storeWeightUnit, setStoreWeightUnit] = useState('')
    const [ status, setstatus ] = useState<string[]>(["draft", "published", "inactive"])

    useEffect(()=>{
        console.log("userAdminInfo:", userAdminInfo)
        if(stores){
            if(stores.length>0){
                console.log('any',stores[stores?.length-1].storeNumber+1)
                setLatestStoreNumber(stores[stores?.length-1]?.storeNumber+1)
            }
            stores.map(store=>{
                if(store.current){
                    setCurrentActiveStore(store.storeNumber)
                }
            })
        }else{
            setLatestStoreNumber(1001)
        }
        if(userAdminInfo){
            setStoreOwner(userAdminInfo._id!)
        }
        if(storeInfo){
            setCurrentActiveStore(storeInfo.storeNumber)
        }
    },[stores, latestStoreNumber, userAdminInfo, currentActiveStore])
    const { mutateAsync: create } = useCreateStoreMutation()
    const { mutateAsync: changeStore } = useChangeStoreByIdMutation(storeInfo?.storeNumber!, selectStoreNumber)
    const submitHandler = async (e: React.SyntheticEvent) =>{
        e.preventDefault()
        try {
            const data = await create({
                storeName,
                storeOwner,
                storeNumber: latestStoreNumber,
                timeZone:storeTimeZone,
                weightUnit:storeWeightUnit,
                languages:storeLang,
                storeAddress,
                currency,
                storeUsers:[storeOwner]
            })
            console.log('storeName: ', storeName)
            if(data.status=='success'){
                refetch()
                document.getElementById('createModalCloseBtn')?.click()
                return
            }else{
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
            console.log('error in catch', error)
            getError(error as ApiError)
        }
    }
    const changeDefaultStore:any=async (storeNumber: any) =>{
        setSelectStoreNumber(storeNumber)
        try {
            const data = await changeStore({})
            console.log('data:', data)
            if(data.status=="success"){
                localStorage.setItem('storeInfo', JSON.stringify({
                    storeId:data.data!._id,
                    storeNumber:data.data!.storeNumber,
                }))
            }
            refetch()
            dispatch({ type: 'UPDATE_STORE', payload: {storeInfo} })
            navigate(`/Admin/Store/${storeInfo.storeNumber}`)
        } catch (error) {
            console.log('error in catch', error)
            getError(error as ApiError)
        }
    }
return isLoading?(<LoadingBox />) : error? (
    <MessageBox variant="danger">{ getError( error as ApiError ) }</MessageBox>
    ):
    (
        <div className='bg-light-grey min-vh-100 container-fluid row flex-col justify-content-center'>
            <div className="col-md-8 bg-light p-5 mx-auto min-vh-50 mt-5 rounded-4">
                <h1>Stores</h1>
                latestStoreNumber: {latestStoreNumber} ,<br />
                storeName: {storeName} ,<br />
                storeOwner: {storeOwner} ,<br />
                userAdminInfo._id: {userAdminInfo?._id}<br />
                <hr />
                <div className="list-group">
                    {
                        stores!.map(storeEl=>
                        <div key={storeEl._id} className={storeEl.current ?
                        "list-group-item list-group-item-action active" :"list-group-item list-group-item-action"} aria-current="true">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">
                                    {
                                    storeEl.storeName ? storeEl.storeName : 
                                    `Store-${storeEl.storeNumber}`
                                    }
                                </h5>
                                <small>
                                <button className={storeEl.current ?'btn btn-outline-primary bg-white' :'btn btn-primary'} onClick={()=>changeDefaultStore(storeEl.storeNumber)}>View Store</button>
                                </small>
                            </div>
                            <p className="mb-1">Some placeholder content in a paragraph.</p>
                            <small>And some small print.</small>
                        </div>
                        )
                    }
                    <button type="button" className="mt-4 btn btn-primary py-3" data-bs-toggle="modal" data-bs-target="#createStoreModal">
                        Create a New Store
                    </button>
                    <div>
                    </div>
                    <div className="modal fade" id="createStoreModal" tabIndex={-1 }aria-labelledby="createStoreModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="createStoreModalLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                <Form onSubmit={submitHandler}>
                                    <FormGroup>
                                        <FormLabel className="fw-semibold form-label text-capitalize">Store Name</FormLabel>
                                        <FormControl
                                        type='email'
                                        required
                                        onChange={(e)=> setStoreName(e.target.value)}
                                        ></FormControl>
                                    </FormGroup>
                                    <hr />
                                    <FormGroup>
                                        <FormLabel className="fw-semibold form-label text-capitalize">Store Address:</FormLabel>
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
                                    </FormGroup>
                                    <hr />
                                    <FormGroup>
                                        <FormLabel className="fw-semibold form-label text-capitalize">Default Weight Unit</FormLabel>
                                        <FormControl
                                        type='email'
                                        required
                                        value={storeWeightUnit} 
                                        onChange={e => setStoreWeightUnit(e.target.value)}
                                        ></FormControl>

                                    </FormGroup>
                                    <hr />
                                    <FormGroup>
                                        <FormLabel className="fw-semibold form-label text-capitalize">Default Currency</FormLabel>
                                        <FormSelect value={currency} onChange={(e)=> setCurrency(e.target.value)}>
                                            {
                                                countryList.map((con,idx)=>{
                                                    for (const [objKey, value] of Object.entries(con.currencies)) {
                                                        return  <option key={'defCur'+idx+objKey+value}  value={objKey}>{objKey}-{con.currencies[`${objKey}`].symbol}-({con.name.common})</option>
                                                    }
                                                })
                                            }
                                        </FormSelect>
                                    </FormGroup>
                                    <hr />
                                    <FormGroup>
                                        <FormLabel className="fw-semibold form-label text-capitalize">Default Timezone</FormLabel>
                                        <FormSelect value={storeTimeZone} onChange={(e)=> setStoreTimeZone(e.target.value)}>
                                            {
                                                countryList.map((con)=>
                                                    con.timezones.map((tmzone:string,idx:number)=>
                                                        <option key={'defTimeZone'+idx} value={`${tmzone}-${con.name.common}`}>{tmzone}-({con.name.common})</option>
                                                    )
                                                )
                                            }               
                                        </FormSelect>
                                    </FormGroup>
                                    <hr />
                                    <FormGroup>
                                        <FormLabel>Default Language</FormLabel>
                                        <FormSelect value={storeLang} onChange={(e)=> setStoreLang(e.target.value)}>
                                            {
                                                countryList.map((con,idx)=>{
                                                    for (const [lang, value] of Object.entries(con.languages)) {
                                                        return  <option  key={'defLang'+idx+lang+value} value={`${lang}-${con.name.common}`}>{value}-({con.name.common})</option>
                                                    }
                                                })
                                            }              
                                        </FormSelect>
                                    </FormGroup>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" onClick={submitHandler}>Save changes</button>
                                    </div>
                                </Form>
                                        <button type="button" id='createModalCloseBtn' className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminStorePage