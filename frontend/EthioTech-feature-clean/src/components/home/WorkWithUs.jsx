import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/image/ppl.jpg';

export default function WorkWithUs() {
  return (
    <div className="relative z-20 h-[480px] md:h-screen flex justify-center items-center md:py-4 bg-white">
      <div
        className="w-full relative flex h-full md:h-5/6 opacity-90 bg-mainColor"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <span id="blackOverlay" className="w-full h-full absolute opacity-80 bg-secondColor" />
        <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-mainColor" />

        <div className="container relative pr-10 flex justify-center items-center h-full">
          <div className=" my-auto flex flex-wrap">
            <div className="w-full lg:w-8/12 px-6 my-auto">
              <div className="pr-12">
                <h1 className="text-white font-raleway font-semibold text-3xl  md:text-5xl">
                  Work with Us: Experience Excellence with Our
                  {' '}
                  <span className="text-red-600 font-semibold text-3xl md:text-5xl">Exceptional Services!</span>
                </h1>
                <p className="mt-4 text:sm md:text-lg md:mb-10 text-gray-300">
                  Trust ETAT for reliable and innovative solutions.
                </p>

              </div>

            </div>
            <div className="flex justify-center items-center pr-20 pt-10 md:pt-0 pl-6 md:pl-12">
              <Link to="/aboutUs" className="bg-red-600 hover:bg-secondColor text-white font-semibold py-3 px-10 text-md inline-flex items-center group">
                <span>LEARN MORE</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
