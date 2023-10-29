import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// This is a new slice that will be used to make API calls to the users endpoint.
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
