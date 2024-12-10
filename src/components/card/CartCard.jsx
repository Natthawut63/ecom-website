import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import useEconStore from "../../store/ecom-store";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/number";

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
    <div>
      <h1 className="text-2xl font-bold">ตะกร้าสินค้า</h1>
      {/* Border */}
      <div className="border p-2 ">
        {/* Card */}
        {carts.map((item, index) => (
          <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
            {/* Row 1 */}
            <div className="flex justify-between mb-2">
              {/* Left */}
              <div className="flex gap-2 items-center">
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
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
              {/* Right */}
              <div
                onClick={() => actionRemoveProduct(item.id)}
                className="text-red-600 p-2"
              >
                <Trash2 />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between ">
              {/* Left */}
              <div className="border rounded-sm px-2 py-1 flex items-center">
                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                  className="px-2 py-2 bg-gray-200 rounded-sm hover:bg-gray-500"
                >
                  <Minus size={15} />
                </button>
                <span className="px-4">{item.count}</span>
                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                  className="px-2 py-2 bg-gray-200 rounded-sm hover:bg-gray-500"
                >
                  <Plus size={15} />
                </button>
              </div>
              {/* Right */}
              <div className="font-bold text-blue-500">{formatNumber(item.price * item.count)}</div>
            </div>
          </div>
        ))}
        {/* Total */}
        <div className="flex justify-between px-2">
          <span>sum</span>
          <span>{formatNumber(getTotalPrice())}</span>
        </div>

        {/* Button */}
        <Link to="/cart">
          <button className="mt-4 bg-blue-500 text-white w-full py-2 rounded-md shadow-md">
            ขำระเงิน
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartCard;
