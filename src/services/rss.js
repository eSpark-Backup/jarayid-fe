import { api } from "./rtk";

export const rssApi = api.injectEndpoints({
  endpoints: (builder) => ({
    rssFeed: builder.query({
      query: ({ page = 1, limit = 7, categoryId, subType }) => ({
        url: `/rss-feeds`,
        method: "GET",
        params: {
          page,
          limit,
          categoryId,
          subType,
        },
        credentials: "include",
      }),
    }),
  }),
});

export const { useRssFeedQuery } = rssApi;
