/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
// DataComponent.js

import React from 'react';
import { PiShareFatFill } from 'react-icons/pi';

const ProjectCard = ({ filteredData, openModal, shouldAnimate }) => (
  <>
    {filteredData.map((data, index) => (
      <div
        onClick={() => openModal(data.id)}
        key={data.id}
        className={`w-auto h-fit group bg-white hover:drop-shadow-xl hover:shadow-inner rounded-lg shadow-lg overflow-hidden flex flex-col justify-start items-start p-0 m-0 ${
          shouldAnimate ? 'animate-fade-in duration-300' : ''
        }`}
        style={{ animationDelay: `${index * 200}ms` }}
      >
        <div className="relative w-full object-cover flex flex-col justify-start items-start overflow-hidden">
          <img
            className="object-center object-cover h-36 w-full opacity-1 transition duration-300 ease-in-out group-hover:opacity-50 transform group-hover:scale-105"
            src={data.picture}
            alt=""
          />
          <div className="invisible group-hover:visible duration-100 ease-in-out absolute text-5xl text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button className="inline-flex items-center justify-center opacity-70 w-10 h-10 p-2 mr-2 text-pink-100 transition-colors duration-150 bg-red-500 rounded-full focus:shadow-outline">
              <PiShareFatFill color="white" fontSize="0.3em" className="opacity-2" />
            </button>
          </div>
        </div>
        <div className="text-start px-2 flex flex-col justify-start items-start mb-2">
          <p className="text-lg text-blue-700 font-poppins my-2 line-clamp-2">{data.title}</p>
          <p className="text-sm text-gray-500 font-poppins mb-2 line-clamp-1">{data.body}</p>
          <button className="text-sm text-blue-500 hover:text-red-600 focus:outline-none">Read More</button>
        </div>
      </div>
    ))}
  </>
);

export default ProjectCard;
