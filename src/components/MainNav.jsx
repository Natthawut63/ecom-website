import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEconStore from "../store/ecom-store";
import { ChevronDown, Store } from "lucide-react";

function MainNav() {
  const carts = useEconStore((state) => state.carts);
  const user = useEconStore((state) => state.user);
  const logout = useEconStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-2xl font-bold text-blue-600">
              <Store className="w-8 h-8 text-blue-600" />
            </Link>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 font-medium px-4 py-2 rounded-md transition duration-200"
                  : "hover:bg-gray-100 text-gray-600 font-medium px-4 py-2 rounded-md transition duration-200"
              }
              to={"/"}
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 font-medium px-4 py-2 rounded-md transition duration-200"
                  : "hover:bg-gray-100 text-gray-600 font-medium px-4 py-2 rounded-md transition duration-200"
              }
              to={"/shop"}
            >
              Shop
            </NavLink>

            <div className="relative">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium px-4 py-2 rounded-md transition duration-200"
                    : "hover:bg-gray-100 text-gray-600 font-medium px-4 py-2 rounded-md transition duration-200"
                }
                to={"/cart"}
              >
                Cart
              </NavLink>

              {/* Badge */}
              {carts.length > 0 && (
                <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                  {carts.length}
                </span>
              )}
            </div>
          </div>

          {/* User Section */}
          {user ? (
            <div className="relative flex items-center gap-4">
              <button
                onClick={toggleDropDown}
                className="flex items-center gap-2 hover:bg-gray-200 px-2 py-2 rounded-full transition duration-200"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-39-116397.png?f=webp&w=256"
                  alt="user-avatar"
                />
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {isOpen && (
                <div className="absolute top-16 right-0 bg-white shadow-lg rounded-md w-48 z-50">
                  <Link
                    to={"/user/history"}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition duration-200"
                  >
                    Order History
                  </Link>
                  <Link
                    onClick={() => logout()}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition duration-200"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium px-4 py-2 rounded-md transition duration-200"
                    : "hover:bg-gray-100 text-gray-600 font-medium px-4 py-2 rounded-md transition duration-200"
                }
                to={"/register"}
              >
                Register
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium px-4 py-2 rounded-md transition duration-200"
                    : "hover:bg-gray-100 text-gray-600 font-medium px-4 py-2 rounded-md transition duration-200"
                }
                to={"/login"}
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
