import React, { useContext, useEffect, useState } from 'react'
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
import { useParams } from 'react-router-dom'

function DesignTemplate() {
    const params = useParams()
    const { designId } = params
    const [allStyles, setAllStyles] = useState<any>([])
    const [selectedTemplate, setSelectedTemplate] = useState<any>({})
    useEffect(() => {
        let newStyleList=[]
        styleData.styles.forEach(element => {
            element.themes.forEach(theme => {
                if(theme.id == designId){
                    setSelectedTemplate(theme)
                }   
            })
        });
        
    }, [allStyles])
    
    return (
        <div>
            {selectedTemplate?.name}
            <nav className='navigation row'>
                <div className="col-md-6"><a href="#home">Home(Logo)</a></div>
                <div className="col-md-6 row">
                    <a href="#shop" className='col'>shop</a>
                    <a href="#aboutus" className='col'>about us</a>
                    <a href="#contact" className='col'>contact</a>
                </div>
                

            </nav>

        </div>
    )
}

export default DesignTemplate