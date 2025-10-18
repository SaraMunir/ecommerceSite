import  {  useContext, useEffect, useState } from 'react'
import styleData from '../../designData.json'
import { Store } from '../../Store'

import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import GoogleFont from 'react-google-font';
import DesignElements from './DesignElements';
import { useGetStoreDetailsByIdQuery, useUpdateStoreByIdMutation, useGetStoresQuery } from '../../hooks/storeHooks'

function DesignTemplate() {
    const {state:{ storeInfo}, dispatch } = useContext(Store)
    const { data: stores, isLoading, error, refetch} = useGetStoresQuery()
    const { data: storeDetails, isLoading: isLoadingDetails, error: errorDetails, refetch: refetchDetails } = useGetStoreDetailsByIdQuery(storeInfo?.storeId!)

    
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const {storeNumber} = useParams()
    const [selectedTemplate, setSelectedTemplate] = useState<any>({})
    const [headingFont, setHeadingFont] = useState('')
    const [bodyFont, setBodyFont] = useState('')
    const designId = searchParams.get('designId');
    const designCatId = searchParams.get('designCatId');
    const designTheme = searchParams.get('designTheme');
    const [navigation, setNavigation] = useState<any>({});
    let r = document.querySelector(':root') as HTMLElement | null;
    const { mutateAsync: update } = useUpdateStoreByIdMutation(storeInfo?.storeId!)
    const handleSelectTemplate = async (template:any)=>{
        console.log("Selected template: ", template)
        try {
            const data = await update({
                storeTheme: template
            })
            if(data){
                console.log("Store theme updated successfully: ", data)
                // refetch store details
                refetchDetails();
                // update storeInfo in context
                dispatch({ type: 'SET_STORE_INFO', payload: { ...storeInfo, storeTheme: template } })
            }
        } catch (error) {
            console.log("Error updating store theme: ", error)
        }
    }
    useEffect(() => {
        styleData.styles.forEach(element => {
            element.themes.forEach(theme => {
                if(theme.id == designId){
                    console.log('theme:', theme);
                    setSelectedTemplate(theme)
                    console.log("Selected template set to: ", theme.fonts.heading)
                    console.log("Selected template set to: ", theme.fonts.body)
                    setHeadingFont(theme.fonts.heading)
                    setBodyFont(theme.fonts.body)
                    console.log("Applying theme styles: ", theme)
                    r?.style.setProperty('--customPrimary', theme?.colors?.primary);
                    r?.style.setProperty('--customSecondary', theme?.colors?.secondary);
                    r?.style.setProperty('--customAccent', theme?.colors?.accent);
                    r?.style.setProperty('--customBackground', theme?.colors?.background);
                    r?.style.setProperty('--bodyFont', theme?.fonts?.body);
                    r?.style.setProperty('--headingFont', theme?.fonts?.heading);
                    r?.style.setProperty('--customText', theme?.colors?.text);
                    if(theme.site?.navigation){
                        setNavigation(theme.site.navigation);
                    }
                    // r?.style.setProperty('--headingFont', theme?.fonts?.heading);
                }
            })
        });
        console.log("storeDetails: ", storeDetails)
        // --customPrimary
        // r.style.setProperty('--blue', 'red');
    }, [storeDetails])
    
    return (
        <div className='designTemplate'>
            storeInfo?.storeTheme?.id: {storeInfo?.storeTheme?.id}
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <button className='btn btn-outline-primary' onClick={() => navigate(`/Admin/Store/${storeNumber}/Site/Style?designId=${designId}&designCatId=${designCatId}&designTheme=${designTheme}`)}><i className="fas fa-arrow-left"></i> go back</button>
                {/* if theme selected add button with green tick
                */}
                {
                selectedTemplate &&  selectedTemplate.id == storeDetails?.storeTheme?.id ?
                <span className='text-success fw-bold'>Current Theme <i className="fas fa-check-circle text-success"></i></span> :
                <button className='btn btn-primary' onClick={() => handleSelectTemplate(selectedTemplate)}>select</button>
            }
            {/* <i className="fas fa-check-circle text-success"></i> */}
            </div>
            <GoogleFont
                fonts={[{ font: headingFont, weights: [400, 700] }, { font: bodyFont, weights: [400, 700] }]}
                subsets={['latin', 'latin-ext']}
            />
            <div className='body-font'>
                <nav className='navigation row justify-content-between align-items-center secondary-bkg p-3 primary-text m-0'>
                    <div className="col-md-6"><a className='heading-font fw-bolder fs-3' href="#home">{selectedTemplate?.name}(Logo)</a></div>
                    <div className="col-md-6 row">
                        <a href="#shop" className='col'>shop</a>
                        <a href="#aboutus" className='col'>about us</a>
                        <a href="#contact" className='col'>contact</a>
                    </div>
                </nav>
                <nav className={
                    navigation?.layout?.alignment === "row" ?
                    'navigation row justify-content-between align-items-center secondary-bkg p-3 primary-text m-0' :
                    'navigation col justify-content-between align-items-center text-center secondary-bkg p-3 primary-text m-0'}>
                    {
                        navigation?.layout?.sections.length > 0 ?
                        navigation?.layout?.sections.map((section:any, indx:number) =>
                            <div key={'nav-layout-sect-'+indx} className={
                            section.position === "start" ? 
                                section?.alignment === "col" ?
                                    "col d-flex flex-column justify-content-start align-items-center" :
                                    "col row justify-content-start align-items-center" 
                                    : 
                                    section.position === "end" ? 
                                "col row justify-content-end align-items-center" 
                            : "col row justify-content-between align-items-center"
                            }>
                                {
                                    section.elements.length > 0 ?
                                    section.elements.map((element:any, idx:number) =>
                                        <DesignElements section={section} element={element} idx={idx} />
                                    )
                                    :
                                    section.subSections.length > 0 ?
                                    section.subSections.map((subSection:any, idx:number) =>
                                        <div className={
                                            section?.alignment === "row" ?
                                                subSection.position === "start" ?
                                                'col row justify-content-start align-items-center border-1'+ section.id:
                                                subSection.position === "end" ?
                                                'col row justify-content-end align-items-center border-1'+ section.id:
                                            'col row justify-content-between align-items-center border-2':
                                            'col justify-content-between align-items-center border-3'
                                            } key={idx}>
                                            {
                                            subSection.elements.length > 0 ?
                                            subSection.elements.map((element:any, idx:number) =>
                                                <DesignElements section={subSection} element={element} idx={idx} />)
                                            : 
                                            <></>
                                            }
                                        </div>
                                        )
                                    : <></>
                                }
                            </div>
                        ) : 
                        <></>
                    }
                </nav>
                <header className='text-center p-5 primary-bkg'>
                    <img src={selectedTemplate?.image} alt="" />
                </header>
                <section>

                </section>
            </div>
        </div>
    )
}

export default DesignTemplate