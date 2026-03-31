import React from "react";
import { Link } from "react-router-dom";
import { Home, Bell, Search } from "lucide-react";
import useEconStore from "../../../app/store/ecom-store";

const HeaderAdmin = () => {
  const user = useEconStore((state) => state.user);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left - Search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span className="text-sm font-medium">View Store</span>
        </Link>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-indigo-600">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-700 truncate max-w-32">
              {user?.email || 'Admin'}
            </p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
