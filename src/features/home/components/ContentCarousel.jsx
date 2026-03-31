import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Main Hero Carousel */}
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="rounded-2xl overflow-hidden shadow-soft-lg group"
      >
        {data?.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="relative">
              <img
                src={item.download_url}
                alt={`Banner ${i + 1}`}
                className="w-full h-[300px] md:h-[420px] object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Carousel */}
      <div className="mt-4 relative">
        <Swiper
          slidesPerView={3}
          spaceBetween={12}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
          }}
          navigation={{
            prevEl: '.thumb-prev',
            nextEl: '.thumb-next',
          }}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="rounded-xl overflow-hidden"
        >
          {data?.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="relative group cursor-pointer">
                <img
                  className="w-full h-20 md:h-24 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  src={item.download_url}
                  alt={`Thumbnail ${i + 1}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="thumb-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button className="thumb-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ContentCarousel;
