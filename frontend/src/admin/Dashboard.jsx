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
// Import testimonial-specific actions and selectors
import { fetchTestimonials } from '../redux/testimonial/testimonialSlice';
import {
  eventSelector,
  jobApplicationSelector,
  jobSelector,
  newsSelector,
  partnerSelector,
  projectSelector,
  serviceSelector,
  trainingSelector,
  testimonialSelector, // Import the new testimonial selector
} from '../redux/store';
import LoadingScreen from '../conditions/LoadingScreen';
import team from '../assets/team.json'; // Assuming this is for your team count
import { useGetJobsAppQuery } from '../redux/jobApplication/JobApplicationApiSlice';
import { fetchJobApp } from '../redux/jobApplication/JopApplicationSlice';

// Helper function to calculate total enrollments/attendees
const totalEnrollment = (array) => {
  let total = 0;
  // Ensure the array and element properties exist before accessing
  if (Array.isArray(array)) {
    array.forEach((element) => {
      if (element && typeof element.enrolled_count === 'number') {
        total += element.enrolled_count;
      } else if (element && typeof element.enrolled_count === 'string') {
        total += parseInt(element.enrolled_count, 10) || 0; // Parse string to int, default to 0 if invalid
      }
    });
  }
  return total;
};

export default function Dashboard() {
  const dispatch = useDispatch();

  // Selectors for various data slices
  const services = useSelector(serviceSelector);
  const projects = useSelector(projectSelector);
  const partners = useSelector(partnerSelector);
  const events = useSelector(eventSelector);
  const trainings = useSelector(trainingSelector);
  const news = useSelector(newsSelector);
  const jobs = useSelector(jobSelector);
  const jobApplications = useSelector(jobApplicationSelector);
  const testimonials = useSelector(testimonialSelector); // Select testimonials data

  // Effect hooks to fetch data if the respective arrays are empty
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

  // Effect hook to fetch testimonials
  useEffect(() => {
    if (testimonials.testimonials.length === 0) {
      dispatch(fetchTestimonials());
    }
  }, [dispatch, testimonials.testimonials.length]);

  // Get the current date for filtering today's applications
  const today = new Date().toISOString().split('T')[0];

  function filterTodayApplications(jobApplicationsArray) {
    if (!Array.isArray(jobApplicationsArray)) return 0; // Return 0 if not an array
    const todayApplications = jobApplicationsArray.filter((application) => {
      // Ensure application and createdAt exist before accessing
      if (application && application.createdAt) {
        const applicationDate = application.createdAt.split('T')[0];
        return applicationDate === today;
      }
      return false; // Exclude if createdAt is missing
    });
    return todayApplications.length;
  }

  // Overall loading check for all data fetches
  if (
    jobs.isLoadingJob || jobApplications.isLoading ||
    news.isLoading || trainings.isLoading ||
    events.isLoading || partners.isLoading ||
    projects.isLoading || services.isLoading ||
    testimonials.isLoading // Include testimonial loading state
  ) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="flex flex-col px-6 py-4 gap-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Events Card */}
          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-500 text-sm font-medium">Total Events</span>
                <span className="text-xl font-semibold text-gray-800">
                  {events.events.length > 0 ? events.events.length : '0'}
                </span>
              </div>
              <div className="p-3 bg-blue-100 rounded-md text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="inline-block px-2 py-0.5 text-xs font-semibold text-white bg-green-500 rounded-full">
                {totalEnrollment(events.events)}
              </span>
              <span className="text-gray-600 text-sm ml-1"> Attendees</span>
            </div>
          </div>

          {/* Job Applicants Card */}
          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-500 text-sm font-medium">Job Applicants</span>
                <span className="text-xl font-semibold text-gray-800">
                  {jobApplications.jobApplications.length > 0 ? jobApplications.jobApplications.length : '0'}
                </span>
              </div>
              <div className="p-3 bg-yellow-100 rounded-md text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="inline-block px-2 py-0.5 text-xs font-semibold text-white bg-blue-500 rounded-full">
                {filterTodayApplications(jobApplications.jobApplications)}
              </span>
              <span className="text-gray-600 text-sm ml-1"> Today</span>
            </div>
          </div>

          {/* Total Trainings Card */}
          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-500 text-sm font-medium">Total Trainings</span>
                <span className="text-xl font-semibold text-gray-800">
                  {trainings.trainings.length > 0 ? trainings.trainings.length : '0'}
                </span>
              </div>
              <div className="p-3 bg-green-100 rounded-md text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="inline-block px-2 py-0.5 text-xs font-semibold text-white bg-purple-500 rounded-full">
                {totalEnrollment(trainings.trainings)}
              </span>
              <span className="text-gray-600 text-sm ml-1"> Trainees</span>
            </div>
          </div>

          {/* Total Teams Card (assuming 'team.json' is a local array) */}
          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-500 text-sm font-medium">Total Teams</span>
                <span className="text-xl font-semibold text-gray-800">
                  {team ? team.length : '0'}
                </span>
              </div>
              <div className="p-3 bg-red-100 rounded-md text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20v-2c0-.356-.09-.696-.257-1M2 17v-2c0-.356.09-.696.257-1M15 11a3 3 0 11-6 0 3 3 0 016 0zm-7 4a5 5 0 00-5 5v1h10v-1a5 5 0 00-5-5zm11-5a3 3 0 11-6 0 3 3 0 016 0zm-7 4a5 5 0 00-5 5v1h10v-1a5 5 0 00-5-5z" />
                </svg>
              </div>
            </div>
            {/* You can add more specific metrics or just leave it as a count */}
            <div className="mt-2 text-sm text-gray-600">
              {/* Optional: Add more specific team related metrics here */}
            </div>
          </div>

          {/* Total News Card */}
          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-500 text-sm font-medium">Total News</span>
                <span className="text-xl font-semibold text-gray-800">
                  {news.news.length > 0 ? news.news.length : '0'}
                </span>
              </div>
              <div className="p-3 bg-indigo-100 rounded-md text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10m-3 2H8m4-4H8m4 0H8m-4 8v-4l-3 3m0 0l3 3m-3-3h8" />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {/* Add any specific news metrics if available, e.g., 'Recent Posts' */}
            </div>
          </div>

          {/* Total Projects Card */}
          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-500 text-sm font-medium">Total Projects</span>
                <span className="text-xl font-semibold text-gray-800">
                  {projects.projects.length > 0 ? projects.projects.length : '0'}
                </span>
              </div>
              <div className="p-3 bg-pink-100 rounded-md text-pink-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v12a2 2 0 11-4 0V4zm0 13a2 2 0 100 4h4a2 2 0 100-4h-4z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {/* Add any specific project metrics if available, e.g., 'Ongoing Projects' */}
            </div>
          </div>

          {/* Total Services Card */}
          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-500 text-sm font-medium">Total Services</span>
                <span className="text-xl font-semibold text-gray-800">
                  {services.services.length > 0 ? services.services.length : '0'}
                </span>
              </div>
              <div className="p-3 bg-orange-100 rounded-md text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {/* Add any specific service metrics if available */}
            </div>
          </div>

          {/* Total Testimonials Card - NEWLY ADDED */}
          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-white">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-500 text-sm font-medium">Total Testimonials</span>
                <span className="text-xl font-semibold text-gray-800">
                  {testimonials.testimonials.length > 0 ? testimonials.testimonials.length : '0'}
                </span>
              </div>
              <div className="p-3 bg-teal-100 rounded-md text-teal-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h10M7 16h10M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {/* Add any specific testimonial metrics if available */}
            </div>
          </div>


        </div>

        {/* Recent Job Applicants Table */}
        <div className="flex lg-flex-row gap-4 mt-6">
          <div className="mb-4 w-full grid grid-cols-full gap-6 xl:grid-cols-full">
            <div className="relative border flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
              <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                <div>
                  <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">Recent Job Applicants</h6>
                </div>
                <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="p-6 overflow-x-auto px-0 pt-0 pb-2"> {/* Changed to overflow-x-auto for better responsiveness */}
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
                    {/* Display recent job applications, limit to 5 */}
                    {!jobApplications.isLoading && jobApplications.jobApplications.length > 0 ? (
                      jobApplications.jobApplications.slice(0, 5).map((job) => (
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
                            </div>
                          </td>
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                              {job.expected_salary}$
                            </p>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-5 text-center text-gray-500">No recent job applications to display.</td>
                      </tr>
                    )}
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
