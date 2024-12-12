import React from "react";
import ContentCarousel from "../components/home/ContentCarousel";
import BestSeller from "../components/home/BastSeller";
import NewProduct from "../components/home/NewProduct";
const Home = () => {
  return (
    <div className="p-4">
      <ContentCarousel />
      <h2 className="text-3xl font-bold mt-10 text-center">Popular</h2>
      <div className="max-w-7xl mx-auto px-4 py-2 pb-10">
        <BestSeller />
      </div>
      <h2 className="text-3xl font-bold  text-center">New</h2>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {" "}
        <NewProduct />
      </div>
    </div>
  );
};

export default Home;
