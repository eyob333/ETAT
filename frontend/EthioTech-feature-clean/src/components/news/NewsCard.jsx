/* eslint-disable react/no-danger */
/* eslint-disable react/no-danger-with-children */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import { PiShareFatFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { BsPerson } from 'react-icons/bs';
import { CiCalendar } from 'react-icons/ci';
import DOMPurify from 'dompurify';

const NewsCard = ({ currentItems }) => {
  const html = (value) => {
    const myHTML = value;
    const mySafeHTML = DOMPurify.sanitize(myHTML);
    return mySafeHTML;
  };

  return (
    <>
      {currentItems.map((item, index) => (
        <div key={item.id} className="mx-4 md:mx-auto max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm overflow-hidden rounded-sm bg-white shadow my-10">
          <img src={item.picture} alt="" />
          <div className="p-4">
            <p className="mb-1 text-sm text-primary-500">
              By:
              {' '}
              {item.author_name}
              {' '}
              <time>{item.date}</time>
            </p>
            <Link
              to=""
              className="text-xl font-medium text-gray-900 hover:text-mainColor"
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              {item.title}
            </Link>
            <div className="mt-1 text-gray-500 line-clamp-2" dangerouslySetInnerHTML={{ __html: html(`${item.body}`) }} />
            <div className="mt-4 flex gap-2">
              <Link
                to={`/newspost/${item.slug}`}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
                onClick={() => {
                  window.scroll(0, 0);
                }}
              >
                Read more
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsCard;
