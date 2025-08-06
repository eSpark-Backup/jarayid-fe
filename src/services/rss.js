import { buildQueryParams } from "../utils";
import { api } from "./rtk";

export const rssApi = api.injectEndpoints({
  endpoints: (builder) => ({
    rssFeed: builder.query({
      query: ({ page = 1, limit = 7, categoryId }) => ({
        url: `/rss-feeds`,
        method: "GET",
        params: {
          page,
          limit,
          categoryId,
        },
        credentials: "include",
      }),
    }),
    addRss: builder.mutation({
      query: (credentials) => {
        return {
          url: `/rss-feeds`,
          method: "POST",
          body: credentials,
          credentials: "include",
        };
      },
    }),
    updateRss: builder.mutation({
      query: ({ id, credentials }) => {
        return {
          url: `/rss-feeds/${id}`,
          method: "PUT",
          body: credentials,
          credentials: "include",
        };
      },
    }),
    getAllRssFeedForAdmin: builder.query({
      query: ({ page, pageSize, search, cat }) => {
        const queryParams = buildQueryParams({
          page,
          limit: pageSize,
          search,
          categoryId: cat,
        });

        return {
          url: `/rss-feeds?${queryParams}`,
          method: "GET",
        };
      },
    }),
    getRssStats: builder.query({
      query: () => {
        return {
          url: `/rss-feeds/stats/processing`,
          method: "GET",
        };
      },
    }),
    getRssFeed: builder.query({
      query: ({ page, pageSize, search, dateFrom, dateTo }) => {
        return {
          url: `/rss-feeds/feeds/status?page=${page}&limit=${pageSize}&search=${search}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
          method: "GET",
        };
      },
    }),
    deleteRssFeed: builder.mutation({
      query: (id) => {
        return {
          url: `/rss-feeds/${id}`,
          method: "DELETE",
        };
      },
    }),
    refreshRssFeed: builder.mutation({
      query: (id) => {
        return {
          url: `/rss-feeds/${id}`,
          method: "GET",
        };
      },
    }),
    syncRssFeed: builder.mutation({
      query: () => {
        return {
          url: `/rss-feeds/process/all`,
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useAddRssMutation,
  useUpdateRssMutation,
  useGetAllRssFeedForAdminQuery,
  useGetRssStatsQuery,
  useGetRssFeedQuery,
  useDeleteRssFeedMutation,
  useRefreshRssFeedMutation,
  useRssFeedQuery,
  useSyncRssFeedMutation,
} = rssApi;
