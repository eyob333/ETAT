import { apiSlice } from '../app/api/apiSlice';

export const trainingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTraining: builder.query({
      query: () => '/trainings',
      keepUnusedDataFor: 5,
    }),
    createTraining: builder.mutation({
      query: (training) => ({
        url: '/trainings',
        method: 'POST',
        body: training,
      }),
    }),
    deleteTraining: builder.mutation({
      query: (trainingId) => ({
        url: `/trainings/${trainingId}`,
        method: 'DELETE',
      }),
    }),
    updateTrainingData: builder.mutation({
      query: (data) => {
        const trainingId = (data.get('id'));
        return {
          url: `/trainings/${trainingId}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetTrainingQuery,
  useCreateTrainingMutation,
  useDeleteTrainingMutation,
  useUpdateTrainingDataMutation,
} = trainingApiSlice;
