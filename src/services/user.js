import { buildQueryParams } from "../utils";
import { api } from "./rtk";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsersForAdmin: builder.query({
      query: ({
        page,
        pageSize,
        search,
        role,
        status,
        sortBy,
        sortDirection,
        dateFrom,
        dateTo,
      }) => {
        const queryParams = buildQueryParams({
          page,
          limit: pageSize,
          search,
          role,
          subscriptionStatus: status,
          sortBy,
          sortOrder: sortDirection,
          from: dateFrom,
          to: dateTo,
        });
        return {
          url: `/users/admin/users?${queryParams}`,
          method: "GET",
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (credentials) => {
        return {
          url: `/users/admin/users/bulk-delete`,
          method: "DELETE",
          body: credentials,
          credentials: "include",
        };
      },
    }),
    getUsersStats: builder.query({
      query: () => {
        return {
          url: `/users/admin/stats`,
          method: "GET",
        };
      },
    }),
    banUnbanUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/admin/users/${id}/toggle-ban`,
          method: "PATCH",
        };
      },
    }),
  }),
});

export const {
  useGetAllUsersForAdminQuery,
  useDeleteUserMutation,
  useGetUsersStatsQuery,
  useBanUnbanUserMutation,
} = userApi;
