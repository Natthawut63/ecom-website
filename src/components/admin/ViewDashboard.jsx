import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { getOrdersAdmin, getListAllUsers } from "../../api/admin";
import { formatNumber } from "../../utils/number";
const ViewDashboard = () => {
  const token = useEcomStore((state) => state.token);
  const products = useEcomStore((state) => state.products);
  const sortedProducts = products?.sort((a, b) => b.sold - a.sold);
  const [orders, setOrders] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [users, setUsers] = useState([]);
  console.log(products);

  useEffect(() => {
    handleGetOrders();
    handleGetUsers();
  }, []);

  const handleGetOrders = async () => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGetUsers = () => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const total = orders.reduce((sum, item) => sum + item.cartTotal, 0);
    setCartTotal(total);
    const enabled = users.filter((user) => user.enabled === true);
    setUsers(enabled);
  }, [orders]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Dashboard Overview
          </h1>
        </header>

        {/* Dashboard  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="widget bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Total Sales</h3>
            <p className="text-2xl pt-2"> {formatNumber(cartTotal)} ฿</p>
          </div>
          <div className="widget bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Active Users</h3>
            <p className="text-2xl pt-2">{users.length}</p>
          </div>
          <div className="widget bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Orders</h3>
            <p className="text-2xl pt-2">{orders.length}</p>
          </div>
          <div className="widget bg-red-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">-</h3>
            <p className="text-2xl pt-2"></p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mt-10">HOT</h2>
          <table className="min-w-full table-auto mt-4">
            <thead>
              <tr className="bg-gray-200 ">
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Sold</th>
                <th className="px-4 py-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts?.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.sold}</td>
                  <td className="px-4 py-2">{formatNumber(item.price)} ฿</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDashboard;
