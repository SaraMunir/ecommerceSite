import { useContext, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Store } from '../../Store'

function Pages() {
    const {state:{ storeInfo} } = useContext(Store)
    const [pages] = useState([
        {
            name: 'homepage',
            displayName: 'Home',
            status: 'active'
        },
        {
            name: 'contactUs',
            displayName: 'Contact Us',
            status: 'active'
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
                            pages.map(page=>
                        <li className="list-group-item d-flex">
                            <div className='col-6 hover-container'>
                                {page.displayName}
                                <span className='ms-3 hover-show'>
                                    {
                                        page.name == 'homepage' ?
                                        <a href={"/Store/"+storeInfo.storeId} data-bs-toggle="tooltip" data-bs-placement="top" title="view page"><i className="fas fa-eye"></i></a>
                                        : 
                                        <a href={"/Store/"+storeInfo.storeId+"/"+page.name} data-bs-toggle="tooltip" data-bs-placement="top" title="view page"><i className="fas fa-eye"></i></a>
                                    }
                                    {/* <a href={"/Store/"+storeInfo.storeId} data-bs-toggle="tooltip" data-bs-placement="top" title="view page"><i className="fas fa-eye"></i></a> */}
                                </span>
                            </div>
                            <div className="col-2">
                                <a href={`/Admin/Store/${storeInfo.storeNumber}/Site/Page/${page.name}`}>Edit</a>
                            </div>
                            <div className="col-2">active</div>
                            <div className="col-2"></div>
                        </li>
                            )
                        }
                        {/* <li className="list-group-item d-flex">
                            <div className='col-6 hover-container'>
                                Homepage
                                <span className='ms-3 hover-show'>
                                    <a href={"/Store/"+storeInfo.storeId} data-bs-toggle="tooltip" data-bs-placement="top" title="view page"><i className="fas fa-eye"></i></a>
                                </span>
                            </div>
                            <div className="col-2">
                                <a href={`/Admin/Store/${storeInfo.storeId}/Site/Page/home`}>Edit</a>
                            </div>
                            <div className="col-2">active</div>
                            <div className="col-2"></div>
                        </li>
                        <li className="list-group-item d-flex">
                            <div className='col-6 hover-container'>Contact Us
                                <span className='ms-3 hover-show'>
                                    <a href={"/Store/"+storeInfo.storeId+"/contact-us"} data-bs-toggle="tooltip" data-bs-placement="top" title="view page"><i className="fas fa-eye"></i></a>
                                </span>
                            </div>
                            <div className="col-2"></div>
                            <div className="col-2">active</div>
                            <div className="col-2"></div>
                        </li> */}
                    </ul>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Pages