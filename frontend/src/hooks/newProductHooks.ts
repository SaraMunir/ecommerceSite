import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import {apiClientFormData} from "../apiClient";
import { NewProduct } from "../types/NewProduct";
// queryKey: ['products', id],
export const useGetNewProductsQuery = () =>
    useQuery({
        queryKey: ['newProducts'],
        queryFn: async () => (await apiClient.get<NewProduct[]>(`api/allProductList`)).data,
    });

    export const useGetProductListByStoreIdQuery = (id: string) =>
    useQuery({
        queryKey: ['newProducts', id],
        queryFn: async () =>
    (await apiClient.get<NewProduct[]>(`api/allProductList/storeId/${id}`)).data
})


export const useGetProductDetailsByIdQuery = (id: string) =>
    useQuery({
        queryKey: ['newProducts', id],
        queryFn: async () =>
    (await apiClient.get<NewProduct>(`api/allProductList/productDetail/id/${id}`)).data
})



export const useCreateNewProductMutation= () =>
    // console.log("Creating new product with data:",name)
    useMutation({
        mutationFn: async({
            name,
            slug,
            description,
            type,
            brand,
            vendor,
            sku,
            barcode,
            categories,
            collections,
            tags,
            media,
            pricing,
            inventory,
            variantMap,
            shipping,
            storeId
        } : NewProduct)=>(
             await apiClient.post<NewProduct>(`api/allProductList/addNewProduct`,{
                name,
                slug,
                description,
                type,
                brand,
                vendor,
                sku,
                barcode,
                categories,
                collections,
                tags,
                media,
                pricing,
                inventory,
                variantMap,
                shipping,
                storeId
            })
        ).data
    })
    // useMutation({
    //     mutationFn: async({
    //         name,
    //         image,
    //         imageList,
    //         category,
    //         tags,
    //         price,
    //         inventory,
    //         quantitySold,
    //         description,
    //         weight,
    //         hasVariants,
    //         variesBy,
    //         storeId,
    //         status,
    //         shipping
    //     } : {
    //         name?: string
    //         image? : string
    //         imageList? : any[]
    //         category? : string
    //         tags? : any[]
    //         price? : number
    //         inventory? : number
    //         quantitySold? : number
    //         description? : string
    //         weight? : number
    //         hasVariants? : boolean
    //         variesBy? : string
    //         storeId? : string
    //         status? : string
    //         shipping? : boolean
    //     })=>(
    //         await apiClient.post<NewProduct>(`api/products/addProduct`,{
    //             name,
    //             image,
    //             imageList,
    //             category,
    //             tags,
    //             price,
    //             inventory,
    //             quantitySold,
    //             description,
    //             weight,
    //             hasVariants,
    //             variesBy,
    //             storeId,
    //             status,
    //             shipping
    //         })
    //     ).data
    // })