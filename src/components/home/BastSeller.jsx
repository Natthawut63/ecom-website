import React, { useState, useEffect } from "react";
import { listProductBy } from "../../api/product";
import ProductCart from "../card/ProductCart";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const BastSeller = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("sold", "desc", 12) // derc > -> < asc
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <SwiperShowProduct>
      {data?.map((item, i) => (
        <SwiperSlide key={i}>
          <ProductCart item={item} />
        </SwiperSlide>
      ))}
    </SwiperShowProduct>
  );
};

export default BastSeller;
