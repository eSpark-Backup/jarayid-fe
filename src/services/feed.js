import { api } from "./rtk";

const FeedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ type = "COUNTRY" }) => ({
        url: `/categories`,
        method: "GET",
        credentials: "include",
        params: { type },
      }),
    }),
    getArticles: builder.query({
      query: ({
        page = 1,
        limit = 10,
        categoryId,
        subType,
        pinned = false,
        search,
      }) => ({
        url: `/articles`,
        method: "GET",
        credentials: "include",
        params: {
          page,
          limit,
          categoryId,
          subType,
          pinned,
          ...(search && { search }),
        },
      }),
    }),
    getArticleById: builder.query({
      query: (id) => ({
        url: `/articles/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    toggleReadLater: builder.mutation({
      query: ({ id }) => ({
        url: `/articles/${id}/toggle-read-later`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useToggleReadLaterMutation,
} = FeedApi;
