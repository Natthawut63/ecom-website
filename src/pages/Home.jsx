import React from "react";
import ContentCarousel from "../components/home/ContentCarousel";
import BestSeller from "../components/home/BastSeller";
import NewProduct from "../components/home/NewProduct";
const Home = () => {
  return (
    <div>
      <ContentCarousel />
      <p className="text-2xl font-bold text-center my-4">สินค้าขายดี</p>
      <BestSeller />
      <p className="text-2xl font-bold text-center my-4">สินค้ามาใหม่</p>
      <NewProduct />
      
    </div>
  );
};

export default Home;
