import  {  useContext, useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import GoogleFont from 'react-google-font';

import { Container, ListGroup, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
// Update the import path to match the actual location and casing of StoreHeader
import StoreHeader from '../../components/Structure/StoreHeader';
import { useGetStoreDetailsByIdQuery } from '../../hooks/storeHooks'


function StoreFront() {
    const {storeId} = useParams()
    const { data: storeDetails, isLoading: isLoadingDetails, error: errorDetails } = useGetStoreDetailsByIdQuery(storeId!)
    const [headingFont, setHeadingFont] = useState('')
    const [bodyFont, setBodyFont] = useState('')
    let r = document.querySelector(':root') as HTMLElement | null;
    const [searchParams] = useSearchParams();
    const viewType = searchParams.get('viewType');
    const srcType = searchParams.get('srcType');
    const [baseUrl, setBaseUrl] = useState(`/Admin/Store/${storeDetails?.storeNumber}/`)
    // const [src, setSrc] = useState('')


    useEffect(() => {
        console.log("storeDetails: ", storeDetails)
        console.log("primary: ", storeDetails?.storeTheme?.colors?.primary)
        if(storeDetails?.storeTheme){
            setHeadingFont(storeDetails.storeTheme.fonts.heading)
            setBodyFont(storeDetails.storeTheme.fonts.body)
            r?.style.setProperty('--customPrimary', storeDetails?.storeTheme?.colors?.primary);
            r?.style.setProperty('--customSecondary', storeDetails?.storeTheme?.colors?.secondary);
            r?.style.setProperty('--customAccent', storeDetails?.storeTheme?.colors?.accent);
            r?.style.setProperty('--customBackground', storeDetails?.storeTheme?.colors?.background);
            r?.style.setProperty('--bodyFont', storeDetails?.storeTheme?.fonts?.body);
            r?.style.setProperty('--headingFont', storeDetails?.storeTheme?.fonts?.heading);
            r?.style.setProperty('--customText', storeDetails?.storeTheme?.colors?.text);
        }
        if(storeDetails?.storeNumber){
            setBaseUrl(`/Admin/Store/${storeDetails.storeNumber}/`)
        }
    }, [storeDetails])
    
    return (
        <div>
        <GoogleFont
            fonts={[{ font: headingFont, weights: [400, 700] }, { font: bodyFont, weights: [400, 700] }]}
            subsets={['latin', 'latin-ext']}
        />
        <div className="d-flex justify-content-end">
            {/* {storeDetails?.storeNumber}
            srcType: {srcType} */}
            {
                (viewType === 'preview'  || viewType === 'edit') &&
                <Link to={baseUrl+'Site/'+srcType} className='btn btn-primary m-3'>Go back</Link>
            }
        </div>
        
        <Row>
            {/* <Header switchModeHandler={switchModeHandler} mode={mode} userInfo={userInfo} signoutHandler={signoutHandler}/> */}
            <StoreHeader storeDetails={storeDetails} storeId={storeId} />
            <Outlet />
        </Row>
        </div>
    )
}

export default StoreFront