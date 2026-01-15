import React, { useState, useEffect } from "react";
import useEconStore from "../../../app/store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { formatNumber } from "../../../shared/utils/number";

const SearchCart = () => {
  const getProduct = useEconStore((state) => state.getProduct);
  const product = useEconStore((state) => state.products);
  const actionSearchFilters = useEconStore(
    (state) => state.actionSearchFilters
  );

  const getCategory = useEconStore((state) => state.getCategory);
  const categories = useEconStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([100, 1000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  // Search Text
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) actionSearchFilters({ query: text });
      else getProduct();
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  // Search by Category
  const handleCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...categorySelected];
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };

  // Search by Price
  useEffect(() => {
    actionSearchFilters({ price: price });
  }, [ok]);

  const handlePrice = (e) => {
    setPrice(e);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Search</h1>

      {/* Search by Text */}
      <input
        type="text"
        className="w-full border border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="ค้นหาสินค้า..."
        onChange={(e) => setText(e.target.value)}
      />
      <hr className="mb-6" />

      {/* Search by Category */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Category</h2>
        <div className="space-y-2">
          {categories.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              <input
                type="checkbox"
                value={item.id}
                onChange={handleCheck}
                className="accent-blue-500"
              />
              <label className="text-sm">{item.name}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Search by Price */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Amount</h2>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Min : {formatNumber(price[0])}</span>
            <span>Max : {formatNumber(price[1])}</span>
          </div>
          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={1000}
            defaultValue={[0, 1000]}
            className="my-4"
          />
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={() => actionSearchFilters({ price })}
        className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
      >
        Search for products
      </button>
    </div>
  );
};

export default SearchCart;
