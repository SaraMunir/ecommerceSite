import express, { Request, Response } from "express";
import { categories, sampleProducts, subCategories } from "./data";
import cors from 'cors'
const app = express()
app.use(
    cors({
        credentials:true,
        origin: ['http://localhost:5173']
    })
)

app.get('/api/products', (req: Request, rest: Response)=>{
    rest.json(sampleProducts)
})
app.get('/api/categories', (req: Request, rest: Response)=>{
    rest.json(categories)
})
app.get('/api/subCategories', (req: Request, rest: Response)=>{
    rest.json(subCategories)
})

const PORT = 4000
app.listen(PORT, ()=>{
    console.log(`server started at http://localhost:${PORT}`)
})