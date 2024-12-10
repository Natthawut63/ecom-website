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
      .get("https://picsum.photos/v2/list?page=1&limit=15")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper h-80 object-cover 
        rounded-md mb-4"
      >
        {data?.map((item, i) => (
          <SwiperSlide key={i}>
            <img src={item.download_url} />
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
        loop={true}
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper object-cover rounded-md"
      >
        {data?.map((item, i) => (
          <SwiperSlide key={i}>
            <img className="rounded-md" src={item.download_url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;
