/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { newsSelector } from '../../redux/store';

const html = (value) => {
  const myHTML = value;
  const mySafeHTML = DOMPurify.sanitize(myHTML);
  return mySafeHTML;
};

export default function News() {
  const { news } = useSelector(newsSelector);
  return (
    <div className="relative h-auto bg-gray-200 z-20">
      <div className="flex relative flex-col justify-center px-4 pt-10 pb-14 md:p-10 gap-10 items-center">
        {/* <div className="absolute w-56 h-44 top-0 z-10 right-12 bg-customDarkRed" /> */}
        <h2
          className="
                   font-bold
                   text-2xl
                   sm:text-2xl
                   md:text-[40px]
                   text-dark
                   font-raleway
                   "
        >
          Latest News
        </h2>
        <div className=" flex w-full flex-col md:pb-5 md:container">
          <div className="relative z-20 p-4 md:p-4 md:mx-20 h-full flex flex-col md:grid md:grid-cols-2 gap-4 items-center justify-center">
            <div className="absolute w-56 h-44 bottom-0 z-10 left-0 bg-mainColor" />
            {news.slice(0, 2).length === 0 ? <h1> No News </h1>
              : news.slice(0, 2).map((item) => (
                <div key={item.id} className="relative z-20 shadow-2xl bg-white p-8 w-full">

                  <header className="flex font-light text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 rotate-90 -ml-2"
                      viewBox="0 0 24 24"
                      stroke="#b91c1c"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                    <p onClick={() => { console.log(item.body); }}>TECH NEWS</p>
                  </header>

                  <h2 className="font-bold text-3xl mt-2">
                    {item.title.split(' ').slice(0, 5).join(' ')}
                    ...
                  </h2>

                  <p className="mt-5">
                    By:
                    <a href="#" className="text-red-600">
                      {' '}
                      {item.author_name}
                      {' '}
                    </a>

                  </p>

                  <h3 className="font-bold text-xl mt-5"> Intro </h3>
                  <div className="font-light" dangerouslySetInnerHTML={{ __html: html(`${item.body.split(' ').slice(0, 23).join(' ')}......`) }} />
                  {/* <p className="font-light">
                  dangerouslySetInnerHTML=
                  {{ __html: html(`${item.body}`) }}
                  ...
                  {' '}
                </p> */}

                  <button type="button" className="bg-red-600 text-white font-semibold py-2 px-5 text-sm mt-6 inline-flex items-center group">
                    <Link to={`/newspost/${item.slug}`}> READ MORE </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                </div>
              ))}

            <div className="absolute w-56 h-44 top-0 z-10 right-0 bg-secondColor" />
          </div>
        </div>
      </div>
      {/* <div className="absolute w-56 h-44 top-14 z-10 right-12 bg-customDarkRed" /> */}
    </div>
  );
}
