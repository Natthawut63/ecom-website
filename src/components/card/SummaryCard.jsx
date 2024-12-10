import React, { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEconStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {formatNumber} from "../../utils/number";

const SummaryCard = () => {
  const token = useEconStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetUserCart(token);
  }, []);

  const handleGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        // console.log(res);
        setProducts(res.data.user.products);
        setCartTotal(res.data.user.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveAddress = () => {
    if (!address) {
      return toast.error("กรุณากรอกที่อยู่ในการจัดส่ง");
    }

    saveAddress(token, address)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setAddressSaved(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณากรอกที่อยู่ในการจัดส่ง");
    } else {
      navigate("/user/payment");
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap ">
        {/* Left */}
        <div className="w-2/4">
          <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4 mr-5">
            <h1 className="text-lg font-bold">ที่อยู่ในการจัดส่ง</h1>
            <textarea
              required
              onChange={(e) => setAddress(e.target.value)}
              placeholder="กรุณากรอกที่อยู่ในการจัดส่ง"
              className="w-full px-2 rounded-md"
            />
            <button
              onClick={handleSaveAddress}
              className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-700 hover:translate-y-1 hover:duration-200"
            >
              Save Address
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="w-2/4">
          <div className="bg-gray-100 p-4 mr-5 rounded-md border shadow-md space-y-3 ">
            <h1 className="text-lg font-bold">คำสั่งซื้อของคุณ</h1>
            {/* {Item List} */}
            {products?.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{item.product.title}</p>
                    <p className="text-sm">
                      {item.count} x {formatNumber(item.product.price)}
                    </p>
                  </div>

                  <dir>
                    <p className="text-red-500 font-bold">
                      {formatNumber(item.count * item.product.price)}
                    </p>
                  </dir>
                </div>
              </div>
            ))}

            <div>
              <div className="flex justify-between">
                <p>ส่วนลด</p>
                <p>0.00</p>
              </div>
              <div className="flex justify-between">
                <p>ค่าจัดส่ง</p>
                <p>0.00</p>
              </div>
            </div>
            <hr />
            <div>
              <div className="flex justify-between">
                <p className="font-bold">ยอดรวมสุทธิ : </p>
                <p className="text-red-500 font-bold text-lg">{formatNumber(cartTotal)}</p>
              </div>
            </div>
            <hr />
            <div>
              <button
                onClick={handleGoToPayment}
                // disabled={!addressSaved}
                className="bg-green-400 w-full p-2 rounded-md shadow-md text-white hover:bg-green-700"
              >
                ดำเนินการชำระเงิน
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SummaryCard;
