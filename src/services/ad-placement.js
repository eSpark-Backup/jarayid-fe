import { method } from "lodash";
import { api } from "./rtk";

export const adApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAds: builder.query({
      query: ({ page, limit = 50 }) => ({
        url: `/visual-ad-placements`,
        method: "GET",
        params: { page, limit },
        credentials: "include",
      }),
      providesTags: ["ads"],
    }),
    newAd: builder.mutation({
      query: ({ body }) => ({
        url: "/visual-ad-placements",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["ads"],
    }),
    editAd: builder.mutation({
      query: ({ id, body }) => ({
        url: `/visual-ad-placements/${id}`,
        method: "PUT",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["ads"],
    }),
    deleteAd: builder.mutation({
      query: ({ id }) => ({
        url: `/visual-ad-placements/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["ads"],
    }),
  }),
});

export const {
  useGetAllAdsQuery,
  useNewAdMutation,
  useEditAdMutation,
  useDeleteAdMutation,
} = adApi;
