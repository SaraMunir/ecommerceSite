import { useQuery } from "@tanstack/react-query";
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