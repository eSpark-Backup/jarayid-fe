import { api } from "./rtk";

const FeedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ type }) => ({
        url: `/categories`,
        method: "GET",
        credentials: "include",
        params: { ...(type && { type }) },
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
      invalidatesTags: ["read-later"],
    }),
    trendingArticles: builder.query({
      query: ({ page = 1, limit = 10, period = "7d" }) => ({
        url: "/articles/trending",
        method: "GET",
        params: {
          page,
          limit,
          period,
        },
      }),
    }),
    getComments: builder.query({
      query: ({ articleId, page = 1, limit = 10, sortBy = "newest" }) => ({
        url: `/comments/article${articleId}`,
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
        },
      }),
    }),
    postComment: builder.mutation({
      query: ({ articleId, content }) => ({
        url: "/comments",
        method: "POST",
        body: { articleId, content },
        credentials: "include",
      }),
    }),
    getReadLaterArticles: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/articles/feeds/read-later`,
        method: "GET",
        params: {
          page,
          limit,
        },
        credentials: "include",
      }),
      providesTags: ["read-later"],
    }),
    getShorts: builder.query({
      query: ({ page = 1, limit = 6, contentType = "SHORTS", categoryId }) => ({
        url: "/youtube-content",
        method: "GET",
        params: { page, limit, contentType, categoryId },
        credentials: "include",
      }),
    }),
    soicalLinks: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/users/social-media-links",
        method: "GET",
        params: { page, limit },
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useToggleReadLaterMutation,
  useTrendingArticlesQuery,
  useGetCommentsQuery,
  usePostCommentMutation,
  useGetReadLaterArticlesQuery,
  useGetShortsQuery,
  useSoicalLinksQuery,
} = FeedApi;
