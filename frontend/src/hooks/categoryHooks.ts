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
    // useGetProductListByStoreIdQuery

    // export const useGetCategoriesByStoreIdQuery = (id: string) =>
    //     useQuery({
    //         queryKey: ['products', id],
    //         queryFn: async () =>
    //     (await apiClient.get<Product>(`api/products/id/${id}`)).data
    // })

export const useGetCategoriesByStoreIdQuery = (id: string) =>
    useQuery({
        queryKey: ['categories', id],
        queryFn: async () =>
    (await apiClient.get<Category>(`api/categories/storeId/${id}`)).data
})

// description:'', 
// name: inputNewCatValue.inputVal, 
// parentCategories:[inputNewCatValue.parentId],
// status:true,
// storeId: storeInfo?.storeId!,
// subCategories:[],
// parentId: inputNewCatValue.parentId
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
            await apiClient.post<Category>(`api/categories/addNewCategory `,{
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
