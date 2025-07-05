import express, { Request, Response }  from "express"
import asyncHandler from 'express-async-handler'
// import { AdminUser, AdminUserModel } from "../models/adminUserModel"
import bcrypt from "bcryptjs"
import { Store, StoreModel } from "../models/storeModel"

export const storeRouter = express.Router()

storeRouter.post(
    '/createStore',
    asyncHandler(async (req: Request, res: Response) =>{
        try {
            const store = await StoreModel.create({
                storeName: req.body.storeName,
                storeAddress: req.body.storeAddress,
                weightUnit: req.body.weightUnit,
                storeOwner: req.body.storeOwner,
                storeNumber: req.body.storeNumber,
                storeUsers: req.body.storeUsers,
                status: req.body.status,
                current: req.body.current,
                timeZone: req.body.timeZone,
                currency: req.body.currency,
                language: req.body.languages
            } as Store)
            res.json(
                { 
                status:"success",
                data:{
                    _id: store._id,
                    storeAddress: req.body.storeAddress,
                    storeName: store.storeName,
                    weightUnit: store.weightUnit,
                    storeOwner: store.storeOwner,
                    storeNumber: store.storeNumber,
                    storeUsers: store.storeUsers,
                    status: store.status,
                    current: store.current,
                    timeZone: store.timeZone,
                    currency: store.currency,
                    languages: store.languages
                }
            })
        } catch (error:any) {
            console.log(error.code)
            res.json({
                status:"error",
                error: error
            })
        }
    })
)

storeRouter.get(
    '/', 
    asyncHandler(async (req, res) =>{
        const store = await StoreModel.find()
        res.json(store)
    })
)

storeRouter.get(
    '/id/:id', 
    asyncHandler(async (req, res) =>{
        const store = await StoreModel.findOne({_id : req.params.id})
        if(store){
            res.json(store)
        }else{
            res.status(404).json({ message: 'Store Not Found' })
        }
    })
)
storeRouter.put(
    '/update/id/:id', 
    asyncHandler(async (req: Request, res: Response) =>{
        console.log('store name? ',req.body.storeName)
        try {
            const store = await StoreModel.findOneAndUpdate({_id : req.params.id}, {...req.body},{new: true})
            if(store){
            // store = {...req.body},
            // console.log('store before save',store)
            //     await store.save().then(savedStore =>{
            //         console.log('savedStore', savedStore)
            //     })
                res.json(store)
            }else{
                res.status(404).json({ message: 'Store Not Found' })
            }
        } catch (error) {
            
        }
    })
)
storeRouter.put(
    '/changeStore/currentId=:currentId&selectedId=:selectedId', 
    asyncHandler(async (req: Request, res: Response) =>{
        try {
            console.log(" req.params.currentId:",  req.params.currentId)
            console.log(" req.params.selectedId:",  req.params.selectedId)
            const currentStore = await StoreModel.findOneAndUpdate({storeNumber : req.params.currentId}, {current:false},{new: true})
            // console.log('currentStore', currentStore)
            if(currentStore){
                const selectedStore = await StoreModel.findOneAndUpdate({storeNumber : req.params.selectedId}, {current:true},{new: true})
                // console.log('selectedStore', selectedStore)
                if(selectedStore){
                    res.json({
                        status:"success",
                        data:selectedStore})
                }else{
                    res.status(404).json({ message: `${req.params.selectedId} Store Not Found` })
                }
            }else{
                res.status(404).json({ message: `${req.params.currentId} Store Not Found` })
            }
        } catch (error) {
            res.status(404).json({ message: 'there was an error' })
        }
    })
)