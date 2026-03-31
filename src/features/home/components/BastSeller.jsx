import React, { useState, useEffect } from "react";
import { listProductBy } from "../../shop/api/Product";
import ProductCart from "../../shop/components/ProductCart";
import SwiperShowProduct from "../../../shared/utils/SwiperShowProduct";
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
