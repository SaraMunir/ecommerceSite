
import express, { Request, Response }  from "express"
import asyncHandler from 'express-async-handler'
import { Product, ProductModel } from "../models/productModel"
export const productRouter = express.Router()
import { v2 as cloudinary } from 'cloudinary';
// import upload from "../middleware/multer";
import multer from "multer";
import axios from "axios";
import fs from "fs";


// const express = require('express');
const router = express.Router();
// import cloudinary from "../utils/cloudinary";

//  /api/products
// below code is for old product models
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
        console.log("eq.body.name", req.body.name)
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
        weight: req.body.weight,
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
        weight: product.weight,
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
productRouter.put(
    '/update/id/:id', 
    asyncHandler(async (req: Request, res: Response) =>{
        console.log('prodcu? ',req.body.name)
        console.log('req.params.id? ',req.params.id)
        try {
            const product = await ProductModel.findOneAndUpdate({_id : req.params.id}, {...req.body},{new: true})
            if(product){
                res.json({
                    status:"success",
                    data: product
                }
                )
            }else{
                // res.status(404).json({ message: 'Product Not Found' })
                res.status(404).json({
                    status:"error",
                    // error: error,
                    message: 'Product Not Found'
                })
            }
        } catch (error) {
            res.json({
                status:"error",
                error: error,
                message: 'Product Not Found'
            })
            
        }
    })
)
const storage = multer.diskStorage({
  filename: function (req: any,file: { originalname: any; },cb: (arg0: null, arg1: any) => void) {
    cb(null, file.originalname)
  }
});

const upload = multer({storage})

productRouter.post(
    '/addImage',
    upload.single('file'),
    async (req: Request, res: Response) => {
        console.log("req.body",req.body)
        console.log("file",req.file)
        console.log("path",req.file?.path)
        if (!req.file || !req.file.path) {
            res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
            return;
        }
        const imagePath = req.file.path;
        const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });

            const formData = new URLSearchParams();
            formData.append('key', `${process.env.IMGDB_API_SECRET}`);
            formData.append('image', imageData);


        try {
            // axios.post(`https://api.imgbb.com/1/upload?&key=${process.env.CLOUDINARY_API_KEY}`, formData).then( (result)=>{
            //         console.log( result.data)
            // })
            const response = await axios.post('https://api.imgbb.com/1/upload', formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            
            console.log('Image uploaded successfully:', response.data.data.url);
            res.status(200).json({
                success: true,
                message: "Image uploaded successfully",
                data: response.data.data
            });


        } catch (err: any) {
            console.error('Error uploading image to ImgBB:', err.message);
            if (err?.response) {
                console.error('Response data:', err.response.data);
                res.status(500).json({ message: 'Error uploading image to ImgBB', error: err.response.data })
            }else{

                res.status(500).json({ message: 'Error uploading image to ImgBB' })
            }
            throw err;
        }
        // keep the code below for future reference 🚨
        // try {
        //     const result = await cloudinary.uploader.upload(req.file.path);
        //     res.status(200).json({
        //         success: true,
        //         message: "Uploaded!",
        //         data: result
        //     });
        // } catch (err) {
        //     console.log(err);
        //     res.status(500).json({
        //         success: false,
        //         message: "Error"
        //     });
        // }
    }
)


//  above code is for old product models
// below code is for new product models
productRouter.get(
    '/', 
    asyncHandler(async (req, res) =>{
        const products = await ProductModel.find()
        res.json(products)
    })
)

// router.post('/upload', upload.single('image'), 
// function (req, res) {
// cloudinary.uploader.upload(req?.file?.path, function (err, result){
//     if(err) {
//     console.log(err);
//     return res.status(500).json({
//         success: false,
//         message: "Error"
//     })
//     }

//     res.status(200).json({
//     success: true,
//     message:"Uploaded!",
//     data: result
//     })
// })
// });

// productRouter.post('addImage/id/:id', upload.single('image'), asyncHandler(async (req: Request, res: Response) => {
//             console.log('prodcu? ',req.body.name)
//             console.log('req.params.id? ',req.params.id)
//             console.log('req.file', req.file)

//     if (!req.file || !req.file.path) {
//         res.status(400).json({
//             success: false,
//             message: "No file uploaded"
//         });
//         return;
//         }
//         console.log('req.file.path', req.file.path)
//         return
//     cloudinary.uploader.upload(req.file.path, function (err, result){
//     if(err) {
//         console.log(err);
//         res.status(500).json({
//         success: false,
//         message: "Error"
//     });
//     return;
//     }
//     res.status(200).json({
//         success: true,
//         message:"Uploaded!",
//         data: result
//     });
//     });
// }));

//       console.log(err);
//       return res.status(500).json({
//         success: false,
//         message: "Error"
//       })
//     }

//     res.status(200).json({
//       success: true,
//       message:"Uploaded!",
//       data: result
//     })
//   })
// });