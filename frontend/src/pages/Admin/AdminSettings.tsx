import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'

function AdminSettings() {
    const [storeName, setStoreName] = useState('')
return (
    <div>

        <div className="accordion accordion-flush " id="accordionFlushExample">
            <div className="accordion-item bg-transparent">
                <h2 className="border-0 bg-transparent mb-0">
                    <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">General</button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse show" >
                    <div className="accordion-body">
                        <Card className='w-100 my-3'>
                            <Card.Body className='p-4'>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5>Store Details</h5> 
                                    <Button variant="primary"size="sm" >edit</Button>
                                </div>
                                {/* <hr /> */}
                                <ul className="list-group list-group">
                                    <li className="list-group-item">
                                        <span>Store Name: </span>
                                        <br />
                                        example 
                                    </li>
                                    <li className="list-group-item">
                                        <span>store address:</span>
                                        <br />
                                        30 shore breeze drive,
                                        <br />
                                        etobicoke, on, m8v oj1 canada
                                    </li>

                                    <li className="list-group-item">
                                        <span>Default weight unit:</span>
                                        <br />
                                        <span>kgs</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span>Time zone:</span>
                                        <br />
                                        <span>UTC</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span>Language:</span>
                                        <br />
                                        <span>en</span>
                                    </li>
                                </ul>
                                <ul className="list-group list-group">
                                    <li className="list-group-item">
                                        <div className="">
                                            <label htmlFor="formGroupExampleInput" className="form-label">Store Name</label>
                                            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder"/>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>store address: example </span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>currency: example </span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>Default weight unit: example lbs, kgs </span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>time zone: example </span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>language: en </span>
                                        </div>
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="accordion-item bg-transparent">
                <h2 className="border-0 bg-transparent mb-0">
                    <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">Payment</button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse" >
                    <div className="accordion-body">
                        <Card className='w-100 my-3'>
                            <Card.Body className='p-4'>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5>Payment Gateways</h5>
                                </div>
                                <ul className="list-group list-group">
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>store name: example </span>
                                            <button>edit</button>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>store address: example </span>
                                            <button>edit</button>
                                        </div>
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="accordion-item bg-transparent">
                <h2 className="border-0 bg-transparent mb-0">
                    <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">Tax</button>
                </h2>
                <div id="flush-collapseThree" className="accordion-collapse collapse" >
                    <div className="accordion-body">
                        <Card className='w-100 my-3'>
                            <Card.Body className='p-4'>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5>Tax</h5>
                                    {/* <Button variant="primary"  size="sm">edit</Button> */}
                                </div>
                                {/* <hr /> */}
                                <ul className="list-group list-group">
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>store name: example </span>
                                            <button>edit</button>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>store address: example </span>
                                            <button>edit</button>
                                        </div>
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="accordion-item bg-transparent">
                <h2 className="border-0 bg-transparent mb-0">
                    <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseUsers" aria-expanded="false" aria-controls="flush-collapseUsers">Users</button>
                </h2>
                <div id="flush-collapseUsers" className="accordion-collapse collapse" >
                    <div className="accordion-body">
                        <Card className='w-100 my-3'>
                            <Card.Body className='p-4'>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5>Users</h5>
                                </div>
                                <ul className="list-group list-group">
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>store name: example </span>
                                            <button>edit</button>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>store address: example </span>
                                            <button>edit</button>
                                        </div>
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default AdminSettings