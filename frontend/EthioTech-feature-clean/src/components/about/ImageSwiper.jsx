/* eslint-disable react/prop-types */
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/bundle';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import {
  Autoplay, Pagination, Navigation, EffectFade, Scrollbar, A11y,
} from 'swiper/modules';

const ImageSwiper = ({ images }) => (
  <div className="sticky top-0 z-10 mb-24  max-w-screen-lg mx-auto px-6 h-96">
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade, Scrollbar, A11y]}
      slidesPerView={2}
      loop
      autoplay
      speed={1500}
      effect="fade"
      spaceBetween={50}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {images.map((image) => (
        <SwiperSlide key={image.label}>
          <section className="relative bg-blueGray-50 h-full">
            <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-96 min-h-96">
              <div
                className="absolute top-0 w-full h-full bg-center bg-cover h-96"
                style={{
                  backgroundImage: `url(${image.label})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black" />
              </div>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default ImageSwiper;
