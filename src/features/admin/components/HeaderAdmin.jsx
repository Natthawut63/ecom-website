import React from "react";
import { Link } from "react-router-dom";

const HeaderAdmin = () => {
  return (
    <div className="p-4 shadow-lg flex justify-end">
    <Link to="/">
      <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
        Go to Homepage
      </button>
    </Link>
  </div>
  
  );
};

export default HeaderAdmin;
