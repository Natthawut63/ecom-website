import React, { useEffect } from "react";
import ProductCart from "../components/ProductCart";
import useEconStore from "../../../app/store/ecom-store";
import SearchCart from "../components/SearchCart";
import CartCard from "../components/CartCard";

const Shop = () => {
  const getProduct = useEconStore((state) => state.getProduct);
  const product = useEconStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 py-8 max-w-screen-2xl font-sans">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left Column: Filters (Sidebar) */}
          <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-24">
              <SearchCart />
            </div>
          </aside>

          {/* Middle Column: Products Grid */}
          <main className="w-full flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">All Products</h1>
              <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {product.length} items
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {product.map((item, index) => (
                <ProductCart key={index} item={item} />
              ))}
            </div>
          </main>

          {/* Right Column: Shopping Cart */}
          <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-24">
              <CartCard />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default Shop;
