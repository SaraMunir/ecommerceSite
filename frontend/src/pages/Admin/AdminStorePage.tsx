import React, { useContext } from 'react'
import { useGetStoresQuery } from '../../hooks/storeHooks'
import { Link } from 'react-router-dom'
import { Store } from '../../Store'
import { Button } from 'react-bootstrap'
import MessageBox from '../../components/MessageBox'
import { getError } from '../../utils'
import LoadingBox from '../../components/LoadingBox'
import { ApiError } from '../../types/ApiError'

function AdminStorePage() {
        const { data: stores, isLoading, error} = useGetStoresQuery()
        // const { data: products, isLoading, error} = useGetStoresQuery()
      const {state:{ storeInfo}, dispatch } = useContext(Store)

        //   const { state, dispatch } = useContext(Store)
    //   const navigateTo:any=(storeNumber:number)=>{
    //     console.log('storeNumber navigateTo', storeNumber)
    //   }
      const editStore:any=(storeNumber:number)=>{
        console.log('storeNumber editStore')
      }
      const navigateTo =(storeNumber:number)=>{
        console.log('storeNumber navigateTo', storeNumber)

        // dispatch({navigateTotype: 'USER_SIGNOUT'})
        // localStorage.removeItem('userInfo')
        // window.location.href = "/Admin/Store/"+storeNumber
      }


return isLoading?(<LoadingBox />) : error? (
    <MessageBox variant="danger">{ getError( error as ApiError ) }</MessageBox>
    ):
    (
        <div className='bg-light-grey min-vh-100 container-fluid row flex-col justify-content-center'>
            <div className="col-md-8 bg-light p-5 mx-auto min-vh-50 mt-5 rounded-4">
                <h1>Stores</h1>
                <hr />
                <div className="list-group">
                    
                    {
                        
                        stores!.map(storeEl=>
                            // <div>{storeEl.storeNumber}</div>
                        <div to="#test" key={storeEl._id} className={storeInfo.storeNumber==storeEl.storeNumber ?
                        "list-group-item list-group-item-action active" :"list-group-item list-group-item-action"} aria-current="true" onClick={()=>navigateTo(storeInfo.storeNumber)}>
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">
                                {
                                storeEl.storeName ? storeEl.storeName : 
                                `Store-${storeEl.storeNumber}`
                                }
                            </h5>
                            <small>
                                <button onClick={()=>editStore(storeInfo.storeNumber)}>test</button>
                                </small>
                            </div>
                            <p className="mb-1">Some placeholder content in a paragraph.</p>
                            <small>And some small print.</small>
                        </div>

                        )
                    }
                    <a href="#" className="list-group-item list-group-item-action" onClick={editStore}>
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Test store</h5>
                        <small className="text-muted">3 days ago</small>
                        </div>
                        <p className="mb-1">Some placeholder content in a paragraph.</p>
                        <small className="text-muted">And some muted small print.</small>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default AdminStorePage