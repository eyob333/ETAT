import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { serviceSelector } from '../../redux/store';

export default function WhatWeDo() {
  const { services } = useSelector(serviceSelector);
  return (
    <section className="pt-20 lg:pt-[80px] pb-12 lg:pb-[0px]">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-12 lg:mb-14 max-w-[510px]">
              <span className="font-semibold text-lg text-mainColor mb-2 block">
                Our Services
              </span>
              <h2
                className="
                   font-bold
                   text-3xl
                   sm:text-4xl
                   md:text-[40px]
                   text-dark
                   mb-4
                   font-raleway
                   "
              >
                What We Offer
              </h2>
              <p className="text-base font text-gray-400">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-0 -mx-2">
          {services.slice(0, 3).length === 0 ? <h1>No service available</h1>
            : services.slice(0, 3).map((item) => (
              <div className="w-full md:w-1/2 md:mt-4 lg:w-1/3 h-96 px-4" key={item.title}>
                <div
                  className="
        p-4
        pt-9
        h-full
        md:px-7
        xl:px-10
        bg-white
        shadow-md
        border
        border-secondColor
        hover:shadow-lg
        hover:bg-customDark
        hover:text-white
        transition duration-300 ease-in-out
        flex
        flex-col
        justify-start
        relative
        group
        overflow-hidden
      "
                >
                  <h4 className="relative z-10 font-semibold font-raleway text-2xl text-dark mb-3">
                    {item.title}
                  </h4>
                  <div className=" relative z-10 w-1/3 h-1.5 bg-secondColor mb-4" />
                  <p className=" relative z-10 text-body-color text-sm font-poppins">
                    {item.body}
                  </p>
                  <img
                    className=" absolute z-0 top-0 left-0 invisible object-center object-cover group-hover:visible h-full w-full bg-black transition duration-200 ease-in-out group-hover:brightness-50 group-hover:opacity-80 group-hover:scale-110"
                    src={item.picture}
                    alt="img"
                  />
                </div>
              </div>
            ))}

        </div>
        <div className=" flex justify-center items-center mt-8">
          <Link to="/services" className="bg-red-600 hover:bg-secondColor text-white font-semibold py-3 px-20 text-sm mt-6 inline-flex items-center group">
            <p> READ MORE </p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
