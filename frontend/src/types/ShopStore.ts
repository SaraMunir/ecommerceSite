import { AdminUserInfo } from "./UserInfo"

export type ShopStore ={
    storeTheme: any
    data?: AdminUserInfo
    error: any
    languages: any
    timeZone: any
    storeAddress: any
    _id?: string
    storeName: string
    storeOwner: string
    storeUsers: string[]
    storeNumber: number
    status: string
    currency: string
    current: boolean
    weightUnit:any
}