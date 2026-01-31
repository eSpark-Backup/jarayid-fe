import { api } from "./rtk";

export const keysApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addKey: builder.mutation({
      query: (credentials) => {
        return {
          url: `/api-key`,
          method: "POST",
          body: credentials,
          credentials: "include",
        };
      },
    }),
    getKeys: builder.query({
      query: () => {
        return {
          url: `/api-key`,
          method: "GET",
        };
      },
    }),
    updateKey: builder.mutation({
      query: ({ id, credentials }) => {
        return {
          url: `/api-key/${id}`,
          method: "PUT",
          body: credentials,
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useAddKeyMutation, useGetKeysQuery, useUpdateKeyMutation } =
  keysApi;
