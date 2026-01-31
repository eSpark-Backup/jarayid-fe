import { api } from "./rtk";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardDetails: builder.query({
      query: () => "/dashboard",
    }),
  }),
});

export const { useGetDashboardDetailsQuery } = dashboardApi;
