import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Campaign from './components/Campaign';
import Bundles from './components/Bundles';
import PromoTags from './components/PromoTags';
function AdminPromotion() {
    return (
        <Tabs defaultActiveKey="Overview" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="Overview" title="Overview">
                
                <div>
                    <h1>Promotional Overview</h1>
                    <p>Manage your promotional campaigns, bundles, and tags here.</p>
                    <p>Use the tabs above to navigate through different promotional sections.</p>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="card ">
                                <div className="card-body">
                                    <h5 className="card-title">Campaign</h5>
                                    <p className="card-text">5 active campaigns</p>
                                </div>  
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card ">
                                <div className="card-body">
                                    <h5 className="card-title">Bundles</h5>
                                    <p className="card-text">5 active bundles</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card ">
                                <div className="card-body">
                                    <h5 className="card-title">Promo tags</h5>
                                    <p className="card-text">5 active Promo tags</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Tab>
            <Tab eventKey="Campaign" title="Campaign">
                <Campaign />
            </Tab>
            <Tab eventKey="Bundles" title="Bundles">
                <Bundles />
            </Tab>
            <Tab eventKey="PromoTags" title="Promo Tags">
                <PromoTags />
            </Tab>
        </Tabs>
    )
    }

export default AdminPromotion