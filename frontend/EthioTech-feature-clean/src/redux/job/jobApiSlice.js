import { apiSlice } from '../app/api/apiSlice';

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJob: builder.query({
      query: () => '/jobs',
      keepUnusedDataFor: 5,
    }),
    createJob: builder.mutation({
      query: (service) => ({
        url: '/jobs',
        method: 'POST',
        body: service,
      }),
    }),
    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: `/jobs/${jobId}`,
        method: 'DELETE',
      }),
    }),
    updateJobData: builder.mutation({
      query: (data) => {
        const jobId = (data.get('id'));
        return {
          url: `/jobs/${jobId}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetJobQuery,
  useCreateJobMutation,
  useDeleteJobMutation,
  useUpdateJobDataMutation,
} = jobApiSlice;
