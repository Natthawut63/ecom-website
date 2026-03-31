import React from "react";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import useEcomStore from "../../../app/store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../user/api/user";
import { toast } from "react-toastify";
import { formatNumber } from "../../../shared/utils/number";

const ListCard = () => {
  const token = useEcomStore((state) => state.token);
  const cart = useEcomStore((state) => state.carts);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity);
  const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct);
  const user = useEcomStore((state) => state.user);
  const navigate = useNavigate();

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        console.log(res);
        toast.success("Save Cart Success", { position: "top-center" });
        navigate("/checkout");
      })
      .catch((e) => {
        console.log(e);
        toast.warning(e.response?.data?.message || "Error saving cart", { position: "top-center" });
      });
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-8rem)] py-8 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag size={28} className="text-gray-900" strokeWidth={2} />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Your Shopping Cart
          </h1>
          <span className="bg-gray-200 text-gray-700 text-sm py-1 px-3 rounded-full font-medium ml-2">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Cart Items (approx 70%) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
                  <ShoppingBag size={64} className="text-gray-200" strokeWidth={1.5} />
                  <p className="text-lg font-medium text-gray-500">Your cart is currently empty.</p>
                  <Link to="/shop">
                    <button className="mt-4 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {/* Table Header (Desktop only) */}
                  <div className="hidden md:grid grid-cols-12 gap-4 p-5 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  {/* Cart Items */}
                  {cart.map((item, index) => (
                    <div key={index} className="p-5 flex flex-col md:grid md:grid-cols-12 gap-4 md:items-center group">
                      
                      {/* Product Info */}
                      <div className="col-span-6 flex gap-4">
                        <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                          {item.images && item.images.length > 0 ? (
                            <img
                              src={item.images[0].url}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-gray-400 uppercase tracking-wider font-medium">
                              No image
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col justify-center min-w-0">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            {item.category?.name || "Standard Item"}
                          </p>
                          <h3 className="text-sm md:text-base font-semibold text-gray-900 leading-snug line-clamp-2 mb-2">
                            {item.title}
                          </h3>
                          {/* Mobile Price & Remove */}
                          <div className="md:hidden flex items-center gap-4 mt-auto">
                            <span className="text-sm font-bold text-gray-900">
                              ฿{formatNumber(item.price)}
                            </span>
                            <button
                              onClick={() => actionRemoveProduct(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-xs font-medium"
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price (Desktop) */}
                      <div className="hidden md:block col-span-2 text-center">
                        <span className="text-sm font-medium text-gray-700">
                          ฿{formatNumber(item.price)}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="col-span-2 flex items-center justify-between md:justify-center mt-3 md:mt-0">
                        <div className="md:hidden text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </div>
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 w-fit">
                          <button
                            onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                            disabled={item.count <= 1}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-all disabled:opacity-50 disabled:hover:bg-transparent shadow-sm hover:shadow"
                          >
                            <Minus size={14} strokeWidth={2.5} />
                          </button>
                          <span className="text-sm font-semibold w-8 text-center text-gray-900">
                            {item.count}
                          </span>
                          <button
                            onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-all shadow-sm hover:shadow"
                          >
                            <Plus size={14} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>

                      {/* Total & Remove (Desktop) */}
                      <div className="hidden md:flex col-span-2 items-center justify-end gap-4">
                        <span className="text-base font-bold text-gray-900">
                          ฿{formatNumber(item.price * item.count)}
                        </span>
                        <button
                          onClick={() => actionRemoveProduct(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )} 
            </div>
          </div>

          {/* Right Column: Summary Panel (approx 30%) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">฿{formatNumber(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping estimates</span>
                  <span className="font-medium text-gray-900">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium text-gray-900">฿0</span>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-end">
                    <span className="text-base font-bold text-gray-900">Estimated Total</span>
                    <span className="text-2xl font-bold text-gray-900 tracking-tight">
                      ฿{formatNumber(getTotalPrice())}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">Taxes and shipping included where applicable.</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {user ? (
                  <button
                    disabled={cart.length === 0}
                    onClick={handleSaveCart}
                    className="w-full bg-gray-900 text-white py-4 rounded-xl text-sm font-semibold tracking-wide hover:bg-gray-800 transition-all focus:ring-4 focus:ring-gray-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-sm"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <Link to="/login" className="block">
                    <button className="w-full bg-gray-900 text-white py-4 rounded-xl text-sm font-semibold tracking-wide hover:bg-gray-800 transition-all focus:ring-4 focus:ring-gray-200 shadow-sm">
                      Login to Checkout
                    </button>
                  </Link>
                )}

                <Link to="/shop" className="block">
                  <button className="w-full bg-white text-gray-700 py-3.5 rounded-xl text-sm font-semibold tracking-wide border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-all">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ListCard;
