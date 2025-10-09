import { useContext, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Store } from '../../../Store'

function Pages() {
    const {state:{ storeInfo} } = useContext(Store)
    const [pages] = useState([
        {
            name: 'homepage',
            displayName: 'Home',
            status: 'active'
        },
        {
            name: 'contact',
            displayName: 'Contact Us',
            status: 'active'
        },
        {
            name: 'about',
            displayName: 'About Us',
            status: 'active'
        },
        {
            name: 'products',
            displayName: 'Catalog',
            status: 'active'
        },
        {
            name: 'product',
            displayName: 'Product Display',
            status: 'active'
        }
    ])
    const [navigations, setNavigations] = useState([
        {
            name: 'Main Menu',
            url: '/store/main-menu'
        },
        {
            name: 'Footer Menu',
            url: '/store/footer-menu'
        },
        {
            name: 'Social Links',
            url: '/store/social-links'
        }
    ])

    return (
        <div>
            <Card className='w-100 my-3'>
                <Card.Body className='p-4'>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5>Pages</h5>
                        {/* <Link variant="primary" size="md" to={`/Admin/Store/${storeInfo?.storeNumber}/Product/Create`} ><i className="fas fa-plus"></i> &nbsp;Create Product</Link> */}
                    </div>
                    <ul className="list-group list-group">
                        <li className="list-group-item bg-primary-subtle text-capitalize fw-semibold d-flex">
                            <div className='col-6'>Name</div>
                            <div className="col-2">edit</div>
                            <div className="col-2">Status</div>
                            <div className="col-2">created at</div>
                            {/* <div className="col-2">create"col-4"></div> d at</div> */}
                            {/* <div className=*/}
                        </li>
                        {
                            pages.map((page, index) =>
                        <li className="list-group-item d-flex" key={page.name+`-`+index}>
                            <div className='col-6 hover-container'>
                                {page.displayName}
                                <span className='ms-3 hover-show'>
                                    {
                                        page.name == 'homepage' ?
                                        <a href={"/Store/"+storeInfo.storeId+'?viewType=preview&srcType=Pages'} data-bs-toggle="tooltip" data-bs-placement="top" title="view page"><i className="fas fa-eye"></i></a>
                                        :
                                        page.name == 'product' ?
                                        <a href={"/Store/"+storeInfo.storeId+"/"+page.name+'?viewType=preview&srcType=Pages&productId=123'} data-bs-toggle="tooltip" data-bs-placement="top" title="view page"><i className="fas fa-eye"></i></a>
                                        :
                                        <a href={"/Store/"+storeInfo.storeId+"/"+page.name+'?viewType=preview&srcType=Pages'} data-bs-toggle="tooltip" data-bs-placement="top" title="view page"><i className="fas fa-eye"></i></a>
                                    }
                                </span>
                            </div>
                            <div className="col-2">
                                <a href={`/Admin/Store/${storeInfo.storeNumber}/Site/Page/${page.name}`}>Edit</a>
                            </div>
                            {/* <div className="col-2">
                                <a href={`/Admin/Store/${storeInfo.storeNumber}/Site/Page/${page.name}`}>Edit</a>
                            </div> */}
                            <div className="col-2">active</div>
                            <div className="col-2"></div>
                        </li>
                            )
                        }
                    </ul>
                </Card.Body>
            </Card>
            <Card className='w-100 my-3'>
                <Card.Body className='p-4'>
                    <Card.Title>Navigation</Card.Title>
                    <div>
                        {/* This is where the content for the {page.name} page will go. */}
                        <div className="accordion" id="accordionPanelsStayOpenExample">
                            {navigations.map((nav, index) => (
                                <div key={index} className="accordion-item">
                                    <h2 className="accordion-header" id={"panelsStayOpen-heading"+index}>
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapse"+index} aria-expanded="true" aria-controls={"panelsStayOpen-collapse"+index}>
                                            {nav.name}
                                        </button>
                                    </h2>
                                    <div id={"panelsStayOpen-collapse"+index} className={ index < 1 ?"accordion-collapse collapse show": "accordion-collapse collapse"} aria-labelledby={"panelsStayOpen-heading"+index}>
                                        <div className="accordion-body">
                                            <div className='col-6'>{nav.name}</div>
                                            <div className='col-6'>{nav?.url}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <ul className="list-group list-group">
                            <li className="list-group-item bg-primary-subtle text-capitalize fw-semibold d-flex">
                                <div className='col-6'>Name</div>
                                <div className='col-6'>URL</div>
                            </li>
                            {navigations.map((nav, index) => (
                                <li key={index} className="list-group-item d-flex">
                                    <div className='col-6'>{nav.name}</div>
                                    <div className='col-6'>{nav?.url}</div>
                                </li>
                            ))}
                        </ul> */}
                    </div>
                </Card.Body>
            </Card> 
        </div>  
    )
}

export default Pages