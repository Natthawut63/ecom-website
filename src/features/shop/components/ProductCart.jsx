import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import useEconStore from "../../../app/store/ecom-store";
import { formatNumber } from "../../../shared/utils/number";
import { motion } from "framer-motion";

const ProductCart = ({ item }) => {
  const actionAddtoCart = useEconStore((state) => state.actionAddtoCart);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_-3px_rgba(6,81,237,0.08)] border border-gray-100/50 hover:shadow-[0_8px_24px_-4px_rgba(6,81,237,0.12)] hover:border-gray-200 transition-all duration-300 group flex flex-col h-full overflow-hidden">
        
        {/* Image Section */}
        <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden">
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0].url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <span className="text-xs font-medium tracking-wider uppercase">No Image</span>
            </div>
          )}

          {/* Quick Actions overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button className="p-2 bg-white/90 backdrop-blur-sm text-gray-600 rounded-full shadow-sm hover:bg-white hover:text-red-500 transition-colors">
              <Heart size={18} strokeWidth={2} />
            </button>
          </div>
          
          {/* Badge (Optional - can be conditional based on item data) */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-sm">
              New
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Category/Brand */}
          <div className="mb-1.5">
            <span className="text-[11px] font-semibold text-primary-600 uppercase tracking-wider">
              {item.category?.name || "Uncategorized"}
            </span>
          </div>

          {/* Title & Desc */}
          <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-tight mb-1 line-clamp-1">
            {item.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
            {item.description}
          </p>

          {/* Footer (Price & Action) */}
          <div className="flex items-end justify-between mt-auto pt-3 border-t border-gray-100/80">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Price</span>
              <span className="text-lg font-bold text-gray-900 tracking-tight leading-none">
                ฿{formatNumber(item.price)}
              </span>
            </div>
            
            <button
              onClick={() => actionAddtoCart(item)}
              className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-xl shadow-sm hover:bg-primary-700 hover:shadow active:scale-95 transition-all duration-200"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
};

export default ProductCart;
