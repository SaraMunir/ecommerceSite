import express, { Request, Response }  from "express"
import asyncHandler from 'express-async-handler'
import { AdminUser, AdminUserModel } from "../models/adminUserModel"
import bcrypt from "bcryptjs"
import { generateAdminUserToken, generateToken } from "../utils"
import { Store, StoreModel } from "../models/storeModel"

export const adminUserRouter = express.Router()

// POST /api/users/signin
adminUserRouter.post(
    '/signin',
    asyncHandler(async(req: Request, res: Response)=>{
    const adminUser = await AdminUserModel.findOne({
        email: req.body.email
        })
    if(adminUser){
        if(bcrypt.compareSync(req.body.password, adminUser.password)){
            let store:any
            if(adminUser?.stores){
                adminUser?.stores.forEach(async element => {
                    const storeQuery = await StoreModel.findOne({
                        storeNumber:element,
                        current:true
                    })
                    if(storeQuery){
                        res.json(
                            { 
                            status:"success",
                            data:{
                                adminUser:{
                                    _id: adminUser._id,
                                    firstName: adminUser.firstName,
                                    lastName: adminUser.lastName,
                                    email: adminUser.email,
                                    adminType: adminUser.adminType,
                                    stores: adminUser.stores,
                                    token: generateAdminUserToken(adminUser),
                                },
                                store: {
                                    storeNumber: storeQuery?.storeNumber,
                                    storeId: storeQuery?._id
                                }
                            }}
                        )
                    }
                });
            }
            return
        }
    }
    res.status(401).json({ message: 'Invalid email or password' })
    })
)
adminUserRouter.post(
    
    '/signup',
    asyncHandler(async (req: Request, res: Response) =>{
        try {
            let stores = []
            stores.push(req.body.storeNumber)
            const adminUser = await AdminUserModel.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                adminType: req.body.adminType,
                password: bcrypt.hashSync(req.body.password),
                stores: [...stores]
            } as AdminUser)
            console.log('admin user created', adminUser)

            let storeUsers = []
            storeUsers.push(adminUser._id)
            const store = await StoreModel.create({
                storeOwner: adminUser._id,
                storeNumber: req.body.storeNumber,
                storeUsers: [...storeUsers],
                current:true
            } as Store)
            res.json(
                { 
                status:"success",
                data:{
                    adminUser:{
                        _id: adminUser._id,
                        firstName: adminUser.firstName,
                        lastName: adminUser.lastName,
                        email: adminUser.email,
                        adminType: adminUser.adminType,
                        stores: adminUser.stores,
                        token: generateAdminUserToken(adminUser),
                    },
                    store: {
                        storeNumber: store.storeNumber,
                        storeId: store._id
                    }
                }}
            )
        } catch (error:any) {
            console.log(error.code)
            res.json({
                status:"error",
                error: error
            })
        }
    })
)
adminUserRouter.get(
    '/id/:id', 
    asyncHandler(async (req, res) =>{
        const adminUser = await AdminUserModel.findOne({_id : req.params.id})
        if(adminUser){
            res.json(adminUser)
        }else{
            res.status(404).json({ message: 'User Not Found' })
        }
    })
)