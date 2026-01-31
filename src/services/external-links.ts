import { api } from "./rtk";

export const externalLinksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addExternalLink: builder.mutation({
      query: (credentials) => {
        return {
          url: `/external-links`,
          method: "POST",
          body: credentials,
          credentials: "include",
        };
      },
    }),
    getAllExternalLinks: builder.query({
      query: ({ page, pageSize }) => {
        return {
          url: `/external-links?page=${page}&limit=${pageSize}`,
          method: "GET",
        };
      },
    }),
    deleteExternalLinks: builder.mutation({
      query: (id) => {
        return {
          url: `/external-links/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useAddExternalLinkMutation,
  useGetAllExternalLinksQuery,
  useDeleteExternalLinksMutation,
} = externalLinksApi;
