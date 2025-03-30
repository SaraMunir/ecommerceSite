import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { ShopStore } from "../types/ShopStore";

export const useGetStoresQuery = () =>
    useQuery({
        queryKey: ['stores'],
        queryFn: async () => (await apiClient.get<ShopStore[]>(`api/stores`)).data,
    })

export const useGetStoreDetailsByIdQuery = (id: string) =>
    useQuery({
        queryKey: ['stores', id],
        queryFn: async () =>
    (await apiClient.get<ShopStore>(`api/stores/id/${id}`)).data
})

export const useCreateStoreMutation = () => 
    useMutation({
        mutationFn: async ({
            storeOwner,
            storeName,
            storeUsers,
            storeNumber, 
            status,
            current
        }: {
            storeOwner: string
            storeName? : string
            storeUsers? : string[]
            storeNumber : number
            status?: string
            current?: boolean
        }) =>
        (
            await apiClient.post<ShopStore>(`api/stores/createStore `,{
                storeOwner,
                storeName,
                storeUsers,
                storeNumber,
                status,
                current
            })
        ).data
    })
    