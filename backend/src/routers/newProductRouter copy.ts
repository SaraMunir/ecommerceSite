import express, { Request, Response }  from "express"
import asyncHandler from 'express-async-handler'
import { ProductNew, newProductModel } from "../models/newProductModel"
import { Image, ImageModel  } from "../models/newImageModel"
export const newProductRouter = express.Router()
import { v2 as cloudinary } from 'cloudinary';
// import upload from "../middleware/multer";
import multer from "multer";
import axios from "axios";
import fs from "fs";
import { url } from "inspector";
import e from "express"

// const express = require('express');
const router = express.Router();
const storage = multer.diskStorage({
  filename: function (req: any,file: { originalname: any; },cb: (arg0: null, arg1: any) => void) {
    cb(null, file.originalname)
  }
});



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
    asyncHandler(async (req, res) => {
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
// const upload = multer({storage})
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage });
newProductRouter.post(
    '/addImages',
    upload.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'gallery', maxCount: 10 }
    ]),
    asyncHandler(async (req: Request, res: Response) => {
        console.log("req.body", req.body)
        const prodObj = JSON.parse(req.body.productData);

        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
        const mainImageFile = files?.['mainImage']?.[0];
        const galleryFiles = files?.['gallery'] || [];

        if (!mainImageFile) {
            res.status(400).json({
                success: false,
                message: 'Main image is required'
            });
            return;
        }

        async function uploadToImgBB(filePath: string): Promise<any> {
        const imageData = fs.readFileSync(filePath, { encoding: 'base64' });
        const formData = new URLSearchParams();
        formData.append('key', process.env.IMGDB_API_SECRET || '');
        formData.append('image', imageData);

        const response = await axios.post('https://api.imgbb.com/1/upload', formData.toString(), {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response.data;
        }

        async function buildImageDoc(uploadRes: any, storeId: string, type = 'product_gallery') {
        return {
            url: uploadRes.data.url,
            alt_text: '',
            type,
            store_id: storeId,
            mainImage: uploadRes.data.image,
            medium: uploadRes.data.medium,
            thumbNail: uploadRes.data.thumb
        };
        }

        try {
        // Upload main image
        const mainRes = await uploadToImgBB(mainImageFile.path);
        if (!mainRes.success) throw new Error('Main image upload failed');

        const mainImageDoc = await ImageModel.create(
            await buildImageDoc(mainRes, prodObj.storeId, 'product_main')
        );

        // Upload gallery images in parallel
        const galleryImageDocs = [];
        for (const file of galleryFiles) {
            const galleryRes = await uploadToImgBB(file.path);
            if (galleryRes.success) {
            const galleryDoc = await ImageModel.create(
                await buildImageDoc(galleryRes, prodObj.storeId, 'product_gallery')
            );
            galleryImageDocs.push({
                url: galleryDoc.url,
                imageId: galleryDoc._id
            });
            }
        }

        // Create the product with all image references
        const product = await newProductModel.create({
            name: prodObj.name,
            slug: prodObj.slug,
            type: prodObj.type,
            brand: prodObj.brand,
            vendor: prodObj.vendor,
            sku: prodObj.sku,
            storeId: prodObj.storeId,
            barcode: prodObj.barcode,
            categories: prodObj.categories,
            collections: prodObj.collections,
            tags: prodObj.tags,
            media: {
            ...prodObj.media,
            main_image: {
                url: mainImageDoc.url,
                imageId: mainImageDoc._id
            },
            gallery: galleryImageDocs
            },
            pricing: prodObj.pricing,
            inventory: prodObj.inventory,
            variantMap: prodObj.variantMap,
            shipping: prodObj.shipping,
            seo: prodObj.seo,
            publishing: prodObj.publishing,
            additional: prodObj.additional,
            description: prodObj.description
        });
        res.json({
            success: true,
            message: 'Images uploaded and product created',
            product,
            main_image: mainImageDoc,
            gallery_images: galleryImageDocs
        });
        return;
        } catch (error) {
        console.error('Image/product creation failed:', error);
        res.status(500).json({
            success: false,
            message: 'Image upload or product creation failed',
            error: error instanceof Error ? error.message : String(error)
        });
        return;
        }
    })
    // })
);
// newProductRouter.post(
//     '/addImage',
//     asyncHandler(async (req: Request, res: Response) => {
//         console.log("req.body", req.body)
//         console.log("path", req.file?.path)
//         const prodObj = JSON.parse(req.body.productData);

//         const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
//         const mainImageFile = files?.['mainImage']?.[0];
//         const galleryFiles = files?.['gallery'] || [];
//         if (!mainImageFile) {
//             res.status(400).json({
//                 success: false,
//                 message: 'Main image is required'
//             });
//             return;
//         }
//         async function uploadToImgBB(filePath: string): Promise<any> {
//             const imageData = fs.readFileSync(filePath, { encoding: 'base64' });
//             const formData = new URLSearchParams();
//             formData.append('key', process.env.IMGDB_API_SECRET || '');
//             formData.append('image', imageData);

//             const response = await axios.post('https://api.imgbb.com/1/upload', formData.toString(), {
//                 headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//             });

//             return response.data;
//         }
//         async function buildImageDoc(uploadRes: any, storeId: string, type = 'product_gallery') {
//             return {
//                 url: uploadRes.data.url,
//                 alt_text: '',
//                 type,
//                 store_id: storeId,
//                 mainImage: uploadRes.data.image,
//                 medium: uploadRes.data.medium,
//                 thumbNail: uploadRes.data.thumb
//             };
//         }
//         try {
//         // Upload main image
//             const mainRes = await uploadToImgBB(mainImageFile.path);
//             if (!mainRes.success) throw new Error('Main image upload failed');

//             const mainImageDoc = await ImageModel.create(
//                 await buildImageDoc(mainRes, prodObj.storeId, 'product_main')
//             );

//             // Upload gallery images in parallel
//             const galleryImageDocs = [];
//             for (const file of galleryFiles) {
//                 const galleryRes = await uploadToImgBB(file.path);
//                 if (galleryRes.success) {
//                 const galleryDoc = await ImageModel.create(
//                     await buildImageDoc(galleryRes, prodObj.storeId, 'product_gallery')
//                 );
//                 galleryImageDocs.push({
//                     url: galleryDoc.url,
//                     imageId: galleryDoc._id
//                 });
//                 }
//             }

//         // Create the product with all image references
//         const product = await newProductModel.create({
//             name: prodObj.name,
//             slug: prodObj.slug,
//             type: prodObj.type,
//             brand: prodObj.brand,
//             vendor: prodObj.vendor,
//             sku: prodObj.sku,
//             storeId: prodObj.storeId,
//             barcode: prodObj.barcode,
//             categories: prodObj.categories,
//             collections: prodObj.collections,
//             tags: prodObj.tags,
//             media: {
//             ...prodObj.media,
//             main_image: {
//                 url: mainImageDoc.url,
//                 imageId: mainImageDoc._id
//             },
//             gallery: galleryImageDocs
//             },
//             pricing: prodObj.pricing,
//             inventory: prodObj.inventory,
//             variantMap: prodObj.variantMap,
//             shipping: prodObj.shipping,
//             seo: prodObj.seo,
//             publishing: prodObj.publishing,
//             additional: prodObj.additional,
//             description: prodObj.description
//         });

//         res.json({
//             success: true,
//             message: 'Images uploaded and product created',
//             product,
//             main_image: mainImageDoc,
//             gallery_images: galleryImageDocs
//         });
//         } catch (error) {
//         console.error('Image/product creation failed:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Image upload or product creation failed',
//             error: error instanceof Error ? error.message : String(error)
//         });
//         }
//         return;
// })
// )



// newProductRouter.post(
//     '/addImage',
//     upload.single('file'),
//     asyncHandler(async (req: Request, res: Response) => {
//         console.log("req.body",req.body)
//         console.log("path", req.file?.path)
//         const prodObj = JSON.parse(req.body.productData);
//         if (!req.file || !req.file.path) {
//             res.status(400).json({
//                 success: false,
//                 message: "No file uploaded"
//             });
//             return;
//         }
//         const imagePath = req.file.path;
//         const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });
//         const formData = new URLSearchParams();
//         formData.append('key', `${process.env.IMGDB_API_SECRET}`);
//         formData.append('image', imageData);
//         try {
//             const response = await axios.post('https://api.imgbb.com/1/upload', formData.toString(), {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//             });
//             console.log("Image upload response:", response.data);
//             if( response.data.success ) {
//                 const imageData = {
//                     url: response.data.data.url,
//                     alt_text: prodObj.media?.alt_text || '',
//                     type: 'product_main',
//                     store_id: prodObj.storeId,
//                     mainImage: {
//                         filename: response.data.data.image.filename || '',
//                         name: response.data.data.image.name || '',
//                         mime: response.data.data.image.mime || '',
//                         extension: response.data.data.image.extension || '',
//                         url: response.data.data.image.url || '',
//                     },
//                     medium: {
//                         filename: response.data.data.medium.filename || '',
//                         name: response.data.data.medium.name || '',
//                         mime: response.data.data.medium.mime || '',
//                         extension: response.data.data.medium.extension || '',
//                         url: response.data.data.medium.url || '',
//                     },
//                     thumbNail: {
//                         filename: response.data.data.thumb.filename || '',
//                         name: response.data.data.thumb.name || '',
//                         mime: response.data.data.thumb.mime || '',
//                         extension: response.data.data.thumb.extension || '',
//                         url: response.data.data.thumb.url || '',
//                     }
//                 };
//                 console.log("imageData", imageData);
//                 // create a new image document
//                 const newImage = await ImageModel.create({
//                     ...imageData
//                 } as Image)
//                 if(newImage) {
//                     // create product with the new image
//                     const createProduct = await newProductModel.create({
//                         name: prodObj.name,
//                         slug: prodObj.slug,
//                         type: prodObj.type,
//                         brand: prodObj.brand,
//                         vendor: prodObj.vendor,
//                         sku: prodObj.sku,
//                         storeId: prodObj.storeId,
//                         barcode: prodObj.barcode,
//                         categories: prodObj.categories,
//                         collections: prodObj.collections,
//                         tags: prodObj.tags,
//                         media: {
//                             ...prodObj.media,
//                             main_image: {
//                                 url: newImage.url,
//                                 imageId: newImage._id
//                             },
//                         },
//                         pricing: prodObj.pricing,
//                         inventory: prodObj.inventory,
//                         variantMap: prodObj.variantMap,
//                         shipping: prodObj.shipping,
//                         seo: prodObj.seo,
//                         publishing: prodObj.publishing,
//                         additional: prodObj.additional,
//                         description: prodObj.description,   
//                     } as ProductNew)
//                         res.json({
//                             success: true,
//                             message: "Image uploaded successfully",
//                             data: response.data.data,
//                             product: createProduct,
//                             image: newImage
//                         });
//                 } else {
//                     console.log("Image upload failed:", response.data);
//                 }
//             }else {
//                 res.status(500).json({
//                     success: false,
//                     message: "Image upload failed",
//                     error: response.data.message
//                 });
//             }
//         } catch (error) {
//             console.error("Error uploading image:", error);
//             res.status(500).json({
//                 success: false,
//                 message: "Image upload failed",
//                 error: typeof error === 'object' && error !== null && 'message' in error ? (error as { message: string }).message : String(error)
//             });
//         }
//     })
// )
// data: {
//     id: 'mswN2LN',
//     title: 'afd90b1a37e7',
//     url_viewer: 'https://ibb.co/mswN2LN',
//     url: 'https://i.ibb.co/MT4BtYB/afd90b1a37e7.png',
//     display_url: 'https://i.ibb.co/h5jY4PY/afd90b1a37e7.png',
//     width: 1024,
//     height: 1024,
//     size: 1693617,
//     time: 1753302649,
//     expiration: 0,
//     image: {
//       filename: 'afd90b1a37e7.png',
//       name: 'afd90b1a37e7',
//       mime: 'image/png',
//       extension: 'png',
//       url: 'https://i.ibb.co/MT4BtYB/afd90b1a37e7.png'
//     },
//     thumb: {
//       filename: 'afd90b1a37e7.png',
//       name: 'afd90b1a37e7',
//       mime: 'image/png',
//       extension: 'png',
//       url: 'https://i.ibb.co/mswN2LN/afd90b1a37e7.png'
//     },
//     medium: {
//       filename: 'afd90b1a37e7.png',
//       name: 'afd90b1a37e7',
//       mime: 'image/png',
//       filename: 'afd90b1a37e7.png',
//       name: 'afd90b1a37e7',
//       filename: 'afd90b1a37e7.png',
//       filename: 'afd90b1a37e7.png',
//       name: 'afd90b1a37e7',
//       mime: 'image/png',
//       extension: 'png',
//       url: 'https://i.ibb.co/h5jY4PY/afd90b1a37e7.png'
//     },
//     delete_url: 'https://ibb.co/mswN2LN/d03d25021fa8e1aff63effcf4d31ad11'
//   },
//   success: true,
//   status: 200}