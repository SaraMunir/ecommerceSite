import express, { Request, Response }  from "express"
import asyncHandler from 'express-async-handler'
import { Image, ImageModel  } from "../models/newImageModel"
export const imageRouter = express.Router()


imageRouter.get(
    '/', 
    asyncHandler(async (req, res) =>{
        const images = await ImageModel.find()
        res.json(images)
    })
)

imageRouter.get(
    '/storeId/:id',
    asyncHandler(async (req, res) =>{
        const { id } = req.params
        console.log("id", id)
        const images = await ImageModel.find({ storeId: id })
        console.log("images", images)
        res.json(images)
    })
)

// newProductRouter.get(
//     '/storeId/:id',
//     asyncHandler(async (req, res) =>{
//         const { id } = req.params
//         const products = await newProductModel.find({ storeId: id })
//         res.json(products)
//     })
// )