import { apiSlice } from '../app/api/apiSlice';

export const serviceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getService: builder.query({
      query: () => '/services',
      keepUnusedDataFor: 5,
    }),
    createService: builder.mutation({
      query: (service) => ({
        url: '/services',
        method: 'POST',
        body: service,
      }),
    }),
    deleteService: builder.mutation({
      query: (serviceId) => ({
        url: `/services/${serviceId}`,
        method: 'DELETE',
      }),
    }),
    updateServiceData: builder.mutation({
      query: (data) => {
        const serviceId = (data.get('id'));
        return {
          url: `/services/${serviceId}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetServiceQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceDataMutation,
} = serviceApiSlice;
