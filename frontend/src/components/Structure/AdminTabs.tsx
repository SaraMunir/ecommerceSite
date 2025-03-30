import React, { useState } from 'react'
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
            {name: 'Products',  href: baseUrl+'Products', className: "fas fa-shopping-cart"},
            {name: 'Orders',  href: baseUrl+'Orders', className: "fas fa-file-invoice-dollar"},
            {name: 'Customers',  href: baseUrl+'Customers', className: "fas fa-users"},
            {name: 'Settings',  href: baseUrl+'Settings', className: "fas fa-cog"},
        ]
    )
    // <i class="fas fa-cog"></i>
    return (
        <Col className='col-md-3 col-lg-2 d-md-block bg-light sidebar vh-100 border pe-0 position-sticky top-0' >
                <ListGroup defaultActiveKey="#link1" className='nav flex-column list-group-flush bg-none' >
                    {
                    adminTabs.map((tab:any, idx:number)=>
                    
                    <ListGroup.Item action href={tab.href} className={location.pathname == tab.href? 'active':''} key={"adminTab"+idx}>
                        <i className={tab.className} style={{width:"25px"}}></i>{tab.name}
                    </ListGroup.Item>
                    )
                    }

                </ListGroup>
        </Col>
    )
}

export default AdminTabs