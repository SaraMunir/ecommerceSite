export type Category ={
    selected: any
    parentCategories: any
    map: any
    _id: string
    name: string
    dispName: string
    status: boolean
    storeId:string
    subCategories:string[]
}
export type SubCategory ={
    _id: string
    name: string
    dispName: string
    storeId:string
    status: boolean
    subCategories:[]
}