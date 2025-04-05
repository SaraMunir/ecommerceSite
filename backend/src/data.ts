import  bcrypt  from "bcryptjs";
import {  SubCategory } from "./types/Category";
import { User } from "./models/userModel";
import { Product } from "./models/productModel";
import { AdminUser } from "./models/adminUserModel";
import { Store } from "./models/storeModel";
import { Category } from "./models/categoryModel";

export const sampleProducts:Product[]=[
    {
        name: "Red Graphic tshirt",
        image: "/images/redGrapht.jpg",
        imageList: [
            {igmUrl:"/images/redGrapht.jpg"},
            {igmUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY5HwoCkibbbpasUUYo5fyHZHP6BYp5d_7vQ&s"}
        ],
        category: "67ecb3624b681ffcb14e1260",
        price: 15.00,
        inventory: 49,
        quantitySold: 1,
        description: "a red shirt",
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
            {igmUrl:"/images/yellow1.jpg"},
            {igmUrl:"https://tricolouroutlet.ca/cdn/shop/products/PrintedTee_Yellow_Front.jpg?v=1690211232"},
            {igmUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9x3v3kWQSS4-sGm2eW69WHwfvI-6UKneetA&s"}
        ],
        category: "t-shirts",
        price: 15.00,
        inventory: 50,
        description: "a yellow shirt",
        hasVariants: true,
        variesBy:['size'],
        storeId: "67e80a027a749dd6cefab3ca0a",
        status:'published',
        shipping: true
    },
    {
        name: "blue tshirt",
        image: "/images/blue1.jpg",
        imageList: [
            {igmUrl:"/images/blue1.jpg"}
        ],
        category: "t-shirts",
        price: 15.00,
        inventory: 50,
        description: "a blue shirt",
        hasVariants: false,
        variesBy:[],
        storeId: "67e80a027a7496cefab3ca0a",
        status:'published',
        shipping: true
    },
    {
        name: "green tshirt",
        image: "/images/green1.jpg",
        imageList: [
            {igmUrl:"/images/green1.jpg"}
        ],
        category: "t-shirts",
        price: 15.00,
        inventory: 50,
        description: "a green shirt",
        hasVariants: false,
        variesBy:[],
        storeId: "67e80a027a7496cefab3ca0a",
        status:'inactive',
        shipping: true
    },
    {
        name: "purple tshirt",
        image: "https://m.media-amazon.com/images/I/61gn3DFLlWL._AC_SL1000_.jpg",
        imageList: [
            {igmUrl:"https://m.media-amazon.com/images/I/61gn3DFLlWL._AC_SL1000_.jpg"}
        ],
        category: "t-shirts",
        price: 15.00,
        inventory: 50,
        description: "a purple shirt",
        hasVariants: false,
        variesBy:[],
        storeId: "67e80a027a7496cefab3ca0a",
        status:'inactive',
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
