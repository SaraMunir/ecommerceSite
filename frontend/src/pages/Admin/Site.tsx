import  { useContext, useEffect, useState } from 'react'
import styleData from '../../designData.json'
import {  Link } from 'react-router-dom'
import { Store } from '../../Store'
import {  } from 'react-router-dom';

function Site() {
    const {state:{ storeInfo} } = useContext(Store)
    // const navigate = useNavigate();
    // const {storeNumber} = useParams()


    const [siteStyles] = useState(styleData.styles)
    const [viewDesigns, setViewDesigns] = useState<any>({})

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
            siteStyles.forEach(element => {
                console.log("element: ", element)
            });
            console.log("selectedStyle: ", selectedStyle)

            if(selectedStyle){
                setViewDesigns(selectedStyle);
                setViewStyle(true);
            }
        }    
    }, [])
    


    return (
        <div className='site position-relative'>
            <h1>Templates</h1>
            <p>start with a template</p>
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