import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { AdminUserInfo, UserInfo } from "../types/UserInfo";
export const useSigninMutation = () => 
useMutation({
    mutationFn: async ({
        email, password,
    }: {
        email: string
        password: string
    }) =>
    (
        await apiClient.post<UserInfo>(`api/users/signin`,{
            email,
            password,
        })
    ).data
})
export const useSignupMutation = () => 
useMutation({
    mutationFn: async ({
        name,
        email, 
        password,
    }: {
        name : string
        email : string
        password: string
    }) =>
    (
        await apiClient.post<UserInfo>(`api/users/signup `,{
            name,
            email,
            password,
        })
    ).data
})


export const useAdminSigninMutation = () => 
useMutation({
    mutationFn: async ({
        email, password,
    }: {
        email: string
        password: string
    }) =>
    (
        await apiClient.post<AdminUserInfo>(`api/adminUsers/signin`,{
            email,
            password,
        })
    ).data
})
export const useAdminSignupMutation = () => 
useMutation({
    mutationFn: async ({
        firstName,
        lastName,
        adminType,
        email, 
        password,
        storeNumber
    }: {
        firstName : string
        lastName : string
        adminType? : string
        email : string
        password: string
        storeNumber?: number
    }) =>
    (
        await apiClient.post<AdminUserInfo>(`api/adminUsers/signup `,{
            firstName,
            lastName,
            adminType,
            email,
            password,
            storeNumber
        })
    ).data
})

export const useGetAdminByIdQuery = (id: string) =>
    useQuery({
        queryKey: ['adminUser', id],
        queryFn: async () =>
    (await apiClient.get<AdminUserInfo>(`api/adminUsers/id/${id}`)).data
})