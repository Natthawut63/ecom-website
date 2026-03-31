import React, { useState, useEffect } from "react";
import { getOrders } from "../api/user";
import useEconStore from "../../../app/store/ecom-store";
import { dateFormat } from "../../../shared/utils/dateformat";
import { formatNumber } from "../../../shared/utils/number";
import { getStatusColor } from "../../../shared/utils/color";

const HistoryCard = () => {
  const [orders, setOrders] = useState([]);
  const token = useEconStore((state) => state.token);

  useEffect(() => {
    handlegetOrders(token);
  }, [token]);

  const handlegetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        setOrders(res.data.order);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">ประวัติการสั่งซื้อ</h1>

      {/* Order History Cards */}
      {orders?.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Order Header */}
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="text-lg font-semibold text-gray-800">{dateFormat(item.updatedAt)}</p>
            </div>

            <div className="flex items-center">
              <span className={`${getStatusColor(item.orderStatus)} text-white py-1 px-4 rounded-full`}>
                {item.orderStatus}
              </span>
            </div>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full table-auto border-collapse bg-gray-100 rounded-md shadow-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">สินค้า</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">ราคา</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">จำนวน</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">รวม</th>
                </tr>
              </thead>
              <tbody>
                {item.products?.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-800">{product.product.title}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{formatNumber(product.product.price)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{product.count}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-800">{formatNumber(product.product.price * product.count)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Price */}
          <div className="flex justify-end mt-4">
            <div className="text-lg font-semibold text-gray-800">
              <p>ราคาสุทธิ</p>
              <p className="text-xl text-blue-500">{formatNumber(item.cartTotal)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryCard;
