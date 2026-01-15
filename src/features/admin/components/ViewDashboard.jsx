import React, { useState, useEffect } from "react";
import useEcomStore from "../../../app/store/ecom-store";
import { getOrdersAdmin, getListAllUsers } from "../api/admin";
import { formatNumber } from "../../../shared/utils/number";
import { DollarSign, Users, ShoppingCart, TrendingUp, ArrowUpRight } from "lucide-react";

const ViewDashboard = () => {
  const token = useEcomStore((state) => state.token);
  const products = useEcomStore((state) => state.products);
  const sortedProducts = products?.sort((a, b) => b.sold - a.sold).slice(0, 5);
  const [orders, setOrders] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetOrders = async () => {
    try {
      const res = await getOrdersAdmin(token);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetUsers = async () => {
    try {
      const res = await getListAllUsers(token);
      const enabled = res.data.filter((user) => user.enabled === true);
      setUsers(enabled);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([handleGetOrders(), handleGetUsers()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const total = orders.reduce((sum, item) => sum + item.cartTotal, 0);
    setCartTotal(total);
  }, [orders]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Revenue",
      value: `฿${formatNumber(cartTotal)}`,
      icon: DollarSign,
      color: "bg-emerald-500",
      bgLight: "bg-emerald-50",
    },
    {
      label: "Active Users",
      value: users.length,
      icon: Users,
      color: "bg-blue-500",
      bgLight: "bg-blue-50",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "bg-amber-500",
      bgLight: "bg-amber-50",
    },
    {
      label: "Products",
      value: products?.length || 0,
      icon: TrendingUp,
      color: "bg-purple-500",
      bgLight: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your store performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.bgLight} p-2.5 rounded-lg`}>
                <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">Top Selling Products</h2>
            <span className="text-sm text-gray-500">Top 5</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedProducts?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs overflow-hidden">
                        {item.images?.[0]?.url ? (
                          <img src={item.images[0].url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          "IMG"
                        )}
                      </div>
                      <span className="font-medium text-gray-800 truncate max-w-48">
                        {item.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                      {item.sold}
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    ฿{formatNumber(item.price)}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    ฿{formatNumber(item.price * item.sold)}
                  </td>
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
