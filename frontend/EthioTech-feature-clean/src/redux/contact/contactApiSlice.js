/* eslint-disable implicit-arrow-linebreak */
import { apiSlice } from '../app/api/apiSlice';

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (contact) => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
      }),
    }),
    createContactUS: builder.mutation({
      query: (contact) => ({
        url: '/contact-us',
        method: 'POST',
        body: contact,
      }),
    }),
    updateContactData: builder.mutation({
      query: (data) =>
        ({
          url: '/contacts',
          method: 'PATCH',
          body: data,
        })
      ,
    }),
  }),
});

export const {
  useGetContactQuery,
  useCreateContactMutation,
  useCreateContactUSMutation,
  useUpdateContactDataMutation,
} = contactApiSlice;
