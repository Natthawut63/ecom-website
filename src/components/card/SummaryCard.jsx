import React, { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEconStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../utils/number";

const SummaryCard = () => {
  const token = useEconStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetUserCart(token);
  }, [token]);

  const handleGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        setProducts(res.data.user.products, { autoClose: 1000 });
        setCartTotal(res.data.user.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveAddress = () => {
    if (!address) {
      return toast.error("กรุณากรอกที่อยู่ในการจัดส่ง", { autoClose: 1000 });
    }

    saveAddress(token, address)
      .then((res) => {
        toast.success(res.data.message, { autoClose: 1000 });
        setAddressSaved(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณากรอกที่อยู่ในการจัดส่ง", { autoClose: 1000 });
    } else {
      navigate("/user/payment");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6 space-y-6">
      <div className="flex flex-wrap gap-6">
        {/* Left - Address */}
        <div className="w-full md:w-1/2 bg-white rounded-md shadow-lg p-6 space-y-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Delivery address
          </h1>
          <textarea
            required
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Please enter "
            className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSaveAddress}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>

        {/* Right - Order Summary */}
        <div className="w-full md:w-1/2 bg-white rounded-md shadow-lg p-6 space-y-4">
          <h1 className="text-xl font-semibold text-gray-800 ">Order</h1>

          {/* Product List */}
          <div className="space-y-4">
            {products?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {item.product.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.count} x {formatNumber(item.product.price)}
                  </p>
                </div>
                <div>
                  <p className="text-red-500 font-semibold">
                    {formatNumber(item.count * item.product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Discount & Shipping */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-600">Discount</p>
              <p className="text-gray-600">0.00</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Cost</p>
              <p className="text-gray-600">0.00</p>
            </div>
          </div>

          <hr />

          {/* Total */}
          <div className="flex justify-between items-center font-semibold text-lg">
            <p>Total :</p>
            <p className="text-red-500">{formatNumber(cartTotal)}</p>
          </div>

          <hr />

          {/* Payment Button */}
          <button
            onClick={handleGoToPayment}
            className={`w-full py-3 rounded-md text-white ${
              addressSaved
                ? "bg-green-500 hover:bg-green-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!addressSaved}
          >
            Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
