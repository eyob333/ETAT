import { apiSlice } from '../app/api/apiSlice';

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (event) => ({
        url: '/events',
        method: 'POST',
        body: event,
      }),
    }),
    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `/events/${eventId}`,
        method: 'DELETE',
      }),
    }),
    updateEventData: builder.mutation({
      query: (data) => {
        const eventId = (data.get('id'));
        return {
          url: `/events/${eventId}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetEventQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventDataMutation,
} = eventApiSlice;
