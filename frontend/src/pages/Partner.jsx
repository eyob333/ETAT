import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  partnerSelector,
} from '../redux/store';
import { fetchPartner } from '../redux/partner/partnerSlice';
import LoadingScreen from '../conditions/LoadingScreen';

export default function Partner() {
  const dispatch = useDispatch();
  const { partners, isLoading } = useSelector(partnerSelector);

  useEffect(() => {
    if (partners.length === 0) {
      dispatch(fetchPartner());
    }
  }, [dispatch, partners.length]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
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
      src="https://res.cloudinary.com/deqp41wyr/video/upload/v1749417663/video5922624631189019200_hek5ke.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>

  {/* Content over the video */}
  <div className="relative z-10 h-full flex items-center">
    <div className="container mx-auto py-12 sm:px-6 lg:px-8 w-4/5 flex items-center justify-start">
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-white text-left">
        Our Partners
      </h1>
    </div>
  </div>

  {/* Optional overlay for better text contrast */}
  <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
</div>

      <div className="w-4/5 items-center object-center mx-auto pt-10 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-7 gap-x-4 pb-6">
          {isLoading ? <LoadingScreen />
            : partners.map((item, index) => (
              <div className="w-auto group px-5 overflow-hidden flex flex-col justify-start items-center" key={index}>
                <div className="w-20 h-20" style={{width: '100px', height: 'auto'}}>
                  <img className="object-center object-fill w-full h-full" src={item.logo} alt="logo" />
                </div>
                <p className="pt-5 text-poppins tracking-wider object-center leading-7 font-bold" style={{fontSize: "1.4rem"}} >{item.body}</p>
                <div className="pt-5">
                  <p className="font-poppins-400 tracking-wider object-center leading-7 ">
                    <span className="text-mainColor font-poppins">Key offerings: </span>
                    {item.key_offerings}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

