import { apiSlice } from '../app/api/apiSlice';

export const jobApplicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobsApp: builder.query({
      query: () => '/jobApplications',
      // keepUnusedDataFor: 5,
    }),
    getJobApp: builder.query({
      query: (jobId) => `/jobApplications/${jobId}`, // Update the query to include the jobId parameter
    }),
    createJobApp: builder.mutation({
      query: (jobApp) => {
        const jobId = (jobApp.get('id'));
        return {
          url: `/jobApplications/${jobId}`,
          method: 'POST',
          body: jobApp,
        };
      },
    }),
    deleteJobApp: builder.mutation({
      query: (jobId) => ({
        url: `/jobApplications/${jobId}`,
        method: 'DELETE',
      }),
    }),
    updateJobAppData: builder.mutation({
      query: (data) => {
        const jobId = (data.get('id'));
        return {
          url: `/jobApplications/${jobId}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetJobsAppQuery,
  useGetJobAppQuery,
  useCreateJobAppMutation,
  useDeleteJobAppMutation,
  useUpdateJobAppDataMutation,
} = jobApplicationApiSlice;
