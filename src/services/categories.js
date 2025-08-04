import { api } from "./rtk";

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCateories: builder.query({
      query: ({ page, pageSize = 30 }) => ({
        url: `/categories?page=${page}&limit=${pageSize}`,
        method: "GET",
      }),
    }),
    AddCateory: builder.mutation({
      query: (credentials) => ({
        url: `/categories`,
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    updateCateory: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: credentials,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllCateoriesQuery,
  useAddCateoryMutation,
  useUpdateCateoryMutation,
} = categoriesApi;
