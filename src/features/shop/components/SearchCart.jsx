import React, { useState, useEffect } from "react";
import useEconStore from "../../../app/store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { formatNumber } from "../../../shared/utils/number";
import { SlidersHorizontal } from "lucide-react";

const SearchCart = () => {
  const getProduct = useEconStore((state) => state.getProduct);
  // const product = useEconStore((state) => state.products);
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
  }, [getCategory]);

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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-gray-700" />
          Filters
        </h2>
      </div>

      <div className="p-5">
        {/* Search by Text */}
        <div className="mb-6">
          <input
            type="text"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-colors placeholder-gray-400"
            placeholder="Search products..."
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Search by Category */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">
            Category
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
            {Array.isArray(categories) && categories.length > 0 ? categories.map((item, index) => (
              <div className="flex items-center gap-3 group" key={index}>
                <input
                  type="checkbox"
                  id={`category-${item.id}`}
                  value={item.id}
                  onChange={handleCheck}
                  className="w-4 h-4 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900 focus:ring-2 cursor-pointer transition-all"
                />
                <label 
                  htmlFor={`category-${item.id}`}
                  className="text-sm text-gray-600 group-hover:text-gray-900 cursor-pointer transition-colors"
                >
                  {item.name}
                </label>
              </div>
            )) : <p className="text-sm text-gray-400 italic">No categories</p>}
          </div>
        </div>

        {/* Search by Price */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">
            Price Range
          </h3>
          <div className="px-2">
            <div className="flex justify-between text-xs text-gray-500 mb-4 font-medium">
              <span>฿{formatNumber(price[0])}</span>
              <span>฿{formatNumber(price[1])}</span>
            </div>
            <Slider
              onChange={handlePrice}
              range
              min={0}
              max={1000}
              defaultValue={[0, 1000]}
              trackStyle={[{ backgroundColor: '#111827', height: '4px' }]}
              railStyle={{ backgroundColor: '#f3f4f6', height: '4px' }}
              handleStyle={[
                { 
                  borderColor: '#111827', 
                  backgroundColor: '#fff', 
                  opacity: 1, 
                  height: '16px', 
                  width: '16px',
                  marginTop: '-6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                },
                { 
                  borderColor: '#111827', 
                  backgroundColor: '#fff', 
                  opacity: 1, 
                  height: '16px', 
                  width: '16px',
                  marginTop: '-6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }
              ]}
            />
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={() => actionSearchFilters({ price })}
          className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors focus:ring-4 focus:ring-gray-200 shadow-sm"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchCart;
