/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { jobApplicationSelector, jobSelector } from '../../redux/store';
import LoadingScreen from '../../conditions/LoadingScreen';
import { fetchJob } from '../../redux/job/jobSlice';
import { fetchJobApp } from '../../redux/jobApplication/JopApplicationSlice';

function JobDetails() {
  const { slug } = useParams();
  const { jobs, isLoadingJob } = useSelector(jobSelector);
  const { jobApplications, isLoading } = useSelector(jobApplicationSelector);
  let filteredjob;
  let content;
  let filteredApplications;
  const dispatch = useDispatch();

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJob());
    }
  }, [dispatch, jobs.length]);

  useEffect(() => {
    if (jobApplications.length === 0) {
      dispatch(fetchJobApp());
    }
  }, [dispatch, jobApplications.length]);

  if (isLoadingJob || isLoading) {
    return <LoadingScreen />;
  } if (!isLoadingJob && !isLoading && jobs.length > 0 && jobApplications.length > 0) {
    filteredjob = jobs.filter((job) => job.slug === slug);
    content = (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center px-3 py-10 lg:w-4/5 md:4/5">

          <div className="flex mb-6 w-full items-center justify-between items-center">
            <Link
              to="/admin/jobs"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              back
            </Link>

            <Link
              to={`/admin/updateJob/${filteredjob[0].id}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Job
            </Link>
          </div>
          <div className="flex mb-6 w-full items-start">
            <div className="w-full flex justify-between items-center">
              <h1
                className="w-full text-gray-900 sm:text-sm sm:leading-6 lg:text-2xl font-semibold"
              >
                {filteredjob[0].title}
              </h1>
              <div className="w-full flex flex-col justify-end items-end">
                <span className="text-md font-medium">
                  Total Applicants:
                  {' '}
                  {filteredjob[0].application_count}
                  {' '}
                </span>
                <Link className="text-blue-500 hover:text-blue-400" to={`/admin/jobApplicants/${filteredjob[0].id}`}>see applicants</Link>
              </div>

            </div>
          </div>
          <div className="flex mb-6 w-full items-center justify-center">
            <img className="w-full lg rounded-sm h-72" src={filteredjob[0].picture} alt="Colors" />

          </div>

          <div className="flex mb-6 w-full items-start">
            <div className="w-full flex flex-col">
              <div
                className="w-full py-1.5 gap-2 flex text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
              >
                <span className="font-medium">Description: </span>
                <span>
                  {filteredjob[0].body}
                </span>

              </div>
              <div
                className="w-full flex gap-2 py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
              >
                <span className="font-medium">Department: </span>
                <span>
                  {filteredjob[0].department}
                </span>
              </div>
              <div
                className="w-full flex gap-2 py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
              >
                <span className="font-medium">Status: </span>
                <span>
                  {filteredjob[0].status === false ? 'closed' : 'open'}
                </span>
              </div>
              <div
                className="w-full flex gap-2 py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
              >
                <span className="font-medium">Location: </span>
                <span>
                  {filteredjob[0].location}
                </span>
              </div>
              <div
                className="w-full flex gap-2 py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
              >
                <span className="font-medium">Company: </span>
                <span>
                  {filteredjob[0].company}
                </span>
              </div>
              <div
                className="w-full flex gap-2 py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
              >
                <span className="font-medium">Employment type: </span>
                <span>
                  {filteredjob[0].employment_type}
                </span>
              </div>
              <div
                className="w-full flex gap-2 py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
              >
                <span className="font-medium">Workplace type: </span>
                <span>
                  {filteredjob[0].workplace_type}
                </span>
              </div>
              <div
                className="w-full flex gap-2 py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
              >
                <span className="font-medium">Compansation: </span>
                <span>
                  {filteredjob[0].compansation}
                </span>
              </div>
              <div
                className="w-full flex gap-2 py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
              >
                <span className="font-medium">Salary: </span>
                <span>
                  {filteredjob[0].salary}
                </span>
              </div>
              <div
                className="w-full flex gap-2 py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
              >
                <span className="font-medium">Start date: </span>
                <span>
                  {filteredjob[0].start_date}
                </span>
              </div>
              <div
                className="w-full flex gap-2 py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
              >
                <span className="font-medium">End date: </span>
                <span>
                  {filteredjob[0].end_date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {content}
    </>
  );
}
export default JobDetails;
