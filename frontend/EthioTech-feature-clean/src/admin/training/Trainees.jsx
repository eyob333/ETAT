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
import { eventAttendeeSelector, jobApplicationSelector, traineeSelector } from '../../redux/store';
import { fetchAtendee } from '../../redux/eventAttendee/eventAttendeeSlice';
import { fetchTrainees } from '../../redux/trainees/traineeSclice';

export default function Trainees() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { trainees, isLoading } = useSelector(traineeSelector);

  useEffect(() => {
    if (trainees.length === 0) {
      dispatch(fetchTrainees());
    }
  }, [dispatch, trainees.length]);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  let content;
  let filteredJobApplication;
  let applicants;
  if (isLoading) {
    content = <LoadingScreen />;
  } if (!isLoading && trainees.length > 0) {
    applicants = trainees.filter((application) => application.enrolled_for_id === parseInt(id));
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
          <Link to="/admin/trainings" className="px-6 pb-2 pt-1 rounded-md bg-mainColor text-white">Back</Link>
        </div>
        <div className="p-4 overflow-x-auto">
          <div
            className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
          >
            {filteredJobApplication.length === 0 ? <h1 className="text-center text-2xl font-bold">No Trainees</h1>
              : (
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
                        Email

                      </th>
                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                      >
                        Phone number

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
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {app.email}
                          </div>

                        </td>
                        <td className="px-6 py-4 border-b border-gray-200">

                          <div className="text-sm leading-5 text-gray-500">
                            {app.phone}
                          </div>
                        </td>
                      </tr>
                    )) }

                  </tbody>

                </table>
              )}
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
