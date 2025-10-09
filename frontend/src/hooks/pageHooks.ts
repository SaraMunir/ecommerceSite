import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Page } from "../types/PageType";
import { theme } from "@cloudinary/url-gen/actions/effect";
import { NewProduct } from "../types/NewProduct";

export const useGetPageDetailsByIdQuery = (storeId: string, pageName: string) =>
    useQuery({
        queryKey: ['page', storeId, pageName],
        queryFn: async () => (await apiClient.get<Page[]>(`api/page/store/${storeId}/pagename/${pageName}`)).data,
    })
// export const useGetPageDetailsByIdQuery = (id: string) =>
//     useQuery({
//         queryKey: ['page', id],
//         queryFn: async () =>
//     (await apiClient.get<Page>(`api/page/id/${id}`)).data
// })
export const useCreatePageMutation = () => 
    useMutation({
        mutationFn: async (page: Page) => {
            const response = await apiClient.post<Page>(`api/page/addPage`, {
                ...page
            });
            return response.data;
        }
    })

export const useUpdatePageDetailMutation = () =>
useMutation({
    mutationFn: async (page: Page) => {
        const response = await apiClient.put<Page>(
            'api/page/edit/' + page._id, 
            // ✅ FIXED here
            page
        );
        return response.data
    }
})
