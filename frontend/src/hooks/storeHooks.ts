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
            storeAddress, 
            status,
            weightUnit,
            currency,
            timeZone,
            languages,
            current
        }: {
            storeOwner: string
            storeName? : string
            storeUsers? : string[]
            languages? : string
            storeAddress? : {}
            storeNumber : number
            weightUnit?: string
            status?: string
            currency?: string
            timeZone?: string
            current?: boolean
        }) =>
        (
            await apiClient.post<ShopStore>(`api/stores/createStore`,{
                storeOwner,
                storeName,
                storeUsers,
                storeNumber,
                storeAddress,
                weightUnit,
                status,
                currency,
                timeZone,
                current,
                languages
            })
        ).data
    })

export const useUpdateStoreByIdMutation = (id: string) => 
    useMutation({
        mutationFn: async ({
            storeOwner,
            storeName,
            storeUsers,
            storeNumber, 
            status,
            timeZone,
            storeAddress,
            languages,
            current,
            weightUnit,
            currency
        }: {
            storeOwner?: string
            storeName? : string
            storeUsers? : string[]
            storeNumber? : number
            status?: string
            timeZone?: string
            languages?: string
            weightUnit?: string
            currency?: string
            storeAddress?: {}
            current?: boolean
        }) =>
        (
            await apiClient.put<ShopStore>(`api/stores/update/id/${id}`,{
                storeOwner,
                storeName,
                storeUsers,
                storeNumber,
                status,
                current,
                timeZone,
                storeAddress,
                languages,
                currency,
            })
        ).data
    })
    
export const useChangeStoreByIdMutation = (currentStoreId: number, selectedStoreId:number) => 
    useMutation({
        mutationFn: async ({
        }: {
        }) =>
        (
            await apiClient.put<ShopStore>(`api/stores/changeStore/currentId=${currentStoreId}&selectedId=${selectedStoreId}`,{})
        ).data
    })
    
