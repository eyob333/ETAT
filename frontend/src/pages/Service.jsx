
import React, { useState, useEffect } from 'react';
import { PiShareFatFill } from 'react-icons/pi';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useDispatch, useSelector } from 'react-redux';
// import ServiceCard from '../components/service/ServiceCard';
// import ServiceMovingCards from '../components/service/ServiceMovingCards';
import WhatWeDo from '../components/home/WhatWeDo'
import { serviceSelector } from '../redux/store';
import LoadingScreen from '../conditions/LoadingScreen';
import { fetchService } from '../redux/service/serviceSlice';

export default function Service() {
  const { services, isLoading } = useSelector(serviceSelector);
  const dispatch = useDispatch();  
  const [searchInput, setSearchInput] = useState('');
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchService());
    }
  }, [dispatch, services.length]);
  let filteredService;
  let content;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (!isLoading && services.length > 0) {
    filteredService = services.filter((service) => service.title.toLowerCase().includes(searchInput.toLowerCase()));
    console.log("Filtered Services : ",filteredService);
    content = (
      <div className="flex flex-wrap gap-6 md:gap-0 -mx-2 mb-10">
        {filteredService.map((item) => (
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
  }

  return (
    <div className=" relative w-5/6 items-center object-center mx-auto px-4 pt-10 pb-15">
      <div className="text-start pb-12">
        <h1 className="font-bold pt-10 lg:pt-0 text-mainColor font-railway-500 text-3xl pb-10 underline-offset-2">
        <div className="relative h-80 overflow-hidden">
  {/* Background Video */}
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source
      src="https://res.cloudinary.com/deqp41wyr/video/upload/v1749427545/video5922624631189019253_qebmtv.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>

  {/* Content over the video */}
  <div className="relative z-10 h-full flex items-center">
    <div className="container mx-auto py-12 sm:px-6 lg:px-8 w-4/5 flex items-center justify-start">
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-white text-left">
      What We Do
      </h1>
    </div>
  </div>

  {/* Optional overlay for better text contrast */}
  <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
</div>

         
        </h1>
        <h3 className="">
        ETAT provides various Information Technology Enabled services mainly on Technology Consulting, Cyber security, Modern DC and Networking, Business Automation and Intelligence, Software Licensing, Surveillance, Tech Supply, VOIP /PBX/SIP Solutions and maintenance and support.
        </h3>
      </div>
      <div>
        <div className="absolute top-6 right-1">
          <div action="" className="relative mx-auto w-max">
            <input
              type="text"
              id="topbar-search"
              className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-mainColor focus:pl-16 focus:pr-4"
              value={searchInput}
              onChange={handleSearchInput}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-mainColor peer-focus:stroke-mainColor" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div>
          {/* <ServiceMovingCards /> */}
          <  WhatWeDo />
          
        </div>
        <>
          {content}
        </>
      </div>
    </div>

  );
}

