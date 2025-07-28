import { buildQueryParams } from "../utils";
import { api } from "./rtk";

export const articleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllArticlesForAdmin: builder.query({
      query: ({ page, pageSize, search, cat, status, sortBy, sortOrder }) => {
        const queryParams = buildQueryParams({
          page,
          limit: pageSize,
          search,
          categoryId: cat,
          status,
          sortBy,
          sortOrder,
        });

        return {
          url: `/articles?${queryParams}`,
          method: "GET",
        };
      },
    }),
    deleteArticle: builder.mutation({
      query: (credentials) => {
        return {
          url: `/articles/delete/bulk-delete`,
          method: "DELETE",
          body: credentials,
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetAllArticlesForAdminQuery, useDeleteArticleMutation } =
  articleApi;
