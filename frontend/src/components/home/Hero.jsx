import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import {
  Autoplay, Pagination, Navigation, EffectFade,
} from 'swiper/modules';
import { Link } from 'react-router-dom';
import WhatWeDo from './WhatWeDo';
import convertToWebP from '../../utils/ToWebp';

const images = [
  { title: ' Consulting: Strategic Guidance for Success', src: convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1749344994/sketch1710090663589_ymjfgd.png")  },
  { title: 'Cybersecurity Unleashed: Expert Services for Digital Fortification', src: convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1749345029/cyber_npel41.png") },
  { title: 'Modern DC and Networking: Experience Next-Level Modern DC Services', src: convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1749344996/Slide_01_rz7ytp.jpg") },
  { title: 'Power Your Online Presence: Elevate with Exceptional Hosting Services', src: convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1749344994/sketch1710090663589_ymjfgd.png")},
  { title: 'Business Automation and Intelligence: treamline Operations, Amplify Insights', src: convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1749344997/slide_03_cawuyt.jpg") },
  { title: 'Software Licensing: Unlock the Full Potential of Your Software', src: convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1749345001/software_rsstxn.jpg") },
  { title: 'Tech Supply: Source Your Tech Needs with Confidence', src: convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1749345004/slide_05_rctr2i.jpg") },
  { title: 'Surveillance: Monitoring Your Assets for Enhanced Security',src: convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1749344993/slide_06_gsgkc0.jpg") },
  { title: 'VOIP/PBX/SIP Solutions: Transforming Communication, Empowering Collaboration', src: convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1749345005/Slide_automation_01_hmvxjl.png") },
  { title: 'Maintenance and 24/7 SUPPORT: Trust ETAT for reliable and innovative solutions', src: convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1749344996/Slide_01_rz7ytp.jpg" )},
];

export default function Hero() {
  return (
    <>
      <div>
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          slidesPerView={1}
          loop
          autoplay={true}
          speed={1500}
        >
          {images.map((image) => (
            <SwiperSlide key={image.title}>
              <section className="relative bg-blueGray-10">
                <div className="relative pt-0 md:pt-16 pb-32 flex content-center items-center justify-center  h-screen">
                  <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${image.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <span id="blackOverlay" className="w-full h-full absolute opacity-5bg-black" />
                  </div>
                  <div className="container relative  flex items-center h-96 mx-5">
                    <div className=" my-auto flex flex-wrap">
                      <div className="w-full lg:w-8/12 px-4 my-auto">
                        <div className="pr-12">
                          <h1 className="text-white font-raleway font-semibold text-2xl md:text-5xl">
                            {image.title}
                          </h1>
                          <p className="mt-4 text-md md:text-lg pb-6 font-raleway text-gray-300">
                            Trust ETAT for reliable and innovative solutions.
                          </p>
                          <Link to="/services" className="bg-red-600 hover:bg-secondColor text-white font-semibold py-3 px-9 md:px-10 text-md inline-flex items-center group">
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
              </section>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative z-20 overflow-x-hidden flex justify-center items-center px-10 bg-white">
        <WhatWeDo />
      </div>
    </>
  );
}

