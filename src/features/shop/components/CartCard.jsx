import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
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
    <div className="container mx-auto p-1">
      <h1 className="text-2xl font-bold mb-4">Shopping cart</h1>
      {/*  Card Container */}
      <div className="border p-4 rounded-lg shadow-lg bg-white">
        {/* Card */}
        {carts.map((item, index) => (
          <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
            {/* Row 1 */}
            <div className="flex justify-between mb-4">
              {/* Left */}
              <div className="flex gap-4 items-center">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0].url}
                    className="w-16 h-16 rounded-md"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">
                    No Image
                  </div>
                )}

                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              {/* Right */}
              <div
                onClick={() => actionRemoveProduct(item.id)}
                className="text-red-600 p-2 cursor-pointer"
              >
                <Trash2 />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between items-center">
              {/* Left */}
              <div className="border rounded-sm px-2 py-1 flex items-center">
                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                  className="px-3 py-1 bg-gray-200 rounded-sm hover:bg-gray-300"
                >
                  <Minus size={18} />
                </button>
                <span className="px-4">{item.count}</span>
                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-sm hover:bg-gray-300"
                >
                  <Plus size={17} />
                </button>
              </div>
              {/* Right */}
              <div className="text-xl font-bold text-blue-500">
                {formatNumber(item.price * item.count)}
              </div>
            </div>
          </div>
        ))}
        {/* Total */}
        <div className="flex justify-between border-t pt-4 mt-4">
          <span className="text-lg font-semibold">Total amount</span>
          <span className="text-xl font-bold text-blue-500">
            {formatNumber(getTotalPrice())}
          </span>
        </div>

        {/* Button */}
        <Link to="/cart">
          <button className="mt-6 bg-blue-600 text-white w-full py-3 rounded-md hover:bg-blue-500 transition-all duration-300 shadow-md">
            Payment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartCard;
