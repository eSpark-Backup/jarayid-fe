import { api } from "./rtk";

export const cookiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCookies: builder.query({
      query: ({ page, pageSize }) => {
        return {
          url: `/cookies?page=${page}&limit=${pageSize}`,
          method: "GET",
        };
      },
    }),
    deleteCookie: builder.mutation({
      query: (id) => {
        return {
          url: `/cookies/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useGetCookiesQuery, useDeleteCookieMutation } = cookiesApi;
