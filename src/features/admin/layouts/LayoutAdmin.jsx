import React from "react";
import { Outlet } from "react-router-dom";
import SiderbarAdmin from "../components/SiderbarAdmin";
import HeaderAdmin from "../components/HeaderAdmin";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SiderbarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
