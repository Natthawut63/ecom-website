import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Shop feature pages
import Home from "../../features/shop/pages/Home";
import Shop from "../../features/shop/pages/Shop";
import Cart from "../../features/shop/pages/Cart";
import Checkout from "../../features/shop/pages/Checkout";

// Auth feature pages
import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Registe";

// User feature pages
import History from "../../features/user/pages/History";
import HomeUser from "../../features/user/pages/HomeUser";
import Payment from "../../features/user/pages/Payment";

// Admin feature pages
import Dashboard from "../../features/admin/pages/Dashboard";
import Category from "../../features/admin/pages/Category";
import Product from "../../features/admin/pages/Product";
import EditProduct from "../../features/admin/pages/EditProduct";
import Manage from "../../features/admin/pages/Manage";
import ManageOrders from "../../features/admin/pages/ManageOrders";

// Layouts
import Layout from "../../shared/layouts/Layout";
import LayoutAdmin from "../../features/admin/layouts/LayoutAdmin";
import LayoutUser from "../../features/user/layouts/LayoutUser";

// Route guards
import ProtectRouteUser from "./guards/ProtectRouteUser";
import ProtectRouteAdmin from "./guards/ProtectRouteAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "Checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "category", element: <Category /> },
      { path: "product", element: <Product /> },
      { path: "product/:id", element: <EditProduct /> },
      { path: "manage", element: <Manage /> },
      { path: "orders", element: <ManageOrders /> },
    ],
  },
  {
    path: "/user",
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: "payment", element: <Payment /> },
      { path: "history", element: <History /> },
    ],
  },
]);

const AppRouters = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouters;
