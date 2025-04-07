
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
        title: req.body.title,
        status: req.body.status,
        storeId: req.body.storeId,
        imageList: req.body.imageList,
        image: req.body.image,
        category: req.body.category,
        tags: req.body.tags,
        description: req.body.description,
        price: req.body.price,
        shipping: req.body.shipping,
        inventory: req.body.inventory,
        quantitySold: req.body.quantitySold,
        quantityReservedInCart: req.body.quantityReservedInCart,
        hasVariants: req.body.hasVariants,
        variesBy: req.body.variesBy,
        } as Product)
        res.json({
        _id: product._id,
        name: product.name,
        title: product.title,
        status: product.status,
        storeId: product.storeId,
        imageList: product.imageList,
        image: product.image,
        category: product.category,
        tags: product.tags,
        description: product.description,
        price: product.price,
        shipping: product.shipping,
        inventory: product.inventory,
        quantitySold: product.quantitySold,
        quantityReservedInCart: product.quantityReservedInCart,
        hasVariants: product.hasVariants,
        variesBy: product.variesBy,
        })
    })
)