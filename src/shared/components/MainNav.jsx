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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const navLinkStyle = (isActive) => ({
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '500',
    transition: 'all 0.2s',
    color: isActive ? '#4f46e5' : '#4b5563',
  });

  const mobileNavLinkStyle = (isActive) => ({
    display: 'block',
    padding: '12px 16px',
    borderRadius: '8px',
    fontWeight: '500',
    transition: 'all 0.2s',
    color: isActive ? '#4f46e5' : '#4b5563',
    backgroundColor: isActive ? '#eef2ff' : 'transparent',
  });

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'white',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>

          {/* Logo Section */}
          <Link to={"/"} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #6366f1, #4338ca)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              <ShoppingBag style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #4f46e5, #3730a3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Store
            </span>
          </Link>

          {/* Desktop Navigation - Show when not mobile */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <NavLink to={"/"} style={({ isActive }) => navLinkStyle(isActive)}>
                Home
              </NavLink>
              <NavLink to={"/shop"} style={({ isActive }) => navLinkStyle(isActive)}>
                Shop
              </NavLink>
              <NavLink to={"/cart"} style={({ isActive }) => ({ ...navLinkStyle(isActive), position: 'relative' })}>
                Cart
                {carts.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '0',
                    right: '-8px',
                    backgroundColor: '#f97316',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    borderRadius: '9999px',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {carts.length}
                  </span>
                )}
              </NavLink>
            </div>
          )}

          {/* Right Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={toggleDropDown}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    borderRadius: '9999px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #818cf8, #4f46e5)',
                    }}
                  >
                    <User style={{ width: '16px', height: '16px', color: 'white' }} />
                  </div>
                  {!isMobile && (
                    <ChevronDown style={{
                      width: '16px',
                      height: '16px',
                      color: '#6b7280',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }} />
                  )}
                </button>

                {isOpen && (
                  <>
                    <div
                      style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                      onClick={() => setIsOpen(false)}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '56px',
                      right: 0,
                      backgroundColor: 'white',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      borderRadius: '12px',
                      width: '200px',
                      zIndex: 50,
                      padding: '8px 0',
                      border: '1px solid #f3f4f6',
                    }}>
                      <Link
                        to={"/user/history"}
                        onClick={() => setIsOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          color: '#374151',
                          textDecoration: 'none',
                        }}
                      >
                        <Clock style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                        Order History
                      </Link>
                      <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid #f3f4f6' }} />
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          color: '#374151',
                          width: '100%',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <LogOut style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Desktop Login/Register - Show when not mobile */
              !isMobile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <NavLink
                    to={"/login"}
                    style={{
                      color: '#4b5563',
                      fontWeight: '500',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                    }}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={"/register"}
                    style={{
                      backgroundColor: '#4f46e5',
                      color: 'white',
                      fontWeight: '500',
                      padding: '8px 20px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    Register
                  </NavLink>
                </div>
              )
            )}

            {/* Mobile Menu Button - Show only on mobile */}
            {isMobile && (
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                style={{
                  padding: '8px',
                  color: '#4b5563',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                {isMobileOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && isMobileOpen && (
          <div style={{ paddingBottom: '16px', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
            <div>
              <NavLink
                to={"/"}
                style={({ isActive }) => mobileNavLinkStyle(isActive)}
                onClick={() => setIsMobileOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to={"/shop"}
                style={({ isActive }) => mobileNavLinkStyle(isActive)}
                onClick={() => setIsMobileOpen(false)}
              >
                Shop
              </NavLink>
              <NavLink
                to={"/cart"}
                style={({ isActive }) => mobileNavLinkStyle(isActive)}
                onClick={() => setIsMobileOpen(false)}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  Cart
                  {carts.length > 0 && (
                    <span style={{
                      backgroundColor: '#f97316',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      borderRadius: '9999px',
                      padding: '2px 8px',
                    }}>
                      {carts.length}
                    </span>
                  )}
                </span>
              </NavLink>

              {!user && (
                <>
                  <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid #f3f4f6' }} />
                  <NavLink
                    to={"/login"}
                    style={({ isActive }) => mobileNavLinkStyle(isActive)}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={"/register"}
                    onClick={() => setIsMobileOpen(false)}
                    style={{
                      display: 'block',
                      margin: '8px 16px 0',
                      textAlign: 'center',
                      backgroundColor: '#4f46e5',
                      color: 'white',
                      fontWeight: '500',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                    }}
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default MainNav;
