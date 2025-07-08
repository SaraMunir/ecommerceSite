import express, { Request, Response } from "express";
import dotenv from 'dotenv'
import {  sampleProducts, subCategories } from "./data";
import cors from 'cors'
import mongoose from "mongoose";
import path from "path";


import { productRouter } from "./routers/productRouter";
import { seedRouter } from "./routers/seedRouter";
import { userRouter } from "./routers/userRouter";
import { adminUserRouter } from "./routers/adminUserRouter";
import { storeRouter } from "./routers/storeRouter";
import { categoryRouter } from "./routers/categoryRouter";
import { newCategoryRouter } from "./routers/newCategoryRouter";

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
app.use(express.urlencoded({extended: true}))

// app.get('/api/products', (req: Request, rest: Response)=>{
//     rest.json(sampleProducts)
// })
// app.get('/api/products/:id', (req: Request, rest: Response)=>{
//     rest.json(sampleProducts.find((x)=>x._id === req.params.id))
// })

app.use('/api/products', productRouter)
app.use('/api/products/id', productRouter)
app.use('/api/products/addProduct', productRouter)
app.use('/api/products/delete', productRouter)
app.use('/api/seed', seedRouter)

app.use('/api/users', userRouter)

app.use('/api/adminUsers', adminUserRouter)
app.use('/api/stores', storeRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/categoryList', newCategoryRouter)

// app.use('/api/products', productRouter)
// app.get('/api/categories', (req: Request, rest: Response)=>{
//     rest.json(categories)
// })
// app.get('/api/subCategories', (req: Request, rest: Response)=>{
//     rest.json(subCategories)
// })

app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})


const PORT: number = parseInt((process.env.PORT || '4000') as string, 10) || 4000

// const PORT = 4000
app.listen(PORT, ()=>{
    console.log(`server started at http://localhost:${PORT}`)
})