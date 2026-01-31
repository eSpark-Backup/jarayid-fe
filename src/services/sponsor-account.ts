import { api } from "./rtk";

export const sponsorAccApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSponsorAccount: builder.query({
      query: ({ page, pageSize }) => {
        return {
          url: `/sponsor-accounts?page=${page}&limit=${pageSize}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllSponsorAccountQuery } = sponsorAccApi;
