import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import {apiClientFormData} from "../apiClient";
import { Image } from "../types/Image";

export const useGetImageListByStoreIdQuery = (id: string) =>
useQuery({
    queryKey: ['image', id],
    queryFn: async () =>
    (await apiClient.get<Image[]>(`api/allImageList/storeId/${id}`)).data
})

export const useAddImageToPageSectionBlock = () =>
    useMutation({
        mutationKey: ['addImageToPageSectionBlock'],
        mutationFn: async (data: FormData) => {
        console.log("data here", data);
        const response = await apiClientFormData.post<Image>(
            '/api/allImageList/uploadImage', // ✅ FIXED here
            data
        );
        return response.data;
    },
});
