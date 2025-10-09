import express, { Request, Response }  from "express"
import asyncHandler from 'express-async-handler'
// import { Product, ProductModel } from "../models/productModel"
import { PageModel, Page } from "../models/pageModel"

export const pageRouter = express.Router()
import { Types } from "mongoose"

// get all pages by storeId
pageRouter.post(
    '/addPage', 
    asyncHandler(async (req, res) =>{
        try{
            const existingPage = await PageModel.findOne({ pageName: req.body.pageName, storeId: req.body.storeId })
            if(existingPage){
                res.status(400).json({ message: 'Page with this name already exists for the store' })
                return
            }else{
                const newPage = await PageModel.create(req.body)
                res.status(201).json(newPage)
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching pages', error })
        }
        const newPage = await PageModel.create(req.body)
        res.status(201).json(newPage)
    })
)
pageRouter.get(
    '/store/:storeId/pagename/:pageName', 
    asyncHandler(async (req: Request, res: Response) => {
        const storeId = req.params.storeId
        const pageName = req.params.pageName
        try {
            const page = await PageModel.findOne({ storeId, pageName })
            console.log("Fetched page:", page)
            res.status(200).json(page)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching pages', error })
        }
    })
)

// edit page by id or pageName
pageRouter.put(
    '/edit/:id', 
    asyncHandler(async (req: Request, res: Response) =>{
        const pageId = req.params.id
        const updateData = req.body // assuming req.body contains the fields to be updated
        try {
            const updatedPage = await PageModel.findByIdAndUpdate(pageId, updateData, { new: true })
            if(!updatedPage){
                res.status(404).json({ message: 'Page Not Found' }) 
            }else{
                res.status(200).json(updatedPage)
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating page', error })
        }
    })
)
