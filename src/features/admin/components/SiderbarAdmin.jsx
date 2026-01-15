import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Layers,
  Package,
  ShoppingCart,
  LogOut,
  Settings,
} from "lucide-react";
import useEconStore from "../../../app/store/ecom-store";
import { toast } from "react-toastify";

const SiderbarAdmin = () => {
  const logout = useEconStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logout Success", { autoClose: 1000 });
  };

  const menuItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
    { to: "manage", icon: Users, label: "Users" },
    { to: "category", icon: Layers, label: "Categories" },
    { to: "product", icon: Package, label: "Products" },
    { to: "orders", icon: ShoppingCart, label: "Orders" },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
      ? "bg-indigo-600 text-white shadow-sm"
      : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-800 text-lg">Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-4 mb-3">
          Menu
        </p>
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={navLinkClass}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="px-4 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SiderbarAdmin;
