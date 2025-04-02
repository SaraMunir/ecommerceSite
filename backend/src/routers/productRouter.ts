
import express, { Request, Response }  from "express"
import asyncHandler from 'express-async-handler'
import { Product, ProductModel } from "../models/productModel"
export const productRouter = express.Router()

//  /api/products
productRouter.get(
    '/', 
    asyncHandler(async (req, res) =>{
        const products = await ProductModel.find()
        res.json(products)
    })
)

productRouter.get(
    '/storeId/:id', 
    asyncHandler(async (req, res) =>{
        const product = await ProductModel.find({storeId : req.params.id})
        if(product){
            res.json(product)
        }else{
            res.status(404).json({ message: 'Product Not Found' })
        }
    })
)
productRouter.get(
    '/id/:id', 
    asyncHandler(async (req, res) =>{
        const product = await ProductModel.findOne({_id : req.params.id})
        if(product){
            res.json(product)
        }else{
            res.status(404).json({ message: 'Product Not Found' })
        }
    })
)
productRouter.delete(
    '/delete/:id', 
    asyncHandler(async (req: Request, res: Response) =>{
        console.log(req.params.id)
        try {
            const product = await ProductModel.findByIdAndDelete(req.params.id)
            console.log(product)
            if(!product){
                res.status(404).json({ message: 'Product Not Found' })
            }else{
                res.status(200).json({ message: 'Product deleted' })
            }
            
        } catch (error) {
            console.log(error)
        }
    })
)
productRouter.post(
    '/addProduct',
    asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.create({
        name: req.body.name,
        image: req.body.image,
        images: req.body.images,
        category: req.body.category,
        price: req.body.price,
        inventory: req.body.inventory,
        description: req.body.description
        } as Product)
        res.json({
        _id: product._id,
        name: product.name,
        image: product.image,
        category: product.category,
        price: product.price,
        inventory: product.inventory,
        description: product.description,
        })
    })
)