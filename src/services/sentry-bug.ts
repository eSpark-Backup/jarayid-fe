import { api } from "./rtk";

export const sentryBugApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBugs: builder.query({
      query: ({ page, pageSize }) => `/bugs?page=${page}&limit=${pageSize}`,
    }),
  }),
});

export const { useGetAllBugsQuery } = sentryBugApi;
