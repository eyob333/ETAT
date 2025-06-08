import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './app/api/apiSlice'; // Your RTK Query base API slice
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import serviceReducer from './service/serviceSlice';
import jobReducer from './job/jobSlice';
import jobApplicationReducer from './jobApplication/JopApplicationSlice';
import eventReducer from './event/eventSlice';
import projectReducer from './project/projectSlice';
import partnerReducer from './partner/partnerSlice';
import trainingReducer from './training/trainingSlice';
import newsReducer from './news/newsSlice';
import contactReducer from './contact/contactSlice';
import eventAttendeeReducer from './eventAttendee/eventAttendeeSlice';
import traineeReducer from './trainees/traineeSclice';
import productReducer from './product/productSlice';
import testimonialReducer from './testimonial/testimonialSlice'; // Your traditional testimonial slice

const store = configureStore({
  reducer: {
    // RTK Query's reducer for all injected endpoints
    [apiSlice.reducerPath]: apiSlice.reducer,

    // Traditional Redux slices
    auth: authReducer,
    user: userReducer,
    service: serviceReducer,
    job: jobReducer,
    jobApplication: jobApplicationReducer,
    eventAttendee: eventAttendeeReducer,
    trainee: traineeReducer,
    project: projectReducer,
    event: eventReducer,
    partner: partnerReducer,
    training: trainingReducer,
    news: newsReducer,
    contact: contactReducer,
    product: productReducer,
    testimonial: testimonialReducer, // The traditional testimonial reducer
  },
  // Add RTK Query middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// Export selectors for easier access in components
export const userSelector = (state) => state.user;
export const authSelector = (state) => state.auth;
export const serviceSelector = (state) => state.service;
export const jobSelector = (state) => state.job;
export const jobApplicationSelector = (state) => state.jobApplication;
export const projectSelector = (state) => state.project;
export const eventSelector = (state) => state.event;
export const partnerSelector = (state) => state.partner;
export const trainingSelector = (state) => state.training;
export const newsSelector = (state) => state.news;
export const contactSelector = (state) => state.contact;
export const eventAttendeeSelector = (state) => state.eventAttendee;
export const traineeSelector = (state) => state.trainee;
export const productSelector = (state) => state.product;
export const testimonialSelector = (state) => state.testimonial; // Selector for your traditional testimonial slice

export default store;