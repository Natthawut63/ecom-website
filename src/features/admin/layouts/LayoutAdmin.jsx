import React from "react";
import { Outlet } from "react-router-dom";
import SiderbarAdmin from "../components/SiderbarAdmin";
import HeaderAdmin from "../components/HeaderAdmin";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      <SiderbarAdmin />
      <div className="flex-1 flex flex-col">
        <HeaderAdmin />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default LayoutAdmin;
