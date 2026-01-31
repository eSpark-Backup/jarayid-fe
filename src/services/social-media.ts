import { api } from "./rtk";

export const socialMediaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSocialMedia: builder.query({
      query: ({ page, pageSize }) => {
        return {
          url: `/users/social-media-links?page=${page}&limit=${pageSize}`,
          method: "GET",
        };
      },
    }),
    addSocialMedia: builder.mutation({
      query: (credentials) => {
        return {
          url: `/users/social-media-links`,
          method: "POST",
          body: credentials,
          credentials: "include",
        };
      },
    }),
    deleteSocialMedia: builder.mutation({
      query: (id) => {
        return {
          url: `/users/social-media-links/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useGetSocialMediaQuery, useAddSocialMediaMutation, useDeleteSocialMediaMutation } =
  socialMediaApi;
