import React from "react";
import { ShoppingCart } from "lucide-react";
import useEconStore from "../../../app/store/ecom-store";
import { formatNumber } from "../../../shared/utils/number";
import { motion } from "framer-motion";

const ProductCart = ({ item }) => {
  const actionAddtoCart = useEconStore((state) => state.actionAddtoCart);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    // className="max-w-xs mx-auto"
    >
      <div className="border rounded-md shadow-md p-2 w-48 hover:shadow-xl transition-shadow duration-300 ">
        <div className="relative">
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0].url}
              className="rounded-md h-24 object-cover hover:scale-105 hover:duration-200 transition-transform"
            />
          ) : (
            <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        <div className="py-3">
          <p className="text-lg font-semibold text-gray-800 truncate">{item.title}</p>
          <p className="text-sm text-gray-600 truncate">{item.description}</p>
        </div>

        <div className="flex items-center justify-between px-2">
          <span className="text-xl font-bold text-blue-600">{formatNumber(item.price)}</span>
          <button
            onClick={() => actionAddtoCart(item)}
            className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCart;
