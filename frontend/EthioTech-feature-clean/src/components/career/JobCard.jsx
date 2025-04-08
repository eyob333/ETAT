/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import { PiShareFatFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { BsPerson } from 'react-icons/bs';
import { CiCalendar } from 'react-icons/ci';
import DOMPurify from 'dompurify';

function formatDate(dateString) {
  const options = {
    month: 'short',
    day: 'numeric',
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('en-US', options).replace(',', '');

  return formattedDate;
}

const html = (value) => {
  const myHTML = value;
  const mySafeHTML = DOMPurify.sanitize(myHTML);
  return mySafeHTML;
};

const JobCard = ({ currentItems }) => (
  <>
    {currentItems.map((data, index) => (
      <div
        key={data.id}
        className="bg-white lg:w-3/5 shadow-xl items-start justify-start mx-auto my-5"
      >
        <div className="container px-6 pb-5 pt-1 mx-auto">
          <div className="mt-8 lg:-mx-6 lg:items-center px-3 lg:flex lg:space-x-6">
            <div className="relative group w-full object-cover flex flex-col justify-start items-start lg:mx-6 lg:w-1/2 h-52 lg:h-64  overflow-hidden rounded-xl">
              <Link
                to={`/job/${data.slug}`}
                onClick={() => {
                  window.scroll(0, 0);
                }}
              >
                <img
                  className="object-cover rounded-xl group-hover:opacity-50 transition duration-300 ease-in-out  transform group-hover:scale-125"
                  src={data.picture}
                  alt=""
                />
                <div className="invisible group-hover:visible duration-100 ease-in-out absolute text-5xl text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <button className="inline-flex items-center justify-center opacity-70 w-10 h-10 p-2 mr-2 text-pink-100 transition-colors duration-150 bg-blue-400 rounded-full focus:shadow-outline">
                    <PiShareFatFill
                      color="white"
                      fontSize="0.3em"
                      className="opacity-2"
                    />
                  </button>
                </div>
              </Link>
            </div>

            <div className="lg:w-1/2 lg:mt-0 lg:mx-6 pr-10 w-full">
              <Link
                to={`/job/${data.slug}`}
                className="block mt-4 text-2xl font-semibold text-gray-800 hover:text-mainColor font-railway md:text-3xl"
                onClick={() => {
                  window.scroll(0, 0);
                }}
              >
                {data.title}
              </Link>

              <div className="flex items-center space-x-2 mt-2">
                <BsPerson className="text-base text-lightMain" />
                <span className="text-sm mr-5">{data.company}</span>
                <CiCalendar className="text-base text-lightMain" />
                <span className="text-sm">{formatDate(data.start_date)}</span>
              </div>
              <div className="mt-3 text-sm font-poppins text-gray-500 w-full leading-7 line-clamp-6" dangerouslySetInnerHTML={{ __html: html(`${data.body.split(' ').slice(0, 40).join(' ')}......`) }} />
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

export default JobCard;
