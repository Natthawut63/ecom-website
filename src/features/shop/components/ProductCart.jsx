import React from "react";
import { ShoppingCart } from "lucide-react";
import useEconStore from "../../../app/store/ecom-store";
import { formatNumber } from "../../../shared/utils/number";
import { motion } from "framer-motion";

const ProductCart = ({ item }) => {
  const actionAddtoCart = useEconStore((state) => state.actionAddtoCart);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white border border-gray-100 rounded-xl shadow-soft p-3 w-full hover:shadow-soft-lg hover:border-gray-200 transition-all duration-300 group">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg bg-gray-50">
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0].url}
              alt={item.title}
              className="w-full h-32 md:h-36 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-32 md:h-36 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          {/* Quick Add Button (shows on hover) */}
          <button
            onClick={() => actionAddtoCart(item)}
            className="absolute bottom-2 right-2 bg-primary-600 text-white rounded-lg p-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary-700 shadow-md"
          >
            <ShoppingCart size={16} />
          </button>
        </div>

        {/* Product Info */}
        <div className="pt-3 pb-1">
          <h3 className="font-medium text-gray-800 truncate text-sm md:text-base">
            {item.title}
          </h3>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {item.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div>
            <span className="text-lg font-bold text-primary-600">
              ฿{formatNumber(item.price)}
            </span>
          </div>
          <button
            onClick={() => actionAddtoCart(item)}
            className="md:hidden bg-primary-50 text-primary-600 rounded-lg p-2 hover:bg-primary-100 transition-colors"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCart;
