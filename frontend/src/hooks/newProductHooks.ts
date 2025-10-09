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

// export const useAddImageToNewProductMutation = () =>
//     useMutation(
//         {
//     mutationFn: async (data: FormData) => {
//         console.log("data", data);
//         const response = await apiClientFormData.post<NewProduct>('/api/allProductList/addImage', data
//         );
//             return response.data;
//         },
//     }
// )

// export const useAddImageToNewProductMutation = () =>
//     useMutation({
//         mutationKey: ['addNewProductWithImages'],
//         mutationFn: async (data: FormData) => {
//             console.log("data", data);
//         const response = await apiClientFormData.post<NewProduct>(
//             '/api/allProductList/addImages',
//             data
//         );
//         return response.data;
//         },
//     });
export const useAddImageToNewProductMutation = () => 
    useMutation({
        mutationKey: ['addNewProductWithImages'],
        mutationFn: async (data: FormData) => {
        console.log("data", data);
        const response = await apiClientFormData.post<NewProduct>(
            '/api/allProductList/addImages', // ✅ FIXED here
            data
        );
        return response.data;
    },
});
export const useAddImageToExistingProductMutation = () => 
    useMutation({
        mutationKey: ['addExistingProductWithImages'],
        mutationFn: async (data: FormData) => {
        console.log("data", data);
        const response = await apiClientFormData.post<NewProduct>(
            '/api/allProductList/addImageToProduct', // ✅ FIXED here
            data
        );
        return response.data;
    },
});
export const useUploadGalleryImageToProd = () => 
    useMutation({
        mutationKey: ['useUploadGalleryImageToProd'],
        mutationFn: async (data: FormData) => {
        console.log("data", data);
        const response = await apiClientFormData.post<NewProduct>(
            '/api/allProductList/addImageGalleryImgToProduct', // ✅ FIXED here
            data
        );
        return response.data;
    },
});
export const useChangeMainImageProductMutation = () => 
    useMutation({
        mutationKey: ['changeMainProductImage'],
        mutationFn: async (data: FormData) => {
            
        console.log("data", data);
        const response = await apiClientFormData.post<NewProduct>(
            '/api/allProductList/changeMainImageToProduct', // ✅ FIXED here
            data
        );
        return response.data;
    },
});
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
export const updateProductMutation = () =>
useMutation({
    mutationKey: ['updateProductDetail'],
    mutationFn: async (data: FormData) => {
        const response = await apiClientFormData.post<NewProduct>(
            'api/allProductList/updateProduct',
            data
        );
        return response.data
    }
})
export const deleteProductMutation = (id: string) =>
useMutation({
    mutationFn: async () => {
        console.log('deleteProduct called with id:', id)

        const response = await apiClient.delete<NewProduct>(`api/allProductList/deleteProduct/${id}`)
        console.log('deleteProduct response:', response)   
        return response.data
    }
})