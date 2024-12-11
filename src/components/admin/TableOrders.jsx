import React, { useState, useEffect } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEconStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { formatNumber } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";
import { getStatusColor } from "../../utils/color";
const TableOrders = () => {
  const token = useEconStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrders(token);
  }, []);

  const handleGetOrders = async () => {
    getOrdersAdmin(token)
      .then((res) => {
        // console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeOrderStatus = async (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        // console.log(res.data);
        console.log(res);
        toast.success("Order status has been changed", { autoClose: 1000 });
        handleGetOrders(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr className="bg-gray-200 border">
              <th className="px-4 py-2 border">ลำดับ</th>
              <th className="px-4 py-2 border">ผู้ใช้งาน</th>
              <th className="px-4 py-2 border">วันที่</th>
              <th className="px-4 py-2 border">สินค้า</th>
              <th className="px-4 py-2 border">รวม</th>
              <th className="px-4 py-2 border">สถานะ</th>
              <th className="px-4 py-2 border">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`bg-white ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                >
                  <td className="text-center px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <p>{item.orderedBy.email}</p>
                    <p>{item.orderedBy.address}</p>
                  </td>

                  <td className="px-4 py-2"> {dateFormat(item.createdAt)}</td>

                  <td className="px-4 py-2">
                    {item.products?.map((product, index) => (
                      <li key={index}>
                        {product.product.title} {"  "}
                        <span className="text-sm">
                          {product.count} x{" "}
                          {formatNumber(product.product.price)}
                        </span>
                      </li>
                    ))}
                  </td>
                  <td className="px-4 py-2">{formatNumber(item.cartTotal)}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-4 py-2 rounded-full ${getStatusColor(
                        item.orderStatus
                      )}`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>

                  <td className="px-4 py-2">
                    <select
                      className="p-2 rounded-md bg-gray-100 border border-gray-300"
                      value={item.orderStatus}
                      onChange={(e) =>
                        handleChangeOrderStatus(token, item.id, e.target.value)
                      }
                    >
                      <option>Not Process</option>
                      <option>Processing</option>
                      <option>Complete</option>
                      <option>Cancal</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
