import express, { Request, Response }  from "express"
import asyncHandler from 'express-async-handler'
import { NewCategoryModel } from "../models/newCategoryModel"
import { stat } from "fs"
// export const NewCategoryRouter = express.Router()

export const newCategoryRouter = express.Router()
export const newSubCategoryRouter = express.Router()

newCategoryRouter.get(
    '/storeId/:id', 
    asyncHandler(async (req, res) =>{
        const product = await NewCategoryModel.find({storeId : req.params.id})
        if(product){
            res.json(product)
        }else{
            res.status(404).json({ message: 'Category Not Found' })
        }
    })
)
newCategoryRouter.post(
    '/addNewCategory',
    asyncHandler(async (req:Request, res:Response)=>{
        console.log('req.body', req.body)
        try{
            const newCategory = await NewCategoryModel.create({
                description:req.body.description, 
                name:req.body.name, 
                status:req.body.status, 
                storeId:req.body.storeId, 
                subCategories:req.body.subCategories, 
                parentId:req.body.parentId,
                isChildren: req.body.isChildren,
                isParent: req.body.isParent
            })
            console.log('category created', newCategory)
            res.json(newCategory)
        }catch(err){
            console.error('Error creating category:', err)
            res.status(500).json({ message: 'Error creating category' })
        }
    })
)
newCategoryRouter.post(
    '/addNewSubCategory',
    asyncHandler(async (req:Request, res:Response)=>{
        console.log('req.body', req.body)
        // return res.status(400).json({ message: 'This route is not implemented yet' })
        try{
            const newCategory = await NewCategoryModel.create({
                description:req.body.description, 
                name:req.body.name, 
                status:req.body.status, 
                storeId:req.body.storeId, 
                subCategories:req.body.subCategories, 
                parentId:req.body.parentId,
                isChildren: req.body.isChildren,
                isParent: req.body.isParent
            })
            console.log('newCategory created', newCategory)
            if(newCategory){
                if(req.body.parentId){
                    let parentCategory = await NewCategoryModel.findOne({_id : req.body.parentId})
                    if(parentCategory){
                        parentCategory.subCategories?.push(newCategory._id)
                        try{
                            const parentCategoryNew = await NewCategoryModel.findOneAndUpdate({_id : req.body.parentId}, {subCategories: parentCategory.subCategories, isParent: true},{new: true})
                            
                            if(parentCategoryNew){
                                res.json(
                                    {
                                        message: 'Subcategory created successfully',
                                        category: newCategory,
                                        parentCategory: parentCategoryNew
                                    }
                                )
                            }
                        }catch(err){
                            console.error('Error updating parent category:', err)
                            res.status(500).json({ message: 'Error updating parent category:' })

                        }

                    }
                    
                    // const parentCategoryNew = await NewCategoryModel.findOneAndUpdate({_id : req.body.parentId}, {isParent:true},{new: true}) 
                }
            }else{
                res.status(400).json({ message: 'Failed to create subcategory' })
            }
        }catch(err){
            console.error('Error creating category:', err)
            res.status(500).json({ message: 'Error creating category' })
        }
    })
)

newCategoryRouter.put(
    '/update/catId/:id',
    asyncHandler(async (req:Request, res:Response)=>{
        console.log('category? ',req.body.name)
        console.log('req.params.id? ',req.params.id)
        // return res.status(400).json({ message: 'This route is not implemented yet' })
        // return
        try{
            const newCategory = await NewCategoryModel.findOneAndUpdate({_id : req.params.id}, {...req.body},{new: true})
            console.log('newCategory updated', newCategory)
            if(newCategory){
                res.json(newCategory)
            }else{
                res.status(404).json({ message: 'Category Not Found' })
            }
        }catch(err){
            console.error('Error updating category:', err)
            res.status(500).json({ message: 'Error updating category' })
        }
    })
)
newCategoryRouter.put(
    '/updateRemoveSub/parent/:id/sub/:subId',
    asyncHandler(async (req:Request, res:Response)=>{
        try{
            const parentCategory = await NewCategoryModel.findOneAndUpdate({_id : req.params.id}, {$pull: {subCategories: req.params.subId}},{new: true})
            console.log('parentCategory updated', parentCategory)
            if(parentCategory){
                const subCategory = await NewCategoryModel.findOneAndUpdate({_id : req.params.subId}, {isChildren: false, isParent: false, parentId: ''},{new: true})
                console.log('subCategory updated', subCategory)
                res.json( {
                    status: 'success',
                    message: 'Subcategory updated successfully',
                    category: subCategory,
                    parentCategory: parentCategory
                })
            }else{
                res.status(404).json({ message: 'Category Not Found', status: 'error' })
            }
        }catch(err){
            console.error('Error updating category:', err)
            res.status(500).json({ message: 'Error updating category', status: 'error' })
        }
    })
)


newCategoryRouter.put(
    '/deleteCategory/:id', 
    asyncHandler(async (req: Request, res: Response) =>{
        console.log(req.params.id)
        const deleteCategoryById = async (id: string) => {
            try {
                const category = await NewCategoryModel.findByIdAndDelete(id)
                return category
            } catch (error) {
                console.error('Error deleting category:', error)
                throw new Error('Error deleting category')
            }
        }
        // const removeSubCategoryFromParent = async (category: any, ) => {
        //     if(category?.isChildren){
        //         // if the category is a children, we need to remove it from its parent's subcategories
        //         const parentCategory = await NewCategoryModel.findOneAndUpdate({_id: category?.parentId}, {$pull: {subCategories: category?._id}}, {new: true})
        //         console.log('parentCategory updated ', parentCategory)
        //         if(!parentCategory){
        //             res.status(404).json({ message: 'Failed to update parent category', 
        //                 status: 'error'
        //             })
        //         }else{
        //             console.log('parentCategory updated successfully', parentCategory)
        //             // if the parent category is updated successfully, we can delete the category
        //             // const deleteCategory = await NewCategoryModel.findByIdAndDelete(req.params.id)
        //             const deleteCategory = await deleteCategoryById(req.params.id)
        //             if(!deleteCategory){
        //                 res.status(404).json({ message: 'Failed to delete category', 
        //                     status: 'error'
        //                 })
        //             }else{
        //                 res.status(200).json({ message: 'Category deleted successfully',
        //                     status: 'success' })
        //             }
        //         }
        //     }else{
        //         // if the category is not a children, we can delete it directly
        //         const deleteCategory = await deleteCategoryById(req.params.id)
        //         if(!deleteCategory){
        //             res.status(404).json({ message: 'Failed to delete category', 
        //                 status: 'error'
        //             })
        //         }else{
        //             res.status(200).json({ message: 'Category deleted successfully',
        //                 status: 'success' })
        //         }
        //     }
        // }
        try {
            // const category = await NewCategoryModel.findByIdAndDelete(req.params.id)
            let category: any = await NewCategoryModel.findOne({_id : req.params.id})
            console.log(category)
            if(category){
                if(category?.isParent){
                    console.log('category is a parent', category)
                    // If the category is a parent, we need to remove the parentid from its subcategories
                    const updatedSubCategories = await NewCategoryModel.updateMany(
                        { parentId: category?._id },
                        { $unset: { parentId: "" }, $set: { isChildren: false } },
                        { new: true }
                    )
                    // then we delete the parent
                    if(updatedSubCategories){
                        console.log('updatedSubCategories', updatedSubCategories)
                        if(category?.isChildren){
                            console.log('category is a children')
                            // if the category is a children, we need to remove it from its parent's subcategories
                            console.log('removing subcategory from parents subcategories')
                            const parentCategory = await NewCategoryModel.findOneAndUpdate({_id: category?.parentId}, {$pull: {subCategories: category?._id}}, {new: true})
                            // console.log('parentCategory updated ', parentCategory)
                            if(parentCategory){
                                console.log('parentCategory updated successfully', parentCategory)
                                // if the parent category is updated successfully, we can delete the category
                                // const deleteCategory = await NewCategoryModel.findByIdAndDelete(req.params.id)
                                console.log('deleting category', req.params.id)
                                const deleteCategory = await deleteCategoryById(req.params.id)
                                console.log('deleting category', req.params.id)
                                if(deleteCategory){
                                    res.status(200).json({ message: 'Category deleted successfully',
                                        status: 'success' })
                                }else{
                                    res.status(404).json({ message: 'Failed to delete category', 
                                        status: 'error'
                                    })
                                }
                            }else{
                                res.status(404).json({ message: 'Failed to update parent category', 
                                    status: 'error'
                                })
                                console.log('Failed to update parent category error', parentCategory)
                            }
                        }else{
                            // if the category is not a children, we can delete it directly
                            const deleteCategory = await deleteCategoryById(req.params.id)
                            if(deleteCategory){
                                res.status(200).json({ message: 'Category deleted successfully',
                                    status: 'success' })
                            }else{
                                res.status(404).json({ message: 'Failed to delete category', 
                                    status: 'error'
                                })
                            }
                        }
                    }else{
                        res.status(400).json({ message: 'Failed to update subcategories',
                            status: 'error'
                        })
                    }
                    // if category is a children, we can delete it directly
                }else{
                    // If the category is not a parent, but a children, we need to remove it from its parent's subcategories
                    if(category?.isChildren){
                        // category is a children
                        console.log('category is a children')
                        const parentCategory = await NewCategoryModel.findOneAndUpdate({_id: category?.parentId}, {$pull: {subCategories: category?._id}}, {new: true})
                        if(parentCategory){
                            // if the parent category is updated successfully, we can delete the category
                            console.log('parentCategory updated successfully', parentCategory)
                            const deleteCategory = await deleteCategoryById(req.params.id)
                            if(deleteCategory){
                                console.log('category deleted successfully', deleteCategory)
                                res.status(200).json({ message: 'Category deleted successfully',
                                    status: 'success' })
                            }else{
                                console.log('Failed to delete category')
                                res.status(404).json({ message: 'Failed to delete category', 
                                    status: 'error'
                                })
                            }
                        }else{
                            res.status(404).json({ message: 'Failed to update parent category', 
                                status: 'error'
                            })
                        }
                    }else{
                        // the category is not a children, we can delete it directly
                        const deleteCategory = await deleteCategoryById(req.params.id)
                        if(deleteCategory){
                            res.status(200).json({ message: 'Category deleted successfully',
                                status: 'success' })
                        }else{
                            res.status(404).json({ message: 'Failed to delete category', 
                                status: 'error'
                            })
                        }
                    }
                }
            }else{
                res.status(404).json({ message: 'Category Not Found',status: 'error' })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error updating category', status: 'error', error: error  })
        }
    })
)