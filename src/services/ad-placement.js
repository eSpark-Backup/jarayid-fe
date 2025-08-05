import { method } from "lodash";
import { api } from "./rtk";

export const adApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAds: builder.query({
      query: ({ page, limit = 10 }) => ({
        url: `/visual-ad-placements`,
        method: "GET",
        params: { page, limit },
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetAllAdsQuery } = adApi;
