import { Category, SubCategory } from "./types/Category";
import { Product } from "./types/Product";

export const sampleProducts:Product[]=[
    {
        _id:'123',
        name: "Red Graphic tshirt",
        slug: "red_Graph_tshirt",
        image: "/images/redGrapht.jpg",
        category: "t-shirts",
        price: 15.00,
        countInStock: 50,
        description: "a red shirt"
    },
    {
        _id:'124',
        name: "yellow  BE tshirt",
        slug: "yellow_tshirt",
        image: "/images/yellow1.jpg",
        category: "t-shirts",
        price: 15.00,
        countInStock: 50,
        description: "a yellow shirt"
    },
    {
        _id:'125',
        name: "blue tshirt",
        slug: "blue_tshirt",
        image: "/images/blue1.jpg",
        category: "t-shirts",
        price: 15.00,
        countInStock: 50,
        description: "a blue shirt"
    },
    {
        _id:'126',
        name: "green tshirt",
        slug: "green_tshirt",
        image: "/images/green1.jpg",
        category: "t-shirts",
        price: 15.00,
        countInStock: 50,
        description: "a green shirt"
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