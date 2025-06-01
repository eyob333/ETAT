import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../app/api/apiSlice';

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: '/contacts',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (response) => {
        return response.contact;
      },
      providesTags: ['Contact'],
    }),
  }),
});

export const { useGetContactsQuery } = contactApiSlice;

const initialState = {
  contacts: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    updateContactState: (state, action) => {
      state.contacts = action.payload;
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
  },
});

export const {
  addContact,
  removeContact,
  updateContactState,
} = contactSlice.actions;

export default contactSlice.reducer;

