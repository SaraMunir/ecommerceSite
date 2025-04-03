import express, { Request, Response }  from "express"
import asyncHandler from 'express-async-handler'
import { CategoryModel } from "../models/categoryModel"
export const categoryRouter = express.Router()


categoryRouter.get(
    '/storeId/:id', 
    asyncHandler(async (req, res) =>{
        const product = await CategoryModel.find({storeId : req.params.id})
        if(product){
            res.json(product)
        }else{
            res.status(404).json({ message: 'Category Not Found' })
        }
    })
)

