import React, { useState, useEffect } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEconStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { formatNumber } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";
import {getStatusColor} from "../../utils/color"
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
        toast.success("สถานะออเดอร์เปลี่ยนเรียบร้อยแล้ว");
        handleGetOrders(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <div>
        <table className=" w-full">
          <thead>
            <tr className="bg-gray-200 border">
              <th>ลำดับ</th>
              <th>ผู้ใช้งาน</th>
              <th>วันที่</th>
              <th>สินค้า</th>
              <th>รวม</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => {
              return (
                <tr key={index} className="border">
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <p>{item.orderedBy.email}</p>
                    <p>{item.orderedBy.address}</p>
                  </td>

                  <td>{dateFormat(item.createdAt)}</td>

                  <td className="px-2 py-4">
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
                  <td>{formatNumber(item.cartTotal)}</td>
                  <td>
                    <span
                      className={`px-2 py-1 ${getStatusColor(
                        item.orderStatus
                      )} rounded-full`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>

                  <td>
                    <select
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
