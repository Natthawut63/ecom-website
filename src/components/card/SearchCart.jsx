import React, { useState, useEffect } from "react";
import useEconStore from "../../store/ecom-store";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { formatNumber } from "../../utils/number";

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
    setPrice(e) 
    setTimeout(() => {
      setOk(!ok)
    },300)
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4"> Search</h1>
      {/* Search by Text */}
      <input
        type="text"
        className="border rounded-md w-full mb-4 px-2 "
        placeholder="Search..."
        onChange={(e) => setText(e.target.value)}
      />
      <hr />

      {/* Search by Category */}
      <div>
        <h1 className=""> หมวดหมู่สินค้า</h1>
        <div>
          {categories.map((item, index) => (
            <div className="flex gap-2" key={index}>
              <input type="checkbox" value={item.id} onChange={handleCheck} />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Search by Price */}
      <div>
        <h1 className=""> ราคา</h1>
        <div>
          <div className="flex justify-between">
            <span>Min : {formatNumber(price[0])}</span>
            <span>Max : {formatNumber(price[1])}</span>
          </div>
          <Slider onChange={handlePrice} range min={0} max={100000} defaultValue={[10000,80000]}/>
        </div>
      </div>
    </div>
  );
};

export default SearchCart;
