import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { setCredentials, logOut } from '../../auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error?.status === 'FETCH_ERROR') {
    toast.error('No internet connection');
  } else if (result.error?.originalStatus === 403) {
    // send a refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    if (refreshResult?.data) {
      const { user } = api.getState().auth;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  } else if (result.error?.status === 500) {
    toast.error('Server error occurred');
  } else if (result.error?.status === 404) {
    toast.error('Resource not found');
  } else if (result.error?.status === 401) {
    toast.error('Unauthorized access');
  }
  
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'User', 'Auth', 'News', 'Contact'],
  endpoints: (builder) => ({}),
});

