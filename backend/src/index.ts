import express, { Request, Response } from "express";
import dotenv from 'dotenv'
import {  sampleProducts, subCategories } from "./data";
import cors from 'cors'
import mongoose from "mongoose";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';


import { productRouter } from "./routers/productRouter";

import { newProductRouter } from "./routers/newProductRouter";
import { seedRouter } from "./routers/seedRouter";
import { userRouter } from "./routers/userRouter";
import { adminUserRouter } from "./routers/adminUserRouter";
import { storeRouter } from "./routers/storeRouter";
import { categoryRouter } from "./routers/categoryRouter";
import { newCategoryRouter } from "./routers/newCategoryRouter";

import multer from 'multer';
// import { newSubCategoryRouter } from "./routers/newCategoryRouter";

dotenv.config()

const MONGODB_URI = 
process.env.MONGODB_URI || 'mongodb://localhost/ecom2025'

mongoose.set('strictQuery', true)
mongoose
    .connect(MONGODB_URI)
    .then(()=>{
        console.log('connected to mongodb')
    })
    .catch(()=>{
        console.log('error mongodb')
    })

const app = express()
app.use(
    cors({
        credentials:true,
        origin: ['http://localhost:5173']
    })
)

app.use(express.json())
app.use(express.urlencoded({extended: true}));

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Click 'View API Keys' above to copy your cloud name
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
const testFunction = async () => {
    // Configuration
    
    // Upload an image
    // D:\WebDevlopment\2025\ecommerceSite\frontend\public\images\222.png
    const uploadResult = await cloudinary.uploader
        .upload(
            `${path}`, {
                public_id: 'test',
            }
        )
        .catch((error) => {
            console.log(error);
    });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('test', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    // console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('test', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    // console.log(autoCropUrl);    
}


app.use('/api/products', productRouter)
app.use('/api/allProductList', newProductRouter)
app.use('/api/products/id', productRouter)
app.use('/api/products/addProduct', productRouter)
app.use('/api/products/addImage', productRouter)
app.use('/api/products/delete', productRouter)
app.use('/api/seed', seedRouter)
app.use('/api/users', userRouter)
app.use('/api/adminUsers', adminUserRouter)
app.use('/api/stores', storeRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/categoryList', newCategoryRouter)


// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     return cb(null, "./public/Images")
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`)
//   }
// })()
const storage = multer.diskStorage({
  filename: function (req: any,file: { originalname: any; },cb: (arg0: null, arg1: any) => void) {
    cb(null, file.originalname)
  }
});

const upload = multer({storage})


app.post('/upload', upload.single('file'), async (req, res) => {
  console.log(req.body)
  console.log(req.file?.path)
    if (!req.file || !req.file.path) {
        res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
        return;
    }
    // testFunction(req.file.path)
    try {
      const uploadResult = await cloudinary.uploader.upload(
        `${req.file.path}`, {
          public_id: 'test',
        }
      );
      res.status(200).json({
        success: true,
        uploadResult
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Upload failed",
        error
      });
    }
})


// app.use('/api/products', productRouter)
// app.get('/api/categories', (req: Request, rest: Response)=>{
//     rest.json(categories)
// })
// app.get('/api/subCategories', (req: Request, rest: Response)=>{
//     rest.json(subCategories)
// })



// import { v2 as cloudinary } from 'cloudinary';


app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})


const PORT: number = parseInt((process.env.PORT || '4000') as string, 10) || 4000

// const PORT = 4000
app.listen(PORT, ()=>{
    console.log(`server started at http://localhost:${PORT}`)
})