import express, { Request, Response }  from "express"
import asyncHandler from 'express-async-handler'
import { ProductNew, newProductModel } from "../models/newProductModel"
export const newProductRouter = express.Router()
import { v2 as cloudinary } from 'cloudinary';
// import upload from "../middleware/multer";
import multer from "multer";
import axios from "axios";
import fs from "fs";

// const express = require('express');
const router = express.Router();


newProductRouter.get(
    '/', 
    asyncHandler(async (req, res) =>{
        const products = await newProductModel.find()
        res.json(products)
    })
)

// api/newProductList/storeId/${id}
newProductRouter.get(
    '/storeId/:id',
    asyncHandler(async (req, res) =>{
        const { id } = req.params
        const products = await newProductModel.find({ storeId: id })
        res.json(products)
    })
)

newProductRouter.get(
    '/productDetail/id/:id', 
    asyncHandler(async (req, res) =>{
        const product = await newProductModel.findOne({_id : req.params.id})
        if(product){
            res.json(product)
        }else{
            res.status(404).json({ message: 'Product Not Found' })
        }
    })
)

newProductRouter.post(
    '/addNewProduct',
    asyncHandler(async (req: Request, res: Response) => {
        console.log("eq.body.name", req.body)
    const product = await newProductModel.create({
        name: req.body.name,
        slug: req.body.slug,
        type: req.body.type,
        brand: req.body.brand,
        vendor: req.body.vendor,
        sku: req.body.sku,
        storeId: req.body.storeId,
        barcode: req.body.barcode,
        categories: req.body.categories,
        collections: req.body.collections,
        tags: req.body.tags,
        media: req.body.media,
        pricing: req.body.pricing,
        inventory: req.body.inventory,
        variantMap: req.body.variantMap,
        shipping: req.body.shipping,
        seo: req.body.seo,
        publishing: req.body.publishing,
        additional: req.body.additional,
        description:req.body.description
    } as ProductNew)
        res.json({
            message: 'Product created successfully',
            product
        })
    })
)