import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  ChartColumnStacked,
  PackageSearch,
  ClockArrowUp,
  LogOut,
} from "lucide-react";

const SiderbarAdmin = () => {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 w-64 text-gray-100 flex flex-col h-screen">
      {/* Header Section */}
      <div className="h-24 bg-gray-900 flex items-center justify-center text-2xl font-semibold text-white">
        Admin Panel
      </div>
      <nav className="flex-1 px-4 py-6 space-y-4">
        <NavLink
          to={"/admin"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md flex items-center hover:bg-gray-700 transition duration-200"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-lg flex items-center transition duration-200"
          }
        >
          <LayoutDashboard className="mr-3" size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md flex items-center hover:bg-gray-700 transition duration-200"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-lg flex items-center transition duration-200"
          }
        >
          <FolderKanban className="mr-3" size={20} />
          Manage
        </NavLink>

        <NavLink
          to={"category"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md flex items-center hover:bg-gray-700 transition duration-200"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-lg flex items-center transition duration-200"
          }
        >
          <ChartColumnStacked className="mr-3" size={20} />
          Category
        </NavLink>

        <NavLink
          to={"product"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md flex items-center hover:bg-gray-700 transition duration-200"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-lg flex items-center transition duration-200"
          }
        >
          <PackageSearch className="mr-3" size={20} />
          Product
        </NavLink>

        <NavLink
          to={"orders"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md flex items-center hover:bg-gray-700 transition duration-200"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-lg flex items-center transition duration-200"
          }
        >
          <ClockArrowUp className="mr-3" size={20} />
          orders
        </NavLink>
      </nav>
      <div className="px-4 py-4">
        <NavLink
          to={""}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md flex items-center hover:bg-gray-700 transition duration-200"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-lg flex items-center transition duration-200"
          }
        >
          <LogOut className="mr-3" size={20} />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SiderbarAdmin;
