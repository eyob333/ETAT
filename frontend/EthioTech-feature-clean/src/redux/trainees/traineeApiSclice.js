import { apiSlice } from '../app/api/apiSlice';

export const traineeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    enrollTraining: builder.mutation({
      query: (data) => ({
        url: '/enroll-training',
        method: 'POST',
        body: data,
      }),
    }),
    deleteTrainee: builder.mutation({
      query: (jobId) => ({
        url: `/jobApplications/${jobId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useDeleteTraineeMutation,
  useEnrollTrainingMutation,
} = traineeApiSlice;
