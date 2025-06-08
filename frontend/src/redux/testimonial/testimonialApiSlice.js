import { apiSlice } from '../app/api/apiSlice'; // Assuming this is the base API slice

export const testimonialApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query to get all testimonials
    getTestimonials: builder.query({
      query: () => '/testimonials',
      keepUnusedDataFor: 5, // Caches data for 5 seconds after last subscriber unsubscribes
      providesTags: ['Testimonial'], // Tag for cache invalidation
    }),
    // Query to get a single testimonial by ID
    getSingleTestimonial: builder.query({
      query: (id) => `/testimonials/${id}`,
      keepUnusedDataFor: 5,
      providesTags: (result, error, id) => [{ type: 'Testimonial', id }], // Tag for cache invalidation
    }),
    // Mutation to create a new testimonial
    createTestimonial: builder.mutation({
      query: (testimonialData) => ({
        url: '/testimonials',
        method: 'POST',
        body: testimonialData, // Expects FormData for image upload
      }),
      invalidatesTags: ['Testimonial'], // Invalidates the 'Testimonial' tag to refetch all testimonials
    }),
    // Mutation to update an existing testimonial
    updateTestimonialData: builder.mutation({
      query: (data) => {
        const testimonialId = data.get('id'); // Assuming 'id' is part of the FormData
        return {
          url: `/testimonials/${testimonialId}`,
          method: 'PATCH',
          body: data, // Expects FormData for image upload and other data
        };
      },
      invalidatesTags: (result, error, { id }) => [ // Invalidates specific testimonial and all testimonials
        { type: 'Testimonial', id },
        'Testimonial'
      ],
    }),
    // Mutation to delete a testimonial
    deleteTestimonial: builder.mutation({
      query: (testimonialId) => ({
        url: `/testimonials/${testimonialId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [ // Invalidates specific testimonial and all testimonials
        { type: 'Testimonial', id },
        'Testimonial'
      ],
    }),
  }),
});

// Export hooks for easy access in React components
export const {
  useGetTestimonialsQuery,
  useGetSingleTestimonialQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialDataMutation,
  useDeleteTestimonialMutation,
} = testimonialApiSlice;
