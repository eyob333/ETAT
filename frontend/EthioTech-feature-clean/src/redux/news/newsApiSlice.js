import { apiSlice } from '../app/api/apiSlice';

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => '/news',
      keepUnusedDataFor: 5,
    }),
    createNews: builder.mutation({
      query: (news) => ({
        url: '/news',
        method: 'POST',
        body: news,
      }),
    }),
    deleteNews: builder.mutation({
      query: (newsId) => ({
        url: `/news/${newsId}`,
        method: 'DELETE',
      }),
    }),
    updateNewsLike: builder.mutation({
      query: (data) => {
        const likes = { total_likes: data.total_likes };
        return {
          url: `/news-like/${data.id}`,
          method: 'POST',
          body: likes,
        };
      },
    }),
    updateNewsData: builder.mutation({
      query: (data) => {
        const newsId = (data.get('id'));
        return {
          url: `/news/${newsId}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetNewsQuery,
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useUpdateNewsLikeMutation,
  useUpdateNewsDataMutation,
} = newsApiSlice;
