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
            status
        }: {
            description: string
            name? : string
            storeId : string
            subCategories? : string[]
            parentId : string
            status?: string
        }) =>
        (
            await apiClient.post<Category>(`api/categoryList/addNewCategory `,{
                description,
                name,
                storeId,
                subCategories,
                parentId,
                status
            })
        ).data
    })
