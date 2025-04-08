/* eslint-disable react/prop-types */
import React from 'react';

const ServiceCard = ({ dataArray }) => (
  <div className="flex flex-wrap gap-6 md:gap-0 -mx-2 mb-10">
    {dataArray.map((item) => (
      <div className="w-full md:w-1/2 md:mt-4 lg:w-1/3 h-auto px-4" key={item.title}>
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
);

export default ServiceCard;
