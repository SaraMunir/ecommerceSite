import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
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