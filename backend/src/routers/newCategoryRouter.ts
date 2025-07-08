import express, { Request, Response }  from "express"
import asyncHandler from 'express-async-handler'
import { NewCategoryModel } from "../models/newCategoryModel"
export const NewCategoryRouter = express.Router()

export const newCategoryRouter = express.Router()

newCategoryRouter.get(
    '/storeId/:id', 
    asyncHandler(async (req, res) =>{
        const product = await NewCategoryModel.find({storeId : req.params.id})
        if(product){
            res.json(product)
        }else{
            res.status(404).json({ message: 'Category Not Found' })
        }
    })
)
newCategoryRouter.post(
    '/addNewCategory',
    asyncHandler(async (req:Request, res:Response)=>{
        console.log('req.body', req.body)
        try{
            const newCategory = await NewCategoryModel.create({
                description:req.body.description, 
                name:req.body.name, 
                status:req.body.status, 
                storeId:req.body.storeId, 
                subCategories:req.body.subCategories, 
                parentId:req.body.parentId, 
            })
            console.log('category created', newCategory)
            res.json(newCategory)
        }catch(err){
            console.error('Error creating category:', err)
            res.status(500).json({ message: 'Error creating category' })
        }
    })
)