import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEconStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";

function MainNav() {
  const carts = useEconStore((state) => state.carts);
  const user = useEconStore((state) => state.user);
  const logout = useEconStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-whithe shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-2xl font-bold">
              LOGO
            </Link>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200  font-medium px-4 py-2 rounded-md"
                  : " hover:bg-gray-100 font-medium px-4 py-2 rounded-md"
              }
              to={"/"}
            >
              HOME
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200  font-medium px-4 py-2 rounded-md"
                  : " hover:bg-gray-100 font-medium px-4 py-2 rounded-md"
              }
              to={"/shop"}
            >
              Shop
            </NavLink>
            {/* Badge */}
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200   font-medium px-4 py-2 rounded-md"
                  : " hover:bg-gray-100 font-medium px-4 py-2 rounded-md"
              }
              to={"/cart"}
            >
              Cart
              {carts.length > 0 && (
                <span className="absolute top-0 bg-red-500 rounded-full px-2 ">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDropDown}
                className="flex items-center gap-2 hover:bg-gray-200 px-2 py-2 rounded"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-39-116397.png?f=webp&w=256"
                ></img>
                <ChevronDown />
              </button>

              {isOpen && (
                <div className=" absolute top-16 bg-white shadow-md z-50">
                  <Link
                    to={"/user/history"}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    History
                  </Link>
                  <Link
                    onClick={() => logout()}
                    className="block px-4 py-2 hover:bg-gray-200"
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
                    ? "bg-gray-200  font-medium px-4 py-2 rounded-md"
                    : " hover:bg-gray-100 font-medium px-4 py-2 rounded-md"
                }
                to={"/register"}
              >
                Register
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200  font-medium px-4 py-2 rounded-md"
                    : " hover:bg-gray-100 font-medium px-4 py-2 rounded-md"
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
