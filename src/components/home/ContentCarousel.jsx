import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";

const ContentCarousel = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    hdlGetImeage();
  }, []);

  const hdlGetImeage = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_ImageHome}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Swiper
      
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        
        className="mySwiper rounded-lg overflow-hidden mb-6 shadow-lg"
      >
        {data?.map((item, i) => (
          <SwiperSlide key={i}>
            <img
              src={item.download_url}
              className="w-full h-80 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

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
        className="mySwiper rounded-lg overflow-hidden"
      >
        {data?.map((item, i) => (
          <SwiperSlide key={i}>
            <img
              className="w-full h-32 object-cover rounded-md shadow-md"
              src={item.download_url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;
