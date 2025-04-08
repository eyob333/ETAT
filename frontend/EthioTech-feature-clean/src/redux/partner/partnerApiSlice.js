import { apiSlice } from '../app/api/apiSlice';

export const partnerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPartner: builder.query({
      query: () => '/partners',
      keepUnusedDataFor: 5,
    }),
    createPartner: builder.mutation({
      query: (partner) => ({
        url: '/partners',
        method: 'POST',
        body: partner,
      }),
    }),
    deletePartner: builder.mutation({
      query: (partnerId) => ({
        url: `/partners/${partnerId}`,
        method: 'DELETE',
      }),
    }),
    updatePartnerData: builder.mutation({
      query: (data) => {
        const partnerId = (data.get('id'));
        return {
          url: `/partners/${partnerId}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetPartnerQuery,
  useCreatePartnerMutation,
  useDeletePartnerMutation,
  useUpdatePartnerDataMutation,
} = partnerApiSlice;
