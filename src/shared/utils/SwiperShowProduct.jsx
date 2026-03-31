import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const SwiperShowProduct = ({ children }) => {
  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 100,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 100,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
          1920: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
        }}
        className=" object-cover rounded-md w-full flex items-center justify-center"
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperShowProduct;
