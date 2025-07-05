import React, { useContext, useState } from 'react'
// import beauty from '../../assets/111.png'
// import fashionImg from '../../assets/222.png'
// import homeAndLivingImg from '../../assets/666.png'
// import petCareAndSuppliesImg from '../../assets/444.png'
// import plantCareAndSuppliesImg from '../../assets/333.png'
// import techAndSupplies from '../../assets/555.png'
// import botanicHero from '../../assets/botanicHero.png'
// import softLuxeImg from '../../assets/softLuxeImg.png'
// import kBeautyImg from '../../assets/kBeautyImg.png'
// import cleanClinicalBrightImg from '../../assets/cleanClinicalBrightImg.png'
// import vibrantPop from '../../assets/vibrantPop.png'
// import vibrantPopClothing from '../../assets/vibrantPopFashionHero.png'
// import luxeMode from '../../assets/luxeMode.png'
// import retroRevival from '../../assets/retroRevival.png'
// import modernEase from '../../assets/modernEase.png'
// import urbanEdge from '../../assets/urbanEdge.png'
// import bohoSpirit from '../../assets/BohoSpirit.png'
// import neoChrome from '../../assets/neoChromeHero.png'
// import quantumNoir from '../../assets/quantumNoirHero1.png'
// import circuitPulse from '../../assets/circuitPluseHero.png'
// import spaceCore from '../../assets/spaceCoreHomeHero.png'
// import scandiMinimalism from '../../assets/ScandiMinimalismThumb.png'
// import artDecoLuxe from '../../assets/ArtDecoLuxeHero.png'
// import midCenturyModern from '../../assets/Mid-CenturyModernOpt2Hero.png'
// import organicEarth from '../../assets/OrganicEarthHero.png'
// import urbanIndustrial from '../../assets/UrbanIndustrialThumb.png'
// import urbanPaw from '../../assets/urbanPawHero.png'
// import wildTails from '../../assets/wildTailsHero.png'
// import whiskerPop from '../../assets/whiskerPopHero.png'
// import cozyCritters from '../../assets/cozyCrittersHero.png'
// import rusticTails from '../../assets/rusticTailsHero.png'
// import playfulPaws from '../../assets/playfulPawsHero.png'
// import tropicalParadise from '../../assets/tropicalParadiseHero.png'
// import zenGarden from '../../assets/zenGardenHero.png'
// import vintageGlasshouse from '../../assets/vintageGlasshouseHero.png'
// import urbanJungle from '../../assets/urbanJungleHero.png'

import styleData from '../../designData.json'

import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Store } from '../../Store'

function Site() {
        const {state:{ storeInfo}, dispatch } = useContext(Store)

    const [siteStyles, setSiteStyles] = useState(styleData.styles)
    const [viewDesigns, setViewDesigns] = useState<any>({})

    const [viewStyle, setViewStyle] = useState(false)
    
    const selectCategory=(category: string, idx: number)=>{
        setViewDesigns(siteStyles[idx])
        setViewStyle(true)
    }
    const [modalShow, setModalShow] = useState(false);


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
                            <button className="card m-2 p-0 border-0" onClick={()=>selectCategory(style.category, idx)}>
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
                            <div className="d-flex justify-content-end">
                                <button onClick={()=>setViewStyle(!viewStyle)}><i className="fas fa-times"></i></button>
                            </div>
                            <h2>{viewDesigns?.category}</h2>
                            <div className="row flex-wrap justify-content-around">
                                {
                                    viewDesigns?.themes?.map((theme:any, idx: number)=>
                                    <Link to={`/Admin/Store/${storeInfo?.storeNumber}/Site/Design/${theme.id}`} className='col-lg-43 col-md-4 col-sm-6'>
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
                    {
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
                    }

                </div>
            }
        </div>
    )
}

export default Site