import  bcrypt  from "bcryptjs";
import { Category, SubCategory } from "./types/Category";
import { User } from "./models/userModel";
import { Product } from "./models/productModel";
import { AdminUser } from "./models/adminUserModel";
import { Store } from "./models/storeModel";

export const sampleProducts:Product[]=[
    {
        name: "Red Graphic tshirt",
        slug: "red_Graph_tshirt",
        image: "/images/redGrapht.jpg",
        category: "t-shirts",
        price: 15.00,
        countInStock: 50,
        description: "a red shirt",
        hasVariants: true,
        variesBy:['size'],
        storeId: "67e80a027a7496cefab3ca0a",
        status:'draft'
    },
    {
        name: "yellow  BE tshirt",
        slug: "yellow_tshirt",
        image: "/images/yellow1.jpg",
        category: "t-shirts",
        price: 15.00,
        countInStock: 50,
        description: "a yellow shirt",
        hasVariants: true,
        variesBy:['size'],
        storeId: "67e80a027a749dd6cefab3ca0a",
        status:'published'
    },
    {
        name: "blue tshirt",
        slug: "blue_tshirt",
        image: "/images/blue1.jpg",
        category: "t-shirts",
        price: 15.00,
        countInStock: 50,
        description: "a blue shirt",
        hasVariants: false,
        variesBy:[],
        storeId: "67e80a027a7496cefab3ca0a",
        status:'published'
    },
    {
        name: "green tshirt",
        slug: "green_tshirt",
        image: "/images/green1.jpg",
        category: "t-shirts",
        price: 15.00,
        countInStock: 50,
        description: "a green shirt",
        hasVariants: false,
        variesBy:[],
        storeId: "67e80a027a7496cefab3ca0a",
        status:'inactive'
    },
    {
        name: "purple tshirt",
        slug: "purple_tshirt",
        image: "https://m.media-amazon.com/images/I/61gn3DFLlWL._AC_SL1000_.jpg",
        category: "t-shirts",
        price: 15.00,
        countInStock: 50,
        description: "a purple shirt",
        hasVariants: false,
        variesBy:[],
        storeId: "67e80a027a7496cefab3ca0a",
        status:'inactive'
    },
]

export const categories:Category[]=[
    {
        _id: "1_category_home",
        name: "Home_and_kitchen",
        dispName: "Home and kitchen",
        status: true,
        subCategories:["4_sub_Cat_cookware","5_sub_Cat_home_furnishings"]
    },
    {
        _id: "2_category_electronics",
        name: "electronics",
        dispName: "Electronics",
        status: true,
        subCategories:[]
    },
    {
        _id: "3_category_Jewelry",
        name: "Jewelry",
        dispName: "Jewelry",
        status: true,
        subCategories:[]
    },
    {
        _id: "4_category_Beauty_and_personal_care",
        name: "Beauty_and_personal_care",
        dispName: "Beauty and personal care",
        status: true,
        subCategories:["1_sub_Cat_Skin_care","2_sub_Cat_Hair_care","3_sub_Cat_Makeup"]
    },
    {
        _id: "5_category_Toys_and_games",
        name: "Toys_and_games",
        dispName: "Toys and games",
        status: true,
        subCategories:[]
    },
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
