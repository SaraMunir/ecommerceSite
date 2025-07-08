import React, { useEffect, useState } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

function AdminTabs(
    props: { 
        storeNumber: number ; }
    ) {
    let location = useLocation();
    const [baseUrl, setBaseUrl] = useState(`/Admin/Store/${props.storeNumber}/`)
    const [adminTabs, setAdminType] = useState(
        [

            {name: 'Dashboard', href: baseUrl, className: "fas fa-chart-bar"},
            {
                name: 'Products',  href: baseUrl+'Products', 
                className: "fas fa-shopping-cart",
                subMenu:[
                    {
                        name: 'Categories',
                        href: `${baseUrl}Products/Categories`,
                        className: "fas fa-shapes"
                    },
                    {
                        name: 'item 1-1',
                        href: '#item-1-1',
                        className: ""
                    },
                    {
                        name: 'Item 1-2',
                        href: '#item-1-2',
                        className: ""
                    }
                ]
            },
            {name: 'Site',  href: baseUrl+'Site', className: "fas fa-window-maximize",
                subMenu:[
                    {
                        name: 'Pages',
                        href: `${baseUrl}Site/Pages`,
                        className: "fas fa-file"
                    },
                    {
                        name: 'Style',
                        href: `${baseUrl}Site/Style`,
                        className: "fas fa-palette"
                    },
                    {
                        name: 'Components',
                        href: `${baseUrl}Site/Components`,
                        className: "fas fa-th-large"
                    }
                ]
            },
            {name: 'Orders',  href: baseUrl+'Orders', className: "fas fa-file-invoice-dollar"},
            {name: 'Customers',  href: baseUrl+'Customers', className: "fas fa-users"},
            {name: 'Settings',  href: baseUrl+'Settings', className: "fas fa-cog"},
        ]
    )
    return (
        <Col className='col-md-3 col-lg-2 d-md-block bg-light sidebar vh-100 border pe-0 position-sticky top-0' >
                <ListGroup defaultActiveKey="#link1" className='nav flex-column list-group-flush bg-none' >
                    {
                    adminTabs.map((tab:any, idx:number)=>
                        // tab.name == 'Products' ?
                        <div key={'tabkey-'+idx}>
                            <ListGroup.Item action href={tab.href} className={location.pathname == tab.href? 'active':''} key={"adminTab"+idx}>
                                <i className={tab.className} style={{width:"25px"}}></i>{tab.name}
                            </ListGroup.Item> 
                            {
                            tab.subMenu?.length>0 && location.pathname.includes(`${tab.name}`)? 
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
    )
}

export default AdminTabs