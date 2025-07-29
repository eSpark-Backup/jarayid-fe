import { api } from "./rtk";

export const contactsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ page, pageSize }) => {
        return {
          url: `/contact-us?page=${page}&limit=${pageSize}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetContactsQuery } = contactsApi;
