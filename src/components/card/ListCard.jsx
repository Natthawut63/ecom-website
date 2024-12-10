import React from "react";
import { AlignJustify } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link , useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import {formatNumber} from "../../utils/number";

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
    <div className="bg-wh rounded-sm p-4">
      {/* Header */}
      <div className="flex gap-4 mb-4">
        <AlignJustify size={36} />
        <p className="text-2xl font-bold">รายการสินค้า {cart.length} รายการ</p>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left */}
        <div className="col-span-2">
          {/* Card */}
          {cart.map((item, index) => (
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
                    <p className="text-sm">
                      {formatNumber(item.price)} x {item.count}
                    </p>
                  </div>
                </div>
                {/* Right */}
                <div>
                  <div className="font-bold text-blue-500">{formatNumber(item.price * item.count)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Right */}
        <div className="bg-white p-4 rounded-md shadow-md space-y-4">
          <p className="text-2xl font-bolds">ยอดรวม</p>
          <div className="flex justify-between">
            <span>รวมสุทธิ</span>
            <span className="text-2xl">{formatNumber(getTotalPrice())}</span>
          </div>
          <div className="flex gap-2 flex-col">
            {user ? (
              <Link>
                <button
                disabled={cart.length === 0}
                  onClick={handleSaveCart}
                  className= {cart.length === 0 ? "bg-gray-500 w-full py-2 rounded-md text-white hover:bg-gray-700" : "bg-blue-500 w-full py-2 rounded-md text-white hover:bg-red-700"}>
                  สั่งซื้อ
                </button>
              </Link>
            ) : (
              <Link>
                <button className="bg-blue-500 w-full py-2 rounded-md text-white hover:bg-red-700">
                  Login
                </button>
              </Link>
            )}

            <Link to={"/shop"}>
              <button className="bg-gray-500 w-full py-2 rounded-md text-white hover:bg-gray-700">
                เเก้ไขรายการ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
