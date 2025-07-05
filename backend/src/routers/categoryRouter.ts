import express, { Request, Response }  from "express"
import asyncHandler from 'express-async-handler'
import { CategoryModel } from "../models/categoryModel"
export const categoryRouter = express.Router()


categoryRouter.get(
    '/storeId/:id', 
    asyncHandler(async (req, res) =>{
        const product = await CategoryModel.find({storeId : req.params.id})
        if(product){
            res.json(product)
        }else{
            res.status(404).json({ message: 'Category Not Found' })
        }
    })
)

// let newCategory={
//     description:'', 
//     name: inputNewCatValue.inputVal, 
//     parentCategories:[inputNewCatValue.parentId],
//     status:true,
//     storeId: storeInfo?.storeId!,
//     subCategories:[],
//     parentId: inputNewCatValue.parentId
// }

categoryRouter.post(
    '/addNewCategory',
    asyncHandler(async (req:Request, res:Response)=>{
        try{

            const newCategory = await CategoryModel.create({
                description:req.body.description, 
                name:req.body.name, 
                status:req.body.status, 
                storeId:req.body.storeId, 
                subCategories:req.body.subCategories, 
                parentCategories:req.body.parentCategories, 
                parentId:req.body.parentId, 
            })
            console.log('category created', newCategory)
            if(newCategory){
                if(req.body.parentId){
                    let newSubCats = []
                    try {
                        
                        let parentCategory = await CategoryModel.findOne({_id : req.body.parentId})
                        if(parentCategory){
                            const test=parentCategory.subCategories?.push(newCategory._id)
                            try {
                                const parentCategoryNew = await CategoryModel.findOneAndUpdate({_id : req.body.parentId}, {subCategories: parentCategory.subCategories},{new: true})
                                if(parentCategoryNew){
                                    res.json(
                                        {
                                            status:"success", 
                                            data: {
                                                newCreatedCategory: {
                                                    name: newCategory.name,
                                                    storeId: newCategory.storeId,
                                                    description: newCategory.description,
                                                    status: newCategory.status,
                                                    parentCategories: newCategory.parentCategories,
                                                    parentId: newCategory.parentId,
                                                    subCategories: newCategory.subCategories
                                                },
                                                updatedCategory: {
                                                    name: parentCategoryNew.name,
                                                    storeId: parentCategoryNew.storeId,
                                                    description: parentCategoryNew.description,
                                                    status: parentCategoryNew.status,
                                                    parentCategories: parentCategoryNew.parentCategories,
                                                    parentId: parentCategoryNew.parentId,
                                                    subCategories: parentCategoryNew.subCategories
                                                }
                                            }
                                        }
                                    )
                                }
                            } catch (err: any) {
                                console.log(err.code)
                                res.json({
                                    status: "error", 
                                    error: err
                                })
                            }
                        }
                    } catch (errorSecondary: any) {
                        console.log(errorSecondary.code)
                        res.json({
                            status: "error", 
                            error: errorSecondary
                        })
                    }
                }else{
                    res.json(
                        {
                            status:"success", 
                            data: {
                                newCreatedCategory: {
                                    name: newCategory.name,
                                    storeId: newCategory.storeId,
                                    description: newCategory.description,
                                    status: newCategory.status,
                                    parentCategories: newCategory.parentCategories,
                                    parentId: newCategory.parentId,
                                    subCategories: newCategory.subCategories
                                }
                            }
                        }
                    )

                }
            }
        }catch(error: any){
            console.log(error.code)
            res.json({
                status: "error", 
                error: error
            })
        }
    })
)