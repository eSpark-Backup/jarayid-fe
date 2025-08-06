import { api } from "./rtk";

export const rssSummarizationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRssSummarization: builder.query({
      query: () => "/rss-summarization",
    }),
    updateRssSummarization: builder.mutation({
      query: (credentials) => ({
        url: `/rss-summarization`,
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetRssSummarizationQuery,
  useUpdateRssSummarizationMutation,
} = rssSummarizationApi;
