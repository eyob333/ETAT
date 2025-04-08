import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../app/api/baseApi';

export const fetchNews = createAsyncThunk('news/fetchNews', async (thunkAPI) => {
  const url = `${baseURL}/news`;
  try {
    const response = await axios.get(url);
    return response.data.news;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

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
        toast.error('something went wrong');
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
  extraReducers: (builder) => {
    builder
    // Fetch User
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload.sort((a, b) => {
          const dateA = new Date(a.createdAt); // Convert the start dates to Date objects
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // Compare the dates
        });
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },

});

export const {
  addUser, removeNews, updateNewsState, addNews, updateLikes,
} = newsSlice.actions;
export default newsSlice.reducer;
