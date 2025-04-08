/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { PiShareFatFill } from 'react-icons/pi';

const TeamCard = ({ team, openModal }) => (
  <>

    {team.map((data) => (
      <div
        onClick={() => openModal(data.id)}
        key={data.id}
        className="w-auto group bg-white shadow-lg hover:drop-shadow-2xl hover:shadow-inner rounded-lg sahdow-lg overflow-hidden flex flex-col justify-start items-center"
      >
        <div className="relative">
          <img
            className="object-center object-cover h-80 w-full opacity-1 transition duration-300 ease-in-out group-hover:opacity-50"
            src={data.imageUrl}
            alt=""
          />
          <div className="invisible group-hover:visible duration-100 ease-in-out absolute text-5xl text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button className="inline-flex items-center justify-center opacity-70 w-30 h-30 p-6 mr-2 text-pink-100 transition-colors duration-150 bg-blue-700 rounded-full focus:shadow-outline">
              <PiShareFatFill color="white" fontSize="0.4em" className="opacity-2" />
            </button>
          </div>
        </div>
        <div className="text-center py-8 sm:py-6">
          <p className="text-xl text-blue-700 font-bold font-poppins mb-2 group-hover:text-red-600">{data.name}</p>
          <p className="text-base text-gray-400 font-poppins font-normal">{data.role}</p>
        </div>
      </div>
    ))}
  </>

);

export default TeamCard;
