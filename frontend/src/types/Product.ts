export type Product ={
    [x: string]: any
    _id: string
    name: string
    slug: string
    image: string
    category: string
    price: number
    countInStock: number
    description: string
    storeId:string
    status?:string
}