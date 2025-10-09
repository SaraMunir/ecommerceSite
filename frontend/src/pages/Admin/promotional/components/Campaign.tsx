import React, { Fragment, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Form } from 'react-bootstrap';
function Campaign() {
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const [campaignTitle, setCampaignTitle] = useState("");
    const [campaignDescription, setCampaignDescription] = useState("");
    const [campaignStartDate, setCampaignStartDate] = useState("");
    const [campaignEndDate, setCampaignEndDate] = useState("");

    let listofCampaigns = [
        {
            "_id": "campaign_001",
            "title": "Summer Glow",
            "description": "Brighten your skin with our summer essentials!",
            "type": "campaign",
            "startDate": "2025-07-01T00:00:00Z",
            "endDate": "2025-08-01T23:59:59Z",
            "heroImage": "/banners/summer-glow.jpg",
            "isActive": true,
            "assignedProducts": [
            "prod_vitamin_c_serum",
            "prod_sunscreen_spf50",
            "prod_hydrating_mist"
            ]
        },
        {
            "_id": "campaign_002",
            "title": "Holiday Gift Guide",
            "description": "Gifts they'll love — curated for the holidays.",
            "type": "campaign",
            "startDate": "2024-11-15T00:00:00Z",
            "endDate": "2024-12-26T23:59:59Z",
            "heroImage": "/banners/holiday-gift-guide.jpg",
            "isActive": false,
            "assignedProducts": [
            "prod_scented_candle_set",
            "prod_leather_wallet",
            "prod_gift_box"
            ]
        },
        {
            "_id": "campaign_003",
            "title": "Flash Sale Weekend",
            "description": "48 hours of deep discounts on top products!",
            "type": "campaign",
            "startDate": "2025-05-02T00:00:00Z",
            "endDate": "2025-05-04T23:59:59Z",
            "heroImage": "/banners/flash-sale.jpg",
            "isActive": false,
            "assignedProducts": [
            "prod_running_shoes",
            "prod_wireless_earbuds",
            "prod_portable_charger"
            ]
        },
        {
            "_id": "campaign_004",
            "title": "New Launch Promo",
            "description": "Celebrate the debut of our latest arrivals.",
            "type": "campaign",
            "startDate": "2025-02-15T00:00:00Z",
            "endDate": "2025-03-15T23:59:59Z",
            "heroImage": "/banners/new-launch.jpg",
            "isActive": false,
            "assignedProducts": [
            "prod_smart_mug",
            "prod_air_purifier",
            "prod_magnetic_desk_lamp"
            ]
        },
        {
            "_id": "campaign_005",
            "title": "Back to School Sale",
            "description": "Everything students need — all in one place.",
            "type": "campaign",
            "startDate": "2025-08-01T00:00:00Z",
            "endDate": "2025-09-01T23:59:59Z",
            "heroImage": "/banners/back-to-school.jpg",
            "isActive": true,
            "assignedProducts": [
            "prod_laptop_backpack",
            "prod_notebook_bundle",
            "prod_desk_organizer"
            ]
        },
        {
            "_id": "campaign_006",
            "title": "Spring Cleaning Sale",
            "description": "Fresh deals for a fresh start.",
            "type": "campaign",
            "startDate": "2025-03-01T00:00:00Z",
            "endDate": "2025-03-31T23:59:59Z",
            "heroImage": "/banners/spring-cleaning.jpg",
            "isActive": false,
            "assignedProducts": [
            "prod_organizer_bin",
            "prod_broom_set",
            "prod_cleaning_spray"
            ]
        },
        {
            "_id": "campaign_007",
            "title": "Valentine’s Day Picks",
            "description": "Gifts for someone special — or yourself.",
            "type": "campaign",
            "startDate": "2025-02-01T00:00:00Z",
            "endDate": "2025-02-14T23:59:59Z",
            "heroImage": "/banners/valentines-day.jpg",
            "isActive": false,
            "assignedProducts": [
            "prod_rose_perfume",
            "prod_chocolate_box",
            "prod_couple_mugs"
            ]
        }
        ];

    const [listOfCampaigns, setListOfCampaigns] = useState<typeof listofCampaigns>(listofCampaigns);
    useEffect(() => {
        if(!listOfCampaigns || listOfCampaigns.length === 0) {
            console.log("No campaigns available");
            setListOfCampaigns(listOfCampaigns);
        }
        return () => {
                
            }
        }, [])
        

    return (
    <div>
        <div className="d-flex">
            <h1 className="me-auto">Campaign Management</h1>
            {/* <button className="btn btn-primary">Create New Campaign</button> */}
        </div>
        <p className='fw-bold'>Plan, Launch, and Track Marketing Campaigns</p>
        <p>Use the Campaign Builder to create time-based promotions, group related products, and boost visibility across your store. Easily manage active and past campaigns, monitor performance, and launch new marketing initiatives in just a few clicks.</p>
        <div>
        <Tabs
        defaultActiveKey="All"
        id="justify-tab-example"
        className="mb-3"
        justify
        >
        <Tab eventKey="All" title="All Campaigns">
            current campaigns
            <p>Here you can view all your active campaigns.</p>
            <div>
                🧩 Features of Campaign Builder
                    Feature	Purpose
                    Campaign name	Displayed on site and admin panel
                    Start & end dates	Controls visibility and scheduling
                    Description	Optional – for internal use or banners
                    Assigned products	Products attached to the campaign
                    Hero image/banner	Optional – for homepage or promo slots
                    Visibility toggle	Control whether it's published

                
            </div>

            <ul className="list-unstyled">
                <li className='w-100 d-flex justify-content-end'><button className='btn btn-primary my-3' onClick={() => setLgShow(true)}>Create New Campaign</button></li>
                <li className='row card mb-1'>
                    <div className="card-body row align-items-center py-2">
                        <div className='col d-flex align-items-center'><button className='btn btn-link'><i className="far fa-square"></i></button> Campaign Name &nbsp; &nbsp;<button className='btn btn-link'><i className="fas fa-sort"></i></button></div>
                        <div className='col d-flex align-items-center'>Start Date &nbsp; &nbsp;<button className='btn btn-link'><i className="fas fa-sort"></i></button></div>
                        <div className='col d-flex align-items-center'>End Date &nbsp; &nbsp;<button className='btn btn-link'><i className="fas fa-sort"></i></button></div>
                        <div className='col d-flex align-items-center'>Status &nbsp; &nbsp;<button className='btn btn-link'><i className="fas fa-sort"></i></button></div>
                    </div>
                </li>
                {
                    Array.isArray(listOfCampaigns) && listOfCampaigns.length > 0 ?
                    listOfCampaigns.map((campaign:any, idx:number) =>   

                <li className='row card mb-1' key={campaign.id}>
                    <div key={idx} className='card-body row align-items-center py-2'>
                        <div className='col'><button className='btn btn-link'><i className="far fa-square"></i></button>{campaign.title}</div>
                        <div className='col'>{campaign.startDate}</div>
                        <div className='col'>{campaign.endDate}</div>
                        <div className='col'>
                            {/* {campaign.isActive ? <span className='p-3 mb-2 bg-success-subtle text-success-emphasis'>Active</span> : <span className='p-3 mb-2 bg-danger-subtle text-danger-emphasis'>Inactive</span>} */}
                            <span className={campaign.isActive ? 'w-75 text-center px-3 rounded-1 d-inline-block p-1 mb-2 bg-success-subtle text-success-emphasis':'w-75 text-center px-3 rounded-1 d-inline-block p-1 mb-2 bg-danger-subtle text-danger-emphasis'}>{ campaign.isActive ? 'Active' : 'Inactive'}</span>


                        </div>
                    </div>
                </li>
                )
                : 
                <li className='row card mb-1'>
                    <div className='card-body row align-items-center py-2'>
                        <div className='col ps-5'>No Campaigns yet</div>
                        <div className='col'></div>
                        <div className='col'></div>
                        <div className='col'></div>
                    </div>
                </li>  
                }
                <li  className='row card mb-1'>
                    <div className='card-body row align-items-center py-2'>
                        <div className='col'><button className='btn btn-link'><i className="far fa-square"></i></button> Back to School Sale</div>
                        <div className='col'>2025-08-01</div>
                        <div className='col'>2025-09-01</div>
                        <div className='col'>Active</div>
                    </div>
                </li>
            </ul>
        </Tab>
        <Tab eventKey="Active" title="Active">
            <p>Here you can view all your active campaigns.</p>
        </Tab>
        <Tab eventKey="Inactive" title="Inactive">
            <p>Here you can view all your inactive campaigns.</p>
        </Tab>
        <Tab eventKey="past" title="Past" >
            <p>Here you can view all your past campaigns.</p>
        </Tab>
        </Tabs>
        </div>


        <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Large Modal
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* form to add a new campaign */}
                <Form>
                    <Form.Group className="mb-3" controlId="formCampaignTitle">
                        <Form.Label>Campaign Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter campaign title" value={campaignTitle} onChange={(e) => setCampaignTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCampaignDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter campaign description" value={campaignDescription} onChange={(e) => setCampaignDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCampaignStartDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="datetime-local" value={campaignStartDate} onChange={(e) => setCampaignStartDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCampaignEndDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="datetime-local" value={campaignEndDate} onChange={(e) => setCampaignEndDate(e.target.value)} />
                    </Form.Group>
                    {
                        campaignEndDate && campaignStartDate && new Date(campaignEndDate) < new Date(campaignStartDate)  
                        ?
                        // if start is in the past or end is before start, show error
                        
                        <Fragment>
                            <div className='alert alert-danger'>end date cannot be before start date</div>

                            <button type="submit" className='btn btn-primary' disabled>Create Campaign</button>
                        </Fragment>
                        : 
                        // if start is in the future and end is after start, show success
                        campaignStartDate && campaignEndDate && new Date(campaignStartDate) < new Date() 
                        ?
                        <Fragment>
                            <div className='alert alert-danger'>start date cannot be in the past</div>

                            <button type="submit" className='btn btn-primary' disabled>Create Campaign</button>
                        </Fragment>
                        : 
                        <Fragment>
                            <button type="submit" className='btn btn-primary' >Create Campaign</button>
                        </Fragment>
                    }

                </Form>
            </Modal.Body>
        </Modal>

    </div>
  )
}

export default Campaign