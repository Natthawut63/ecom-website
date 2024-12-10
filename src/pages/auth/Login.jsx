import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useEconStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEconStore((state) => state.actionLogin);
  const user = useEconStore((state) => state.user);
  // console.log(user);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      // key:value Object
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      //   console.log(role);
      toast.success("Login Success");
    } catch (err) {
      const errMsg = err.response?.data?.msg;
      toast.error(errMsg);
      console.log(err);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate(-1); //back page
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="w-full shadow-md bg-white p-8 max-w-md  ">
        <h1 className="text-2xl font-bold text-center my-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              placeholder="Email"
              onChange={handleChange}
              type="email"
              className="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 
          focus:border-transparent"
              name="email"
            />

            <input
              placeholder="Password"
              onChange={handleChange}
              type="password"
              className="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 
          focus:border-transparent"
              name="password"
            />
             <button className="bg-blue-500 rounded-md w-full text-white font-bold py-2 shadow hover:bg-blue-300">Login</button>
             </div>{" "}
        </form>
      </div>
    </div>
  );
};

export default Login;
