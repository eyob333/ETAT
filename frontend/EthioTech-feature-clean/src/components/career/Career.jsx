/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-responsive-modal/styles.css';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from './JobCard';
import { jobSelector } from '../../redux/store';
import { fetchJob } from '../../redux/job/jobSlice';
import LoadingScreen from '../../conditions/LoadingScreen';

export default function Career() {
  const dispatch = useDispatch();
  const { jobs, isLoadingJob } = useSelector(jobSelector);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJob());
    }
  }, [dispatch, jobs.length]);

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStatusJob = jobs.filter((job) => job.status === true);
  const filteredJobs = filteredStatusJob.filter((job) => job.title.toLowerCase().includes(searchInput.toLowerCase()));
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1);
  };
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(10, 0);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredJobs.slice(startIndex, endIndex);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (isLoadingJob) {
    return <LoadingScreen />;
  }

  let content;
  if (filteredJobs.length === 0) {
    content = (
      <p className="flex justify-center my-12 text-lg">
        No matching jobs found with position title `
        {searchInput}
        `
      </p>
    );
  } else {
    content = <JobCard currentItems={paginatedItems} />;
  }
  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat h-96 flex items-center"
        style={{
          backgroundImage:
            'url(https://synaxtech.com/wp-content/uploads/2021/02/bg-number.jpg?_t=1673358156)',
        }}
      >
        <div className="container mx-auto py-12 sm:px-6 lg:px-8 w-4/5">
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-4xl sm:text-5xl md:text-6xl bg-raleway-700-6xl font-semibold text-white text-left w-80 lg:w-3/5">
              Find & Apply For Your Dream Job
            </h1>
            <p className="mt-5 text-base sm:text-sm md:text-base bg-poppins-700-base  text-gray-400 text-left w-80 lg:w-2/5">
              The goal of all job creation strategies is to stimulate healthy economic growth. Economists agree that annual growth between 2%–3% is sustainable
            </p>
          </div>
        </div>
      </div>

      <div className="relative text-center mt-10">
        <h1 className="font-bold pt-20 lg:pt-0 text-secondColor font-railway-500 text-3xl pb-3 underline-offset-2">
          Recent Job Post
        </h1>
        <div className="absolute top-0 right-28">
          <div action="" className="relative mx-auto w-max">
            <input
              type="text"
              id="topbar-search"
              className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-mainColor focus:pl-16 focus:pr-4"
              value={searchInput}
              onChange={handleSearchInput}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-mainColor peer-focus:stroke-mainColor" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      {content}
      <div className="flex justify-center mt-5 mb-4">
        {currentPage !== 1 && (
        <div className="relative group">
          <button
            className={`px-5 py-2 mx-1 bg-gray-200 text-gray-700 rounded-md h-full ${
              currentPage === 1 ? 'bg-blue-700 h-full' : 'hover:bg-gray-400'
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <MdOutlineKeyboardArrowLeft color="gray" />
          </button>
        </div>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`px-4 py-2 mx-1 ${
              currentPage === number
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            } ${currentPage !== number ? 'hover:bg-gray-400 hover:text-white' : ''} rounded-md `}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}

        {currentPage !== totalPages && (
          <div className="relative group">
            <button
              className={`px-5 py-2 mx-1 bg-gray-200 text-gray-700 rounded-md h-full ${
                currentPage === totalPages ? 'bg-blue-700 invisible' : 'hover:bg-gray-400'
              }`}
              onClick={handleNextPage}
            >
              <MdOutlineKeyboardArrowRight color="gray" />
            </button>
          </div>
        )}
      </div>
      {' '}
    </div>
  );
}
