import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

const SiderbarAdmin = () => {
  return (
    <div className="bg-gray-800 w-64 text-gray-100 flex flex-col h-screen">
      <div className="h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold">
        Admin Panal
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          to={"/admin"}
          end
          className={({ isActice }) =>
            isActice
              ? "bg-gray-900 px-4 py-2 rounded text-white hover:bg-gray-700 flex items-center "
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LayoutDashboard className="mr-2" />
          Dashboard
        </NavLink>

        <NavLink
          to={"manage"}
          className={({ isActice }) =>
            isActice
              ? "bg-gray-900 px-4 py-2 rounded text-white hover:bg-gray-700 flex items-center "
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LayoutDashboard className="mr-2" />
          Manage
        </NavLink>

        <NavLink
          to={"category"}
          className={({ isActice }) =>
            isActice
              ? "bg-gray-900 px-4 py-2 rounded text-white hover:bg-gray-700 flex items-center "
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LayoutDashboard className="mr-2" />
          Category
        </NavLink>

        <NavLink
          to={"product"}
          className={({ isActice }) =>
            isActice
              ? "bg-gray-900 px-4 py-2 rounded text-white hover:bg-gray-700 flex items-center "
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LayoutDashboard className="mr-2" />
          Product
        </NavLink>

        <NavLink
          to={"orders"}
          className={({ isActice }) =>
            isActice
              ? "bg-gray-900 px-4 py-2 rounded text-white hover:bg-gray-700 flex items-center "
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LayoutDashboard className="mr-2" />
          orders
        </NavLink>
      </nav>
      <div>
        <NavLink
          to={""}
          className={({ isActice }) =>
            isActice
              ? "bg-gray-900 px-4 py-2 rounded text-white hover:bg-gray-700 flex items-center "
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LayoutDashboard className="mr-2" />
          Logout
        </NavLink></div>
    </div>
  );
};

export default SiderbarAdmin;
