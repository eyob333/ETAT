import { apiSlice } from '../app/api/apiSlice';

export const passwordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    requestChange: builder.mutation({
      query: (email) => ({
        url: '/forgot-password',
        method: 'POST',
        body: email,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => {
        const password = { password: data.get('password') };
        const id = data.get('id');
        const token = data.get('token');
        return {
          url: `/reset-password/${id}/${token}`,
          method: 'POST',
          body: password,
        };
      },
    }),

    changePassword: builder.mutation({
      query: (data) => {
        const pass = {
          currentPassword: data.get('currentPassword'),
          newPassword: data.get('newPassword'),
          email: data.get('email'),
        };
        return {
          url: '/update-password',
          method: 'POST',
          body: pass,
        };
      },
    }),

  }),
});

export const {
  useRequestChangeMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = passwordApiSlice;
