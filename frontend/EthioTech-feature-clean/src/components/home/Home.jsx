/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hero from './Hero';
import News from './News';
import Information from './Information';
import Partners from './Partners';
import WorkWithUs from './WorkWithUs';
import Events from './Events';
// import Trainigs from './Trainigs';
import TrainingTwo from './TrainingTwo';
import {
  contactSelector,
  eventSelector, jobSelector, newsSelector, partnerSelector, projectSelector, serviceSelector, trainingSelector,
} from '../../redux/store';
import { fetchService } from '../../redux/service/serviceSlice';
import { fetchProject } from '../../redux/project/projectSlice';
import { fetchPartner } from '../../redux/partner/partnerSlice';
import { fetchEvent } from '../../redux/event/eventSlice';
import { fetchTraining } from '../../redux/training/trainingSlice';
import { fetchNews } from '../../redux/news/newsSlice';
import { fetchJob } from '../../redux/job/jobSlice';
import LoadingScreen from '../../conditions/LoadingScreen';
import { fetchContact } from '../../redux/contact/contactSlice';

export default function Home() {
  const dispatch = useDispatch();
  const services = useSelector(serviceSelector);
  const projects = useSelector(projectSelector);
  const partners = useSelector(partnerSelector);
  const events = useSelector(eventSelector);
  const trainings = useSelector(trainingSelector);
  const news = useSelector(newsSelector);
  const jobs = useSelector(jobSelector);
  const contacts = useSelector(contactSelector);

  useEffect(() => {
    if (services.services.length === 0) {
      dispatch(fetchService());
    }
  }, [dispatch, services.services.length]);

  useEffect(() => {
    if (projects.projects.length === 0) {
      dispatch(fetchProject());
    }
  }, [dispatch, projects.projects.length]);

  useEffect(() => {
    if (partners.partners.length === 0) {
      dispatch(fetchPartner());
    }
  }, [dispatch, partners.partners.length]);

  useEffect(() => {
    if (events.events.length === 0) {
      dispatch(fetchEvent());
    }
  }, [dispatch, events.events.length]);

  useEffect(() => {
    if (trainings.trainings.length === 0) {
      dispatch(fetchTraining());
    }
  }, [dispatch, trainings.trainings.length]);

  useEffect(() => {
    if (news.news.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, news.news.length]);

  useEffect(() => {
    if (jobs.jobs.length === 0) {
      dispatch(fetchJob());
    }
  }, [dispatch, jobs.jobs.length]);

  useEffect(() => {
    if (contacts.contacts.length === 0) {
      dispatch(fetchContact());
    }
  }, [dispatch, contacts.contacts.length]);

  if (jobs.isLoadingJob || contacts.isLoading
    || news.isLoading || trainings.isLoading
    || events.isLoading || partners.isLoading
    || projects.isLoading || services.isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Hero />
      <Information />
      <WorkWithUs />
      <TrainingTwo />
      <News />
      <Events />
      <Partners />
    </>
  );
}
