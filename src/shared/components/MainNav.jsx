import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, ShoppingBag, Menu, X, User, LogOut, Clock } from "lucide-react";
import useEconStore from "../../app/store/ecom-store";

function MainNav() {
  const carts = useEconStore((state) => state.carts);
  const user = useEconStore((state) => state.user);
  const logout = useEconStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-white shadow-sm"
      style={{
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'white'
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to={"/"} className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4338ca)' }}
            >
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl font-bold"
              style={{
                background: 'linear-gradient(to right, #4f46e5, #3730a3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Store
            </span>
          </Link>

          {/* Center Navigation */}
          <div className="flex items-center gap-1">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to={"/shop"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                }`
              }
            >
              Shop
            </NavLink>

            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-colors relative ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                }`
              }
            >
              Cart
              {carts.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropDown}
                  className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #818cf8, #4f46e5)' }}
                  >
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-14 right-0 bg-white shadow-lg rounded-xl w-52 z-50 py-2 border border-gray-100">
                      <Link
                        to={"/user/history"}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Clock className="w-4 h-4 text-gray-400" />
                        Order History
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4 text-gray-400" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to={"/login"}
                  className="text-gray-600 hover:text-indigo-600 font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </NavLink>
                <NavLink
                  to={"/register"}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
