import express, { Request, Response } from "express"
import asyncHandler from "express-async-handler"
// import { ProductModel } from "../models/productModel"
import { newProductModel } from "../models/newProductModel"
import { sampleAdminUsers, sampleCategories, sampleProducts, sampleStore, sampleUsers, sampleNewProducts } from "../data"
import { UserModel } from "../models/userModel"
import { AdminUserModel } from "../models/adminUserModel"
import { StoreModel } from "../models/storeModel"
import { CategoryModel } from "../models/categoryModel"

export const seedRouter = express.Router()

seedRouter.get(
    '/addNewProducts',
    asyncHandler(async (req: Request, res: Response) =>{
        await newProductModel.deleteMany({})
        const createdProducts = await newProductModel.insertMany(sampleNewProducts)
        res.json({ createdProducts })
        
    })
)
// seedRouter.get(
//     '/products',
//     asyncHandler(async (req: Request, res: Response) =>{
//         await ProductModel.deleteMany({})
//         const createdProducts = await ProductModel.insertMany(sampleProducts)
//         res.json({ createdProducts })
//     })
// )
// seedRouter.get(
//     '/categories',
//     asyncHandler(async (req: Request, res: Response) =>{
//         await CategoryModel.deleteMany({})
//         const createdCategories = await CategoryModel.insertMany(sampleCategories)
//         res.json({ createdCategories })
        
//     })
// )
