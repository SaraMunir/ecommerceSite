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

async function buildImageDoc(uploadRes: any, storeId: string, type = 'product_gallery', alt_text = '', productId: string = ''): Promise<Image>   {
    return {
        url: uploadRes.url,
        alt_text: alt_text,
        type: type,
        storeId: storeId,
        mainImage: {
            filename: uploadRes.image.filename || '',
            name: uploadRes.image.name || '',
            mime: uploadRes.image.mime || '',
            extension: uploadRes.image.extension || '',
            url: uploadRes.image.url || '',
        },
        medium: {
            filename: uploadRes?.medium?.filename || '',
            name: uploadRes?.medium?.name || '',
            mime: uploadRes?.medium?.mime || '',
            extension: uploadRes?.medium?.extension || '',
            url: uploadRes?.medium?.url || '',
        },
        thumbNail: {
            filename: uploadRes?.thumb?.filename || '',
            name: uploadRes?.thumb?.name || '',
            mime: uploadRes?.thumb?.mime || '',
            extension: uploadRes?.thumb?.extension || '',
            url: uploadRes?.thumb?.url || '',
        },
        products: productId ? [productId] : []
    };
}
async function uploadToImgBB2(filePath: string): Promise<any> {
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
async function createProductWithImages(prodObj: ProductNew, mainImageDoc: Image, galleryImageDocs: Image[]) {
    return {
        ...prodObj,
        media: {
            ...prodObj.media,
            main_image: {
                url: mainImageDoc.url,
                imageId: mainImageDoc._id,
                alt_text: mainImageDoc?.alt_text || ''
            },
            gallery: galleryImageDocs
        }
    };
}
async function createProductWithOutGalleryImages(prodObj: ProductNew, mainImageDoc: Image) {
    return {
        ...prodObj,
        media: {
            ...prodObj.media,
            main_image: {
                url: mainImageDoc.url,
                imageId: mainImageDoc._id,
                alt_text: mainImageDoc?.alt_text || ''
            },
            gallery: []
        }
    };
}

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
newProductRouter.delete(
    '/deleteProduct/:id', 
    asyncHandler(async (req, res) =>{
        const product = await newProductModel.findOne({_id : req.params.id})
        if(product){
            await newProductModel.deleteOne({_id : req.params.id})
            res.json({ message: 'Product deleted successfully' })
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
        product_id: req.body.product_id,
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
// This endpoint allows you to upload a main image or multiple gallery images for a new product.
newProductRouter.post(
    '/addImages',
    upload.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'gallery', maxCount: 10 }
    ]),
    asyncHandler(async (req: Request, res: Response) => {
        const prodObj = JSON.parse(req.body.productData);
        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
        const mainImageFile = files?.['mainImage']?.[0];
        const galleryFiles = files?.['gallery'] || [];
        // chek if main image is provided

        if (!mainImageFile && galleryFiles.length === 0) {
            // if main image is not provided, but gallery images are provided, we can still create the product with 1st gallery image as main image
            res.status(400).json({
                success: false,
                message: 'no Images provided. Please upload at least a main image or gallery images.'
            });
            return;
        }
        let mainImageDoc: Image | null = null;
        if(!mainImageFile && galleryFiles.length >0) {

            // Use the first gallery image as the main image
            const firstGalleryFile = galleryFiles[0];
            // const mainImageData = await uploadToImgBB2(firstGalleryFile.path);
            const mainRes = await uploadToImgBB(firstGalleryFile.path);
            if (!mainRes.success) throw new Error('Main image upload failed');

            const imageData= await buildImageDoc(mainRes.data, prodObj.storeId, 'product_main', prodObj.media?.alt_text || '','');
            mainImageDoc = await ImageModel.create(imageData);
            // mainImageDoc = await buildImageDoc(mainImageData, prodObj.storeId, 'product_main', prodObj.media?.alt_text || '');
            const mainImageDocument = await ImageModel.create(mainImageDoc);
            prodObj.media = {
                ...prodObj.media,
                main_image: {
                    url: mainImageDocument.url,
                    imageId: mainImageDocument._id,
                    alt_text: mainImageDocument?.alt_text || ''
                },
                gallery: []
            };
            // update the gallery by removing the first image 
            galleryFiles.shift(); // remove the first image from gallery files
        }else if(mainImageFile) {
            // Upload main image
            if (!mainImageFile || !mainImageFile.path) {
                throw new Error('Main image file is missing');
            }
            const mainRes = await uploadToImgBB(mainImageFile.path);
            if (!mainRes.success) throw new Error('Main image upload failed');
            // Create main image document
            const imageData= await buildImageDoc(mainRes.data, prodObj.storeId, 'product_main', prodObj.media?.alt_text || '','');
            mainImageDoc = await ImageModel.create(imageData);
            console.log("mainImageDoc", mainImageDoc);
        }
        // Create the product without gallery images including the main image
        const product = await createProductWithOutGalleryImages(prodObj, mainImageDoc);
        try {
            // create new product
            const newProduct = await newProductModel.create({
                name: product.name,
                product_id: product.product_id,
                slug: product.slug,
                type: product.type,
                brand: product.brand,
                vendor: product.vendor,
                sku: product.sku,
                storeId: product.storeId,
                barcode: product.barcode,
                categories: product.categories,
                collections: product.collections,
                tags: product.tags,
                media: product.media,
                pricing: product.pricing,
                inventory: product.inventory,
                variantMap: product.variantMap,
                shipping: product.shipping,
                seo: product.seo,
                publishing: product.publishing,
                additional: product.additional,
                description:product.description
            });
            // update the main image document with the product id
            mainImageDoc.products = [...(mainImageDoc.products ?? []), newProduct._id];
            let updatedMainImageDoc = await mainImageDoc.save();
            if(galleryFiles.length === 0) {
                // update the image document with the product id when the gallery is empty
                res.json({
                    success: true,
                    message: 'Product created successfully.',
                    product: newProduct,
                    main_image: updatedMainImageDoc
                });
            }else{
                // Upload gallery images in parallel
                const galleryImageDocs = [];
                for (const file of galleryFiles) {
                    const galleryRes = await uploadToImgBB(file.path);
                    if (galleryRes.success) {
                        const galleryData = await buildImageDoc(galleryRes.data, prodObj.storeId, 'product_gallery','', newProduct._id.toString() );
                        const galleryDoc = await ImageModel.create(galleryData);
                        galleryImageDocs.push({
                            url: galleryDoc.url,
                            imageId: galleryDoc._id,
                            alt_text: galleryDoc?.alt_text || ''
                        });
                    }
                }
                // update product with all image references
                try {
                    // update product with gallery images
                    newProduct.media = {
                        ...newProduct.media,
                        main_image: newProduct.media?.main_image ?? {
                            url: mainImageDoc.url,
                            imageId: mainImageDoc._id,
                            alt_text: mainImageDoc?.alt_text || ''
                        },
                        gallery: galleryImageDocs
                    };
                    await newProduct.save();
                    res.json({
                        success: true,
                        message: 'Product created successfully.',
                        product: newProduct,
                        main_image: mainImageDoc,
                        gallery_images: galleryImageDocs
                    });
                    
                } catch (error) {
                    console.error("Error updating product with gallery images:", error);
                    res.status(500).json({
                        success: false,
                        message: 'Error updating product with gallery images',
                        error: error instanceof Error ? error.message : String(error)
                    });
                    return;
                    
                }
            } 
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({
                success: false,
                message: 'Error creating product',
                error: error instanceof Error ? error.message : String(error)
            });
        }
        // try {
        // }catch (error) {
        //     console.error('Image/product creation failed:', error);
        //     res.status(500).json({
        //         success: false,
        //         message: 'Image upload or product creation failed',
        //         error: error instanceof Error ? error.message : String(error)
        //     });
        //     return;
        // }
    })
    // })
);

/// This endpoint allows you to upload a main image for an existing product.
newProductRouter.post(
    '/addImageToProduct',
    upload.single('mainImg'),
    asyncHandler(async (req: Request, res: Response) => {
        const mainImageFile = req.file;
        const prodId = JSON.parse(req.body.prodId);
        const storeId = JSON.parse(req.body.storeId);
        if(!req.file || !req.file.path) {
            res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
            return;
        }
        try {
        // Upload main image
            if (!mainImageFile) {
                res.status(400).json({
                    success: false,
                    message: 'Main image is required'
                });
                return;
            }
            const mainRes = await uploadToImgBB2(mainImageFile.path);
            if (!mainRes.success) throw new Error('Main image upload failed');
            // Create main image document
            const imageData= await buildImageDoc(mainRes.data, storeId, 'product_main', '', prodId);
            // create a new image document
            const mainImageDoc = await ImageModel.create(imageData);
            console.log("mainImageDoc", mainImageDoc);
            // Update the product with the new main image
            const updatedProduct = await newProductModel.findByIdAndUpdate(
                prodId,
                {
                    $set: {
                        'media.main_image': {
                            url: mainImageDoc.url,
                            imageId: mainImageDoc._id,
                            alt_text: mainImageDoc?.alt_text || ''
                        }
                    }
                },
                { new: true }
            );
            if (!updatedProduct) {
                res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
                return;
            }
            res.json({
                success: true,
                message: 'Image uploaded and product updated successfully',
                product: updatedProduct,
                main_image: mainImageDoc
            });
        } catch (error) {
            console.error('Image/product update failed:', error);
            res.status(500).json({
                success: false,
                message: 'Image/product update failed',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    })
);
/// This endpoint allows you to upload a main image for an existing product.
newProductRouter.post(
    '/addImageGalleryImgToProduct',
    upload.single('galleryImg'),
    asyncHandler(async (req: Request, res: Response) => {
        const galleryImageFile = req.file;
        const prodId = JSON.parse(req.body.prodId);
        const storeId = JSON.parse(req.body.storeId);
        if(!req.file || !req.file.path) {
            res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
            return;
        }
        try {
        // Upload gallery image
            if (!galleryImageFile) {
                res.status(400).json({
                    success: false,
                    message: 'Main image is required'
                });
                return;
            }
            const galleryRes = await uploadToImgBB(galleryImageFile.path);
            if (!galleryRes.success) throw new Error('Gallery image upload failed');
            // Create gallery image document
            const imageData= await buildImageDoc(galleryRes.data, storeId, 'product_gallery', '', prodId);
            
            // create a new image document
            const galleryImageDoc = await ImageModel.create(imageData);
            console.log("galleryImageDoc", galleryImageDoc);
            // Update the product with the new gallery image to the media.gallery array
            const updatedProduct = await newProductModel.findByIdAndUpdate(
                prodId,
                {
                    $push: {
                    'media.gallery': {
                        url: galleryImageDoc.url,
                        imageId: galleryImageDoc._id,
                        alt_text: galleryImageDoc?.alt_text || ''
                    }
                    }
                },
                { new: true }
            );
            if (!updatedProduct) {
                res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
                return;
            }
            res.json({
                success: true,
                message: 'Image uploaded and product updated successfully',
                product: updatedProduct,
                galleryImageDoc: galleryImageDoc
            });
        } catch (error) {
            console.error('Image/product update failed:', error);
            res.status(500).json({
                success: false,
                message: 'Image/product update failed',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    })
);
/// This endpoint allows you to change the main image for an existing product.
newProductRouter.post(
    '/changeMainImageToProduct',
    upload.single('mainImg'),
    asyncHandler(async (req: Request, res: Response) => {
        console.log("req.body", req.body)
        console.log("req.file?.path", req.file?.path)
        const mainImageFile = req.file;
        const prodId = JSON.parse(req.body.prodId);
        const storeId = JSON.parse(req.body.storeId);
        const oldMainImageId = JSON.parse(req.body.oldMainImgId);
        console.log("prodId", prodId);
        console.log("storeId", storeId);
        if(!req.file || !req.file.path) {
            res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
            return;
        }
        try {
        // Upload main image
            if (!mainImageFile) {
                res.status(400).json({
                    success: false,
                    message: 'Main image is required'
                });
                return;
            }
            const mainRes = await uploadToImgBB2(mainImageFile.path);
            if (!mainRes.success) throw new Error('Main image upload failed');
            // Create main image document
            const imageData= await buildImageDoc(mainRes.data, storeId, 'product_main', '', prodId);
            // create a new image document
            const mainImageDoc = await ImageModel.create(imageData);
            // Update the product with the new main image
            const updatedProduct = await newProductModel.findByIdAndUpdate(
                prodId,
                {
                    $set: {
                        'media.main_image': {
                            url: mainImageDoc.url,
                            imageId: mainImageDoc._id,
                            alt_text: mainImageDoc?.alt_text || ''
                        }
                    }
                },
                { new: true }
            );
            // update the old main image document to remove the product id from products array
            console.log("oldMainImageId", oldMainImageId);
            if (oldMainImageId) {
                await ImageModel.findByIdAndUpdate(oldMainImageId, {
                    $pull: { products: prodId }
                });
            }
            if (!updatedProduct) {
                res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
                return;
            }
            res.json({
                success: true,
                message: 'Image uploaded and product updated successfully',
                product: updatedProduct,
                main_image: mainImageDoc
            });
        } catch (error) {
            console.error('Image/product update failed:', error);
            res.status(500).json({
                success: false,
                message: 'Image/product update failed',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    })
);
// This endpoint allows you to update product details.
newProductRouter.post(
    '/updateProduct',
    upload.none(), // 💡 required to parse FormData without files
    asyncHandler(async (req: Request, res: Response) => {
        console.log("req.body  eee", req.body)
        // console.log("req.file?.path", req.file?.path)
        const productData = JSON.parse(req.body.productData);
        // const productData = req.body;
        console.log("productData", productData);
        try {
            const updatedProduct = await newProductModel.findByIdAndUpdate(
                productData._id,
                productData,
                { new: true }
            );
            if (!updatedProduct) {
                res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
                return;
            }
            res.json({
                success: true,
                message: 'Product updated successfully',
                product: updatedProduct
            });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating product',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    })
);