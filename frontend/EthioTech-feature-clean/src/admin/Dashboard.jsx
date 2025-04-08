/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUsersQuery } from '../redux/user/userApiSlice';
import { fetchJob } from '../redux/job/jobSlice';
import { fetchNews } from '../redux/news/newsSlice';
import { fetchTraining } from '../redux/training/trainingSlice';
import { fetchEvent } from '../redux/event/eventSlice';
import { fetchPartner } from '../redux/partner/partnerSlice';
import { fetchProject } from '../redux/project/projectSlice';
import { fetchService } from '../redux/service/serviceSlice';
import {
  eventSelector,
  jobApplicationSelector,
  jobSelector, newsSelector, partnerSelector, projectSelector, serviceSelector, trainingSelector,
} from '../redux/store';
import LoadingScreen from '../conditions/LoadingScreen';
import team from '../assets/team.json';
import { useGetJobsAppQuery } from '../redux/jobApplication/JobApplicationApiSlice';
import { fetchJobApp } from '../redux/jobApplication/JopApplicationSlice';

const totalEnrollment = (array) => {
  let total = 0;
  array.forEach((element) => {
    total += parseInt(element.enrolled_count);
  });
  return total;
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const services = useSelector(serviceSelector);
  const projects = useSelector(projectSelector);
  const partners = useSelector(partnerSelector);
  const events = useSelector(eventSelector);
  const trainings = useSelector(trainingSelector);
  const news = useSelector(newsSelector);
  const jobs = useSelector(jobSelector);
  const jobApplications = useSelector(jobApplicationSelector);

  useEffect(() => {
    if (jobApplications.jobApplications.length === 0) {
      dispatch(fetchJobApp());
    }
  }, [dispatch, jobApplications.jobApplications.length]);

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

  // Get the current date
  const today = new Date().toISOString().split('T')[0];
  let todayApplications;

  // Filter out job applications created today

  // const {
  //   data: jobApplication,
  //   isLoading,
  // } = useGetJobsAppQuery();
  // const {
  //   data: users,
  //   isLoading,
  // } = useGetUsersQuery();

  // if (!isLoading) {
  //   console.log('this is ur user');
  //   console.log(users);
  // }

  if (jobs.isLoadingJob || jobApplications.isLoading
    || news.isLoading || trainings.isLoading
    || events.isLoading || partners.isLoading
    || projects.isLoading || services.isLoading) {
    return <LoadingScreen />;
  }

  // if (!jobApplications.isLoading && jobApplications.jobApplications.length > 0) {
  //   todayApplications = jobApplications.jobApplications.filter((application) => {
  //     const applicationDate = application.createdAt.split('T')[0];
  //     return applicationDate === today;
  //   });
  // }

  function filterTodayApplications(jobApplications) {
    const todayApplications = jobApplications.filter((application) => {
      const applicationDate = application.createdAt.split('T')[0];
      return applicationDate === today;
    });
    return todayApplications.length;
  }

  return (
    <>
      {/* <div>{users[0].name}</div>
      <div>{users[0].email}</div> */}

      <div className=" flex flex-col px-6 py-4 gap-6 bg-white">
        <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">

          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span onClick={() => { console.log(trainings.trainings); }} className="text-gray-400">Total Events</span>
                <span className="text-lg font-semibold">{!events.isLoading && events.events.length > 0 ? events.events.length : 'number'}</span>
              </div>
              <div className="p-10 bg-gray-200 rounded-md" />
            </div>
            <div>
              <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">{totalEnrollment(events.events)}</span>
              <span> Attendees</span>
            </div>
          </div>

          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-400">Job Applicants</span>
                <span className="text-lg font-semibold">{!jobApplications.isLoading && jobApplications.jobApplications.length > 0 ? jobApplications.jobApplications.length : 'number'}</span>
              </div>
              <div className="p-10 bg-gray-200 rounded-md" />
            </div>
            <div>
              <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">{filterTodayApplications(jobApplications.jobApplications)}</span>
              <span> Today</span>
            </div>
          </div>

          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-400">Total Trainings</span>
                <span className="text-lg font-semibold">{!trainings.isLoading && trainings.trainings.length > 0 ? trainings.trainings.length : 'number'}</span>
              </div>
              <div className="p-10 bg-gray-200 rounded-md" />
            </div>
            <div>
              <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">{totalEnrollment(trainings.trainings)}</span>
              <span> Trainees</span>
            </div>
          </div>

          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-400">Total Teams</span>
                <span className="text-lg font-semibold">{team.length}</span>
              </div>
              <div className="p-10 bg-gray-200 rounded-md" />
            </div>
            <div>
              {/* <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">14%</span>
              <span>from 2019</span> */}
            </div>
          </div>

        </div>

        <div className="flex lg-flex-row gap-4">

          <div className="mb-4 w-full grid grid-cols-full gap-6 xl:grid-cols-full">
            <div className="relative border flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-full">
              <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                <div>
                  <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">Recent Job Applicants</h6>
                </div>
                <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Name</p>
                      </th>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Email</p>
                      </th>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Phone number</p>
                      </th>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Expected Salary</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {!jobApplications.isLoading && jobApplications.jobApplications.length > 0 ? jobApplications.jobApplications.slice(0, 5).map((job) => (

                      <tr key={job.id}>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <div className="flex items-center gap-4">
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">{job.name}</p>
                          </div>
                        </td>

                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">{job.email}</p>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <div className="w-10/12">
                            <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{job.phone}</p>
                            <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                              <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                            {job.expected_salary}
                            $
                          </p>
                        </td>
                      </tr>
                    )) : <tr>no data</tr>}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
