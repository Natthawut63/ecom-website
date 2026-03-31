import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Headphones, ShoppingCart, Heart } from "lucide-react";
import { formatNumber } from "../../../shared/utils/number";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Thumbs } from 'swiper/modules';
import useEconStore from "../../../app/store/ecom-store";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "../../../shared/mock/data";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// --- MOCK DATA ---
const HERO_SLIDES = [
  {
    id: 1,
    title: "Summer Collection 2026",
    subtitle: "Discover the latest trends in fashion",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: 2,
    title: "Premium Electronics",
    subtitle: "Upgrade your lifestyle with smart tech",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: 3,
    title: "Minimalist Furniture",
    subtitle: "Create your perfect living space",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=2070",
  }
];

// --- COMPONENTS ---

// 1. Featured Product Card
const FeaturedProductCard = ({ item }) => {
  const actionAddtoCart = useEconStore((state) => state.actionAddtoCart);

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_12px_-3px_rgba(6,81,237,0.05)] border border-gray-100 hover:shadow-[0_8px_24px_-4px_rgba(6,81,237,0.1)] transition-all duration-300 group flex flex-col h-full overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/5] w-full bg-gray-50 overflow-hidden">
        <img
          src={item.images[0].url}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button className="p-2.5 bg-white text-gray-600 rounded-full shadow-sm hover:text-red-500 transition-colors">
            <Heart size={18} strokeWidth={2} />
          </button>
        </div>
        {/* Add to Cart overlay button */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent">
          <button 
            onClick={() => actionAddtoCart(item)}
            className="w-full py-3 bg-white text-gray-900 rounded-xl font-semibold text-sm shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
          {item.category.name}
        </span>
        <h3 className="font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">
          {item.title}
        </h3>
        <div className="mt-auto pt-4">
          <span className="text-lg font-bold text-gray-900">
            ฿{formatNumber(item.price)}
          </span>
        </div>
      </div>
    </div>
  );
};


// --- MAIN PAGE ---
const Home = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* 1. HERO BANNER WITH THUMBNAILS */}
      <section className="relative bg-gray-50">
        <div className="container mx-auto px-4 py-6 max-w-[1400px]">
          <div className="rounded-3xl overflow-hidden shadow-sm relative group">
            
            {/* Main Slider */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay, Thumbs]}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="h-[400px] md:h-[500px] lg:h-[600px] w-full relative"
            >
              {HERO_SLIDES.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gray-900/40 z-10" />
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 lg:px-24">
                      <span className="text-white/80 font-medium tracking-widest uppercase mb-4 text-sm md:text-base slide-up-anim delay-100">
                        New Arrival
                      </span>
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-3xl slide-up-anim delay-200">
                        {slide.title}
                      </h2>
                      <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl slide-up-anim delay-300">
                        {slide.subtitle}
                      </p>
                      <div className="slide-up-anim delay-400">
                        <Link to="/shop">
                          <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                            Shop Now
                            <ArrowRight size={18} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              
              {/* Custom Nav Buttons */}
              <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100">
                <ArrowRight className="rotate-180" size={24} />
              </div>
              <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100">
                <ArrowRight size={24} />
              </div>
            </Swiper>
            
          </div>

          {/* Thumbnails */}
          <div className="mt-4 hidden md:block">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={16}
              slidesPerView={3}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs]}
              className="thumb-slider h-24"
            >
              {HERO_SLIDES.map((slide) => (
                <SwiperSlide key={`thumb-${slide.id}`} className="cursor-pointer rounded-xl overflow-hidden opacity-50 [&.swiper-slide-thumb-active]:opacity-100 transition-opacity border-2 border-transparent [&.swiper-slide-thumb-active]:border-gray-900">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="flex items-center gap-5 justify-center md:justify-start pt-6 md:pt-0 first:pt-0">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base">Free Shipping</h4>
                <p className="text-sm text-gray-500 mt-1">On orders over ฿1,000</p>
              </div>
            </div>
            <div className="flex items-center gap-5 justify-center md:justify-center pt-6 md:pt-0">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base">Secure Payment</h4>
                <p className="text-sm text-gray-500 mt-1">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-5 justify-center md:justify-end pt-6 md:pt-0">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Headphones className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base">24/7 Support</h4>
                <p className="text-sm text-gray-500 mt-1">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
              <p className="text-gray-500">Find exactly what you're looking for</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {MOCK_CATEGORIES.map((cat) => (
              <Link to="/shop" key={cat.id} className="group relative rounded-2xl overflow-hidden aspect-square">
                <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/40 transition-colors z-10" />
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
                  <span className="text-white font-bold text-center drop-shadow-md text-lg">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (Grid 4 Cols) */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Trending Now</h2>
              <p className="text-gray-500">Top picks for you this week</p>
            </div>
            <Link to="/shop" className="group flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">
              View All Products
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {MOCK_PRODUCTS.map((product) => (
              <FeaturedProductCard key={product.id} item={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROMOTION BANNER */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative rounded-3xl overflow-hidden bg-gray-900 min-h-[400px] flex items-center">
            <div className="absolute inset-0 z-0 opacity-40">
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070" 
                alt="Promo background"
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="relative z-10 px-8 md:px-16 lg:px-24 py-16 w-full max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-white text-gray-900 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                Special Offer
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">20% Off</span> Your First Purchase
              </h2>
              <p className="text-gray-300 text-lg mb-10 max-w-xl">
                Join our community today and receive an exclusive discount on your entire order. Free shipping included!
              </p>
              <Link to="/register">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">
                  Sign Up & Save
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
