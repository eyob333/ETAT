/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useGetJobAppQuery } from '../../redux/jobApplication/JobApplicationApiSlice';
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import LoadingScreen from '../../conditions/LoadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import { jobApplicationSelector } from '../../redux/store';
// import { fetchJob } from '../../redux/job/jobSlice';
import { fetchJobApp } from '../../redux/jobApplication/JopApplicationSlice';

export default function JopApplication() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jobApplications, isLoading } = useSelector(jobApplicationSelector);

  useEffect(() => {
    if (jobApplications.length === 0) {
      dispatch(fetchJobApp());
    }
  }, [dispatch, jobApplications.length]);

  const [open, setOpen] = useState(false);

  const handleOpenModal = (id) => {
    setOpen(id);
  };

  const handleCloseModal = () => {
    setOpen(null);
  };

  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  let content;
  let filteredJobApplication;
  let applicants;
  if (isLoading) {
    content = <LoadingScreen />;
  } if (!isLoading && jobApplications.length > 0) {
    applicants = jobApplications.filter((application) => application.job_id === parseInt(id));
    filteredJobApplication = applicants.filter((app) => app.name.toLowerCase().includes(searchInput.toLowerCase()));
    content = (

      <div className="flex flex-col relative h-screen">
        <div className="flex justify-between p-8 items-center px-4">
          <div>
            <div className="mt-1 relative lg:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-mainColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-mainColor text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 px-2.5 py-2" placeholder="Search" value={searchInput} onChange={handleSearchInput} />
            </div>
          </div>
          <Link to="/admin/jobs" className="px-6 pb-2 pt-1 rounded-md bg-mainColor text-white">Back</Link>
        </div>
        <div className="p-4 overflow-x-auto">
          <div
            className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
          >
            <table className="min-w-full w-full">
              <thead>
                <tr>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Name

                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Address

                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Field of study

                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    GPA

                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    years of Experience

                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Previous company

                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Expected salary

                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Start Date

                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Actions
                  </th>

                </tr>
              </thead>
              <tbody className="bg-white w-full">

                {filteredJobApplication.map((app) => (

                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {app.name}
                          </div>
                          <div className="text-sm leading-5 text-gray-500">
                            {app.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {app.address}
                      </div>
                      <div className="text-sm leading-5 text-gray-500">
                        {app.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span className="inline-flex text-md  text-gray-500 leading-5 rounded-full">
                        {app.field_of_study}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span className="inline-flex text-md  text-gray-500 leading-5 rounded-full">
                        {app.gpa}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span className="inline-flex text-md  text-gray-500 leading-5 rounded-full">
                        {app.total_years_of_experience}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span className="inline-flex text-md  text-gray-500 leading-5 rounded-full">
                        {app.name_of_previous_company}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span className="inline-flex text-md  text-gray-500 leading-5 rounded-full">
                        {app.expected_salary}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span className="inline-flex text-md  text-gray-500 leading-5 rounded-full">
                        {app.available_start_date}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-md leading-5 font-medium text-gray-500 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex gap-4">
                        <Link to={app.resume} target="_blank" className="text-blue-400 hover:opacity-60" type="button">view resume</Link>
                        <button type="button" className="text-blue-400 hover:opacity-60" onClick={() => handleOpenModal(app.id)}>cover letter</button>
                        <Modal open={open === app.id} onClose={handleCloseModal} center>
                          <div className="flex flex-col w-96 gap-1 pt-7">
                            <p>
                              <span className="font-medium">Applicant Name:</span>
                              {' '}
                              {app.name}
                            </p>
                            <div className="flex gap-2 mt-2 justify-start items-center">
                              <p>{app.cover_letter}</p>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </td>
                  </tr>
                )) }

              </tbody>

            </table>
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
