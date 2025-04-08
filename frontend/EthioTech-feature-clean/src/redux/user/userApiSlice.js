import { apiSlice } from '../app/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/profiles',
      keepUnusedDataFor: 5,
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: '/profiles',
        method: 'POST',
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/profiles/${userId}`,
        method: 'DELETE',
      }),
    }),
    updateUserData: builder.mutation({
      query: (data) => {
        const userId = (data.get('id'));
        return {
          url: `/profiles/${userId}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserDataMutation,
} = usersApiSlice;
