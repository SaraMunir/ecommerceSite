export type Category ={
    _id?: string
    name: string
    dispName: string
    status: boolean
    subCategories:string[]
}
export type SubCategory ={
    _id?: string
    name: string
    dispName: string
    status: boolean
    subCategories:[]
}