/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';

const InfoCards = ({ data }) => (
  <div className="grid grid-cols-1 gap-8 gap-x-10 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-1 lg:grid-cols-2 mx-6">
    {data.map((item, index) => (
      <div key={index} className="p-6 border rounded-xl border-r-gray-200">
        <div className="md:flex md:items-start md:-mx-4">
          <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 ">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {item.icon}
            </svg>
          </span>

          <div className="mt-4 md:mx-4 md:mt-0">
            <h1 className="text-xl font-medium text-gray-700 capitalize ">{item.title}</h1>

            <p className="mt-3 text-gray-500 ">{item.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default InfoCards;
