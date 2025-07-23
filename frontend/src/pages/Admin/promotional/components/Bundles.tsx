import React from 'react'

function Bundles() {
    const listOfBundles = [
    [
    {
        "_id": "bundle_glow_kit",
        "title": "Summer Glow Kit",
        "description": "A radiant trio for glowing summer skin.",
        "products": [
            "prod_vitamin_c_serum",
            "prod_sunscreen_spf50",
            "prod_hydrating_mist"
        ],
        "customPrice": 59.99,
        "discount": {
        "type": "percent",
        "value": 20
        },
        "displayAsProduct": true,
        "image": "/bundles/summer-glow-kit.jpg",
        "isActive": true
    },
    {
        "_id": "bundle_gift_favorites",
        "title": "Holiday Gift Favorites",
        "description": "Top gift picks bundled for the season.",
        "products": [
            "prod_scented_candle_set",
            "prod_leather_wallet",
            "prod_gift_box"
        ],
        "customPrice": 89.99,
        "discount": {
            "type": "fixed",
            "value": 15
        },
        "displayAsProduct": true,
        "image": "/bundles/holiday-gift-favorites.jpg",
        "isActive": true
    },
    {
        "id": "bundle_home_upgrades",
        "title": "Smart Home Upgrades",
        "description": "Refresh your space with smart tech.",
        "products": [
        "prod_smart_mug",
        "prod_air_purifier",
        "prod_magnetic_desk_lamp"
        ],
        "customPrice": 149.99,
        "discount": {
        "type": "percent",
        "value": 10
        },
        "displayAsProduct": true,
        "image": "/bundles/home-upgrades.jpg",
        "isActive": true
    },
    {
        "id": "bundle_back_to_school_kit",
        "title": "Back to School Kit",
        "description": "Essentials for every student.",
        "products": [
        "prod_laptop_backpack",
        "prod_notebook_bundle",
        "prod_desk_organizer"
        ],
        "customPrice": 79.99,
        "discount": {
        "type": "percent",
        "value": 15
        },
        "displayAsProduct": true,
        "image": "/bundles/back-to-school-kit.jpg",
        "isActive": true
    }
]

    ]; // This should be replaced with actual data fetching logic
  return (
    <div>Bundles</div>
  )
}

export default Bundles