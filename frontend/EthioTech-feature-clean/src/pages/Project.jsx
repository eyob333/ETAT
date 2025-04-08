/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState, useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import ProjectCard from '../components/project/ProjectCard';
import ProjectDetail from '../components/project/ProjectDetail';
import {
  eventSelector, newsSelector, partnerSelector, projectSelector, serviceSelector, trainingSelector,
} from '../redux/store';
import { fetchProject } from '../redux/project/projectSlice';
import LoadingScreen from '../conditions/LoadingScreen';

export default function Project() {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector(projectSelector);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProject());
    }
  }, [dispatch, projects.length]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [openModalId, setOpenModalId] = useState(null);

  const categories = ['All', ...Array.from(new Set(projects.map((item) => item.area)))];
  const statusArray = ['All', 'Completed', 'Ongoing'];

  const filteredData = selectedCategory === 'All' && selectedStatus === 'All' ? projects : projects.filter((data) => (
    (selectedCategory === 'All' || data.area === selectedCategory)
        && (selectedStatus === 'All' || data.status === (selectedStatus === 'Ongoing'))
  ));

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

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
  const paginatedItems = filteredData.slice(startIndex, endIndex);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    handlePageChange(1);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    handlePageChange(1);
  };

  useEffect(() => {
    setShouldAnimate(true);
  }, [filteredData]);

  const openModal = (id) => {
    setOpenModalId(id);
  };

  const closeModal = () => {
    setOpenModalId(null);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">

      <div className="text-center pb-12">
        <h1 className="font-bold text-mainColor font-railway-500 text-3xl pb-10 underline-offset-2">
          Our Projects
        </h1>
        <h3 className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias voluptates praesentium possimus ex quisquam placeat totam officiis atque facere deserunt sint, debitis, tempore assumenda dignissimos error! Earum veniam error asperiores.
        </h3>
      </div>

      <div className="flex flex-wrap justify-center mb-10">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1 rounded-md mb-2 mr-2 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center mb-10">
        {statusArray.map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded-md mb-2 mr-2 ${
              selectedStatus === status ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 px-5">

          <ProjectCard filteredData={paginatedItems} openModal={openModal} shouldAnimate={shouldAnimate} />

          {openModalId && (
          <ProjectDetail openModalId={openModalId} dataArray={projects} closeModal={closeModal} />
          )}
        </div>
      </div>

      <div className="flex justify-center mt-5">
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
