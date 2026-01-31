import { api } from "./rtk";

export const pagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPages: builder.query({
      query: (payload) => ({
        url: `/static-pages`,
        method: "GET",
        params: {
          ...(payload?.search && { search: payload.search }),
        },
        credentials: "include",
      }),
    }),

    getPageById: builder.query({
      query: (id) => ({
        url: `/static-pages/${id}`,
        method: "GET",
      }),
      providesTags: ["Pages"],
    }),

    addPage: builder.mutation({
      query: (credentials) => ({
        url: `/static-pages`,
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["Pages"],
    }),

    updatePage: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/static-pages/${id}`,
        method: "PUT",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["Pages"],
    }),

    deletePage: builder.mutation({
      query: (id) => ({
        url: `/static-pages/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Pages"],
    }),
  }),
});

export const {
  useGetAllPagesQuery,
  useGetPageByIdQuery,
  useAddPageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
} = pagesApi;
