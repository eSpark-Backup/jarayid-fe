import { api } from "./rtk";

export const sentryBugApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBugs: builder.query({
      query: () => "/bugs",
    }),
  }),
});

export const { useGetAllBugsQuery } = sentryBugApi;
