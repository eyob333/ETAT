/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdReadMore } from 'react-icons/md';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { jobApplicationSelector, jobSelector } from '../../redux/store';
import { fetchJob, removeJob } from '../../redux/job/jobSlice';
import { useDeleteJobMutation } from '../../redux/job/jobApiSlice';
import { addJobApplication, fetchJobApp } from '../../redux/jobApplication/JopApplicationSlice';
import { useGetJobAppQuery, useGetJobsAppQuery } from '../../redux/jobApplication/JobApplicationApiSlice';
import LoadingScreen from '../../conditions/LoadingScreen';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

function formatDate(dateString) {
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('en-US', options);

  return formattedDate;
}

function Jobs() {
  const { jobs, isLoadingJob } = useSelector(jobSelector);
  const dispatch = useDispatch();
  const [deleteJob, { isLoading: loading }] = useDeleteJobMutation();

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJob());
    }
  }, [dispatch, jobs.length]);

  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const [open, setOpen] = useState(null);

  const handleOpenModal = (id) => {
    setOpen(id);
  };

  const handleCloseModal = () => {
    setOpen(null);
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const res = await deleteJob(id).unwrap();
      setOpen(null);
      if (res.message === 'Job deleted successfully') {
        dispatch(removeJob(id));
        toast.success('you have successfully deleted a Service');
      }
    } catch (error) {
      if (error.status === 400) {
        toast.error('User cannot be deleted');
      } else {
        toast.error('something went wrong');
      }
      console.log(error);
    }
  };

  let content;
  let filteredJob;
  if (isLoadingJob) {
    content = <LoadingScreen />;
  } else if (!isLoadingJob) {
    filteredJob = jobs.filter((job) => job.title.toLowerCase().includes(searchInput.toLowerCase()));
    content = (

      <div className="flex flex-col mt-8">
        <div className="flex justify-between items-center px-4">
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
          <Link to="/admin/addJob" className="px-12 pb-2 pt-1 rounded-md bg-mainColor text-white">Add new</Link>
        </div>
        <div className="p-4 overflow-x-auto">
          <div
            className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
          >
            {filteredJob.length === 0 ? <h1 className="text-center text-2xl font-bold">No Job</h1>
              : (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                      >
                        Job Title
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                      >
                        Applicants
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                      >
                        Status
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                      >
                        Date
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredJob.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <span className="text-sm font-medium leading-5 text-gray-800">
                              {job.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5  text-gray-500">
                            {job.application_count}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-500">
                            {job.status === false ? 'closed' : 'open'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span className="inline-flex text-md  text-gray-500 leading-5 rounded-full">
                            {`${formatDate(job.start_date)} to ${formatDate(job.end_date)}`}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-md leading-5 font-medium text-gray-500 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex gap-2">
                            <Link to={`/admin/jobs/${job.slug}`} className="text-green-400 hover:opacity-60 text-xl" type="button" title="Details"><MdReadMore /></Link>
                            <Link to={`/admin/updateJob/${job.id}`} className="text-blue-400 hover:opacity-60" type="button" title="Edit Service"><AiFillEdit /></Link>
                            <button className="text-red-600 hover:opacity-60" type="button" onClick={() => handleOpenModal(job.id)} title="Delete Service"><AiFillDelete /></button>
                            <Modal open={open === job.id} onClose={handleCloseModal} center>
                              <div className="flex flex-col gap-1 pt-7">
                                <h2>Are you sure you whan to delete</h2>
                                <p>
                                  Job:
                                  {' '}
                                  {job.title}
                                </p>
                                <div className="flex gap-2 mt-2 justify-start items-center">
                                  <button className="bg-red-500 flex gap-2 justify-center items-center text-white px-4 py-1 rounded-md" onClick={() => handleDelete(open)} type="button">
                                    {loading ? <ButtonLoadingScreen /> : ''}
                                    <span>delete</span>
                                  </button>
                                  <button className="bg-mainColor text-white px-4 py-1 rounded-md" onClick={handleCloseModal} type="button">cancle</button>
                                </div>
                              </div>
                            </Modal>
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

export default Jobs;
