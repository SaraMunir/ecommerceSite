export type UserInfo = {
    name: string
    email: string
    token: string
    isAdmin: boolean
}
export type AdminUserInfo = {
    [x: string]: any
    status: string
    data: AdminUserInfo
    _id?:string
    firstName: string
    lastName: string
    email: string
    adminType: string
    token: string
    storeNumber?: number
}