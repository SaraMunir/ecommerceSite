import  { use, useContext, useEffect, useState } from 'react'
import styleData from '../../../designData.json'
import {  Link } from 'react-router-dom'
import { Store } from '../../../Store'
import { useGetStoreDetailsByIdQuery, useUpdateStoreByIdMutation } from '../../../hooks/storeHooks'

import {  } from 'react-router-dom';

function Site() {
    const {state:{ storeInfo} } = useContext(Store)
    const [siteStyles] = useState(styleData.styles)
    const [viewDesigns, setViewDesigns] = useState<any>({})

    const { data: stores, isLoading, error }=useGetStoreDetailsByIdQuery(storeInfo?.storeId!)
    const [storeDetails, setStoreDetails] = useState(stores)
    const [viewStyle, setViewStyle] = useState(false)
    const selectCategory=(idx: number)=>{
        setViewDesigns(siteStyles[idx])
        setViewStyle(true)
        // navigate(`/Admin/Store/${storeNumber}/Site/Style?designId=${siteStyles[idx]}&designCatId=${categoryId}&designTheme=${designTheme}`)
    }
    // const [modalShow, setModalShow] = useState(false);
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const designId = searchParams.get('designId');
        const designCatId = searchParams.get('designCatId');
        const designTheme = searchParams.get('designTheme');

        if(designId && designCatId && designTheme){
            const selectedStyle = siteStyles.find(style => style.categoryId === designCatId);
            // siteStyles.forEach(element => {
            //     console.log("element: ", element)
            // });
            console.log("selectedStyle: ", selectedStyle)

            if(selectedStyle){
                setViewDesigns(selectedStyle);
                setViewStyle(true);
            }
        }    
    }, [])
    useEffect(() => {
        if(stores){
            setStoreDetails(stores)
            console.log("stores", stores)
        }

    }, [stores])

    return (
        <div className='site position-relative'>
            <h1>Templates</h1>
            {
                isLoading ? <div>Loading...</div> :
                error ? <div>Error loading store details.</div> :
                storeDetails ? 
                <div className='mb-3'>
                    {
                        storeDetails.storeTheme?.id ?
                        <p>Select a theme to get started</p>
                        : null
                    }
                    {
                        storeDetails.storeTheme?.id ? 
                        <div className="">
                        <h4>Current Theme: {storeDetails?.storeTheme?.name || "No theme selected"}</h4>
                        {/* <h5 className="card-title">Current Theme</h5>
                        <p className="card-text">{storeDetails?.storeTheme?.name || "No theme selected"}</p> */}
                        <div className="col-md-6">
                            <div className="card mb-3">
                                <div className="card-body">
                                    {/* find the image of the theme from the list of styles */}

                                    <Link to={`/Store/${storeDetails._id}?viewType=preview&srcType=Style`} className='w-100'>
                                    {
                                        siteStyles.map((style)=>
                                            style.themes.map((theme:any)=>
                                                theme.id == storeDetails.storeTheme.id ?
                                                <img src={theme.img} alt={theme.name} className='w-100' key={theme.id}/> :
                                                <></>

                                            )
                                        )
                                    }</Link>

                                </div>
                            </div>
                        </div>
                    </div>
                    : <div>No theme selected</div>

                    }
                    <p>Change your store's theme to give it a fresh new look. Browse through our collection of professionally designed themes and select the one that best fits your brand and style.</p>
                </div>
                : <div>No store details found.</div>
            }
            <div>
            </div>
            <div className='row justify-content-between'>
                {
                    siteStyles.map((style, idx)=>
                        <div className='col-md-4' key={idx}>
                            <button className="card m-2 p-0 border-0" onClick={()=>selectCategory(idx)}>
                                <div className="card-body p-0">
                                    <div className='overlay d-flex justify-content-center align-items-center p-3'>
                                        <h3>{style.category}</h3>
                                    </div>
                                    <img src={style.img} alt="test" className='w-100'/>
                                </div>
                            </button>
                        </div>
                    )
                }
            </div>
            {
                viewStyle ?
                <div className='styleWindow showW position-absolute top-0 bottom-0 start-0 end-0 bg-white'>
                    {
                        viewDesigns ?
                        <div className='m-3'>
                            <div className="d-flex justify-content-between">
                                <button className='btn btn-outline-primary' onClick={()=>setViewStyle(!viewStyle)}><i className="fas fa-arrow-left"></i> go back</button>
                                <button onClick={()=>setViewStyle(!viewStyle)} className='btn btn-outline-primary'><i className="fas fa-times"></i></button>
                            </div>
                            <h2>{viewDesigns?.category}</h2>
                            <div className="row flex-wrap justify-content-around">
                                {
                                    viewDesigns?.themes?.map((theme:any, idx: number)=>
                                    <Link to={`/Admin/Store/${storeInfo?.storeNumber}/Site/Design?designId=${theme.id}&designCatId=${viewDesigns?.categoryId}&designTheme=${theme.id}`} className='col-lg-43 col-md-4 col-sm-6' key={idx}>
                                        <button className="card m-2 p-0 border-0" >
                                            <div className="card-body p-0">
                                                <div className='overlay d-flex justify-content-center align-items-center p-3'>
                                                    <h3>{theme.name}</h3>
                                                </div>
                                                <img src={theme.img} alt={theme.name} className='w-100'/>
                                            </div>
                                        </button>
                                    </Link>
                                    )
                                }
                            </div>
                        </div>
                        :<></>
                    }
                </div>
                : 
                <div className='styleWindow position-absolute bg-white'>
                    {/* {
                        viewDesigns ?
                        <div className='m-3'>
                            <div className="d-flex justify-content-end">
                                <button onClick={()=>setViewStyle(!viewStyle)}><i className="fas fa-times"></i></button>
                            </div>
                            <h2>{viewDesigns?.category}</h2>
                            <div className="row flex-wrap justify-content-around">
                                {
                                    viewDesigns?.themes?.map((theme:any, idx: number)=>
                                    <Link to={`/Admin/Store/${storeInfo?.storeNumber}/Site/Design/${theme.id}`} className='col-lg-43 col-md-4 col-sm-6'>
                                        <div className="card m-2 p-0 border-0" >
                                            <div className="card-body p-0">
                                                <div className='overlay d-flex justify-content-center align-items-center p-3'>
                                                    <h3>{theme.name}</h3>
                                                </div>
                                                <img src={theme.img} alt={theme.name} className='w-100'/>
                                            </div>
                                        </div>
                                    </Link>
                                    )
                                }
                            </div>
                        </div>
                        :<></>
                    } */}

                </div>
            }
        </div>
    )
}

export default Site