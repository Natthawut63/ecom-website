import React, { useEffect } from "react";
import ProductCart from "../components/card/ProductCart";
import useEconStore from "../store/ecom-store";
import SearchCart from "../components/card/SearchCart";
import CartCard from "../components/card/CartCard";

const Shop = () => {
  const getProduct = useEconStore((state) => state.getProduct);
  const product = useEconStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex">
      {/* SearchBar */}
      <div className="w-1/4 p-4 bg-gray-100 h-screen">
        <SearchCart />
      </div>

      {/* Products */}
      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <p className="text-2xl font-bold mb-4">Product</p>
        <div className="flex flex-wrap gap-4">
          {product.map((item, index) => (
            <ProductCart key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-1/4 p-4 bg-gray-100 h-screen overflow-y-auto">
        <CartCard />
      </div>
    </div>
  );
};

export default Shop;
