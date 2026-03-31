import React, { useState, useEffect } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../api/admin";
import useEconStore from "../../../app/store/ecom-store";
import { toast } from "react-toastify";
import { formatNumber } from "../../../shared/utils/number";
import { dateFormat } from "../../../shared/utils/dateformat";
import { Package, MapPin } from "lucide-react";

const TableOrders = () => {
  const token = useEconStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetOrders(token);
  }, []);

  const handleGetOrders = async () => {
    setLoading(true);
    try {
      const res = await getOrdersAdmin(token);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeOrderStatus = async (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        toast.success("Order status updated", { autoClose: 1000 });
        handleGetOrders(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Complete":
        return "bg-emerald-50 text-emerald-700";
      case "Processing":
        return "bg-blue-50 text-blue-700";
      case "Cancal":
        return "bg-red-50 text-red-700";
      default:
        return "bg-amber-50 text-amber-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center bg-white rounded-xl border border-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
        <p className="text-gray-500 mt-1">Manage and track customer orders</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-800">#{index + 1}</p>
                      <p className="text-xs text-gray-500">{dateFormat(item.createdAt)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <p className="font-medium text-gray-800 text-sm">{item.orderedBy.email}</p>
                        {item.orderedBy.address && (
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate max-w-32">{item.orderedBy.address}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {item.products?.slice(0, 2).map((product, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Package className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-700 truncate max-w-32">{product.product.title}</span>
                          <span className="text-gray-400">×{product.count}</span>
                        </div>
                      ))}
                      {item.products?.length > 2 && (
                        <p className="text-xs text-gray-500">+{item.products.length - 2} more</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-800">฿{formatNumber(item.cartTotal)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.orderStatus)}`}>
                      {item.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={item.orderStatus}
                      onChange={(e) => handleChangeOrderStatus(token, item.id, e.target.value)}
                    >
                      <option>Not Process</option>
                      <option>Processing</option>
                      <option>Complete</option>
                      <option>Cancal</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableOrders;
