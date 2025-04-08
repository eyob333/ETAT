import { apiSlice } from '../app/api/apiSlice';

export const eventAttendeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    enrollEvent: builder.mutation({
      query: (data) => ({
        url: '/enroll-event',
        method: 'POST',
        body: data,
      }),
    }),
    deleteAttendee: builder.mutation({
      query: (jobId) => ({
        url: `/jobApplications/${jobId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useDeleteAttendeeMutation,
  useEnrollEventMutation,
} = eventAttendeeApiSlice;
