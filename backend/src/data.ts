import  bcrypt  from "bcryptjs";
import {  SubCategory } from "./types/Category";
import { User } from "./models/userModel";
import { Product } from "./models/productModel";
import { AdminUser } from "./models/adminUserModel";
import { Store } from "./models/storeModel";
import { Category } from "./models/categoryModel";
import { newProduct } from "./models/newProductModel";
import mongoose from "mongoose";

export const sampleProducts:Product[]=[
    {
        name: "Red Graphic tshirt",
        image: "/images/redGrapht.jpg",
        imageList: [
            {
                igmUrl:"/images/redGrapht.jpg",
                _id: new mongoose.Types.ObjectId(),

            },
            {
                igmUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY5HwoCkibbbpasUUYo5fyHZHP6BYp5d_7vQ&s",
                _id: new mongoose.Types.ObjectId(),
            }
        ],
        category: "67eecd2da7a2ebcfd8010b76",
        tags:["clothing", "Graphic", "tshirt", "red"],
        price: 15.00,
        inventory: 49,
        quantitySold: 1,
        description: "a red shirt",
        weight: 1,
        hasVariants: true,
        variesBy:['size'],
        storeId: "67e80a027a7496cefab3ca0a",
        status:'draft',
        shipping: true
    },
    {
        name: "yellow  BE tshirt",
        image: "/images/yellow1.jpg",
        imageList: [
            {
                igmUrl:"/images/yellow1.jpg",
                _id: new mongoose.Types.ObjectId(),
                
            },
            {
                igmUrl:"https://tricolouroutlet.ca/cdn/shop/products/PrintedTee_Yellow_Front.jpg?v=1690211232",
                _id: new mongoose.Types.ObjectId(),
            },
            {
                igmUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9x3v3kWQSS4-sGm2eW69WHwfvI-6UKneetA&s",
                _id: new mongoose.Types.ObjectId(),
                
            }
        ],
        category: "67eecd2da7a2ebcfd8010b76",
        price: 15.00,
        inventory: 50,
        weight: 1.3,
        description: "a yellow shirt",
        hasVariants: true,
        variesBy:['size'],
        storeId: "67e80a027a749dd6cefab3ca0a",
        status:'published',
        shipping: true,
        tags:["clothing", "Graphic", "tshirt", "yellow"],
    },
    {
        name: "blue tshirt",
        image: "/images/blue1.jpg",
        imageList: [
            {
                _id: new mongoose.Types.ObjectId(),
                igmUrl:"/images/blue1.jpg"
            }
        ],
        category: "67eecd2da7a2ebcfd8010b7c",
        price: 15.00,
        inventory: 50,
        description: "a blue shirt",
        hasVariants: false,
        variesBy:[],
        weight: 1.3,
        storeId: "67e80a027a7496cefab3ca0a",
        status:'published',
        shipping: true,
        tags:["clothing", "Graphic", "tshirt","blue"],
    },
    {
        name: "green tshirt",
        image: "/images/green1.jpg",
        imageList: [
            {
                _id: new mongoose.Types.ObjectId(),
                igmUrl:"/images/green1.jpg",
            }
        ],
        category: "67eecd2da7a2ebcfd8010b7b",
        price: 15.00,
        inventory: 50,
        description: "a green shirt",
        hasVariants: false,
        variesBy:[],
        storeId: "67e80a027a7496cefab3ca0a",
        status:'inactive',
        tags:["clothing", "Graphic", "tshirt","green"],
        weight: 1.5,
        shipping: true
    },
    {
        name: "purple tshirt",
        image: "https://m.media-amazon.com/images/I/61gn3DFLlWL._AC_SL1000_.jpg",
        imageList: [
            {igmUrl:"https://m.media-amazon.com/images/I/61gn3DFLlWL._AC_SL1000_.jpg",
                _id: new mongoose.Types.ObjectId()
            }
        ],
        category: "67eecd2da7a2ebcfd8010b7b",
        price: 15.00,
        inventory: 50,
        description: "a purple shirt",
        hasVariants: false,
        variesBy:[],
        storeId: "67e80a027a7496cefab3ca0a",
        status:'inactive',
        tags:["clothing", "tshirt","purple"],
        weight: .5,

        shipping: true
    },
]
// CategoryModel
export const sampleCategories:Category[]=[
    {
        name: "Home_and_kitchen",
        storeId: "67e80a027a7496cefab3ca0a",
        dispName: "Home and kitchen",
        status: true,
        parentCategories:[],
        subCategories:[]
    },
    {
        name: "electronics",
        storeId: "67e80a027a7496cefab3ca0a",
        dispName: "Electronics",
        status: true,
        parentCategories:[],
        subCategories:[]
        },
    {
        name: "Jewelry",
        storeId: "67e80a027a7496cefab3ca0a",
        dispName: "Jewelry",
        status: true,
        parentCategories:[],
        subCategories:[]    },
    {
        name: "Beauty_and_personal_care",
        storeId: "67e80a027a7496cefab3ca0a",
        dispName: "Beauty and personal care",
        status: true,
        parentCategories:[],
        subCategories:[]    },
    {
        name: "Toys_and_games",
        storeId: "67e80a027a7496cefab3ca0a",
        dispName: "Toys and games",
        status: true,
        parentCategories:[],
        subCategories:[]    },
    {
        name: "cookware",
        storeId: "67e80a027a7496cefab3ca0a",
        dispName: "cookware",
        status: true,
        parentCategories:[],
        subCategories:[]    },
    {
        name: "Skin_care",
        storeId: "67e80a027a7496cefab3ca0a",
        dispName: "Skin care",
        status: true,
        parentCategories:[],
        subCategories:[]    },
    {
        name: "Makeup",
        storeId: "67e80a027a7496cefab3ca0a",
        dispName: "Makeup",
        status: true,
        subCategories:[]
    },
    {
        name: "Fashion_&_Apparel",
        storeId: "67e80a027a7496cefab3ca0a",
        dispName: "Fashion & Apparel:",
        status: true,
        subCategories:[]
    },
    {
        name: "Clothing",
        storeId: "67e80a027a7496cefab3ca0a",
        dispName: "Clothing",
        status: true,
        subCategories:[]
    },
    {
        name: "Adult",
        storeId: "67e80a027a7496cefab3ca0a",
        dispName: "Adult",
        status: true,
        subCategories:[]
    },
    {
        name: "kids",
        storeId: "67e80a027a7496cefab3ca0a",
        dispName: "kids",
        status: true,
        subCategories:[]
    },
    {
        name: "men",
        storeId: "67e80a027a7496cefab3ca0a",
        dispName: "men",
        status: true,
        subCategories:[]
    },
    {
        storeId: "67e80a027a7496cefab3ca0a",
        name: "women",
        dispName: "women",
        status: true,
        subCategories:[]
    },
    {
        storeId: "67e80a027a7496cefab3ca0a",
        name: "boys",
        dispName: "boys",
        status: true,
        subCategories:[]
    },
    {
        storeId: "67e80a027a7496cefab3ca0a",
        name: "girls",
        dispName: "girls",
        status: true,
        subCategories:[]
    },
    {
        storeId: "67e80a027a7496cefab3ca0a",
        name: "Dresses",
        dispName: "Dresses",
        status: true,
        subCategories:[]
    },
    {
        storeId: "67e80a027a7496cefab3ca0a",
        name: "Tops",
        dispName: "Tops",
        status: true,
        subCategories:[]
    }
]
export const subCategories:SubCategory[]=[
    {
        _id: "1_sub_Cat_Skin_care",
        name: "Skin_care",
        dispName: "Skin care",
        status: true,
        subCategories:[]
    },
    {
        _id: "2_sub_Cat_Hair_care",
        name: "Hair_care",
        dispName: "Hair care",
        status: true,
        subCategories:[]
    },
    {
        _id: "3_sub_Cat_Makeup",
        name: "Makeup",
        dispName: "Makeup",
        status: true,
        subCategories:[]
    },
    {
        _id: "4_sub_Cat_cookware",
        name: "cookware",
        dispName: "cookware",
        status: true,
        subCategories:[]
    },
    {
        _id: "5_sub_Cat_home_furnishings",
        name: "home_furnishings",
        dispName: "home furnishings",
        status: true,
        subCategories:[]
    },
    
]

export const sampleUsers: User[] = [
    {
    name: 'Joe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
    },
    {
    name: 'John',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
    },
]
export const sampleAdminUsers: AdminUser[] = [
    {
    firstName: 'sara',
    lastName: 'sara',
    email: 'sara@gmail.com',
    password: bcrypt.hashSync('123456'),
    adminType: 'owner'
    },
    {
    firstName: 'jane',
    lastName: 'jane',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    adminType: "site admin",
    },
]
export const sampleStore: Store[] = [
    {
        storeName: 'teckly',
        storeOwner: '67e59b165d1fc33e23f15d09',
        storeNumber: 1001,
        status: 'draft',
        storeUsers: []
    },
    {
        storeName: 'stitches',
        storeOwner: '67e5fb681e0eb4bb5bea7c20',
        storeNumber: 1002,
        status: 'draft',
        storeUsers: []
    },
]


export const sampleNewProducts: newProduct[] = [
    {
        "product_id": "prod_001",
        "name": "Classic T-Shirt",
        "slug": "classic-tshirt",
        "storeId": "67e80a027a7496cefab3ca0a",
        "description": {
            "short": "Soft cotton unisex t-shirt.",
            "long": "A comfortable, breathable cotton t-shirt available in multiple colors and sizes."
            },
        "type": "physical",
        "brand": "CottonWear",
        "categories": ["Clothing", "Tops"],
        "tags": ["summer", "unisex", "bestseller"],
        "media": {
            "main_image": "/images/yellow1.jpg",
            "gallery": [
                "/images/blue1.jpg",
                "/images/green1.jpg"
            ],
            "alt_text": "A model wearing a classic cotton t-shirt"
        },
        "pricing": {
            "price": 25.00,
            "sale_price": 20.00,
            "compare_at_price": 30.00,
            "currency": "USD",
            "taxable": true
        },
        "inventory": {
            "track_inventory": true,
            "stock_quantity": 25,
            "allow_backorder": false,
            "warehouse_location": "WH-2-C18"
        },
        "variants": [
        {
            "variant_id": "var_001-red-M",
            "option_values": {
                "Color": "Red",
                "Size": "M"
            },
            "price": 20.00,
            "sku": "TSH-RED-M",
            "stock_quantity": 12,
            "images": [
                "/images/green1.jpg"
            ]
        },
        {
            "variant_id": "var_002-blue-L",
            "option_values": {
                "Color": "Blue",
                "Size": "L"
            },
            "price": 25.00,
            "sku": "TSH-BLU-L",
            "stock_quantity": 8,
            "images": [
                "/images/blue1.jpg"
            ]
        }
        ]
    },
    {
        "product_id": "prod_002",
        "name": "Digital Gift Card",
        "slug": "gift-card",
        "storeId": "67e80a027a7496cefab3ca0a",
        "description": {
            "short": "Send a gift instantly.",
            "long": "Let them choose what they love. Digital gift cards are delivered by email."
        },
        "type": "digital",
        "brand": "ShopX",
        "categories": ["Gifts"],
        "tags": ["digital", "gift", "email"],
        "media": {
            "main_image": "https://cdn.example.com/products/gift-card.jpg",
            "gallery": [],
            "alt_text": "ShopX branded digital gift card"
        },
        "pricing": {
            "price": 100.00,
            "currency": "USD",
            "taxable": false
        },
        "variants": [],
        "inventory": {
            "track_inventory": true,
            "stock_quantity": 25,
            "allow_backorder": false,
            "warehouse_location": "WH-2-C18"
        }
    },
    {
        "product_id": "prod_003",
        "name": "Eco Water Bottle",
        "slug": "eco-water-bottle",
        "storeId": "67e80a027a7496cefab3ca0a",
        "description": {
            "short": "Reusable eco-friendly water bottle.",
            "long": "Stay hydrated while reducing plastic waste with this BPA-free, stainless steel water bottle."
        },
        "type": "physical",
        "brand": "GreenHydro",
        "categories": ["Accessories", "Home"],
        "tags": ["eco", "reusable", "bestseller"],
        "media": {
            "main_image": "https://cdn.example.com/products/eco-bottle.jpg",
            "gallery": [],
            "alt_text": "Eco-friendly water bottle with bamboo cap"
        },
        "pricing": {
            "price": 18.50,
            "currency": "USD",
            "taxable": true
        },
        "inventory": {
            "track_inventory": true,
            "stock_quantity": 50,
            "allow_backorder": true,
            "warehouse_location": "WH-2-C18"
        },
        "variants": [
            {
                "variant_id": "var_003-green-500ml",
                "option_values": {
                "Color": "Green",
                "Size": "500ml"
                },
                "price": 18.50,
                "sku": "BOTTLE-GRN-500",
                "stock_quantity": 20,
                "images": []
            }
        ]
    },
    {
        "product_id": "prod_004",
        "name": "Online Yoga Class Pass",
        "slug": "yoga-class-pass",
        "storeId": "67e80a027a7496cefab3ca0a",
        "description": {
            "short": "10-pack online yoga class access.",
            "long": "A flexible online pass to attend 10 live-streamed yoga classes from anywhere."
        },
        "type": "service",
        "brand": "ZenLife",
        "categories": ["Health", "Fitness"],
        "tags": ["yoga", "virtual", "wellness"],
        "media": {
            "main_image": "https://plus.unsplash.com/premium_photo-1663047487227-0f3cd88ed8aa?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW9nYSUyMGNsYXNzfGVufDB8fDB8fHww",
            "gallery": ["https://media.istockphoto.com/id/592680860/photo/meditating-in-prayer-pose.jpg?s=612x612&w=0&k=20&c=PjYvLch0SS9L5fgDnobw_T-mcN6VoLMc3A866wAhhWk="],
            "alt_text": "Person doing yoga in a peaceful room",
            "video": "https://www.youtube.com/embed/EvMTrP8eRvM?si=HUI6sc4QrAp16RFv"
        },
        "pricing": {
            "price": 59.99,
            "currency": "USD",
            "taxable": false
        },
        "variants": [],
        "inventory": {
            "track_inventory": false,
            "stock_quantity": 0,
            "allow_backorder": false
        }
    }
]

