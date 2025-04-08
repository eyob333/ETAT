/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {
  Autoplay, Pagination, Navigation, EffectFade,
} from 'swiper/modules';
import 'swiper/css/pagination';
import { useSelector } from 'react-redux';
import { partnerSelector } from '../../redux/store';

export default function Partners() {
  const { partners } = useSelector(partnerSelector);

  // const images = [
  //   { src: 'https://synaxtech.com/wp-content/uploads/2023/01/Nevis-Logo-scaled.jpg' },
  //   { src: 'https://synaxtech.com/wp-content/uploads/2023/01/Kron-Logo-scaled.jpg' },
  //   { src: 'https://synaxtech.com/wp-content/uploads/2023/01/Cyble-Logo-scaled.jpg' },
  //   { src: 'https://synaxtech.com/wp-content/uploads/2023/01/Global-Relay-Logo-scaled.jpg' },
  //   { src: 'https://synaxtech.com/wp-content/uploads/2023/01/GuardyooLogo-scaled.jpg' },
  //   { src: 'https://synaxtech.com/wp-content/uploads/2023/01/Clari5-Logo-scaled.jpg' },
  //   { src: 'https://synaxtech.com/wp-content/uploads/2023/01/Cofense-Logo-2-scaled.jpg' },
  //   { src: 'https://synaxtech.com/wp-content/uploads/2023/01/Kratikal-Logo-scaled.jpg' },
  //   { src: 'https://synaxtech.com/wp-content/uploads/2023/01/Nevis-Logo-scaled.jpg' },
  //   { src: 'https://synaxtech.com/wp-content/uploads/2023/01/NSFOCUS-Logo-1-scaled.jpg' },
  //   { src: 'https://synaxtech.com/wp-content/uploads/2023/01/Nevis-Logo-scaled.jpg' },

  // ];
  return (
    <div className="relative bg-white flex flex-col justify-center items-center h-48 p-4 md:pb-14 md:h-64 md:mt-6 z-20">
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
        Our partners
      </h2>
      <div className="container hidden justify-center items-center md:flex">

        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          slidesPerView={5}
          loop
          autoplay={true}
          pagination={{ clickable: false }}
        >

          {partners.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="flex px-8 py-20">
                <div className="flex justify-center items-center ">
                  <img className="h-8 md:h-16 object-fill" src={image.logo} alt="img" />
                </div>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
      <div className="container flex md:hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          slidesPerView={1}
          loop
          autoplay={true}
          pagination={{ clickable: false }}
        >

          {partners.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="flex px-8 justify-center items-center pt-10 pb-16">
                <div className="flex justify-center items-center ">
                  <img className="h-12" src={image.logo} alt="img" />
                </div>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </div>
  );
}
