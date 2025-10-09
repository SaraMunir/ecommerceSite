import React, { useRef, useState } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'


function AdminTabs(
    props: { 
        storeNumber: number ;
        toggleMenu: () => void;
        menuOpen: boolean;
        bodyContent: boolean;
    }
    ) {
    let location = useLocation();
    const [baseUrl, setBaseUrl] = useState(`/Admin/Store/${props.storeNumber}/`)

    const [adminTabs, setAdminType] = useState(
        [
            {name: 'Dashboard', href: baseUrl, className: "fas fa-chart-bar"},
            // {
            //     name: 'Products',  
            //     tabName: 'Products',  
            //     href: baseUrl+'Products', 
            //     className: "fas fa-shopping-cart",
            //     subMenu:[
            //         {
            //             name: 'Categories',
            //             href: `${baseUrl}Products/Categories`,
            //             className: "fas fa-shapes"
            //         },
            //         // {
            //         //     name: 'Promotional',
            //         //     href: `${baseUrl}Products/Promotional`,
            //         //     className: "fas fa-percent"
            //         // },
            //         {
            //             name: 'Item 1-2',
            //             href: '#item-1-2',
            //             className: ""
            //         }
            //     ]
            // },
            {
                name: 'Products', 
                tabName: 'NewProducts',
                href: baseUrl+'NewProducts', 
                className: "fas fa-shopping-cart",
                subMenu:[
                    {
                        name: 'Categories',
                        href: `${baseUrl}NewProducts/CategoryList`,
                        className: "fas fa-shapes"
                    },
                    {
                        name: 'Promotional',
                        href: `${baseUrl}NewProducts/Promotional`,
                        className: "fas fa-percent"
                    }
                ]
            },
            {
                name: 'Online Store',  
                tabName: 'Site',

                href: baseUrl+'Site', 
                className: "fas fa-window-maximize",
                subMenu:[
                    {
                        name: 'Pages',
                        href: `${baseUrl}Site/Pages`,
                        className: "bi bi-file-earmark-fill"
                    },
                    {
                        name: 'Style',
                        href: `${baseUrl}Site/Style`,
                        className: "bi bi-palette-fill"
                    },
                    {
                        name: 'Navigation',
                        href: `${baseUrl}Site/Navigation`,
                        className: "bi bi-menu-button-wide-fill"
                    },
                    {
                        name: 'Preferences',
                        href: `${baseUrl}Site/Preferences`,
                        className: "bi bi-sliders"
                    },
                     {
                        name: 'Components',
                        href: `${baseUrl}Site/Components`,
                        className: "bi bi-grid-fill"
                    },
                ]
            },
            {name: 'Media', tabName: 'Media', href: baseUrl+'Media', className: "far fa-images"},
            {name: 'Orders', tabName: 'Orders', href: baseUrl+'Orders', className: "fas fa-file-invoice-dollar"},
            {name: 'Customers', tabName: 'Customers', href: baseUrl+'Customers', className: "fas fa-users"},
            {name: 'Settings', tabName: 'Settings', href: baseUrl+'Settings', className: "fas fa-cog"},
        ]
    )
    return (
        // <Col className='col-md-3 col-lg-2 d-md-block bg-light sidebar vh-100 border pe-0 position-sticky top-0' >
        <div className={props.bodyContent ? 'position-relative col-md-3 col-lg-2 transition col-0' : 'position-relative transition col-0'}>
            <button className={props.menuOpen ? "btn btn-primary position-absolute start-100 top-0 menu-open-btn rounded-start-0 ms-n1" : "btn btn-primary position-absolute start-0 top-0  menu-open-btn rounded-start-0 ms-n1"} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" onClick={() => props.toggleMenu()}>
                {
                    props.menuOpen ? <i className="bi bi-chevron-left"></i> : <i className="bi bi-chevron-right"></i>
                }
            </button>
            {/* <Col className="offcanvas offcanvas-start show position-absolute bg-light"data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel"> */}
            <Col className=' d-md-block bg-light sidebar vh-100 border pe-0 position-sticky top-0'>
                <ListGroup defaultActiveKey="#link1" className='nav flex-column list-group-flush bg-light' >
                    {
                    adminTabs.map((tab:any, idx:number)=>
                        <div key={'tabkey-'+idx}>
                            <ListGroup.Item action href={tab.href} className={location.pathname == tab.href? 'active':''} key={"adminTab"+idx}>
                                <i className={tab.className} style={{width:"25px"}}></i>{tab.name}
                            </ListGroup.Item> 
                            
                            {
                            tab.subMenu?.length > 0 && location.pathname.includes(`${tab.tabName}`)? 
                            <nav id="navbar-example3" className="h-100 flex-column align-items-stretch border-end">
                                <nav className="ms-3 nav nav-pills flex-column">
                                    {
                                        tab.subMenu.map((subMenu:any, idx:number)=>
                                            <a key={subMenu.name+idx}  href={subMenu.href} className={location.pathname == subMenu.href? 'nav-link active rounded-0':'nav-link rounded-0'} >
                                            {
                                                subMenu.className ? 
                                                <i className={subMenu.className} style={{width:"25px"}}></i>  
                                                :
                                                null
                                            } 
                                            &nbsp;
                                            {subMenu.name}
                                        </a>
                                        )
                                    }
                                </nav>
                            </nav>
                            :null}
                            {/* {
                            location.pathname.includes('/Products')? 
                            <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end">
                                <nav className="ms-3 nav nav-pills flex-column">
                                    <a className="nav-link" href={tab.href+'/Categories'}>
                                    <i className="fas fa-shapes" style={{width:"25px"}}></i>  
                                    Categories</a>
                                    <nav className="nav nav-pills flex-column">
                                        <a className="nav-link ms-3 my-1" href="#item-1-1">Item 1-1</a>
                                        <a className="nav-link ms-3 my-1" href="#item-1-2">Item 1-2</a>
                                    </nav>
                                </nav>
                            </nav>
                            :null} */}
                            
                        </div>
                        // :

                        // <ListGroup.Item action href={tab.href} className={location.pathname == tab.href? 'active':''} key={"adminTab"+idx}>
                        //     🟦<i className={tab.className} style={{width:"25px"}}></i>{tab.name}
                        // </ListGroup.Item>

                        )
                    }

                </ListGroup>
            </Col>
        </div>
    )
}

export default AdminTabs