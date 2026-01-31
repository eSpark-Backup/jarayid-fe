import { api } from "./rtk";

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => "/subscriptions/plans",
    }),
    createCheckout: builder.mutation({
      query: (body) => ({
        url: "/subscriptions/checkout",
        method: "POST",
        body,
      }),
    }),
    getUserSubscription: builder.query({
      query: () => "/subscriptions/user",
      providesTags: ["Subscription"],
    }),
    cancelSubscription: builder.mutation({
      query: (subscriptionId) => ({
        url: `/subscriptions/cancel/${subscriptionId}`,
        method: "POST",
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useCreateCheckoutMutation,
  useGetUserSubscriptionQuery,
  useCancelSubscriptionMutation,
} = paymentApi;
