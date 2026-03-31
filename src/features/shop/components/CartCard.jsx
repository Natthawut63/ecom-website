import React from "react";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import useEconStore from "../../../app/store/ecom-store";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../shared/utils/number";

const CartCard = () => {
  const carts = useEconStore((state) => state.carts);
  const actionUpdateQuantity = useEconStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEconStore(
    (state) => state.actionRemoveProduct
  );
  const getTotalPrice = useEconStore((state) => state.getTotalPrice);
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full max-h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <ShoppingBag size={20} className="text-gray-700" />
          Your Cart
        </h2>
        <span className="bg-gray-100 text-gray-700 text-xs py-1 px-2.5 rounded-full font-medium">
          {carts.length} {carts.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
        {carts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3 py-10">
            <ShoppingBag size={48} className="text-gray-200" strokeWidth={1.5} />
            <p className="text-sm font-medium">Your cart is currently empty</p>
          </div>
        ) : (
          carts.map((item, index) => (
            <div key={index} className="group flex gap-4">
              {/* Product Image */}
              <div className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0].url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 uppercase tracking-wider font-medium">
                    No img
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-gray-900 truncate leading-tight">
                    {item.title}
                  </h3>
                  <button
                    onClick={() => actionRemoveProduct(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 -m-1 opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 truncate mb-auto">
                  {item.category?.name || "Standard item"}
                </p>

                {/* Price and Quantity */}
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm font-bold text-gray-900">
                    ฿{formatNumber(item.price)}
                  </div>
                  
                  {/* Quantity Input */}
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                    <button
                      onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                      disabled={item.count <= 1}
                      className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-all disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                      <Minus size={12} strokeWidth={2.5} />
                    </button>
                    <span className="text-xs font-semibold w-6 text-center text-gray-900">
                      {item.count}
                    </span>
                    <button
                      onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-all"
                    >
                      <Plus size={12} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-5 bg-gray-50/50 border-t border-gray-100 rounded-b-2xl">
        <div className="space-y-3 mb-5">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">฿{formatNumber(getTotalPrice())}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Shipping</span>
            <span className="text-gray-400">Calculated at checkout</span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900 pt-3 border-t border-gray-200/60">
            <span>Total</span>
            <span>฿{formatNumber(getTotalPrice())}</span>
          </div>
        </div>

        <Link to="/cart" className="block">
          <button 
            disabled={carts.length === 0}
            className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors focus:ring-4 focus:ring-gray-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed shadow-sm"
          >
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartCard;
