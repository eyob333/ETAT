/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { newsSelector } from '../../redux/store';

const html = (value) => {
  const myHTML = value;
  const mySafeHTML = DOMPurify.sanitize(myHTML);
  return mySafeHTML;
};

function NewsDetail() {
  const { id } = useParams();
  const { news } = useSelector(newsSelector);
  const filteredNews = news.filter((news) => news.id === parseInt(id));
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center px-3 py-10 lg:w-3/5 md:4/5">

        <div className="flex mb-6 w-full justify-between items-center">
          <Link
            to="/admin/news"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            back
          </Link>

          <Link
            to={`/admin/updateNews/${filteredNews[0].id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update News
          </Link>
        </div>
        <div className="flex mb-6 w-full items-start">
          <div className="w-full">
            <h1
              className="w-full text-gray-900 sm:text-sm sm:leading-6 lg:text-2xl font-semibold"
            >
              {filteredNews[0].title}
            </h1>

          </div>
        </div>
        <div className="flex mb-6 w-full items-center justify-center">
          <img className="w-full lg rounded-sm h-72" src={filteredNews[0].picture} alt="Colors" />

        </div>

        <div className="flex mb-6 w-full items-start">
          <div className="w-full">
            <div
              className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
            >
              <div dangerouslySetInnerHTML={{ __html: html(`${filteredNews[0].body}`) }} />

            </div>
          </div>
        </div>
        <p>
          Likes:
          {' '}
          {filteredNews[0].like_count}
        </p>
      </div>
    </div>
  );
}
export default NewsDetail;
