import express, { Request, Response }  from "express"
import asyncHandler from 'express-async-handler'
import { Image, ImageModel  } from "../models/newImageModel"
export const imageRouter = express.Router()

import multer from "multer";
import axios from "axios";
import fs from "fs";


const storage = multer.diskStorage({
  filename: function (req: any,file: { originalname: any; },cb: (arg0: null, arg1: any) => void) {
    cb(null, file.originalname)
  }
});
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
async function buildImageDoc(uploadRes: any, storeId: string, type = 'product_gallery', alt_text = '', pageId: string = '', sectionId: string = '', blockId: string = ''): Promise<Image>   {
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
        page: {
            pageId: pageId,
            sectionId: sectionId,
            blockId: blockId,
            type: 'blockObject'
        }
    };
}
const upload = multer({ storage });


imageRouter.post(
    '/uploadImage',
    upload.fields([
        { name: 'mainImage', maxCount: 1 }
    ]),
    asyncHandler(async (req: Request, res: Response) => {
        console.log("req.body",req.body)
        const storeId = JSON.parse(req.body.storeId);
        const pageId = JSON.parse(req.body.pageId);
        const sectionId = JSON.parse(req.body.sectionId);
        const blockId = JSON.parse(req.body.blockId);
        console.log("is this hit");
        console.log("req.files", req.files);
        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
        const mainImageFile = files?.['mainImage']?.[0];
        let mainImageDoc: Image | null = null;
        if (!mainImageFile || !mainImageFile.path) {
            throw new Error('Main image file is missing');
        }
        const mainRes = await uploadToImgBB(mainImageFile.path);
        if (!mainRes.success) throw new Error('Main image upload failed');
        try {
            const imageData= await buildImageDoc(mainRes.data, storeId, 'page_block_image', '', pageId, sectionId, blockId);
            mainImageDoc = await ImageModel.create(imageData);
            console.log("mainImageDoc", mainImageDoc);
            res.json(mainImageDoc);
        } catch (error) {
            console.error("Error creating main image document:", error);
            res.status(500).json({ error: 'Failed to create main image document' });
        }

        // const images = await ImageModel.find({ storeId: id })
        // console.log("images", images)
        // res.json(images)
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