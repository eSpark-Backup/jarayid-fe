import { api } from "./rtk";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/users/signup",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/users/reset-password",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: "/users",
        method: "PUT",
        body: credentials,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
} = authApi;
