export type Product ={
    [x: string]: any
    _id: string
    name: string
    image?: string
    imageList?: any[]
    category: string
    tags: string[]
    price: number
    inventory: number
    quantitySold?: number
    description: string
    weight?: number
    hasVariants?: boolean
    variesBy: string[]
    storeId:string
    status?:string
    shipping?: true
}