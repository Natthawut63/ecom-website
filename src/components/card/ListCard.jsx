import React from "react";
import { AlignJustify } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { formatNumber } from "../../utils/number";

const ListCard = () => {
  const token = useEcomStore((state) => state.token);
  const cart = useEcomStore((state) => state.carts); //cart backend request
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
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
        toast.warning(e.reaponse.data.message, { position: "top-center" });
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      {/* Header */}
      <div className="flex gap-4 mb-6 items-center">
        <AlignJustify size={36} className="text-blue-500" />
        <p className="text-3xl font-semibold text-gray-800">
          Product list {cart.length} items
        </p>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left */}
        <div className="col-span-2">
          {/* Card */}
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white px-4 py-2 rounded-lg shadow-sm mb-2"
            >
              {/* Row 1 */}
              <div className="flex justify-between mb-4">
                {/* Left */}
                <div className="flex gap-4 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex text-center items-center text-gray-500">
                      No Image
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      {formatNumber(item.price)} x {item.count}
                    </p>
                  </div>
                </div>
                {/* Right */}
                <div>
                  <div className="font-semibold  text-blue-500">
                    {formatNumber(item.price * item.count)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Right */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <p className="text-2xl font-semibold text-gray-800">Total</p>
          <div className="flex justify-between text-lg text-gray-700">
            <span>net total</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatNumber(getTotalPrice())}
            </span>
          </div>

          <div className="space-y-4">
            {user ? (
              <Link>
                <button
                  disabled={cart.length === 0}
                  onClick={handleSaveCart}
                  className={`mb-2 w-full py-3 rounded-md text-white transition-colors duration-300 ${
                    cart.length === 0
                      ? "bg-gray-500 hover:bg-gray-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  buy
                </button>
              </Link>
            ) : (
              <Link>
                <button className="w-full py-3 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors">
                  Login
                </button>
              </Link>
            )}

            <Link to={"/shop"}>
              <button className="w-full py-3 rounded-md text-white bg-gray-500 hover:bg-gray-600 transition-colors">
                Edit 
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
