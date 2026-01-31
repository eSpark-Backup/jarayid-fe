import { api } from "./rtk";

export const youtubeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addYoutubeVideo: builder.mutation({
      query: (credentials) => {
        return {
          url: `/youtube-content`,
          method: "POST",
          body: credentials,
          credentials: "include",
        };
      },
    }),
    getAllYoutubeVideo: builder.query({
      query: ({ page, pageSize }) => {
        return {
          url: `/youtube-content?page=${page}&limit=${pageSize}`,
          method: "GET",
        };
      },
    }),
    editYoutubeVideo: builder.mutation({
      query: ({ id, credentials }) => {
        return {
          url: `/youtube-content/${id}`,
          method: "PUT",
          body: credentials,
          credentials: "include",
        };
      },
    }),
    deleteYoutubeVideo: builder.mutation({
      query: (id) => {
        return {
          url: `/youtube-content/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useAddYoutubeVideoMutation,
  useGetAllYoutubeVideoQuery,
  useEditYoutubeVideoMutation,
  useDeleteYoutubeVideoMutation,
} = youtubeApi;
