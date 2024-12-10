import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEconStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateformat";
import { formatNumber } from "../../utils/number";
import { getStatusColor } from "../../utils/color";
const HistoryCard = () => {
  const [orders, setOrders] = useState([]);
  const token = useEconStore((state) => state.token);

  useEffect(() => {
    handlegetOrders(token);
  }, []);

  const handlegetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        // console.log(res);
        setOrders(res.data.order);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ประวัติการสั่งซื้อ</h1>
      <div className="space-y-4">
        {/* Card */}
        {orders?.map((item, index) => {
          return (
            <div key={index} className="bg-white p-4 rounded-md shadow-md ">
              {/* Header */}
              <div className="flex justify-between mb-2">
                <div>
                  <p className="text-sm">Order Date</p>
                  <p className="font-bold">{dateFormat(item.updatedAt)}</p>
                </div>

                <div>
                  <span className={`${getStatusColor(item.orderStatus)} rounded-full px-4 py-1`}>
                    {item.orderStatus}
                  </span>
                </div>
              </div>
              {/* table */}
              <div>
                <table className="border w-full ">
                  <thead>
                    <tr className="bg-gray-200">
                      <th>สินค้า</th>
                      <th>ราคา</th>
                      <th>จำนวน</th>
                      <th>รวม</th>
                    </tr>
                  </thead>

                  <tbody>
                    {item.products?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.product.title}</td>
                        <td>{formatNumber(item.product.price)}</td>
                        <td>{item.count}</td>
                        <td>{formatNumber(item.product.price * item.count)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* total */}
              <div>
                <div className="text-right">
                  <p>ราคาสุทธิ</p>
                  <p>{formatNumber(item.cartTotal)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;
