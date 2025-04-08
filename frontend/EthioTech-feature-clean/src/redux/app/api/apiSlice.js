/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { setCredentials, logOut } from '../../auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://server.ethiotechaddis.com',
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
  } else if (result.error?.originalStatus
    === 403) {
    // send a refresh token to new access token
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
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  /* eslint-disable no-unused-vars */
  endpoints: (builder) => ({}),
});
