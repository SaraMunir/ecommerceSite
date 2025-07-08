import  {  useEffect, useState } from 'react'
import styleData from '../../designData.json'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import GoogleFont from 'react-google-font';
import DesignElements from './DesignElements';

function DesignTemplate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

    // const searchParams = new URLSearchParams(window.location.search);
    const {storeNumber} = useParams()
    // const { testId } = params
    const [selectedTemplate, setSelectedTemplate] = useState<any>({})
    // const [style, setStyle] = useState<any>({})
    const [headingFont, setHeadingFont] = useState('')
    const [bodyFont, setBodyFont] = useState('')
    const designId = searchParams.get('designId');
    const designCatId = searchParams.get('designCatId');
    const designTheme = searchParams.get('designTheme');
    const [navigation, setNavigation] = useState<any>({});

    let r = document.querySelector(':root') as HTMLElement | null;

    // const fontFace = new FontFace(
    // 'MyCustomFont',
    // 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap'
    // );

// fontFace.load().then(() => {
//   document.fonts.add(fontFace);
//   document.querySelector('.my-element').style.fontFamily = 'MyCustomFont';
// });
    
    useEffect(() => {
        styleData.styles.forEach(element => {
            element.themes.forEach(theme => {
                if(theme.id == designId){
                    setSelectedTemplate(theme)

                    setHeadingFont(theme.fonts.heading)
                    setBodyFont(theme.fonts.body)
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

        // --customPrimary
        // r.style.setProperty('--blue', 'red');
    }, [])
    
    return (
        <div className='designTemplate'>
            <div className="mb-4">
                <button className='btn btn-outline-primary' onClick={() => navigate(`/Admin/Store/${storeNumber}/Site/Style?designId=${designId}&designCatId=${designCatId}&designTheme=${designTheme}`)}><i className="fas fa-arrow-left"></i> go back</button>
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
                        navigation?.layout?.sections.map((section:any, idx:number) =>
                            <div className={

                            section.position === "start" ? 
                            section?.alignment === "col" ?
                            "col d-flex flex-column justify-content-start align-items-center" :
                            "col row justify-content-start align-items-center" 
                            : 
                            section.position === "end" ? 
                            "col row justify-content-end align-items-center" 
                            : "col row justify-content-between align-items-center"
                            } key={idx}>
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