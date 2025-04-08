/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './app/api/apiSlice';
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

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
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
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

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

export default store;
