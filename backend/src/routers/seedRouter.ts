import express, { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { ProductModel } from "../models/productModel"
import { sampleAdminUsers, sampleProducts, sampleStore, sampleUsers } from "../data"
import { UserModel } from "../models/userModel"
import { AdminUserModel } from "../models/adminUserModel"
import { StoreModel } from "../models/storeModel"

export const seedRouter = express.Router()

seedRouter.get(
    '/',
    asyncHandler(async (req: Request, res: Response) =>{
        await ProductModel.deleteMany({})
        const createdProducts = await ProductModel.insertMany(sampleProducts)

        // await UserModel.deleteMany({})
        // const createdUsers = await UserModel.insertMany(sampleUsers)
        // await StoreModel.deleteMany({})
        // const createdStore = await StoreModel.insertMany(sampleStore)

        // res.json({ createdProducts, createdAdminUsers, createdUsers })
        // res.json({ createdStore })
        res.json({ createdProducts })
        
    })
)