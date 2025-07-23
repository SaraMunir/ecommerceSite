import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Category, SubCategory } from "../types/Category";

export const useGetCategoriesQuery = () =>
    useQuery({
        queryKey: ['categories'],
        queryFn: async () => (await apiClient.get<Category[]>(`api/categories`)).data,
    })
export const useGetSubCategoriesQuery = () =>
    useQuery({
        queryKey: ['subCategories'],
        queryFn: async () => (await apiClient.get<SubCategory[]>(`api/subCategories`)).data,
    })

export const useGetCategoriesByStoreIdQuery = (id: string) =>
    useQuery({
        queryKey: ['categories', id],
        queryFn: async () =>
    (await apiClient.get<Category>(`api/categories/storeId/${id}`)).data
})

export const useCreateCategoryMutation = () => 
    useMutation({
        mutationFn: async ({
            description,
            name,
            storeId, 
            status,
            parentCategories,
            subCategories,
            parentId

        }: {
            description: string
            name? : string
            parentCategories? : string[]
            subCategories? : string[]
            parentId : string
            storeId : string
            status?: string
        }) =>
        (
            await apiClient.post<Category>(`api/categories/addOldNewCategory `,{
                description,
                name,
                storeId,
                status,
                parentCategories,
                subCategories,
                parentId
            })
        ).data
    })


export const useGetNewCategoriesByStoreIdQuery = (id: string) =>
    useQuery({
        queryKey: ['newCategories', id],
        queryFn: async () =>
    (await apiClient.get<Category>(`api/categoryList/storeId/${id}`)).data
})

export const useCreateNewCategoryMutation = () => 
    useMutation({
        mutationFn: async ({
            description,
            name,
            storeId, 
            subCategories,
            parentId,
            status,
            isChildren,
            isParent    
        }: {
            description: string
            name? : string
            storeId : string
            subCategories? : string[]
            parentId : string
            status?: string,
            isChildren?: boolean,
            isParent?: boolean
        }) =>
        (
            await apiClient.post<Category>(`api/categoryList/addNewCategory`,{
                description,
                name,
                storeId,
                subCategories,
                parentId,
                status,
                isChildren,
                isParent
            })
        ).data
    })
export const useCreateNewSubCategoryMutation = () => 
    useMutation({
        mutationFn: async ({
            description,
            name,
            storeId, 
            subCategories,
            parentId,
            status,
            isChildren,
            isParent    
        }: {
            description: string
            name? : string
            storeId : string
            subCategories? : string[]
            parentId : string
            status?: string,
            isChildren?: boolean,
            isParent?: boolean
        }) =>
        (
            await apiClient.post<Category>(`api/categoryList/addNewSubCategory`,{
                description,
                name,
                storeId,
                subCategories,
                parentId,
                status,
                isChildren,
                isParent
            })
        ).data
    })


export const useEditCategoryMutation= (id: string) =>
useMutation({
    mutationFn: async({
        description,
        name,
        storeId, 
        subCategories,
        parentId,
        status,
        isChildren,
        isParent
    } : {
        description: string
        name? : string
        storeId : string
        subCategories? : string[]
        parentId : string
        status?: string,
        isChildren?: boolean,
        isParent?: boolean
    })=>(
        await apiClient.put<Category>(`api/categoryList/update/catId/${id}`,{
            description,
            name,
            storeId,
            subCategories,
            parentId,
            status,
            isChildren,
            isParent
        })
    ).data
})
// /updateRemoveSub/parent/:id/sub/:subId
export const updateRemoveSubCategory = (id: string, subCategoryId: string) =>
    useMutation({
        mutationFn: async () => {
            console.log('updateRemoveSubCategory called with id:', id)
            console.log('updateRemoveSubCategory called with subCategoryId:', subCategoryId)
            // /updateRemoveSub/parent/:id/sub/:subId
            const response = await apiClient.put<Category>(`api/categoryList/updateRemoveSub/parent/${id}/sub/${subCategoryId}`, {
                subCategoryId,
                parentId: id
            })
            return response.data
        }
    })
export const deleteCategory = (id: string) =>
    useMutation({
        mutationFn: async () => {
            console.log('deleteCategory called with id:', id)
            // /deleteCategory/:id
            // const response = await apiClient.delete<Category>(`api/categoryList/deleteCategory/${id}`, {
            //     data: {
            //         parentId: id
            //     }
            // })
            const response = await apiClient.put<Category>(`api/categoryList/deleteCategory/${id}`)
            console.log('deleteCategory response:', response)   
            return response.data
        }
    })