import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import {apiClientFormData} from "../apiClient";
import { Product } from "../types/Product";

export const useGetProductsQuery = () =>
    useQuery({
        queryKey: ['products'],
        queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
    })

export const useGetProductDetailsByIdQuery = (id: string) =>
    useQuery({
        queryKey: ['products', id],
        queryFn: async () =>
    (await apiClient.get<Product>(`api/products/id/${id}`)).data
})
export const useGetProductListByStoreIdQuery = (id: string) =>
    useQuery({
        queryKey: ['products', id],
        queryFn: async () =>
    (await apiClient.get<Product>(`api/products/storeId/${id}`)).data
})
export const useUpdateProductByIdMutation= (id: string) =>
    useMutation({
        mutationFn: async({
            name,
            image,
            imageList,
            category,
            tags,
            price,
            inventory,
            quantitySold,
            description,
            weight,
            hasVariants,
            variesBy,
            storeId,
            status,
            shipping
        } : {
            name?: string
            image? : string
            imageList? : any[]
            category? : string
            tags? : any[]
            price? : number
            inventory? : number
            quantitySold? : number
            description? : string
            weight? : number
            hasVariants? : boolean
            variesBy? : string
            storeId? : string
            status? : string
            shipping? : boolean
        })=>(
            await apiClient.put<Product>(`api/products/update/id/${id}`,{
                name,
                image,
                imageList,
                category,
                tags,
                price,
                inventory,
                quantitySold,
                description,
                weight,
                hasVariants,
                variesBy,
                storeId,
                status,
                shipping
            })
        ).data
    })
export const useCreateProductMutation= () =>
    useMutation({
        mutationFn: async({
            name,
            image,
            imageList,
            category,
            tags,
            price,
            inventory,
            quantitySold,
            description,
            weight,
            hasVariants,
            variesBy,
            storeId,
            status,
            shipping
        } : {
            name?: string
            image? : string
            imageList? : any[]
            category? : string
            tags? : any[]
            price? : number
            inventory? : number
            quantitySold? : number
            description? : string
            weight? : number
            hasVariants? : boolean
            variesBy? : string
            storeId? : string
            status? : string
            shipping? : boolean
        })=>(
            await apiClient.post<Product>(`api/products/addProduct`,{
                name,
                image,
                imageList,
                category,
                tags,
                price,
                inventory,
                quantitySold,
                description,
                weight,
                hasVariants,
                variesBy,
                storeId,
                status,
                shipping
            })
        ).data
    })
// const useUploadMutation = () => {
//       return useMutation((formData) => {
//         return axios.post('/api/upload', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data', // Important for FormData
//           },
//         });
//       });
//     };
// return useMutation({
//         mutationFn: async (data: FormData) => {
//           const response = await axios.post('/api/upload', data, {
//             headers: {
//               'Content-Type': 'multipart/form-data', // Important for FormData
//             },
//           });
//           return response.data;
//         },
//       });
export const useAddImageToProductMutation = () =>
    useMutation(
        {
  mutationFn: async (data: FormData) => {
    console.log("data", data);
          const response = await apiClientFormData.post<Product>('/api/products/addImage', data
        );
          return response.data;
        },
    }
)
// export const useAddImageToProductMutation = () =>
//     useMutation(
//         {
//         mutationFn: async (
//             formData: FormData
//         ) => (
//             await apiClient.post<Product>(
//                 `api/products/addImage`, 
//                 {formData},
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     }
//                 }
//             )
//         ).data
//     }
// )

    // api/products/id/