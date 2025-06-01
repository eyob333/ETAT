import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../app/api/apiSlice';
import { toast } from 'react-toastify';

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => '/news',
      transformResponse: (response) => {
        if (!response?.news) {
          return [];
        }
        return response.news.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
      },
      providesTags: ['News'],
    }),
    updateNewsLike: builder.mutation({
      query: ({ id, likes }) => ({
        url: `/news/${id}/like`,
        method: 'PATCH',
        body: { likes },
      }),
      invalidatesTags: ['News'],
    }),
  }),
});

export const { useGetNewsQuery, useUpdateNewsLikeMutation } = newsApiSlice;

const initialState = {
  news: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNews: (state, action) => {
      state.news.push(action.payload);
    },
    updateNewsState: (state, action) => {
      const updatedNews = action.payload;
      const index = state.news.findIndex((news) => news.id === updatedNews.id);
      if (index !== -1) {
        state.news[index] = updatedNews;
      } else {
        toast.error('Something went wrong');
      }
    },
    removeNews: (state, action) => {
      state.news = state.news.filter((news) => news.id !== action.payload);
    },
    updateLikes: (state, action) => {
      const { id, likes } = action.payload;
      const updatedNews = state.news.map((newsItem) => {
        if (newsItem.id === id) {
          return {
            ...newsItem,
            like_count: likes,
          };
        }
        return newsItem;
      });
      return {
        ...state,
        news: updatedNews,
      };
    },
  },
});

export const {
  addNews,
  removeNews,
  updateNewsState,
  updateLikes,
} = newsSlice.actions;

export default newsSlice.reducer;

