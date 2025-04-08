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
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import DOMPurify from 'dompurify';
import NewsCard from '../components/news/NewsCard';
import {
  newsSelector,
} from '../redux/store';
import { fetchNews } from '../redux/news/newsSlice';
import LoadingScreen from '../conditions/LoadingScreen';

export default function News() {
  const dispatch = useDispatch();
  const { news, isLoading } = useSelector(newsSelector);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (news.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, news.length]);

  const html = (value) => {
    const myHTML = value;
    const mySafeHTML = DOMPurify.sanitize(myHTML);
    return mySafeHTML;
  };

  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const filteredNews = news.filter((job) => job.title.toLowerCase().includes(searchInput.toLowerCase()));
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1);
  };
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
  const paginatedItems = filteredNews.slice(startIndex, endIndex);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  let content;
  if (filteredNews.length === 0) {
    content = (
      <p className="flex justify-center my-12 text-lg">
        No matching news found with title `
        {searchInput}
        `
      </p>
    );
  } else {
    content = (
      <NewsCard currentItems={paginatedItems} />
    );
  }

  return (
    <div className="relative">
      <div
        className="bg-cover bg-center bg-no-repeat h-72 flex items-center"
        style={{
          backgroundImage:
            'url(https://synaxtech.com/wp-content/uploads/2021/02/bg-number.jpg?_t=1673358156)',
        }}
      >
        <div className="container mx-auto py-12  sm:px-6 lg:px-8  w-4/5 flex items-center justify-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl bg-raleway-700-6xl text-white text-left">
            News
          </h1>
        </div>
      </div>

      <div className="absolute top-36 right-24">
        <div action="" className="relative mx-auto w-max">
          <input
            type="text"
            id="topbar-search"
            className="peer cursor-pointer relative z-10 h-12 text-white w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-white focus:pl-16 focus:pr-4"
            value={searchInput}
            onChange={handleSearchInput}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-50 px-3.5 peer-focus:border-white peer-focus:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
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

      {/* <div className="flex justify-center my-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-2 bg-blue-500 text-white rounded-lg ${
              currentPage === index + 1 ? 'bg-blue-700' : 'hover:bg-blue-700'
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

      </div> */}
    </div>
  );
}
